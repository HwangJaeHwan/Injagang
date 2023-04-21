import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
import { GlobalStyle } from "../styles/GlobalStyle";
import { useRouter } from "next/router";
import NavBar from "../components/Nav/NavBar";
import styled from "styled-components";
import {
  BiEdit,
  BiUserVoice,
  BiCommentDetail,
  BiSearchAlt2,
} from "react-icons/bi";
import { ReactNode, useEffect } from "react";
import { ReactElement, useState } from "react";
import Head from "next/head";
import WithAuth from "./WithAuth";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const routes = ["/join", "/login"];
  const isShowNav = routes.includes(router.asPath);

  const handleToggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", JSON.stringify(newMode));
  };

  //유저의 브라우저에 저장된 테마를 반영하기위한 역할
  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      const isThemeMode = JSON.parse(storageTheme);
      if (isThemeMode !== isDarkMode) {
        setIsDarkMode(isThemeMode);
      }
    }
  }, []);

  type MenuItem = {
    title: string;
    path: string;
    icon: ReactElement;
  };

  /**Navbar에 생성할 리스트를 통제하기 위한 역할*/
  const items: MenuItem[] = [
    {
      title: "자소서작성",
      path: "/myEssay",
      icon: <BiEdit />,
    },
    {
      title: "탐색하기",
      path: "/search",
      icon: <BiSearchAlt2 />,
    },
    {
      title: "면접연습",
      path: "/interview",
      icon: <BiUserVoice />,
    },
    {
      title: "Q&A",
      path: "/qna/list",
      icon: <BiCommentDetail />,
    },
  ];

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
          <NavBar
            navitems={items}
            toggleTheme={handleToggleTheme}
            mode={isDarkMode}
          />
        </Sidebar>
        <Content>{children}</Content>
      </LayoutStyle>
    </ThemeProvider>
  );
};

export default WithAuth(Layout);
