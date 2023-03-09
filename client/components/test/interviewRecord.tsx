import React, { useRef, useEffect, useState } from "react";
import { Stream } from "stream";
import styled from "styled-components";

const RecordStyle = styled.div`
  position: relativ;
`;
const Camera = styled.div`
  position: relative;
  video {
  }
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
  .hasPhoto {
  }
`;

const InterviewRecord = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  let mediaRecorder: MediaRecorder | null;

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getUserAccess = navigator.mediaDevices.getUserMedia({
    video: { width: 1920, height: 1080 },
    audio: true,
  });

  const getVideo = () => {
    getUserAccess
      .then(stream => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleRecord = () => {
    getUserAccess.then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      console.log(mediaRecorder);
    });
  };

  const handleRecordRemove = () => {
    if (mediaRecorder) {
      console.log("정지");
      mediaRecorder.stop();
      mediaRecorder = null;
    }
  };

  return (
    <RecordStyle>
      <Camera>
        <video ref={videoRef}></video>
        <button onClick={handleRecord}>Start!</button>
      </Camera>
      <button onClick={handleRecordRemove}>Stop</button>
      <Result>
        <canvas ref={photoRef}></canvas>
        <button>Close</button>
      </Result>
    </RecordStyle>
  );
};

export default InterviewRecord;
