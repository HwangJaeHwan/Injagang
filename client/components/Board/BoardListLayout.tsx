import React, { useEffect } from "react";
import styled from "styled-components";
import BoardList from "./BoardList";

const headItem = ["번호", "제목", "닉네임"];
const BoardListHead = () => {
  return (
    <thead>
      <tr>
        {headItem.map((title, idx) => (
          <th key={idx}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};

const BoardListLayout = () => {
  return (
    <BoardListViewStyle>
      <BoardListHead />
      <BoardList />
    </BoardListViewStyle>
  );
};

export default BoardListLayout;

const BoardListViewStyle = styled.table`
  border: 1px solid #0a0a0a;
  margin: 30px auto;
  width: 80%;
  thead th {
    font-weight: bold;
    font-size: 18px;
    border: none;
    background-color: #ffa600e4;
  }
  thead th:first-child {
    width: 10%;
  }
`;
