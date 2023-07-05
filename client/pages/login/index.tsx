import { FlexBox } from "@/styles/GlobalStyle";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled, { css, keyframes } from "styled-components";
// import { getToken } from "@/components/test/api";
import { authenTicate, clearAuthError, getProfile } from "@/components/redux/Auth/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Auth/reducer";
import InputField from "@/components/UI/InputField";


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

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const dispatch = useDispatch();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.auth,
  );
  const router = useRouter();

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
  }


  useEffect(() => {
    if (authReducer.success) {
      dispatch(getProfile());
      dispatch(clearAuthError());
      router.replace("/");
      return
    }
    if (authReducer.error) {
      setErrorMsg("아이디나 비밀번호가 일치하지않습니다.");
      setShakeTrigger(false);
      setTimeout(() => {
        setShakeTrigger(true);
      },50)
      return
    }
  }, [authReducer.error, authReducer.success]);

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
        <Button type="submit">
          로그인
        </Button>
        <Button onClick={() => router.replace("/join")}>회원가입</Button>
      </Form>
    </LoginStyle>
  );
};

export default LoginPage;