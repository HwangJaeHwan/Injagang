import BoardListView from "@/components/QNA/BoardListView";
import PageNation from "@/components/QNA/PageNation";
import CustomButton from "@/components/UI/CustomButton";
import { ColBox } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import React from "react";

import styled from "styled-components";

const ListStyle = styled.div`
  ${ColBox}
  width: 80vw;
  height: 1000vh;
`;

const list = () => {
  const router = useRouter();
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
