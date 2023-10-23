import Manual from "@/components/Manual/Manual";
import Search from "@/components/Search";
import { ColBox } from "@/styles/GlobalStyle";
import styled from "styled-components";

const HomeStyle = styled.div`
  ${ColBox}
  width: 80vw;
  height: 100vh;
`;

const Card = styled.div`
  position: rea;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 85%;
  height: 100px;
  border-radius: 5px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;
`;

const Home = () => {
  console.log(process.env.BACKEND_SERVER_API);
  return (
    <HomeStyle>
      <Manual />
    </HomeStyle>
  );
};
export default Home;
