import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import TextToSpeech from "../test/TextReder";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";

const RecordStyle = styled.div`
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  video {
    border-radius: 15px;
    border: 8px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Camera = styled.div`
  position: relative;

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

const InterviewRecord = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const userList = useSelector(
    (state: RootReducerType) => state.userInterViewList.interViewList,
  );

  const randomList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.randomList,
  );

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

  const wait = (duration: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

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
      const speechData = [
        "자신의 장단점에 대해 말해보세요",
        "프로젝트를 하면서 힘들었던 일에 대해 말해보세요",
        "당신의 꿈은 무엇인가요?",
      ];
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

  return (
    <RecordStyle>
      <Camera>
        <video autoPlay muted ref={videoRef}></video>
        <button onClick={handleSpeak}>
          {!isRecord ? "Start Recording" : "Stop Recording"}
        </button>
      </Camera>
      <Result>
        {recordedChunks && recordedChunks.length > 0 && (
          <video
            autoPlay
            controls
            src={URL.createObjectURL(recordedChunks[0])}
          ></video>
        )}
      </Result>
      {
        <TextToSpeech
          speechData={[...randomList.map(a => a.questions), ...userList]}
        />
      }
    </RecordStyle>
  );
};

export default InterviewRecord;
