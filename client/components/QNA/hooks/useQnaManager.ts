import React, { useCallback } from "react";
import { changeCorrection } from "@/components/redux/QnA/user/actions";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useQnaManager = () => {
  const dispatch = useDispatch();
  const { selectedCorrection } = useSelector(
    (state: RootReducerType) => state.userBoard,
  );

  const dispatchChangeCorrection = useCallback((correction: string) => {
    dispatch(changeCorrection(correction));
  }, []);
  return { dispatchChangeCorrection, selectedCorrection };
};

export default useQnaManager;
