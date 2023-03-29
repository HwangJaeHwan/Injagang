import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPlus, BiEdit } from "react-icons/bi";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import MyListPreView from "./MyListPreView";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Essay/reducer";
import { addEssay, getEssayList } from "./redux/Essay/actions";
import fetcher, { METHOD } from "./test/fecher";
import Cookies from "js-cookie";

interface QnaList {
  question: string;
  answer: string;
}

interface EssayList {
  essayId: number;
  title: string;
  qnaList: QnaList[];
}

interface CurList {
  index: number;
  essayId: number;
}


const MyListStyle = styled.div`
  width: 45rem;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .footer-Icon svg {
    font-size: 50px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .footer-Icon svg:hover {
    color: ${({ theme }) => theme.colors.button};
  }
`;

const ListHeader = styled.div`
  text-align: center;
  width: 90%;
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
  width: 90%;
  height: 250px;
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
  const [curList, setCurList] = useState<CurList>({ index: -1, essayId: -1 });
  const [preViewList, setPreViewList] = useState<string[]>([]);
  const [editList, setEditList] = useState<EssayList[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const essayReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.essay,
  );

  useEffect(() => {
    dispatch(getEssayList(1))
  }, []);

  useEffect(()=> {
    setTimeout(() => {
      dispatch(getEssayList(1))
    },100)
  },[dispatch])

  useEffect(() => {
    const filterList = essayReducer.essayList.filter(
      list => list.essayId === curList.essayId,
    );
    setPreViewList(
      cur => filterList.map(a => a.questions.map(a => a))[0],
    );
  },[curList])

  const getMyListView = (index: number, essayId: number) => {
    setCurList({ index, essayId });
  };

  return (
    <MyListStyle>
      {curList.essayId !== -1 ? (
        <MyListPreView preViewData={preViewList} />
      ) : (
        <></>
      )}
      <ListHeader>나의 자소서 목록</ListHeader>
      <ListContainer>
        {essayReducer.essayList.map((list, idx) => (
          <div key={idx} className="list-items">
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
                    query: {essayId: JSON.stringify(curList.essayId) },
                  })
                }
              />
            )}
          </div>
        ))}
      </ListContainer>
      <div className="footer-Icon">
        <BiPlus onClick={() => router.push("/edit")} />
      </div>
    </MyListStyle>
  );
};

export default MyList;
