import React from "react";
import styled from "styled-components";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/router";
import { CurList } from "./types";

const MyListItemsStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 8px 0;
  gap: 10px;
  font-size: 20px;
  cursor: pointer;
  svg {
    font-size: 30px;
  }
`;
type MyListItemsTitleProps = {
  isActive: boolean;
};

const MyListItemsTitle = styled.div<MyListItemsTitleProps>`
  width: 90%;
  background-color: ${({ isActive }) => (isActive ? "#f18a15f0" : "")};
  border-radius: 8px;
`;

interface MyListItemsProps {
  idx: number;
  list: any;
  getMyListView: (idx: number, id: number) => void;
  curList: CurList;
}

const MyListItems = ({
  idx,
  list,
  getMyListView,
  curList,
}: MyListItemsProps) => {
  const router = useRouter();

  return (
    <MyListItemsStyle>
      <MyListItemsTitle
        isActive={curList?.index === idx ? true : false}
        onClick={() => getMyListView(idx, list.essayId)}
      >
        {list.title}
      </MyListItemsTitle>
      {curList.index === idx && (
        <BiEdit
          onClick={() =>
            router.push({
              pathname: "/edit",
              query: { essayId: JSON.stringify(curList.essayId) },
            })
          }
        />
      )}
    </MyListItemsStyle>
  );
};

export default MyListItems;
