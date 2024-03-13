import React from "react";

import QuestionSelector from "../ExpectedQuestion/QuestionSelector";
import ExpectedQuestionList from "../ExpectedQuestion/ExpectedQuestionList";
import ActionBtns from "../ExpectedQuestion/ActionBtns";

import useEUserQuestionManager from "../hooks/useEUserQuestionManager";
import useExpectedQuestionManager from "../hooks/useExpectedQuestionManager";
import useCheckList from "@/hooks/useCheckList";

import { Card } from "@/styles/GlobalStyle";

const ExpectedQuestionSelector = () => {
  const { selectedType, dispatchSelectedType, dispatchSelectedQuestions } =
    useEUserQuestionManager();
  const { interViewQuestionList, dispatchRemoveQuestions } =
    useExpectedQuestionManager();
  const { checkList, handleAllCheck, handleCheckList, isAllCheck } =
    useCheckList(interViewQuestionList);

  return (
    <Card size={{ height: "450px", width: "100%", flex: "Col" }}>
      <QuestionSelector
        selectedType={selectedType}
        onChange={dispatchSelectedType}
      />
      <ExpectedQuestionList
        questions={interViewQuestionList}
        isAllCheck={isAllCheck}
        handleCheckList={handleCheckList}
      ></ExpectedQuestionList>
      <ActionBtns
        checkList={checkList}
        onAdd={dispatchSelectedQuestions}
        selectedType={selectedType}
        isAllChecked={isAllCheck}
        onRemove={dispatchRemoveQuestions}
        onToggleAll={handleAllCheck}
        questions={interViewQuestionList}
      ></ActionBtns>
    </Card>
  );
};

export default ExpectedQuestionSelector;
