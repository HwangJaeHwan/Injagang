import BoardListView from "@/components/QNA/BoardListView";
import PageNation from "@/components/QNA/PageNation";
import CustomButton from "@/components/UI/CustomButton";
import { getBoardList } from "@/components/redux/QnA/actions";
import { InitiaState } from "@/components/redux/QnA/reducer";
import { RootReducerType } from "@/components/redux/store";
import { ColBox } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ListStyle = styled.div`
  ${ColBox}
  width: 80vw;
  height: 1000vh;
`;

const list = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //첫 리스트를 불러오기 위한 요청
  useEffect(() => {
    dispatch(getBoardList(1));
  }, []);
  // const { page, type, content } = router.query;
  return (
    <ListStyle>
      <CustomButton
        Size={{ width: "500px", font: "15px" }}
        text="글쓰러가기"
        onClick={() => router.push("/qna/question")}
      ></CustomButton>
      <BoardListView />
      <PageNation />
    </ListStyle>
  );
};

export default list;
