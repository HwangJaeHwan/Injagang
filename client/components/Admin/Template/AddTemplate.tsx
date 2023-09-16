import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { BiPlus, BiRedo, BiCheck } from "react-icons/bi";
import { ColBox } from "@/styles/GlobalStyle";
import useAddTemplateLogic from "../hooks/useAddTemplateLogic";

const AddTemplate = () => {
  const {
    templateList,
    setTemplateList,
    handleQuestionChange,
    addQuestion,
    removeLastQuestion,
    confirmTemplateCreation,
  } = useAddTemplateLogic();
  const questionRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    questionRef.current?.focus();
  }, [templateList.templateQuestion.length]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <TemplateAddStyled>
      <Input
        ref={titleRef}
        type="text"
        value={templateList.templateTitle}
        onChange={e =>
          setTemplateList(prev => ({ ...prev, templateTitle: e.target.value }))
        }
        placeholder="제목을 입력해주세요"
      />
      {templateList.templateQuestion.map((question, index) => (
        <div key={`question-${index}`}>
          {index + 1}.
          <Input
            ref={questionRef}
            type="text"
            value={question}
            onChange={e => handleQuestionChange(index, e.target.value)}
            placeholder="질문을 입력해주세요"
          />
        </div>
      ))}
      <Controller>
        <BiPlus onClick={addQuestion} />
        <BiRedo onClick={removeLastQuestion} />
        <BiCheck onClick={confirmTemplateCreation} />
      </Controller>
    </TemplateAddStyled>
  );
};

export default AddTemplate;

const Controller = styled.div`
  svg {
    font-size: 40px;
    cursor: pointer;
  }
`;

const TemplateAddStyled = styled.div`
  ${ColBox}
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Input = styled.input`
  width: 70%;
`;
