import Login from "@/components/Auth/Login";
import { FlexBox } from "@/styles/GlobalStyle";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <LoginStyle>
      <Login />
    </LoginStyle>
  );
};

export default LoginPage;

const LoginStyle = styled.div`
  z-index: 1;
  ${FlexBox};
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #31404e;
  color: ${({ theme }) => theme.colors.text};
`;
