import QuestionItem from "@/components/Edit/QuestionItem";
import ControlMenu from "@/components/UI/ControlMenu";
import { ColBox } from "@/styles/GlobalStyle";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const EditStyle = styled.div`
  ${ColBox}
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
`;

export const questionList = [
  {
    title: "카카오 자소서",
    content: ["1.자신의장점", "2.자신의장단점", "3.프로젝트경험담"],
  },
  {
    title: "네이버 자소서",
    content: ["1.자신의장점", "2.자신의장단점", "3.프로젝트경험담"],
  },
  {
    title: "당근 자소서",
    content: ["1.자신의장점", "2.자신의장단점", "3.프로젝트경험담"],
  },
];

interface questionList {
  title: string;
  content: string[];
}

const edit = () => {
  const [questionLists, setQuestionLists] =
    useState<questionList[]>(questionList);
  const [questionTitle, setQuestionTitle] = useState<string>("");

  const getQuestionItem = () => {
    const filteItem = questionLists.filter(list => list.title === questionTitle);
    return filteItem;
  };

  useEffect(() => {
    setQuestionLists((cur: questionList[]) => [
      ...cur,
      { title: "테스트용", content: ["테스트"] },
    ]);
  }, []);

  const handleAddQuestion = () => {
    if(questionTitle === "") {
      return
    }
    setQuestionLists((prevLists) => {
      const newLists = [...prevLists];
      const filterIndex = newLists.findIndex(a =>  a.title === questionTitle)
      const newContent = [...newLists[filterIndex].content, "새로운 항목"];
      newLists[filterIndex].content = newContent;
      return newLists;
    });
  };

  return (
    <EditStyle>
      <ControlMenu
        value={questionTitle}
        optionList={questionLists}
        onChange={setQuestionTitle}
      />
      {questionLists &&
        getQuestionItem().map((list, index) => (
          <div className={"container"} key={index}>
            <h2>{list.title}</h2>
            {list.content.map((content, idx) => (
              <QuestionItem key={idx} content={content}></QuestionItem>
            ))}
          </div>
        ))}
      <button onClick={handleAddQuestion}> 추가 버튼</button>
      {/* 템플릿 불러오기 select */}
      {/* 자소서 질문 추가 버튼 
                자소서 질문 제목
            */}
      {/* 자소서 질문에 대한 내용예시 */}
      {/* 작성완료 버튼  */}
    </EditStyle>
  );
};

export default edit;
