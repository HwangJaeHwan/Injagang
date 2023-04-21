import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";

const MyListPreViewStyle = styled.div`
  ${ColBox}
  ${ScrollBar}
  width: 90%;
  height: 200px;
  border-radius: 5px;
  padding: 15px 25px;
  margin: 15px auto;
  background-color: #1d1b1b;
  overflow-x: hidden;
`;

const MyListBox = styled.div`
  display: flex;
  margin-bottom: 30px;
  span {
    font-weight: bold;
  }
`;
interface MyListPreViewProps {
  preViewData: string[];
}

const MyListPreView = ({ preViewData }: MyListPreViewProps) => {
  return (
    <MyListPreViewStyle>
      {preViewData &&
        preViewData.map((list, idx) => (
          <MyListBox key={idx}>
            <span>{idx + 1}.</span> <p>{list}</p>
          </MyListBox>
        ))}
    </MyListPreViewStyle>
  );
};

export default React.memo(MyListPreView);
