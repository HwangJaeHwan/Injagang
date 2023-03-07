import React, { useState } from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import { questionList } from "@/pages/edit";
import CustomButton from "../UI/CustomButton";

const Card = styled.div`
  ${ColBox};
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 85%;
  height: 400px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;
`;

const Template = () => {
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [templateQuestion, setTemplateQuestion] = useState<string[]>([]);

  const addQuestion = () => {
    if(templateQuestion.length >= 7){
        return
    }
    setTemplateQuestion([...templateQuestion, ""]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestionList = [...templateQuestion];
    newQuestionList[index] = value;
    setTemplateQuestion(newQuestionList);
  };

  const handleQuestionList = () => {
    console.log({ title: templateTitle, content: templateQuestion });
  };

  const removeLastQuestion = () => {
    if (templateQuestion.length <= 1) {
      return;
    }
    setTemplateQuestion(prev => prev.slice(0, -1));
  };

  return (
    <>
      <Card>
        {questionList.map((list, index) => (
          <div key={index}>{list.title}</div>
        ))}
      </Card>
      <h2>제목</h2>
      <input
        type="text"
        value={templateTitle}
        onChange={e => setTemplateTitle(e.target.value)}
      ></input>
      <div>
        <CustomButton text="추가" onClick={addQuestion} />
        <CustomButton text="취소" onClick={removeLastQuestion} />
      </div>
      {templateQuestion.map((question, index) => (
        <div key={index}>
            {index + 1}.
          <input
            type="text"
            value={question}
            onChange={e => handleQuestionChange(index, e.target.value)}
          />
        </div>
      ))}
      <CustomButton text="작성완료" onClick={handleQuestionList} />
    </>
  );
};

export default Template;
