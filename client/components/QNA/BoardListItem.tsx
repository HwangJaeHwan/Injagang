import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const BoardListItemStyle = styled.tbody`
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

const BoardListItem = ({ id, nickname, title }: BoardListItemProps) => {
    const router = useRouter();
  return (
    <BoardListItemStyle>
      <tr onClick = {() => router.push(`/qna/answer/${id}`)}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{nickname}</td>
      </tr>
    </BoardListItemStyle>
  );
};

export default BoardListItem;
