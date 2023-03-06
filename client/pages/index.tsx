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
  return (
    <HomeStyle>
      <Search />
      {/* 자소서리스트 보여주기 */}
      <Card> 안녕하세요</Card>
    </HomeStyle>
  );
};
export default Home;
