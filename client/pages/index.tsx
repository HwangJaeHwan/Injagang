import styled from "styled-components";

import Manual from "@/components/Manual/Manual";

import { ColBox } from "@/styles/GlobalStyle";

const HomeStyle = styled.div`
  ${ColBox}
  width: 80vw;
`;

const Home = () => {
  return (
    <HomeStyle>
      <Manual />
    </HomeStyle>
  );
};
export default Home;
