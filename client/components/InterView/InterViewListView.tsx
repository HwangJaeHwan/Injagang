import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ControlMenu from "../UI/ControlMenu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import {
  QuestionType,
  getInterViewQnaList,
} from "../redux/InterViewQuestion/action";
import InterViewListItem from "./InterViewListItem";
import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import AddQuestionListView from "../Admin/AddQuestionListView";
import CustomButton from "../UI/CustomButton";
import { handleDeleteInterViewQnaList } from "../redux/InterViewQuestion/action";
const InterViewListViewStyle = styled.div`
  ${ColBox}
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

const InterViewSelectData = [
  { title: QuestionType.CS, id: 1 },
  { title: QuestionType.SITUATION, id: 2 },
  { title: QuestionType.JOB, id: 3 },
  { title: QuestionType.PERSONALITY, id: 4 },
  { title: QuestionType.ALL, id: 5 },
];

const InterViewListView = () => {
  const [selectType, setSelectType] = useState<QuestionType | string>("ALL");
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [addInterViewList, setAddInterViewList] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const interViewList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.list,
  );
  const interViewListUpdated = useSelector(
    (state: RootReducerType) => state.interViewQuestion.isUpdated,
  );
  const authRole = useSelector((state: RootReducerType) => state.auth.role);

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

  /**전체체크 제어 */
  const handleAllCheck = () => {
    setAllCheck(!allCheck);
  };

  /**전체체크 변경된값이 true이면 현재리스트 배열에서 id값만 추출하여 리스트 생성 전체체크 해제시 리스트 초기화*/
  useEffect(() => {
    if (allCheck) {
      const idList = interViewList.map(a => a.id);
      setCheckList(idList);
      return;
    } else {
      setCheckList([]);
      return;
    }
  }, [allCheck]);

  /**체크여부를 판단후 아이템을 제거하고 추가한다.*/
  const handleAddCheckList = (id: number, isCheck: boolean) => {
    if (isCheck) {
      const removeItem = checkList.filter(a => a !== id);
      setCheckList(removeItem);
      return;
    } else {
      setCheckList(cur => [...cur, id]);
      return;
    }
  };

  /**인터뷰질문리스트 삭제 */
  const handleRemoveQuestions = () => {
    const data = {
      ids: checkList,
    };
    setAllCheck(false);
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
      <Card size={{ height: "450px", width: "500px", flex: "Col" }}>
        <ControlMenu
          value={selectType}
          optionList={InterViewSelectData}
          onChange={setSelectType}
          Size={{ width: "100%", height: "30px" }}
        ></ControlMenu>
        <Container>
          {interViewList &&
            interViewList.map((a, i) => (
              <InterViewListItem
                key={a.id}
                allCheck={allCheck}
                onChange={handleAddCheckList}
                {...a}
              ></InterViewListItem>
            ))}
        </Container>
        <div>
          <CustomButton
            onClick={handleAllCheck}
            text={allCheck ? "전체해제" : "전체선택"}
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
      <AddQuestionListView
        qType={selectType}
        addList={addInterViewList}
      ></AddQuestionListView>
    </InterViewListViewStyle>
  );
};

export default InterViewListView;
