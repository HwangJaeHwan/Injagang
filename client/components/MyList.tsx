import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import MyListPreView from "./MyListPreView";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { getEssayList } from "./redux/Essay/actions";
import Cookies from "js-cookie";
import MyListItems from "./MyListItems";

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

  const router = useRouter();
  const dispatch = useDispatch();
  const essayReducer = useSelector(
    (state: RootReducerType) => state.essay.essayList,
  );

  // useEffect(() => {
  //   dispatch(getEssayList(1))
  // }, []);  기존에는 최초 로딩시 리스트를 가져왔는데 그렇게 최신화를 반영하기 위한 의존성 배열이 dispatch인 useEffect이 동작하여 두번의 리스트 요청이 이루어졌다. firstCall을 생성하여 최초에 firstCall State가 변경되는 상황으로 두번의리스트요청 문제를 해결

  //EssayList의 최신화가 이루어질때마다 바로 반영하기위한
  useEffect(() => {
    setTimeout(() => {
      dispatch(getEssayList(Number(Cookies.get("userId"))));
    }, 100);
  }, [dispatch]);

  useEffect(() => {
    const filterList = essayReducer.filter(
      list => list.essayId === curList.essayId,
    );
    setPreViewList(cur => filterList.map(a => a.questions.map(a => a))[0]);
  }, [curList.essayId]);

  /** 현재의 선택된 리스트에 정보를 획득하고 useEffect을 동작 */
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
        {essayReducer.map((list, idx) => (
          <MyListItems
            idx={list.essayId}
            list={list}
            curList={curList}
            getMyListView={getMyListView}
          />
        ))}
      </ListContainer>
      <div className="footer-Icon">
        <BiPlus onClick={() => router.push("/edit")} />
      </div>
    </MyListStyle>
  );
};

export default React.memo(MyList);
