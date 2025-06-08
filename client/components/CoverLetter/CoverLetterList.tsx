import React, { useEffect } from "react";

import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { v } from "@/styles/variables";

import { useDispatch } from "react-redux";
import { getEssayList } from "../redux/Essay/server/actions";

import useCoverLetterManager from "./hooks/useCoverLetterManager";


const CoverLetterItems = React.lazy(() => import("./CoverLetterItems"));

const CoverLetterList = () => {
  const dispatch = useDispatch();
  const { essayList, selectedEssayList } = useCoverLetterManager();
  useEffect(() => {
    dispatch(getEssayList());
  }, []);

  return (
    <CoverLetterListContainer>
      {essayList.map(item => (
        <CoverLetterItems
          key={item.essayId}
          item={item}
          selectedId={selectedEssayList.essayId}
        />
      ))}
    </CoverLetterListContainer>
  );
};

export default CoverLetterList;

export const CoverLetterListContainer = styled.div`
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
