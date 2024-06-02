import React from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { v4 as uuid4 } from "uuid";

interface BoardListItemProps<T> {
  item: T;
  idKey: keyof T;
  displayKeys: (keyof T)[];
  route?: string;
}

const BoardListItem = <T,>({
  item,
  idKey,
  displayKeys,
  route,
}: BoardListItemProps<T>) => {
  const router = useRouter();

  const navigateToDetail = () => {
    if (route) router.push(`${route}/${item[idKey]}`);
  };

  return (
    <BoardListItemRow onClick={navigateToDetail}>
      {displayKeys?.map(key => (
        <td key={uuid4()}>{String(item[key])}</td>
      ))}
    </BoardListItemRow>
  );
};

export default BoardListItem;

const BoardListItemRow = styled.tr`
  text-align: center;
  td {
    padding-block: 12px;
    border: 1px solid #0a0a0a;
    height: 35px;
  }
  &:hover {
    cursor: pointer;
  }
`;
