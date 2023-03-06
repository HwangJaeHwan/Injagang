import QuestionItem from "@/components/Edit/QuestionItem";
import ControlMenu from "@/components/UI/ControlMenu";
import { ColBox } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";

const EditStyle = styled.div`
  ${ColBox}
`;

const questionList = [
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

const edit = () => {
  const [questionTitle, setQuestionTitle] = useState("템플릿");

  const getQuestionItem = () => {
    const filteItem = questionList.filter(list => list.title === questionTitle);
    console.log(filteItem);
    return filteItem;
  };
  return (
    <EditStyle>
      <ControlMenu
        value={questionTitle}
        optionList={questionList}
        onChange={setQuestionTitle}
      />
      {questionList &&
        getQuestionItem().map((list, index) => (
          <>
            <h2>{list.title}</h2>
            {list.content.map((content,i) => <QuestionItem key={index} content={content}></QuestionItem> )}
          </>
        ))}
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
