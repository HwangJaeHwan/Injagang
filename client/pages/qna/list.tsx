import BoardListView from "@/components/Board/BoardListLayout";
import PageNation from "@/components/QNA/PageNation";
import CustomButton from "@/components/UI/CustomButton";
import { ColBox } from "@/styles/GlobalStyle";
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
  @media screen and (max-width: 800px){
    .edit_btn{
      width: 300px;
    }
  }
`;

const list = () => {
  const router = useRouter();
  return (
    <ListStyle>
      <CustomButton
        className="edit_btn"
        Size={{ width: "600px", font: "15px" }}
        text={
          <>
            <MdOutlineModeEditOutline />
            {" 글쓰기"}
          </>
        }
        onClick={() => router.push("/qna/question")}
      ></CustomButton>
      <BoardListView />
      <PageNation />
    </ListStyle>
  );
};

export default list;
