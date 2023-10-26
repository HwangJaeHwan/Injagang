import BoardListView from "@/components/Board/BoardListLayout";
import PageNation from "@/components/QNA/PageNation";
import { ColBox, StyleButton } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import React from "react";

import styled from "styled-components";
import { MdOutlineModeEditOutline } from "react-icons/md";
const ListStyle = styled.div`
  ${ColBox}
  width: 80vw;
  height: 1000vh;

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

const list = () => {
  const router = useRouter();
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
    </ListStyle>
  );
};

export default list;
