import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BiPlus, BiRedo, BiCheck } from "react-icons/bi";
import { ColBox } from "@/styles/GlobalStyle";
import { useDispatch } from "react-redux";
import { addTemplate } from "@/components/redux/Template/server/actions";
import useUserTemplateManager from "../hooks/useUserTemplateManager";

interface IAddTemplateList {
  templateTitle: string;
  templateQuestion: string[];
}

const AddTemplate = () => {
  const [templateList, setTemplateList] = useState<IAddTemplateList>({
    templateTitle: " ",
    templateQuestion: [],
  });
  const { isAddTemplate, setIsAddTemplate } = useUserTemplateManager();
  const questionRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const MAX_QUESTIONS = 7;
  const MIN_QUESTIONS = 1;
  const templateMinLength =
    templateList.templateQuestion.length <= MIN_QUESTIONS;
  const templateMaxLength =
    templateList.templateQuestion.length >= MAX_QUESTIONS;

  const handleQuestionChange = (index: number, value: string) => {
    setTemplateList(prev => ({
      ...prev,
      templateQuestion: prev.templateQuestion.map((q, i) =>
        i === index ? value : q,
      ),
    }));
  };

  const addQuestion = () => {
    if (templateMaxLength) return;
    setTemplateList(prev => ({
      ...prev,
      templateQuestion: [...prev.templateQuestion, ""],
    }));
  };

  const removeLastQuestion = () => {
    setTemplateList(prev => ({
      ...prev,
      templateQuestion: prev.templateQuestion.slice(0, -1),
    }));
  };

  const resetTemplateList = () => {
    if (templateMinLength) return;
    setTemplateList({ templateTitle: "", templateQuestion: [] });
  };

  const confirmTemplateCreation = () => {
    const { templateTitle, templateQuestion } = templateList;
    dispatch(
      addTemplate({ title: templateTitle, questions: templateQuestion }),
    );
    resetTemplateList();
    setIsAddTemplate(false);
  };

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
        <div key={index}>
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