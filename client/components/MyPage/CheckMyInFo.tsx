import React from "react";
import { Card, ColBox, FlexBox } from "@/styles/GlobalStyle";
import styled from "styled-components";
import UserInFo from "./UserInFo";
import PassWordInfo from "./PassWordInfo";
import { v } from "@/styles/variables";

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

const SwitchContainer = styled.div`
  ${FlexBox}
  width: 100%;
  height: 90%;
  @media screen and (max-width: 900px) {
    ${ColBox}
  }
`;

const CheckMyInFo = () => {
  return (
    <CheckMyInFoStyle>
      <Card size={{ width: "90%", height: "100%", flex: "Col" }}>
        <h2>나의 정보</h2>
        <SwitchContainer>
          <UserInFo />
          <PassWordInfo />
        </SwitchContainer>
      </Card>
    </CheckMyInFoStyle>
  );
};

export default CheckMyInFo;
