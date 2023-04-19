import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import TextToSpeech from "../test/TextReder";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import { saveAs } from "file-saver";
import InterViewSlider from "./InterViewSlider";
import CustomButton from "../UI/CustomButton";
import { ColBox } from "@/styles/GlobalStyle";

const RecordStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  ~ video {
    border-radius: 15px;
    border: 8px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Camera = styled.div`
  position: relative;
  border-radius: 15px;
  border: 8px solid #1111115e;
  button {
    position: absolute;
    bottom: 20px;
    left: 20px;

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
`;

const Result = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  ${ColBox}
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    height: 50px;
    margin: 15px;
  }
`;

const InfoUserList = styled.div``;

const InterviewRecord = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
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
    if (curIndex > speechData.length + 1) {
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
          setRecordedChunks(pre => [e.data, ...pre]);
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

  const downloadVideo = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      saveAs(url, "interview-record.webm");
    }
  };

  useEffect(() => {
    console.log(recordedChunks);
  }, [recordedChunks]);

  return (
    <RecordStyle>
      <Camera>
        <video autoPlay muted ref={videoRef}></video>
        <button onClick={handleSpeak}>
          {!isRecord ? "Start Recording" : "Stop Recording"}
        </button>
      </Camera>
      <button onClick={downloadVideo}>Download Video</button>
      {speechData.length > 0 && (
        <InfoUserList>
          {`${speechData.length}개의 질문이 대기중입니다.`}
          <br />
          {`${curIndex}/${speechData.length} 진행중`}
        </InfoUserList>
      )}
      <Result>
        {recordedChunks.length > 0 && (
          <ResultContainer>
            <CustomButton
              text="<"
              onClick={() => setVideoIndex(videoIndex - 1)}
              Size={{ width: "70px", font: "15px" }}
            ></CustomButton>
            <InterViewSlider
              idx={videoIndex}
              video={recordedChunks}
              question={speechData}
            />
            <CustomButton
              text=">"
              onClick={() => setVideoIndex(videoIndex + 1)}
              Size={{ width: "70px", font: "15px" }}
            ></CustomButton>
          </ResultContainer>
        )}
      </Result>
    </RecordStyle>
  );
};

export default InterviewRecord;
