import React from "react";
import styled from "styled-components";
import { Card } from "@/styles/GlobalStyle";
import useCheckList from "@/hooks/useCheckList";
import useExpectedQuestionManager from "../hooks/useExpectedQuestionManager";
import useEUserQuestionManager from "../hooks/useEUserQuestionManager";
import QuestionSelector from "../ExpectedQuestion/QuestionSelector";
import ExpectedQuestionList from "../ExpectedQuestion/ExpectedQuestionList";
import ActionBtns from "../ExpectedQuestion/ActionBtns";

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
