import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedQuestion,
  setSelectedQuestionsAction,
  setTypeAction,
} from "@/components/redux/InterViewQuestion/user/action";
import { RootReducerType } from "@/components/redux/store";

import useExpectedQuestionManager from "./useExpectedQuestionManager";

import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import { InterviewQuestionList } from "@/components/redux/InterViewQuestion/types";

type ManagerProps = {
  typeCheckCallback: () => void; // 타입 선택시 전체 체크 상태 해제 
};
const useEUserQuestionManager = ({
  typeCheckCallback = () => {},
}: ManagerProps) => {
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
    if (typeCheckCallback) {
      typeCheckCallback();
    }
  }, [typeCheckCallback]);

  const dispatchSelectedQuestions = useCallback(
    (questions: InterviewQuestionList[], checkList: number[]) => {
      const filterItem = questions.filter((question, i) =>
        checkList.includes(question.id),
      );
      const questionList = filterItem.map((item, i) => item.questions);
      dispatch(setSelectedQuestionsAction(questionList));
    },
    [],
  );

  const dispatchClearSelectedQuestions =  useCallback(() => {
    dispatch(clearSelectedQuestion());
  },[])

  return {
    selectedQuestions,
    selectedType,
    dispatchSelectedType,
    dispatchSelectedQuestions,
    dispatchClearSelectedQuestions,
  };
};

export default useEUserQuestionManager;
