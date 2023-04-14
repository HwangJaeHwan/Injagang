import React, { useState, useEffect } from "react";
import CustomButton from "@/components/UI/CustomButton";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { nicknameChange } from "../redux/Auth/actions";
import { FlexBox } from "@/styles/GlobalStyle";
import { RxAvatar } from "react-icons/rx";

const Input = styled.input`
  display: flex;
  padding: 8px;
  width: 80%;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const UserInfoStyle = styled.div`
  ${FlexBox}
  width: 100%;
  margin: 20px;
  padding: 12px;
  svg {
    font-size: 150px;
  }
  background-color: #494747;
  border-radius: 5px;
`;

const UserInFo = () => {
  const [nickName, setNickName] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const info = sessionStorage.getItem("info");
    const getNick = info ? JSON.parse(info) : null;
    if (getNick) {
      setNickName(getNick.nickname);
    }
  }, []);

  const handleChangeNickName = () => {
    dispatch(nicknameChange(nickName));
  };

  return (
    <UserInfoStyle>
      <div>
        <h3>닉네임변경</h3>
        <Input
          value={nickName}
          name="changeNickname"
          onChange={e => setNickName(e.target.value)}
        ></Input>
        <CustomButton
          Size={{ width: "80%", font: "15px" }}
          onClick={handleChangeNickName}
          text="변경"
        ></CustomButton>
      </div>
      <RxAvatar />
    </UserInfoStyle>
  );
};

export default UserInFo;
