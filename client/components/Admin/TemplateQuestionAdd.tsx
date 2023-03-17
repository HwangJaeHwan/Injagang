import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BiPlus, BiRedo, BiCheck } from "react-icons/bi";
import { ColBox } from "@/styles/GlobalStyle";

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

interface QuestionListItem {
  title: string;
  qnaList: string[];
}

interface TemplateQuestionAddProps {
  setIsAddContent: React.Dispatch<React.SetStateAction<boolean>>;
  setTemplateList: React.Dispatch<React.SetStateAction<QuestionListItem[]>>;
  templateList: QuestionListItem[];
  isEdit: Boolean;
  curTemplateList?: string[];
  curTitle?: string;
}

const TemplateQuestionAdd = ({
  setIsAddContent,
  setTemplateList,
  templateList,
  isEdit,
  curTemplateList,
  curTitle,
}: TemplateQuestionAddProps) => {
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [templateQuestion, setTemplateQuestion] = useState<string[]>([]);
  const questionRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestionList = [...templateQuestion];
    newQuestionList[index] = value;
    setTemplateQuestion(newQuestionList);
  };

  const addQuestion = () => {
    if (templateQuestion.length >= 7) {
      return;
    }
    setTemplateQuestion([...templateQuestion, ""]);
  };

  const removeLastQuestion = () => {
    if (templateQuestion.length <= 1) {
      return;
    }
    setTemplateQuestion(prev => prev.slice(0, -1));
  };

  const handleQuestionList = () => {
    const newList = { title: templateTitle, qnaList: templateQuestion };

    //API 요청 부분으로 수정 해야함 (추가요청)
    setTemplateList([...templateList, newList]);
    setTemplateTitle("");
    setTemplateQuestion([]);
    setIsAddContent(false);
  };

  const handleChangeList = () => {
    //수정 요청
    console.log("수정을 요청함")
    console.log()
  }

  useEffect(() => {
    questionRef.current?.focus();
  }, [templateQuestion.length]);

  useEffect(() => {
    if (curTemplateList) {
      setTemplateQuestion(curTemplateList);
      curTitle && setTemplateTitle(curTitle);
    }
    titleRef.current?.focus();
  }, []);

  console.log(templateTitle)

  return (
    <TemplateAddStyled>
      <Input
        ref={titleRef}
        type="text"
        value={templateTitle}
        onChange={e => setTemplateTitle(e.target.value)}
        placeholder={"제목을 입력해주세요"}
      ></Input>
      {templateQuestion.map((question, index) => (
        <div key={index}>
          {index + 1}.
          <Input
            ref={questionRef}
            type="text"
            value={question}
            onChange={e => handleQuestionChange(index, e.target.value)}
            placeholder={"질문을 입력해주세요"}
          />
        </div>
      ))}
      <Controller>
        <BiPlus onClick={addQuestion}></BiPlus>
        <BiRedo onClick={removeLastQuestion}></BiRedo>
        <BiCheck onClick={isEdit?handleChangeList:handleQuestionList}></BiCheck>
      </Controller>
    </TemplateAddStyled>
  );
};

export default TemplateQuestionAdd;
