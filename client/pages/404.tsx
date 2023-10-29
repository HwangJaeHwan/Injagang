import { ColBox } from "@/styles/GlobalStyle";
import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

const Custom404: NextPage = () => {
  const TITLE = {
    main: "404-Page Not Found",
    sub: "찾으시는 페이지는 존재하지 않습니다.",
    link: "홈 화면"
  }
  return (
    <Container>
      <Title>{TITLE.main}</Title>
      <p>{TITLE.sub}</p>
      <StyledLink href="/">{TITLE.link}</StyledLink>
    </Container>
  );
};

export default Custom404;

const Container = styled.div`
  ${ColBox}
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  margin-top: 12px;
  color: red;
`;