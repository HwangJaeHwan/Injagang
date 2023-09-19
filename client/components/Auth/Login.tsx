import { FlexBox } from "@/styles/GlobalStyle";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { authenTicate } from "@/components/redux/Auth/actions";
import InputField from "@/components/UI/InputField";
import useLoginManager from "./hooks/useLoginManager";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userMsg } = useLoginManager();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginInfo.loginId.trim() === "") {
      setErrorMsg("아이디를 입력해주세요");
      loginRef.current?.focus();
      setShakeTrigger(true);
      return;
    }
    if (loginInfo.password.trim() === "") {
      setShakeTrigger(true);
      passwordRef.current?.focus();
      setErrorMsg("비밀번호를 입력해주세요");
      return;
    }
    const loginData = {
      loginId: loginInfo.loginId,
      password: loginInfo.password,
    };
    dispatch(authenTicate(loginData));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errorMsg !== " ") {
      setShakeTrigger(false);
      setTimeout(() => {
        setShakeTrigger(true);
      }, 50);
    }
  }, [errorMsg, userMsg]);

  return (
    <LoginStyle>
      <Form shakeTrigger={shakeTrigger} onSubmit={handleSubmit}>
        <InputField
          label="아이디"
          ref={loginRef}
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
        {errorMsg && <ERROR> {errorMsg} </ERROR>}
        <Button type="submit">로그인</Button>
        <Button onClick={() => router.replace("/join")}>회원가입</Button>
      </Form>
    </LoginStyle>
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

const LoginStyle = styled.div`
  ${FlexBox};
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #31404e;
  color: ${({ theme }) => theme.colors.text};
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
