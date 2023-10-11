import React from "react";
import styled from "styled-components";
import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import UserQuestionPlayList from "./PlayList/UserQuestionPlayList";
import useCheckList from "@/hooks/useCheckList";
import useExpectedQuestionManager from "./hooks/useExpectedQuestionManager";
import useExpectedQuestionLogic from "./hooks/useExpectedQuestionLogic";
import useEUserQuestionManager from "./hooks/useEUserQuestionManager";
import QuestionSelector from "./ExpectedQuestion/QuestionSelector";
import ExpectedQuestionList from "./ExpectedQuestion/ExpectedQuestionList";
import ActionBtns from "./ExpectedQuestion/ActionBtns";

const ExplanationContent = () => {
  return (
    <Explanation>
      <h2>자신만의 면접 질문 리스트를 만들어주세요.</h2>
      <p>(선택사항)샘플 리스트를 선택하여 추가하면 됩니다.</p>
      <p>(선택사항)자신이 원하는 질문도 추가하면 됩니다.</p>
      <p>
        랜덤셋팅도 있으니 넘어가셔도 됩니다. 자신만의 질문과
        랜덤셋팅을조합할수도있습니다.
      </p>
    </Explanation>
  );
};

const ExpectedQuestionLayout = () => {
  const { selectedType, dispatchSelectedType } = useEUserQuestionManager();
  const { interViewQuestionList, dispatchRemoveQuestions } =
    useExpectedQuestionManager();
  const { addInterViewQuestionsList, selectedQuestionList } =
    useExpectedQuestionLogic();
  const { checkList, handleAllCheck, handleCheckList, isAllCheck } =
    useCheckList(interViewQuestionList);

  return (
    <InterViewListViewStyle>
      <ExplanationContent />
      <SwitchContainer>
        <LeftContainer>
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
              onAdd={addInterViewQuestionsList}
              selectedType={selectedType}
              isAllChecked={isAllCheck}
              onRemove={dispatchRemoveQuestions}
              onToggleAll={handleAllCheck}
              questions={interViewQuestionList}
            ></ActionBtns>
          </Card>
        </LeftContainer>
        <UserQuestionPlayList
          qType={selectedType}
          addList={selectedQuestionList}
        ></UserQuestionPlayList>
      </SwitchContainer>
    </InterViewListViewStyle>
  );
};

export default ExpectedQuestionLayout;

const InterViewListViewStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 90%;
  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

const SwitchContainer = styled.div`
  ${FlexBox}
  width: 90%;
  gap: 25px;
  @media screen and (max-width: 1200px) {
    ${ColBox}
  }
`;

const LeftContainer = styled.div`
  width: 45%;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Container = styled.div`
  ${ScrollBar}
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Explanation = styled.div`
  margin: 30px;
`;
