import CheckMyInFo from "@/components/MyPage/CheckMyInFo";
import {ColBox} from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";

const MyPageStyle = styled.div`
  ${ColBox}
  height: 90vh;
  width: 80vw;
  h3 {
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const myPage = () => {

  return (
    <MyPageStyle>
      <CheckMyInFo/>
    </MyPageStyle>
  );
};

export default myPage;
