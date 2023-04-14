import React, { useState } from "react";
import {
  nicknameChange,
  passWordChange,
} from "@/components/redux/Auth/actions";
import CustomButton from "@/components/UI/CustomButton";
import { Card, ColBox, FlexBox } from "@/styles/GlobalStyle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import UserInFo from "./UserInFo";
import PassWordInfo from "./PassWordInfo";

const CheckMyInFoStyle = styled.div`
  ${ColBox}
  justify-content: center;
  height: 90vh;
  width: 80vw;
  h3 {
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const CheckMyInFo = () => {
  return (
    <CheckMyInFoStyle>
      <Card size={{ width: "50%", height: "55%", flex: "Col" }}>
        <h2>나의 정보</h2>
        <UserInFo />
        <PassWordInfo />
      </Card>
    </CheckMyInFoStyle>
  );
};

export default CheckMyInFo;
