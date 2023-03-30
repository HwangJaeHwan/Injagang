import React from "react";
import MyList from "@/components/MyList";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

const MyListStyle = styled.div`
  ${ColBox}
  margin: 50px auto;
  width: 100%;
  height: 100vh;
`;
/** 나의 자소서 목록을 보여주고, 자소서 수정과 생성의 유무를 판단하기 위한 페이지*/
const myEssay = () => {
  return (
    <MyListStyle>
      <MyList />
    </MyListStyle>
  );
};

export default myEssay;
