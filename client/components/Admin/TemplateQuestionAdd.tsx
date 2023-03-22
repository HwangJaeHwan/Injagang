import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BiPlus, BiRedo, BiCheck } from "react-icons/bi";
import { ColBox } from "@/styles/GlobalStyle";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import {
  addTemplate,
  removeTemplate,
} from "@/components/redux/Template/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Template/reducer";

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
  templateId: number;
  title: string;
  qnaList: string[];
}

interface TemplateQuestionAddProps {
  setIsAddContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateQuestionAdd = ({
  setIsAddContent,
}: TemplateQuestionAddProps) => {
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [templateQuestion, setTemplateQuestion] = useState<string[]>([]);
  const questionRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );

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

  const handleQuestionList = async () => {
    const data = {
      title: templateTitle,
      questions: templateQuestion,
    };
    dispatch(addTemplate(data));

    //API 요청 부분으로 수정 해야함 (추가요청)
    setTemplateTitle("");
    setTemplateQuestion([]);
    setIsAddContent(false);
  };

  useEffect(() => {
    questionRef.current?.focus();
  }, [templateQuestion.length]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

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
        <BiCheck onClick={handleQuestionList}></BiCheck>
      </Controller>
    </TemplateAddStyled>
  );
};

export default TemplateQuestionAdd;
