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

const PassWordContainer = styled.div`
  ${ColBox}
  width: 100%;
  height: 100%;
  background-color: #494747;
  button {
    display: block;
  }
`;

const Input = styled.input`
  display: flex;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 150px;
`;

const Container = styled.div`
  ${FlexBox}
  width: 90%;
  h3 {
    margin: 12px auto;
  }
`;

const PassWordInfo = () => {
  const [infoChange, setInfoChange] = useState({
    nowPassword: "",
    changePassword: "",
    changePasswordCheck: "",
  });
  const dispatch = useDispatch();
  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfoChange(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  const handlePassWordChange = () => {
    const passwordData = {
      nowPassword: infoChange.nowPassword,
      changePassword: infoChange.changePassword,
      changePasswordCheck: infoChange.changePasswordCheck,
    };
    dispatch(passWordChange(passwordData));

    setInfoChange(cur => ({
      ...cur,
      nowPassword: "",
      changePassword: "",
      changePasswordCheck: "",
    }));
  };

  return (
    <PassWordContainer>
      <Container>
        <h3>현재비밀번호</h3>
        <Input
          value={infoChange.nowPassword}
          name="nowPassword"
          onChange={e => handleInfoChange(e)}
        ></Input>
      </Container>
      <Container>
        <h3>변경 비밀번호</h3>
        <Input
          value={infoChange.changePassword}
          name="changePassword"
          onChange={e => handleInfoChange(e)}
        ></Input>
      </Container>
      <Container>
        <h3>비밀번호 확인</h3>
        <Input
          value={infoChange.changePasswordCheck}
          name="changePasswordCheck"
          onChange={e => handleInfoChange(e)}
        ></Input>
      </Container>
      <CustomButton
        Size={{ width: "95%", font: "15px" }}
        onClick={handlePassWordChange}
        text="변경"
      ></CustomButton>
    </PassWordContainer>
  );
};

export default PassWordInfo;
