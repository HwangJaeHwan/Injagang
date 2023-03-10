import { ColBox } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";

const MyListPreViewStyle = styled.div`
  ${ColBox}
  width: 90%;
  height: 150px;
  border-radius: 5px;
  padding: 10px 0px;
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
