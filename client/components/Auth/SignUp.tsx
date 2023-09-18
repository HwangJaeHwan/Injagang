import { useEffect, useRef } from "react";
import styled from "styled-components";
import InputField from "@/components/UI/InputField";
import useSignUpLogic from "./hooks/useSignUpLogic";
import { ERROR_MESSAGES } from "@/constants";

const SignUp = () => {
  const passwordCheck = useRef<HTMLInputElement | null>(null);
  const confirmPasswordCheck = useRef<HTMLInputElement | null>(null);
  const { handleSubmit, handleValueChange, msg, joinInfo } = useSignUpLogic();

  useEffect(() => {
    if (msg === ERROR_MESSAGES.CHECK_PASSWORD) {
      passwordCheck.current && passwordCheck.current.focus();
    }
  }, [msg]);

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        type="test"
        name="loginId"
        value={joinInfo.loginId}
        onChange={handleValueChange}
      />
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        ref={passwordCheck}
        value={joinInfo.password}
        onChange={handleValueChange}
      />
      <InputField
        label="재확인"
        type="password"
        name="confirmPassword"
        ref={confirmPasswordCheck}
        value={joinInfo.confirmPassword}
        onChange={handleValueChange}
      />
      <InputField
        label="이메일"
        type="email"
        name="email"
        value={joinInfo.email}
        onChange={handleValueChange}
      />
      <InputField
        label="닉네임"
        type="text"
        name="nickName"
        value={joinInfo.nickName}
        onChange={handleValueChange}
      />
      <WarningMsg>{msg}</WarningMsg>
      <Button type="submit">회원가입</Button>
    </Form>
  );
};

export default SignUp;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #15202b;
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2ecc71;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const WarningMsg = styled.p`
  margin-bottom: 8px;
  color: red;
  text-align: center;
`;
