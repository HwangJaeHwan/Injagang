import React from "react";

import { MdPlayArrow, MdPause, MdStop } from "react-icons/md";

import styled from "styled-components";


interface VideoControllerProps {
  isPaused: boolean;
  handleResumeRecord: () => void;
  handlePauseRecord: () => void;
  handleSpeak: () => Promise<void>;
}

const VideoController = ({
  isPaused,
  handleResumeRecord,
  handlePauseRecord,
  handleSpeak,
}: VideoControllerProps) => {
  return (
    <RecordSvgContainer>
      {isPaused ? (
        <MdPlayArrow onClick={handleResumeRecord} />
      ) : (
        <MdPause onClick={handlePauseRecord} />
      )}
      <MdStop onClick={handleSpeak}></MdStop>
    </RecordSvgContainer>
  );
};

export default VideoController;
const RecordSvgContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 25px;
  svg {
    font-size: 45px;
    color: #ff4f84;
    transition: 0.3s ease;
    &:hover {
      transform: scale(1.1);
      color: #844fff;
    }
  }
`;
