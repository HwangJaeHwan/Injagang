import React, { useState, useEffect } from "react";
import CoverLetterQuestionItems from "./CoverLetterQuestionItems";
import useCoverLetterCreatorLogic from "../hooks/useCoverLetterCreatorLogic";
import ControlMenu from "@/components/UI/ControlMenu";
import useControlTemplate from "../hooks/useControlTemplate";

import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import { v4 as uuid4 } from "uuid";
import { v } from "@/styles/variables";
import CustomButton from "@/components/UI/CustomButton";
import { ColBox } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";

export const moveCoverLetterMainPage = "/coverLetter";

const CoverLetterCreator = () => {
  const router = useRouter();
  const {
    qnaList,
    setQnAList,
    deleteQnAList,
    changeQnAList,
    addQnAList,
    handleDispatch,
    setCoverLetterTitle,
    coverLetterTitle,
    Modal,
  } = useCoverLetterCreatorLogic();

  const {
    selectedTemplateTitle,
    changeSelectedTemplate,
    selectedTemplateList,
    templateTitles,
    getTemplateList,
  } = useControlTemplate();

  useEffect(() => {
    getTemplateList();
  }, []);

  useEffect(() => {
    const resetSelectedTemplateList = selectedTemplateList.questions.map(a => ({
      qnaId: uuid4(),
      question: a,
      answer: "",
    }));
    setQnAList(resetSelectedTemplateList);
  }, [selectedTemplateList]);

  return (
    <CoverLetterCreatorContainer>
      <Modal />
      <MainTitle>자소서 작성하기</MainTitle>
      <CoverLetterTitle
        value={coverLetterTitle}
        onChange={e => setCoverLetterTitle(e.target.value)}
        placeholder="자소서 제목"
      ></CoverLetterTitle>
      <ControlMenu
        Size={{ width: `${v.xlItemWidth}`, height: "40px" }}
        value={selectedTemplateTitle}
        optionList={templateTitles}
        onChange={changeSelectedTemplate}
      />
      {qnaList.map((qna, i) => (
        <CoverLetterQuestionItems
          key={qna.qnaId}
          item={qna}
          onDelete={deleteQnAList}
          onUpdate={changeQnAList}
        ></CoverLetterQuestionItems>
      ))}
      <BiPlusStyled onClick={addQnAList}></BiPlusStyled>
      <ControllerBtns>
        <CustomButton
          Size={{ width: "150px", font: "20px" }}
          onClick={() => router.push(moveCoverLetterMainPage)}
          text={"뒤로가기"}
        />
        <CustomButton
          Size={{ width: "150px", font: "20px" }}
          onClick={() => handleDispatch()}
          text={"작성완료"}
        />
      </ControllerBtns>
    </CoverLetterCreatorContainer>
  );
};

export default CoverLetterCreator;
const CoverLetterCreatorContainer = styled.div`
  ${ColBox}
  width: 100%;
`;

const MainTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 30px;
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

const ControllerBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${v.xlItemWidth};
`;

const BiPlusStyled = styled(BiPlus)`
  margin: 40px auto;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
