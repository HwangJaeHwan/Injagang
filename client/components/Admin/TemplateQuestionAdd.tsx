import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { BiPlus, BiRedo, BiCheck } from "react-icons/bi";
import { ColBox } from "@/styles/GlobalStyle";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import Cookies from "js-cookie";
import axios from "axios";

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
}

const TemplateQuestionAdd = ({
  setIsAddContent,
  setTemplateList,
  templateList,
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

  const handleQuestionList = async () => {
    const newList = { title: templateTitle, qnaList: templateQuestion };
    const token = Cookies.get("jwtToken");

    const headers = {
      Authorization: Cookies.get("jwtToken"),
    };

    const data = {
      title: templateTitle,
      questions: templateQuestion,
    };

    // axios
    //   .post("http://localhost:8080/template/add", data, { headers })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    try {
      const response = await fetcher(METHOD.POST, "/template/add", data, { headers });
      if (response) {
        console.log("성공")
      }
    } catch (error) {
      console.error(error);
    }

    //API 요청 부분으로 수정 해야함 (추가요청)
    setTemplateList([...templateList, newList]);
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
