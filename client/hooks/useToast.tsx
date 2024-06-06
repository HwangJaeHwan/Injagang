import React, { useCallback } from "react";

import styled from "styled-components";


import ToastItem from "./ToastItem";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showToastAction } from "@/components/redux/Toast/actions";

import { TOAST_MODE } from "@/constants"; 

import { RootReducerType } from "@/components/redux/store";


export interface IToast {
  id: string;
  message: string;
  mode: TOAST_MODE;
  duration: number;
  startTime: number;
}

export type TOAST_MODE = (typeof TOAST_MODE)[keyof typeof TOAST_MODE];

const useToast = (duration: number = 3000) => {
  const { toastList } = useSelector((state: RootReducerType) => state.toast);
  const dispatch = useDispatch();

  const showToast = useCallback(
    (mode: TOAST_MODE = "Info", message: string) => {
      dispatch(showToastAction(mode, message, duration));
    },
    [],
  );

  const RenderToast: React.FC = () => (
    <ToastContainer>
      {toastList &&
        toastList.map(toast => <ToastItem key={toast.id} {...toast} />)}
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
