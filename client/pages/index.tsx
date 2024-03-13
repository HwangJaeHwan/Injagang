import styled from "styled-components";

import Manual from "@/components/Manual/Manual";
import Main from "@/components/Manual/Main";

import { ColBox } from "@/styles/GlobalStyle";

const HomeStyle = styled.div`
  ${ColBox}
  width: 80vw;
`;

const Home = () => {
  return (
    <HomeStyle>
      <Main />
      <Manual />
    </HomeStyle>
  );
};
export default Home;
