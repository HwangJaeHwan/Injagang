import styled from "styled-components";

import SignUp from "@/components/Auth/SignUp";

import { FlexBox } from "@/styles/GlobalStyle";

const SignupPage = () => {
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
