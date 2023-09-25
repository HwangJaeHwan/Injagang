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

const CoverLetterCreator = () => {
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>("");
  const {
    qnaList,
    setQnAList,
    deleteQnAList,
    changeQnAList,
    addQnAList,
    handleDispatch,
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
      <MainTitle>자소서 작성하기</MainTitle>
      <CoverLetterTitle
        value={coverLetterTitle}
        onChange={e => setCoverLetterTitle(e.target.value)}
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
      <BiPlus onClick={addQnAList}></BiPlus>
      <ControllerBtns>
        <CustomButton
          Size={{ width: "150px", font: "20px" }}
          onClick={() => handleDispatch(coverLetterTitle)}
          text={"작성완료"}
        />
      </ControllerBtns>
    </CoverLetterCreatorContainer>
  );
};

export default CoverLetterCreator;
const CoverLetterCreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
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

`;
