import { ReactNode } from "react";

import styled,{ ThemeProvider }  from "styled-components";

import Head from "next/head";
import NavBar from "../components/Nav/NavBar";

import { lightTheme, darkTheme } from "../styles/theme";
import { GlobalStyle } from "../styles/GlobalStyle";

import useThemeToggler from "@/hooks/useThemeToggler";

const LayoutStyle = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.div`
  width: 300px;
  @media screen and (max-width: 1200px) {
    width: 100px;
  }
  z-index: 1;
`;

const Content = styled.div`
  margin: 4rem auto;
  width: 80%;
  min-width: 0;
`;

interface LayoutProps {
  children: ReactNode;
}

/**컴포넌트와 navbar의 영역을 분할하고, 전체 컴포넌트의 렌더링을 통제하기 위한 역할*/
const Layout = ({ children }: LayoutProps) => {
  const [isDarkMode, ChangeDarkMode] = useThemeToggler(false);

  return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Head>
          <title>인자강</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LayoutStyle>
          <Sidebar>
            <NavBar toggleTheme={ChangeDarkMode} mode={isDarkMode} />
          </Sidebar>
          <Content>{children}</Content>
        </LayoutStyle>
      </ThemeProvider>
  );
};

export default Layout;
