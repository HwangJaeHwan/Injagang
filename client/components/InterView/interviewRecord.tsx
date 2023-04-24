import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import TextToSpeech from "../test/TextReder";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import InterViewSlider from "./InterViewSlider";
import CustomButton from "../UI/CustomButton";
import Image from "next/image";
import interViewimg from "../../assets/images/interView.svg";
import interViewin from "../../assets/images/interviewIn.svg";
import hand from "../../assets/images/hand.svg";
import { v } from "@/styles/variables";
import { MdPlayArrow, MdPause, MdStop } from "react-icons/md";
import { ColBox } from "@/styles/GlobalStyle";

const RecordStyle = styled.div`
  ${ColBox}
  margin: 15px;
  gap: 15px;
  width: 90%;
  height: 100vh;
`;

const RecordContainer = styled.div`
  position: relative;
  display: flex;
  width: ${v.lgItemWidth};
  height: 50%;
  border: 1px solid black;
  border-radius: 12px;
  .interView_img {
    position: relative;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1200px) {
    width: ${v.smItemWidth};
  }
`;

const RecordSvgContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 20px;
  svg {
    font-size: 50px;
  }
`;

const Camera = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .record_btn {
    position: absolute;
    bottom: 20px;
    left: 30px;

    appearance: none;
    border: none;
    outline: none;

    padding: 8px 16px;
    background-image: linear-gradient(to right, #844fff 50%, #ff4f84 50%);
    background-position: 0%;
    background-size: 200%;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    transition: 0.4s;
    cursor: pointer;
  }
  video {
    width: 100%;
    height: 100%;
  }
`;

const Result = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const InfoUserList = styled.div``;

const InterviewRecord = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [changeImg, setChangeImg] = useState<boolean>(false);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const userList = useSelector(
    (state: RootReducerType) => state.userInterViewList.interViewList,
  );

  const randomList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.randomList,
  );
  const [speechData, setSpeechData] = useState([
    ...randomList.map(a => a.questions),
    ...userList,
  ]);

  /**유저에게 권한을 요청함(캠여부판단) */
  const getUserAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      alert("유저의 권한을 획득하지 못했습니다.");
      throw error;
    }
  };

  /**녹화촬영을 시작한다. */
  const handleRecord = () => {
    if (curIndex > speechData.length - 1) {
      return;
    }
    getUserAccess().then(stream => {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.start();
      setIsRecord(true);

      mediaRecorderRef.current.addEventListener("dataavailable", e => {
        if (e.data.size > 0) {
          setRecordedChunks(pre => [...pre, e.data]);
          console.log(recordedChunks);
        }
      });
    });
  };

  /**녹화를 중지한다. */
  const handleRecordRemove = () => {
    if (mediaRecorderRef.current) {
      console.log(mediaRecorderRef.current);
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getAudioTracks().forEach(track => track.stop());
        stream.getVideoTracks().forEach(track => track.stop());
        setIsRecord(false);
      }
    }
  };

  /**녹화를 일시정지한다. */
  const handlePauseRecord = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  /**녹화를 재개한다. */
  const handleResumeRecord = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  /**딜레이 설정 */
  const wait = (duration: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  /**음성 대기 */
  const waitSpeechEnd = (
    utterance: SpeechSynthesisUtterance,
  ): Promise<void> => {
    return new Promise(resolve => {
      utterance.onend = () => {
        resolve();
      };
    });
  };

  const handleSpeak = async (): Promise<void> => {
    if (!isRecord) {
      setChangeImg(!changeImg);
      if (curIndex < speechData.length) {
        const utterance = new SpeechSynthesisUtterance(speechData[curIndex]);
        await wait(2000);
        window.speechSynthesis.speak(utterance);
        await waitSpeechEnd(utterance);
        setCurIndex(curIndex + 1);
      } else {
        setCurIndex(0);
      }
      handleRecord();
    } else {
      handleRecordRemove();
    }
  };

  useEffect(() => {
    console.log(recordedChunks);
  }, [recordedChunks]);

  return (
    <RecordStyle>
      <RecordContainer>
        {changeImg ? (
          <Image
            className={"interView_img"}
            src={interViewin}
            alt="interView"
          />
        ) : (
          <Image
            className={"interView_img"}
            src={interViewimg}
            alt="interView"
          />
        )}
        <Camera>
          {isResult ? (
            <video autoPlay muted ref={videoRef}></video>
          ) : (
            recordedChunks.length > 0 && (
              <InterViewSlider
                idx={videoIndex}
                video={recordedChunks}
                question={speechData}
              />
            )
          )}
          {isRecord ? (
            <RecordSvgContainer>
              {isPaused ? (
                <MdPlayArrow onClick={handleResumeRecord} />
              ) : (
                <MdPause onClick={handlePauseRecord} />
              )}
              <MdStop onClick={handleSpeak}></MdStop>
            </RecordSvgContainer>
          ) : (
            <button className={"record_btn"} onClick={handleSpeak}>
              {!isRecord ? "Start Recording" : "Stop Recording"}
            </button>
          )}
        </Camera>
      </RecordContainer>
      {speechData.length > 0 && (
        <InfoUserList>
          <h2>{speechData.length}개의 질문이 대기중입니다.</h2>
          <br />
          <h2>
            {curIndex}/{speechData.length} 진행중
          </h2>
        </InfoUserList>
      )}
      {
        <Result>
          {recordedChunks.length > 0 && (
            <ResultContainer>
              <CustomButton
                text="<"
                onClick={() =>
                  setVideoIndex(prevIndex =>
                    prevIndex <= 0 ? 0 : videoIndex - 1,
                  )
                }
                Size={{ width: "70px", font: "15px" }}
              />
              <CustomButton
                text="결과확인"
                onClick={() => setIsResult(!isResult)}
                Size={{ width: "150px", font: "15px" }}
              ></CustomButton>
              <CustomButton
                text=">"
                onClick={() =>
                  setVideoIndex(prevIndex =>
                    prevIndex >= recordedChunks.length - 1 ? 0 : videoIndex + 1,
                  )
                }
                Size={{ width: "70px", font: "15px" }}
              ></CustomButton>
            </ResultContainer>
          )}
        </Result>
      }
    </RecordStyle>
  );
};

export default InterviewRecord;
