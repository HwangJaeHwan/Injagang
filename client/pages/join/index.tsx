import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { FlexBox } from "@/styles/GlobalStyle";
import {
  memberShipRequest,
  memberShipCleare,
} from "@/components/redux/Join/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Join/reducer";
import { clearAuthError } from "@/components/redux/Auth/actions";
import usePwCheck from "@/hooks/usePwCheck";
import InputField from "@/components/UI/InputField";

interface joinInfoType {
  [key: string]: string;
  loginId: string;
  password: string;
  confirmPassword: string;
  email: string;
  nickName: string;
}

const SignupPage = () => {
  const [joinInfo, setJoinInfo] = useState<joinInfoType>({
    loginId: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickName: "",
  });
  const passwordCheck = useRef<HTMLInputElement | null>(null);
  const confirmPasswordCheck = useRef<HTMLInputElement | null>(null);
  const [msg, setMsg] = useState<string | null>("");
  const { isValid, errorMessage } = usePwCheck({ password: joinInfo.password });
  const router = useRouter();
  const dispatch = useDispatch();
  const membershipReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.signup,
  );

  const memberError = useSelector(
    (state: RootReducerType) => state.signup.error,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (const checkValue in joinInfo) {
      if (joinInfo[checkValue].length === 0) {
        setMsg("빈칸을 채워주세요.");
        return;
      }
    }

    if (!isValid) {
      setMsg(errorMessage);
      if (passwordCheck.current) passwordCheck.current.focus();
      return;
    }

    if (joinInfo.password !== joinInfo.confirmPassword) {
      setMsg("비밀번호를 재확인해주세요");
      return;
    }

    const joinData = {
      loginId: joinInfo.loginId,
      password: joinInfo.password,
      passwordCheck: joinInfo.confirmPassword,
      email: joinInfo.email,
      nickname: joinInfo.nickName,
    };
    dispatch(memberShipRequest(joinData));
  };

  useEffect(() => {
    if (membershipReducer.status === 200) {
      router.replace("/login");
      dispatch(clearAuthError());
      dispatch(memberShipCleare());
    } else if (memberError) {
      setMsg(memberError);
    }
  }, [membershipReducer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJoinInfo(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  return (
    <JoinStyle>
      <Form onSubmit={handleSubmit}>
        <InputField
          label="아이디"
          type="test"
          name="loginId"
          value={joinInfo.loginId}
          onChange={handleChange}
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          ref={passwordCheck}
          value={joinInfo.password}
          onChange={handleChange}
        />
        <InputField
          label="재확인"
          type="password"
          name="confirmPassword"
          ref={confirmPasswordCheck}
          value={joinInfo.confirmPassword}
          onChange={handleChange}
        />
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={joinInfo.email}
          onChange={handleChange}
        />
        <InputField
          label="닉네임"
          type="text"
          name="nickName"
          value={joinInfo.nickName}
          onChange={handleChange}
        />
        <WarningMsg>{msg}</WarningMsg>
        <Button type="submit">회원가입</Button>
      </Form>
    </JoinStyle>
  );
};

export default SignupPage;

const JoinStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${FlexBox};
  height: 100vh;
  width: 100vw;
  background-color: #31404e;
  color: ${({ theme }) => theme.colors.text};
`;

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
