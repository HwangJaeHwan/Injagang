import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const BoardListItem = styled.tbody`
  text-align: center;
  td {
    border: 1px solid #0a0a0a;
    height: 35px;
  }
  &:hover{
    cursor: pointer;
  }
`;

type BoardListItemProps = {
  id: number;
  nickname: string;
  title: string;
};

const BoardListItme = ({ id, nickname, title }: BoardListItemProps) => {
    const router = useRouter();
  return (
    <BoardListItem>
      <tr onClick = {() => router.push(`/qna/answer/${id}`)}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{nickname}</td>
      </tr>
    </BoardListItem>
  );
};

export default BoardListItme;
