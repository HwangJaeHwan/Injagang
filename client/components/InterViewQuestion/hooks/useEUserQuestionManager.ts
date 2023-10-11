import React, { useCallback, useEffect } from "react";
import {
  setSelectedQuestionsAction,
  setTypeAction,
} from "@/components/redux/InterViewQuestion/user/action";
import { RootReducerType } from "@/components/redux/store";
import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useExpectedQuestionManager from "./useExpectedQuestionManager";

const useEUserQuestionManager = () => {
  const dispatch = useDispatch();
  const { selectedQuestions, selectedType } = useSelector(
    (state: RootReducerType) => state.userInterViewQuestions,
  );
  const { dispatchGetInterViewQnaList } = useExpectedQuestionManager();

  useEffect(() => {
    dispatchGetInterViewQnaList(selectedType);
  }, [selectedType]);

  const dispatchSelectedType = useCallback((type: QuestionType | string) => {
    dispatch(setTypeAction(type));
  }, []);

  const dispatchSetSelectedQuestions = useCallback((list: string[]) => {
    dispatch(setSelectedQuestionsAction(list));
  }, []);

  return {
    selectedQuestions,
    selectedType,
    dispatchSelectedType,
    dispatchSetSelectedQuestions,
  };
};

export default useEUserQuestionManager;
