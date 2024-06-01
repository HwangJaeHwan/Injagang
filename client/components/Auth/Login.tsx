import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import styled, { css, keyframes } from "styled-components";

import InputField from "@/components/UI/InputField";

import useLoginManager from "./hooks/useLoginManager";
import useLoginLogic from "./hooks/useLoginLogic";

const Login = () => {
  const { userMsg } = useLoginManager();
  const {
    loginInfo,
    handleChange,
    handleSubmit,
    userLogicMsg,
    loginIdRef,
    passwordRef,
  } = useLoginLogic();
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (userMsg !== "") {
      setShakeTrigger(false);
      setTimeout(() => {
        setShakeTrigger(true);
      }, 50);
    }
  }, [userMsg, userLogicMsg]);

  return (
    <Form shakeTrigger={shakeTrigger} onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        ref={loginIdRef}
        type="text"
        name="loginId"
        value={loginInfo.loginId}
        onChange={handleChange}
      />
      <InputField
        label="비밀번호"
        ref={passwordRef}
        type="password"
        name="password"
        value={loginInfo.password}
        onChange={handleChange}
      />
      {userLogicMsg || (userMsg && <ERROR> {userLogicMsg || userMsg} </ERROR>)}
      <Button type="submit">로그인</Button>
      <Button onClick={() => router.replace("/join")}>회원가입</Button>
    </Form>
  );
};

export default Login;

// 오류가 발생했을시 흔드는 효과
const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-10px);
  }
  20% {
    transform: translateX(10px);
  }
  30% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(-10px);
  }
  60% {
    transform: translateX(10px);
  }
  70% {
    transform: translateX(-10px);
  }
  80% {
    transform: translateX(10px);
  }
  90% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
`;

const Form = styled.form<{ shakeTrigger: boolean }>`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #15202b;
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);
  ${({ shakeTrigger }) =>
    shakeTrigger &&
    css`
      animation: ${shakeAnimation} 0.5s;
    `}
`;

const Button = styled.button`
  padding: 8px 16px;
  width: 100%;
  background-color: #2ecc71;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  margin: 5px auto;
  cursor: pointer;
`;

const ERROR = styled.div`
  color: red;
`;
