import React from "react";

import styled from "styled-components";

import CheckMyInFo from "@/components/MyProfile/CheckMyInFo";

import { ColBox } from "@/styles/GlobalStyle";



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
