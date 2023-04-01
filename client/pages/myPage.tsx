import MyList from "@/components/MyList";
import {
  nicknameChange,
  passWordChange,
} from "@/components/redux/Auth/actions";
import CustomButton from "@/components/UI/CustomButton";
import { Card, ColBox, FlexBox } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const MyPageStyle = styled.div`
  ${ColBox}
  justify-content: center;
  height: 90vh;
  width: 80vw;
  h3 {
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PassWordContainer = styled.div`
  ${ColBox}
  width: 100%;
  background-color: #f3f3f318;
  button {
    display: block;
  }
`;

const myPage = () => {
  const [infoChange, setInfoChange] = useState({
    changeNickname: "",
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

  const handleNickChange = () => {
    dispatch(nicknameChange(infoChange.changeNickname));
    setInfoChange(cur => ({
      ...cur,
      changeNickname: "",
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
    <MyPageStyle>
      <Card size={{ width: "40%", height: "600px", flex: "Col" }}>
        <h2>나의 정보 수정</h2>
        <h3>닉네임변경</h3>
        <Input
          value={infoChange.changeNickname}
          name="changeNickname"
          onChange={e => handleInfoChange(e)}
        ></Input>
        <CustomButton
          Size={{ width: "100%", font: "15px" }}
          onClick={handleNickChange}
          text="변경"
        ></CustomButton>

        <PassWordContainer>
          <h3>현재비밀번호</h3>
          <Input
            value={infoChange.nowPassword}
            name="nowPassword"
            onChange={e => handleInfoChange(e)}
          ></Input>
          <h3>변경 비밀번호</h3>
          <Input
            value={infoChange.changePassword}
            name="changePassword"
            onChange={e => handleInfoChange(e)}
          ></Input>
          <h3>변경 비밀번호 확인</h3>
          <Input
            value={infoChange.changePasswordCheck}
            name="changePasswordCheck"
            onChange={e => handleInfoChange(e)}
          ></Input>
          <CustomButton
            Size={{ width: "100%", font: "15px" }}
            onClick={handlePassWordChange}
            text="변경"
          ></CustomButton>
        </PassWordContainer>
      </Card>
    </MyPageStyle>
  );
};

export default myPage;
