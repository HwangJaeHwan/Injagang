import React, { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import { v4 as uuid4 } from "uuid";
import { TOAST_MODE } from "@/constants";
import { fadeIn, fadeOut, slideIn, progressBar } from "@/styles/animations";
import ToastItem from "./ToastItem";

export interface IToast {
  id: string;
  message: string;
  mode: TOAST_MODE;
  duration: number;
  startTime: number;
}

export type TOAST_MODE = (typeof TOAST_MODE)[keyof typeof TOAST_MODE];

const useToast = (duration: number = 3000) => {
  const [toastList, setToastList] = useState<IToast[]>([]);

  const showToast = useCallback(
    (mode: TOAST_MODE = "Info", message: string) => {
      const id = uuid4();
      const startTime = Date.now();
      setToastList(pervToastList => [
        ...pervToastList,
        { id, message, mode, duration, startTime },
      ]);
      setTimeout(() => {
        hideToast(id);
      }, duration);
    },
    [],
  );

  const hideToast = (id: string) => {
    setToastList(prevList => prevList.filter(toast => toast.id !== id));
  };

  const RenderToast: React.FC = () => (
    <ToastContainer>
      {toastList.map(toast => (
        <ToastItem key={toast.id} {...toast} />
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
