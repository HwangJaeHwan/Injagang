import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CorrectionItem } from "../Answer/AnswerLayout";

import { RootReducerType } from "@/components/redux/store";
import {
  changeBoardSearch,
  changeBoardType,
  changeCorrection,
  changeTargetFeed,
  initCorrection,
  initTargetFeed,
} from "@/components/redux/QnA/user/actions";

const userQnaManager = () => {
  const dispatch = useDispatch();
  const { selectedCorrection, targetFeed, boardSearch, boardType } =
    useSelector((state: RootReducerType) => state.userBoard);

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
    dispatch(initTargetFeed());
  }, []);

  const dispatchChangeSearch = useCallback((newSearch: string) => {
    dispatch(changeBoardSearch(newSearch));
  }, []);

  const dispatchChangeType = useCallback((type: string) => {
    dispatch(changeBoardType(type));
  }, []);

  return {
    dispatchChangeCorrection,
    selectedCorrection,
    dispatchInitCorrection,
    targetFeed,
    dispatchChangeFeed,
    dispatchClearTargetFeed,
    dispatchChangeType,
    dispatchChangeSearch,
    boardSearch,
    boardType,
  };
};

export default userQnaManager;
