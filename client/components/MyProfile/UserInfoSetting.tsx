import React, { useEffect } from "react";
import CustomButton from "@/components/UI/CustomButton";
import styled from "styled-components";
import { RxAvatar } from "react-icons/rx";
import { SessionStorageManager } from "@/util/sessionStorageManager";
import useMyProfileManager from "./hooks/useMyProfileManager";
import useMyProfileLogic from "./hooks/useMyProfileLogic";

const UserInfoSetting = () => {
  const myInfo = new SessionStorageManager("info");
  const { nickName, setNickName } = useMyProfileLogic();
  const { dispatchNickNameChange, Modal, RenderToast } = useMyProfileManager();
  const mainTitle = "닉네임 변경";

  useEffect(() => {
    const getMyNick = myInfo.get();
    getMyNick && setNickName(getMyNick.nickname);
  }, []);

  return (
    <UserInfoStyle>
      <UserInfoContainer>
        <h3>{mainTitle}</h3>
        <Input
          value={nickName}
          name="changeNickname"
          onChange={e => setNickName(e.target.value)}
        ></Input>
        <CustomButton
          Size={{ width: "80%", font: "15px" }}
          onClick={() => dispatchNickNameChange(nickName)}
          text="변경"
        ></CustomButton>
      </UserInfoContainer>
      <RxAvatar />
      <Modal />
      <RenderToast />
    </UserInfoStyle>
  );
};

export default UserInfoSetting ;

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
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
