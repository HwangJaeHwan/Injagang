import React, { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import { v4 as uuid4 } from "uuid";
import { TOAST_MODE } from "@/constants";
import { fadeIn, fadeOut, slideIn, progressBar } from "@/styles/animations";

interface IToast {
  id: string;
  message: string;
}

type TOAST_MODE = (typeof TOAST_MODE)[keyof typeof TOAST_MODE];

const FIXED_DURATION = 3000;

const useToast = (duration: number = 3000) => {
  const [toastList, setToastList] = useState<IToast[]>([]);
  const [toastMode, setToastMode] = useState<TOAST_MODE>("Info");

  const showToast = useCallback(
    (mode: TOAST_MODE = "Info", message: string) => {
      changeToastMode(mode);
      const id = uuid4();
      setToastList([...toastList, { id, message }]);
      setTimeout(() => {
        setToastList(prevList => prevList.filter(toast => toast.id !== id));
      }, duration);
    },
    [toastList],
  );

  const changeToastMode = useCallback(
    (mode: TOAST_MODE) => {
      setToastMode(mode);
    },
    [toastMode],
  );

  const RenderToast: React.FC = () => (
    <ToastContainer>
      {toastList.map(toast => (
        <ToastMessage key={toast.id} mode={toastMode}>
          {toast.message}
          <ProgressBar duration={FIXED_DURATION} />
        </ToastMessage>
      ))}
    </ToastContainer>
  );
  return [showToast, RenderToast] as const;
};
export default useToast;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastMessage = styled.div<{ mode: TOAST_MODE }>`
  position: relative;
  background-color: ${props => {
    switch (props.mode) {
      case "Success":
        return "#3fc025";
      case "Warning":
        return "#ffc107";
      case "ERROR":
        return "#dc3545";
      case "Info":
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
    ${fadeOut} 0.5s ${FIXED_DURATION - 500}ms;
  will-change: opacity;
`;

const ProgressBar = styled.div<{ duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  background-color: #f46a6a;
  animation: ${progressBar} ${props => props.duration}ms linear;
`;
