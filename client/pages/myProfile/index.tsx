import CheckMyInFo from "@/components/MyProfile/CheckMyInFo";
import { ColBox } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";

const myProfile = () => {
  return (
    <MyPageStyle>
      <CheckMyInFo />
    </MyPageStyle>
  );
};

export default myProfile;

const MyPageStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 100%;
`;
