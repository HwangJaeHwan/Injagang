import React, { useCallback } from "react";
import {
  changeCorrection,
  changeTargetFeed,
  initCorrection,
} from "@/components/redux/QnA/user/actions";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CorrectionItem } from "../Answer/AnswerWirte";

const userQnaManager = () => {
  const dispatch = useDispatch();
  const { selectedCorrection, targetFeed } = useSelector(
    (state: RootReducerType) => state.userBoard,
  );

  const dispatchChangeCorrection = useCallback((correction: CorrectionItem) => {
    dispatch(changeCorrection(correction));
  }, []);

  const dispatchInitCorrection = useCallback(() => {
    dispatch(initCorrection());
  }, []);

  const dispatchChangeFeed = useCallback((targetFeed: number) => {
    dispatch(changeTargetFeed(targetFeed));
  }, []);

  return {
    dispatchChangeCorrection,
    selectedCorrection,
    dispatchInitCorrection,
    targetFeed,
    dispatchChangeFeed,
  };
};

export default userQnaManager;
