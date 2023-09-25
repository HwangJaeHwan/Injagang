import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import { IReadQnaList } from "@/types/essay/EssayType";
import CoverLetterQuestionItems from "./CoverLetterQuestionItems";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { addEssay } from "@/components/redux/Essay/server/actions";
import { v } from "@/styles/variables";
import useCoverLetterCreatorLogic from "../hooks/useCoverLetterCreatorLogic";

const CoverLetterCreator = () => {
  const [mainTitle, setMainTitle] = useState<string>("");
  const { qnaList, deleteQnAList, changeQnAList, addQnAList, handleDispatch } =
    useCoverLetterCreatorLogic();
  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자소서 작성하기</MainTitle>
      <CoverLetterTitle
        value={mainTitle}
        onChange={e => setMainTitle(e.target.value)}
      ></CoverLetterTitle>
      {qnaList.map((qna, i) => (
        <CoverLetterQuestionItems
          key={qna.qnaId}
          item={qna}
          onDelete={deleteQnAList}
          onUpdate={changeQnAList}
        ></CoverLetterQuestionItems>
      ))}
      <BiPlus onClick={addQnAList}></BiPlus>
      <button onClick={() => handleDispatch(mainTitle)}>클릭</button>
    </CoverLetterCreatorContainer>
  );
};

export default CoverLetterCreator;
const CoverLetterCreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MainTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  text-decoration-line: underline;
`;

const CoverLetterTitle = styled.input`
  width: ${v.xlItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
`;
