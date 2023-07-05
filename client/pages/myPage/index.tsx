import CheckMyInFo from "@/components/MyPage/CheckMyInFo";
import {ColBox} from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";

const MyPageStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100%;
`;

const myPage = () => {

  return (
    <MyPageStyle>
      <CheckMyInFo/>
    </MyPageStyle>
  );
};

export default myPage;
