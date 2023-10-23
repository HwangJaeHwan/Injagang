import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";
import {
  IAddQuestions,
  QuestionType,
} from "@/types/InterViewQuestion/InterViewQuestionType";
import {
  getInterViewQnaList,
  handleAddQuestion,
  handleDeleteInterViewQnaList,
} from "@/components/redux/InterViewQuestion/action";
import { addInterViewList } from "@/components/redux/InterViewList/action";

const useExpectedQuestionManager = () => {
  const dispatch = useDispatch();
  const { list, randomList } = useSelector(
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

  const dispatchAddQuestions = (newList: IAddQuestions) => {
    dispatch(handleAddQuestion(newList));
  };

  //TODO : 추후에 InterView관련 작업 할때 옮기기를 고려
  const dispatchAddInterViewList = (confirmedData: string[]) => {
    dispatch(addInterViewList(confirmedData));
  };

  const interViewQuestionList = list;
  return {
    interViewQuestionList,
    dispatchGetInterViewQnaList,
    dispatchRemoveQuestions,
    dispatchAddQuestions,
    dispatchAddInterViewList,
    randomList,
  };
};

export default useExpectedQuestionManager;
