import { ColBox } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";

const MyListPreViewStyle = styled.div`
  ${ColBox}
  width: 50%;
  height: 250px;
  border-radius: 5px;
  margin: 15px auto;
  background-color: #1d1b1b;
`;

const MyListBox = styled.div`
  display: flex;
  margin-top: 6px;
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
            {idx + 1}. {list}
          </MyListBox>
        ))}
    </MyListPreViewStyle>
  );
};

export default MyListPreView;
