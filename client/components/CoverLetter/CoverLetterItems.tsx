import React from "react";
import { IGetEssayList } from "@/types/essay/EssayType";
import { BiEdit } from "react-icons/bi";
import styled from "styled-components";
import { FlexBox } from "@/styles/GlobalStyle";
import useCoverLetterManager from "./hooks/useCoverLetterManager";

interface CoverLetterItemsProps {
  item: IGetEssayList;
  selectedId: number;
}

const CoverLetterItems = ({ item, selectedId }: CoverLetterItemsProps) => {
  const { moveEditPage, changeSeleted } = useCoverLetterManager();
  const isSelectedItem = selectedId === item.essayId ? true : false;

  return (
    <CoverLetterItemsContainer isActive={isSelectedItem}>
      <p onClick={() => changeSeleted(item)}>{item.title}</p>
      <BiEdit onClick={() => moveEditPage(item.essayId)} />
    </CoverLetterItemsContainer>
  );
};

export default CoverLetterItems;

const CoverLetterItemsContainer = styled.div<{ isActive: boolean }>`
  ${FlexBox}
  gap: 13px;
  margin-bottom: 12px;
  font-size: ${({ isActive }) => (isActive ? "30px" : "20px")};
  background-color: ${({ isActive }) => (isActive ? "#e78f29" : "")};
  transition: all ease-in 0.2s;
  width: 100%;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.2")};
  border-radius: 8px;
  cursor: pointer;
`;
