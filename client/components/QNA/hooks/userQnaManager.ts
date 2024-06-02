import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CorrectionItem } from "../Answer/AnswerLayout";

import { RootReducerType } from "@/components/redux/store";
import {
  changeCorrection,
  changeTargetFeed,
  initCorrection,
  initTargetFeed,
} from "@/components/redux/QnA/user/actions";


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

  const dispatchClearTargetFeed = useCallback(() => {
    dispatch(initTargetFeed())
  },[])

  return {
    dispatchChangeCorrection,
    selectedCorrection,
    dispatchInitCorrection,
    targetFeed,
    dispatchChangeFeed,
    dispatchClearTargetFeed,
  };
};

export default userQnaManager;
