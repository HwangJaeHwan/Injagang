import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { FlexBox } from "@/styles/GlobalStyle";
import { memberShipCleare } from "@/components/redux/Join/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Join/reducer";
import { clearAuthError } from "@/components/redux/Auth/actions";
import SignUp from "@/components/Auth/SignUp";

const SignupPage = () => {
  const [msg, setMsg] = useState<string | null>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const membershipReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.signup,
  );

  const memberError = useSelector(
    (state: RootReducerType) => state.signup.error,
  );

  useEffect(() => {
    if (membershipReducer.status === 200) {
      router.replace("/login");
      dispatch(clearAuthError());
      dispatch(memberShipCleare());
    } else if (memberError) {
      setMsg(memberError);
    }
  }, [membershipReducer]);

  return (
    <JoinStyle>
      <SignUp />
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
