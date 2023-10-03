import React, { useEffect, Suspense } from "react";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { RootReducerType } from "@/components/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEssayList } from "../redux/Essay/server/actions";
import Cookies from "js-cookie";
import { v } from "@/styles/variables";

const CoverLetterList = () => {
  const dispatch = useDispatch();
  const { error, isUpdated, essayList } = useSelector(
    (state: RootReducerType) => state.essay,
  );
  const { selectedEssayList } = useSelector(
    (state: RootReducerType) => state.userEssayList,
  );

  useEffect(() => {
    dispatch(getEssayList(Number(Cookies.get("userId"))));
  }, []);

  const CoverLetterItems = React.lazy(() => import("./CoverLetterItems"));

  return (
    <CoverLetterListContainer>
      <Suspense
        fallback={<SuspenseStyle>사용자 정보 로딩중....</SuspenseStyle>}
      >
        {essayList.map((item, idx) => (
          <CoverLetterItems
            key={item.essayId}
            item={item}
            selectedId={selectedEssayList.essayId}
          />
        ))}
      </Suspense>
    </CoverLetterListContainer>
  );
};

export default CoverLetterList;

const CoverLetterListContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  background-color: #302e2e;
  border-radius: 5px;
  width: 100%;
  height: 350px;
  margin: 15px auto;
  overflow-x: hidden;
  box-shadow: ${v.boxShadow2};
`;

const SuspenseStyle = styled.p`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.8rem;
`;
