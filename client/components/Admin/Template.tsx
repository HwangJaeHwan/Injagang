import React, { useState, useRef, useEffect } from "react";
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

interface QuestionListItem {
  title: string;
  content: string[];
}


const Template = () => {
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [templateQuestion, setTemplateQuestion] = useState<string[]>([]);
  const [templateList, setTemplateList] = useState<QuestionListItem[]>(questionList);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  },[templateQuestion.length])

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
    const newList = {title:templateTitle,content:templateQuestion}
    setTemplateList([...templateList, newList])
    setTemplateTitle("");
    setTemplateQuestion([])

  };

  const removeLastQuestion = () => {
    if (templateQuestion.length <= 1) {
      return;
    }
    setTemplateQuestion(prev => prev.slice(0, -1));
  };
  const handleList = (content:{}) => {
    console.log(content)
  }

  return (
    <>
      <Card>
        {templateList.map((list, index) => (
          <div key={index}><div onClick={() => handleList(list.content)}>{list.title}</div></div>
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
          ref={inputRef}
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
