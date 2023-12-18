import { useRef } from "react";
import Manual from "@/components/Manual/Manual";
import useSectionObsever from "@/hooks/useSectionObsever";
import { ColBox } from "@/styles/GlobalStyle";
import styled from "styled-components";
import Main from "@/components/Manual/Main";

const HomeStyle = styled.div`
  ${ColBox}
  width: 80vw;
`;


// const Main = React.lazy(() => import("@/components/Manual/Main"))

const Home = () => {
  // const { targetItemRef } = useSectionObsever(() => {}, 1);
  return (
    <HomeStyle>
      <Main />
      <Manual />
    </HomeStyle>
  );
};
export default Home;
