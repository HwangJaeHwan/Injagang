import React, { useEffect } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import { initBoardSearch } from "@/components/redux/QnA/user/actions";

import BoardListView from "@/components/Board/BoardListLayout";
import PageNation from "@/components/QNA/PageNation";
import BoardSearch from "@/components/QNA/BoardSearch";

import { ColBox, StyleButton } from "@/styles/GlobalStyle";
import { MdOutlineModeEditOutline } from "react-icons/md";

const list = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(initBoardSearch());
    };
  }, []);

  return (
    <ListStyle>
      <StyleButton
        className="edit_btn"
        Size={{ width: "600px", font: "15px" }}
        onClick={() => router.push("/qna/question")}
      >
        <MdOutlineModeEditOutline />
        {" 글쓰기"}
      </StyleButton>
      <BoardListView />
      <PageNation />
      <BoardSearch /> 
    </ListStyle>
  );
};

export default list;

const ListStyle = styled.div`
  ${ColBox}
  width: 80vw;
  height: 100dvh;

  .edit_btn {
    display: flex;
    padding: 8px;
    svg {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 800px) {
    .edit_btn {
      width: 300px;
    }
  }
`;
