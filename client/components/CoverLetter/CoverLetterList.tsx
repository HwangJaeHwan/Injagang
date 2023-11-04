import React, { useEffect, Suspense } from "react";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { v } from "@/styles/variables";
import APIErrorBoundary from "../APIErrorBoundary";
import useCoverLetterManager from "./hooks/useCoverLetterManager";
import { useDispatch } from "react-redux";
import { getEssayList } from "../redux/Essay/server/actions";
import Cookies from "js-cookie";
import Spinner from "../Spinner";

const CoverLetterItems = React.lazy(() => import("./CoverLetterItems"));

const CoverLetterList = () => {
  const dispatch = useDispatch();
  const { essayList, selectedEssayList } = useCoverLetterManager();
  useEffect(() => {
    dispatch(getEssayList(Number(Cookies.get("userId"))));
  }, []);

  return (
    <CoverLetterListContainer>
      <APIErrorBoundary>
        <Suspense fallback={<Spinner />}>
          {essayList.map((item, idx) => (
            <CoverLetterItems
              key={item.essayId}
              item={item}
              selectedId={selectedEssayList.essayId}
            />
          ))}
        </Suspense>
      </APIErrorBoundary>
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
