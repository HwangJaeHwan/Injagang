import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";
import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import {
  getInterViewQnaList,
  handleDeleteInterViewQnaList,
} from "@/components/redux/InterViewQuestion/action";

const useExpectedQuestionManager = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(
    (state: RootReducerType) => state.interViewQuestion,
  );

  const dispatchGetInterViewQnaList = (slectType: QuestionType | string) => {
    dispatch(getInterViewQnaList(slectType));
  };

  const dispatchRemoveQuestions = (
    targetIds: number[],
    type: QuestionType | string,
  ) => {
    const formmatData = {
      ids: targetIds,
    };
    dispatch(handleDeleteInterViewQnaList(formmatData, type));
  };

  const interViewQuestionList = list;
  return {
    interViewQuestionList,
    dispatchGetInterViewQnaList,
    dispatchRemoveQuestions,
  };
};

export default useExpectedQuestionManager;
