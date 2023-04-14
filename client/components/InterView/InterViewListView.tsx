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
import { Card, ScrollBar } from "@/styles/GlobalStyle";
import AddQustionList from "../Admin/AddTextInput";
import AddQuestionListView from "../Admin/AddQuestionListView";

const InterViewListViewStyle = styled.div``;

const InterViewList_Container = styled.div``;

const Container = styled.div`
  ${ScrollBar}
  width: 100%;
  overflow-x: hidden;
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
  const dispatch = useDispatch();
  const interViewList = useSelector(
    (state: RootReducerType) => state.interViewQuestion.list,
  );
  const authRole = useSelector((state: RootReducerType) => state.auth.role);
  useEffect(() => {
    dispatch(getInterViewQnaList(selectType));
  }, [selectType]);

  return (
    <InterViewListViewStyle>
      <InterViewList_Container>
        <ControlMenu
          value={selectType}
          optionList={InterViewSelectData}
          onChange={setSelectType}
          Size={{ width: "150px", height: "30px" }}
        ></ControlMenu>
        <Card size={{ height: "450px", width: "300px", flex: "Col" }}>
          <Container>
            {interViewList &&
              interViewList.map((a, i) => (
                <InterViewListItem key={a.id} {...a}></InterViewListItem>
              ))}
          </Container>
        </Card>
        {authRole === "ADMIN" && (
          <AddQuestionListView qType={selectType}></AddQuestionListView>
        )}
      </InterViewList_Container>
    </InterViewListViewStyle>
  );
};

export default InterViewListView;
