import React, { useState, useEffect } from "react";
import CustomButton from "@/components/UI/CustomButton";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { nicknameChange } from "../redux/Auth/actions";
import { FlexBox } from "@/styles/GlobalStyle";
import { RxAvatar } from "react-icons/rx";
import Modal from "../UI/Modal";

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
  margin: 20px;
  padding: 15px;
  svg {
    font-size: 150px;
  }
  background-color: #494747;
  border-radius: 5px;
`;

const UserInfoContainer = styled.div`
  width: 80%;
`;
const Input = styled.input`
  display: flex;
  padding: 8px;
  width: 80%;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const UserInFo = () => {
  const [nickName, setNickName] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
    setIsOpenModal(false);
  };

  return (
    <UserInfoStyle>
      <UserInfoContainer>
        <h3>닉네임변경</h3>
        <Input
          value={nickName}
          name="changeNickname"
          onChange={e => setNickName(e.target.value)}
        ></Input>
        <CustomButton
          Size={{ width: "80%", font: "15px" }}
          onClick={() => setIsOpenModal(true)}
          text="변경"
        ></CustomButton>
      </UserInfoContainer>
      <RxAvatar />
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onAction={handleChangeNickName}
          contents={{
            title: "MSG",
            content: `${nickName}로 변경하시겠습니까?`,
          }}
        />
      )}
    </UserInfoStyle>
  );
};

export default UserInFo;
