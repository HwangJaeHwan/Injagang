import React from "react";
import styled from "styled-components";

import { fadeIn, fadeOut, slideIn, progressBar } from "@/styles/animations";

import { IToast } from "./useToast";
import { TOAST_MODE } from "./useToast";

const FIXED_DURATION = 3000;

const ToastItem = ({ id, message, mode, duration, startTime }: IToast) => {
  return (
    <ToastMessage mode={mode}>
      {message}
      <ProgressBar duration={duration} startTime={startTime} />
    </ToastMessage>
  );
};
export default React.memo(ToastItem);

const ToastMessage = styled.div<{ mode: TOAST_MODE }>`
  position: relative;
  background-color: ${props => {
    switch (props.mode) {
      case "SUCCESS":
        return "#BDFCC9";
      case "WARNING":
        return "#ffc107";
      case "ERROR":
        return "#dc3545";
      case "INFO":
      default:
        return "#17a2b8";
    }
  }};
  color: black;
  font-size: 1.2rem;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  border: 2px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s forwards, ${fadeIn} 0.5s,
    ${fadeOut} 0.5s ${FIXED_DURATION}ms;
  will-change: opacity;
`;
const ProgressBar = styled.div<{ duration: number; startTime: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  background-color: #f46a6a;
  animation: ${progressBar} ${props => props.duration}ms linear;
  animation-delay: ${props => props.startTime - Date.now()}ms;
`;
