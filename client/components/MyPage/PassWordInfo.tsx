import React, { useState } from "react";
import {
  nicknameChange,
  passWordChange,
} from "@/components/redux/Auth/actions";
import CustomButton from "@/components/UI/CustomButton";
import { Card, ColBox, FlexBox } from "@/styles/GlobalStyle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Modal from "../UI/Modal";

const PassWordContainer = styled.div`
  ${ColBox}
  width: 100%;
  height: 250px;
  padding: 15px;
  background-color: #494747;
  button {
    display: block;
  }
  @media screen and (max-width: 900px) {
    height: 500px;
    gap: 15px;
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
  @media screen and (max-width: 900px) {
    ${ColBox}
  }
`;

const PassWordInfo = () => {
  const [infoChange, setInfoChange] = useState({
    nowPassword: "",
    changePassword: "",
    changePasswordCheck: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>("");
  const dispatch = useDispatch();
  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfoChange(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  const handlePassWordChange = () => {
    if (
      infoChange.changePassword === "" ||
      infoChange.changePasswordCheck === "" ||
      infoChange.nowPassword === ""
    ) {
      setModalMsg("빈값이 존재합니다.");
      setIsOpenModal(true);
      return;
    }
    if (infoChange.changePassword !== infoChange.changePasswordCheck) {
      setModalMsg("패스워드가 일치하지 않습니다.");
      setIsOpenModal(true);
      return;
    }
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
          type="password"
          name="nowPassword"
          onChange={e => handleInfoChange(e)}
        ></Input>
      </Container>
      <Container>
        <h3>변경 비밀번호</h3>
        <Input
          value={infoChange.changePassword}
          type="password"
          name="changePassword"
          onChange={e => handleInfoChange(e)}
        ></Input>
      </Container>
      <Container>
        <h3>비밀번호 확인</h3>
        <Input
          value={infoChange.changePasswordCheck}
          type="password"
          name="changePasswordCheck"
          onChange={e => handleInfoChange(e)}
        ></Input>
      </Container>
      <CustomButton
        Size={{ width: "95%", font: "15px" }}
        onClick={handlePassWordChange}
        text="변경"
      ></CustomButton>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          contents={{ title: "경고", content: modalMsg }}
        />
      )}
    </PassWordContainer>
  );
};

export default PassWordInfo;
