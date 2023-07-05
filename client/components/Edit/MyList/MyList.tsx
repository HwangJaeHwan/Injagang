import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPlus } from "react-icons/bi";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import MyListPreView from "./MyListPreView";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { getEssayList } from "../../redux/Essay/actions";
import Cookies from "js-cookie";
import MyListItems from "./MyListItems";
import { CurList } from "./types";
import { v } from "@/styles/variables";

const MyListStyle = styled.div`
  width: ${v.lgWidth};
  height: 600px;
  ${ColBox}
  .footer_icon svg {
    font-size: 50px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    width: ${v.smWidth};
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
  height: 350px;
  margin: 15px auto;
  overflow-x: hidden;
`;

const MyList = () => {
  const [curList, setCurList] = useState<CurList>({ index: -1, essayId: -1 });
  const [preViewList, setPreViewList] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const essayReducer = useSelector(
    (state: RootReducerType) => state.essay.essayList,
  );
  const essayIsUpdated = useSelector(
    (state: RootReducerType) => state.essay.isUpdated,
  );

  // useEffect(() => {
  //   dispatch(getEssayList(1))
  // }, []);  기존에는 최초 로딩시 리스트를 가져왔는데 그렇게 최신화를 반영하기 위한 의존성 배열이 dispatch인 useEffect이 동작하여 두번의 리스트 요청이 이루어졌다. firstCall을 생성하여 최초에 firstCall State가 변경되는 상황으로 두번의리스트요청 문제를 해결

  //EssayList의 최신화가 이루어질때마다 바로 반영하기위한
  useEffect(() => {
      dispatch(getEssayList(Number(Cookies.get("userId"))));
  }, [essayIsUpdated]);


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
            key={list.essayId}
            idx={list.essayId}
            list={list}
            curList={curList}
            getMyListView={getMyListView}
          />
        ))}
      </ListContainer>
      <div className="footer_icon">
        <BiPlus onClick={() => router.push("/edit")} />
      </div>
    </MyListStyle>
  );
};

export default MyList;
