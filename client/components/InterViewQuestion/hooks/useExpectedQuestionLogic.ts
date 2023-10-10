import React, { useState } from "react";
import { InterviewQuestionList } from "@/components/redux/InterViewQuestion/types";

const useExpectedQuestionLogic = () => {
  const [selectedQuestionList, setSelectedQuestionList] = useState<string[]>(
    [],
  );

  const addInterViewQuestionsList = (
    questions: InterviewQuestionList[],
    checkList: number[],
  ) => {
    const filterItem = questions.filter(
      (question, i) => question.id === checkList[i],
    );
    const questionList = filterItem.map((item, i) => item.questions);
    setSelectedQuestionList(questionList);
  };

  return { addInterViewQuestionsList, selectedQuestionList };
};

export default useExpectedQuestionLogic;
