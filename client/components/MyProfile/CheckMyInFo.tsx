import React from "react";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import styled from "styled-components";
import UserInFo from "./UserInfoSetting";
import PassWordInfo from "./PassWordSetting";
import { v } from "@/styles/variables";

const CheckMyInFo = () => {
  const headerTitle = "나의 정보";
  return (
    <CheckMyInFoStyle>
      <Container>
        <MainTitle>{headerTitle}</MainTitle>
        <SwitchContainer>
          <UserInFo />
          <PassWordInfo />
        </SwitchContainer>
      </Container>
    </CheckMyInFoStyle>
  );
};

export default CheckMyInFo;

const Container = styled.div`
  display: ${ColBox};
`;

const CheckMyInFoStyle = styled.div`
  ${ColBox}
  width: ${v.lgWidth};
  height: 400px;
  h3 {
    margin-top: 20px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 900px) {
    width: ${v.smWidth};
    height: 700px;
  }
`;

const MainTitle = styled.h2``;

const SwitchContainer = styled.div`
  ${FlexBox}
  gap:15px;
  width: 100%;
  height: 90%;
  @media screen and (max-width: 900px) {
    ${ColBox}
  }
`;
