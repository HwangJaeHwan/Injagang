import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import TextToSpeech from "../test/TextReder";

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
  const [isPaused, setIsPaused] = useState<boolean>(false);


  /** 유저에게 권한을 요청함(디바이스 여부 판단)*/
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

  /**녹화를 시작한다. */
  const handleRecord = () => {
    getUserAccess().then(stream => {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.start();

      mediaRecorderRef.current.addEventListener("dataavailable", e => {
        if (e.data.size > 0) {
          setRecordedChunks(pre => [e.data, ...pre]);
          console.log(recordedChunks);
        }
      });
    });
  };

  /**녹화를 종료한다. */
  const handleRecordRemove = () => {
    if (mediaRecorderRef.current) {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getAudioTracks().forEach((track) => track.stop());
      }
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null;
    }
  };

  /**녹화를 일시정지한다. */
  const handlePauseRecord = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  /**녹화를 재시작한다. */
  const handleResumeRecord = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  return (
    <RecordStyle>
      <Camera>
        <video autoPlay muted ref={videoRef}></video>
        <button onClick={handleRecord}>Start Recording</button>
      </Camera>
      <button onClick={handleRecordRemove}>Stop Recording</button>
      {isPaused ? (
        <button onClick={handleResumeRecord}>Resume Recording</button>
      ) : (
        <button onClick={handlePauseRecord}>Pause Recording</button>
      )}
      <Result>
        {recordedChunks && recordedChunks.length > 0 && (
          <video
            autoPlay
            // controls
            src={URL.createObjectURL(recordedChunks[0])}
          ></video>
        )}
      </Result>
      {isPaused && (
        <TextToSpeech
          speechData={[
            "원하는 텍스트를 여기에 입력하세요",
            "원하는 텍스트를 여기에 입력하세요",
            "원하는 텍스트를 여기에 입력하세요",
            "원하는 텍스트를 여기에 입력하세요",
          ]}
        />
      )}
    </RecordStyle>
  );
};

export default InterviewRecord;
