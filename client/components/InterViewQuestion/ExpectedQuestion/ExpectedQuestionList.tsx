import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlMenu from "../../UI/ControlMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";
import ExpectedQuestionListItem from "./ExpectedQuestionListItem";
import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import UserQuestionPlayList from "../PlayList/UserQuestionPlayList";
import CustomButton from "../../UI/CustomButton";
import {
  getInterViewQnaList,
  handleDeleteInterViewQnaList,
} from "../../redux/InterViewQuestion/action";
import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import useCheckList from "../hooks/useCheckList";

const InterViewSelectData = [
  { title: QuestionType.CS, id: 1 },
  { title: QuestionType.SITUATION, id: 2 },
  { title: QuestionType.JOB, id: 3 },
  { title: QuestionType.PERSONALITY, id: 4 },
  { title: "ALL", id: 5 },
];

const ExpectedQuestionList = () => {
  const [selectType, setSelectType] = useState<QuestionType | string>("ALL");
  const [addInterViewList, setAddInterViewList] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const interViewList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.list,
  );
  const { checkList, handleAllCheck, handleCheckList, isAllCheck } =
    useCheckList(interViewList);
  const interViewListUpdated = useSelector(
    (state: RootReducerType) => state.interViewQuestion.isUpdated,
  );
  const authRole = useSelector((state: RootReducerType) => state.profile.role);

  /**컨트롤 메뉴를 변경시 적용 */
  useEffect(() => {
    dispatch(getInterViewQnaList(selectType));
  }, [selectType]);

  /**인터뷰질문이 업데이트 되면 업데이트 적용 */
  useEffect(() => {
    if (interViewListUpdated) {
      dispatch(getInterViewQnaList(selectType));
    }
  }, [interViewListUpdated]);

  /**인터뷰질문리스트 삭제 */
  const handleRemoveQuestions = () => {
    const data = {
      ids: checkList,
    };
    handleAllCheck();
    dispatch(handleDeleteInterViewQnaList(data));
  };

  /**인터뷰 영상촬영을 위한 질문리스트 추가 */
  const hadleSetInterViewList = () => {
    const filterItem = interViewList.filter((a, i) => a.id === checkList[i]);
    const questionList = filterItem.map((a, i) => a.questions);
    setAddInterViewList(questionList);
  };

  return (
    <InterViewListViewStyle>
      <Explanation>
        <h2>자신만의 면접 질문 리스트를 만들어주세요.</h2>
        <p>(선택사항)샘플 리스트를 선택하여 추가하면 됩니다.</p>
        <p>(선택사항)자신이 원하는 질문도 추가하면 됩니다.</p>
        <p>
          랜덤셋팅도 있으니 넘어가셔도 됩니다. 자신만의 질문과
          랜덤셋팅을조합할수도있습니다.
        </p>
      </Explanation>
      <SwitchContainer>
        <LeftContainer>
          <Card size={{ height: "450px", width: "100%", flex: "Col" }}>
            <ControlMenu
              value={selectType}
              optionList={InterViewSelectData}
              onChange={setSelectType}
              Size={{ width: "100%", height: "30px" }}
            ></ControlMenu>
            <Container>
              {interViewList &&
                interViewList.map((a, i) => (
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
              {authRole === "ADMIN" ? (
                <CustomButton
                  onClick={handleRemoveQuestions}
                  text={"삭제하기"}
                  Size={{ width: "100px", font: "15px" }}
                />
              ) : (
                <CustomButton
                  onClick={hadleSetInterViewList}
                  text={"항목추가"}
                  Size={{ width: "100px", font: "15px" }}
                />
              )}
            </div>
          </Card>
        </LeftContainer>
        <UserQuestionPlayList
          qType={selectType}
          addList={addInterViewList}
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
