import React, { useState } from "react";
import styled from "styled-components";
import { BiPlus, BiEdit } from "react-icons/bi";
import { useRouter } from "next/router";

interface CurList {
  index: number;
  essayId: number;
}

const MyListItemsStyle = styled.div`
  .list-items {
    display: flex;
    align-items: center;
    margin: 4px auto;
    font-size: 20px;
    cursor: pointer;
  }
  svg {
    font-size: 30px;
  }
  input {
    font-size: 21px;
    border-radius: 5px;
  }
  .active-item {
    background-color: #f39214f2;
  }
`;

interface MyListItemsProps {
  idx: number;
  list: any;
  getMyListView: any;
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
    <div className="list-items">
      <div
        className={curList?.index === idx ? "active-item" : ""}
        onClick={() => getMyListView(idx, list.essayId)}
      >
        {list.title}
      </div>
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
    </div>
  );
};

export default React.memo(MyListItems);
