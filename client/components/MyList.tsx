import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPlus, BiEdit } from "react-icons/bi";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import MyListPreView from "./MyListPreView";

interface QnaList {
  question: string;
  answer: string;
  quna: number;
}

interface EssayList {
  essayId: number;
  title: string;
  qnaList: QnaList[];
}

interface CurList {
  index: number;
  title: string;
}

const assayListData: EssayList[] =  Array(10)
.fill(0)
.map((_, i) => ({
  essayId: i + 1,
  title: `자기소개서 양식${i}`,
  qnaList: Array(5)
    .fill(0)
    .map((_, j) => ({
      question: `test${j + 1}`,
      answer: `answer${j + 1}`,
      quna: j + 1,
    })),
}));;
const MyListStyle = styled.div`
  width: 70%;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .footer-Icon svg {
    font-size: 50px;
    margin-bottom: 30px;
  }
`;

const ListHeader = styled.div`
  text-align: center;
  width: 50%;
  font-size: 23px;
  font-weight: bold;
  background-color: #302e2e;
  border-radius: 5px;
`;

const ListContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  background-color: #302e2e;
  border-radius: 5px;
  width: 50%;
  margin: 15px auto;
  overflow-x: hidden;
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

const MyList = () => {
  const [assayList, setAssayList] = useState<EssayList[]>([]);
  const [myListTitle, setMyListTitle] = useState<string[]>([]);
  const [curList, setCurList] = useState<CurList>({ index: -1, title: "" });
  const [preViewList, setPreViewList] = useState<string[]>([]);

  useEffect(() => {
    assayListData.length > 1 && setAssayList(assayListData);
    getMyListTitle();
  }, []);

  const getMyListTitle = () => {
    assayList.length > 1 && setMyListTitle(assayList.map(a => a.title));
  };

  const getMyListView = (idx, list) => {
    setCurList({ index: idx, title: list });
    const filterList = assayList.filter(a => a.title === curList.title);
    setPreViewList(
      cur => filterList.map(a => a.qnaList.map(a => a.question))[0],
    );
  };

  return (
    <MyListStyle>
      {curList.title !== "" ? (
        <MyListPreView preViewData={preViewList} />
      ) : (
        <></>
      )}
      <ListHeader>나의 자소서 목록</ListHeader>
      <ListContainer>
        {myListTitle.length > 1 &&
          myListTitle.map((list, idx) => (
            <div key={idx} className="list-items">
              <div
                className={curList?.index === idx ? "active-item" : ""}
                onClick={() => getMyListView(idx, list)}
              >
                {list}
              </div>
              {curList.index === idx && (
                <BiEdit onClick={() => console.log("수정모드")} />
              )}
            </div>
          ))}
      </ListContainer>
      <div className="footer-Icon">
        <BiPlus />
      </div>
    </MyListStyle>
  );
};

export default MyList;
