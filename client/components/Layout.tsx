import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import { GlobalStyle } from "../styles/GlobalStyle";
import { useRouter } from "next/router";
import NavBar from "../components/Nav/NavBar";
import styled from "styled-components";
import { BiEdit, BiUserVoice, BiCommentDetail,BiSearchAlt2 } from "react-icons/bi";
import { ReactNode, useEffect } from "react";
import { ReactElement, useState } from "react";
import Head from "next/head";
const LayoutStyle = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.div`
  width: 20%;
`;

const Content = styled.div`
  margin: 4rem auto;
  width: 80%;
  height: 100vh;
`;

interface LayoutProps {
  children: ReactNode;
}

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

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      const isThemeMode = JSON.parse(storageTheme);
      if(isThemeMode !== isDarkMode){
        setIsDarkMode(isThemeMode);
      }
    }
  }, []);

  type MenuItem = {
    title: string;
    path: string;
    icon: ReactElement;
  };

  const items: MenuItem[] = [
    {
      title: "자소서작성",
      path: "/edit",
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
      title: "Community",
      path: "/contact",
      icon: <BiCommentDetail />,
    },
  ];

  return (
    <LayoutStyle>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Head>
          <title>인자강</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Sidebar style={{ width: !isShowNav ? "20%" : "0%" }}>
          {!isShowNav && (
            <NavBar
              items={items}
              toggleTheme={handleToggleTheme}
              mode={isDarkMode}
            />
          )}
        </Sidebar>
        <Content style={{margin: !isShowNav ?  "4rem auto":"0"}}>{children}</Content>
      </ThemeProvider>
    </LayoutStyle>
  );
};

export default Layout;
