import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const RecordStyle = styled.div`
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  video {
    border-radius: 15px;
    border: 8px solid ${({theme}) => theme.colors.primary};
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
      console.error("유저의 권한을 획득하지 못했습니다.", error);
      throw error;
    }
  };

  const handleRecord = () => {
    getUserAccess().then(stream => {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.start();

      mediaRecorderRef.current.addEventListener("dataavailable", e => {
        if (e.data.size > 0) {
          setRecordedChunks(pre => [e.data,...pre])
          console.log(recordedChunks);
        }
      });
    });
  };

  const handleRecordRemove = () => {
    if (mediaRecorderRef.current) {
      console.log(mediaRecorderRef.current);
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  return (
    <RecordStyle>
      <Camera>
        <video autoPlay muted ref={videoRef}></video>
        <button onClick={handleRecord}>Start Recording</button>
      </Camera>
      <button onClick={handleRecordRemove}>Stop Recording</button>
      <Result>
        {recordedChunks && recordedChunks.length > 0 && (
          <video
            autoPlay
            // controls
            src={URL.createObjectURL(recordedChunks[0])}
          ></video>
        )}
      </Result>
    </RecordStyle>
  );
};

export default InterviewRecord;
