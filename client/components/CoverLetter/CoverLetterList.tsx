import React, { useEffect } from "react";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import CoverLetterItems from "./CoverLetterItems";
import { RootReducerType } from "@/components/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEssayList } from "../redux/Essay/server/actions";
import Cookies from "js-cookie";

const CoverLetterList = () => {
  const dispatch = useDispatch();
  const { isUpdated, essayList } = useSelector(
    (state: RootReducerType) => state.essay,
  );

  useEffect(() => {
    dispatch(getEssayList(Number(Cookies.get("userId"))));
  }, []);

  return (
    <CoverLetterListContainer>
      {essayList && essayList.map((item, idx) => (
        <CoverLetterItems key={item.essyId} item={item}/>
      ))}
    </CoverLetterListContainer>
  );
};

export default CoverLetterList;

const CoverLetterListContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  background-color: #302e2e;
  border-radius: 5px;
  width: 90%;
  height: 350px;
  margin: 15px auto;
  overflow-x: hidden;
`;
