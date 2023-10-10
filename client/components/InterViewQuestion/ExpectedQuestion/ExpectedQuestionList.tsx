import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlMenu from "../../UI/ControlMenu";
import ExpectedQuestionListItem from "./ExpectedQuestionListItem";
import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import UserQuestionPlayList from "../PlayList/UserQuestionPlayList";
import CustomButton from "../../UI/CustomButton";
import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import useCheckList from "@/hooks/useCheckList";
import useExpectedQuestionManager from "../hooks/useExpectedQuestionManager";
import useMyProfileManager from "@/components/MyProfile/hooks/useMyProfileManager";
import useExpectedQuestionLogic from "../hooks/useExpectedQuestionLogic";
import useEUserQuestionManager from "../hooks/useEUserQuestionManager";

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

const InterViewSelectData = [
  { title: QuestionType.CS, id: 1 },
  { title: QuestionType.SITUATION, id: 2 },
  { title: QuestionType.JOB, id: 3 },
  { title: QuestionType.PERSONALITY, id: 4 },
  { title: "ALL", id: 5 },
];

const ExpectedQuestionList = () => {
  const { selectedType, dispatchSelectedType } = useEUserQuestionManager();
  const { interViewQuestionList, dispatchRemoveQuestions } =
    useExpectedQuestionManager();
  const { addInterViewQuestionsList, selectedQuestionList } =
    useExpectedQuestionLogic();
  const { checkList, handleAllCheck, handleCheckList, isAllCheck } =
    useCheckList(interViewQuestionList);
  const { role } = useMyProfileManager();

  /**인터뷰질문리스트 삭제 */
  const handleRemoveQuestions = () => {
    handleAllCheck();
    dispatchRemoveQuestions(checkList, selectedType);
  };

  return (
    <InterViewListViewStyle>
      <ExplanationContent />
      <SwitchContainer>
        <LeftContainer>
          <Card size={{ height: "450px", width: "100%", flex: "Col" }}>
            <ControlMenu
              value={selectedType}
              optionList={InterViewSelectData}
              onChange={dispatchSelectedType}
              Size={{ width: "100%", height: "30px" }}
            ></ControlMenu>
            <Container>
              {interViewQuestionList &&
                interViewQuestionList.map((a, i) => (
                  <ExpectedQuestionListItem
                    key={a.id}
                    allCheck={isAllCheck}
                    onChange={handleCheckList}
                    {...a}
                  ></ExpectedQuestionListItem>
                ))}
            </Container>
            <div>
              <CustomButton
                onClick={handleAllCheck}
                text={isAllCheck ? "전체해제" : "전체선택"}
                Size={{ width: "100px", font: "15px" }}
              />
              {role === "ADMIN" ? (
                <CustomButton
                  onClick={handleRemoveQuestions}
                  text={"삭제하기"}
                  Size={{ width: "100px", font: "15px" }}
                />
              ) : (
                <CustomButton
                  onClick={() =>
                    addInterViewQuestionsList(interViewQuestionList, checkList)
                  }
                  text={"항목추가"}
                  Size={{ width: "100px", font: "15px" }}
                />
              )}
            </div>
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

export default ExpectedQuestionList;

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
