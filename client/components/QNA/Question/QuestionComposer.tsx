import React, { useState } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { useDispatch } from "react-redux";

import CoverLetterDetail from "@/components/QNA/Question/CoverLetterDetail";
import useCoverLetterManager from "@/components/CoverLetter/hooks/useCoverLetterManager";
import ControlMenu from "@/components/UI/ControlMenu";
import {
  Card,
  ColBox,
  FlexBox,
  StyleButton,
  StyleInput as QuestionTitle,
  StyleTextArea,
} from "@/styles/GlobalStyle";

import { writeBoard } from "@/components/redux/QnA/actions";

const QuestionComposer = () => {
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [essayId, setEssayId] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { essayList } = useCoverLetterManager();

  const navigateToList = () => router.push("/qna/list");

  const changeCoverLetter = (title: string) => {
    setCoverLetterTitle(title);
    const findEssay = essayList.find(list => list.title === title);
    if (findEssay) setEssayId(findEssay?.essayId);
  };

  const handleSubmit = () => {
    const data = {
      title,
      content,
      essayId,
    };
    //TOME :: QNA MANAGER 생성시 대처
    dispatch(writeBoard(data));
    navigateToList();
  };

  return (
    <Card size={{ width: "80%", height: "80%", flex: "row" }}>
      <SwitchContainer>
        <LeftContainer>
          <QuestionTitle
            value={title}
            onChange={e => setTitle(e.target.value)}
          ></QuestionTitle>
          <ControlMenu
            Size={{ width: "100%", height: "40px" }}
            value={coverLetterTitle}
            onChange={e => changeCoverLetter(e)}
            optionList={essayList}
          ></ControlMenu>
          <StyleTextArea
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <StyleButton
            Size={{ width: "100%", font: "15px" }}
            onClick={handleSubmit}
          >
            작성완료
          </StyleButton>
        </LeftContainer>
        <RigthContainer>
          <CoverLetterDetail essayId={essayId} />
        </RigthContainer>
      </SwitchContainer>
    </Card>
  );
};

export default QuestionComposer;
const SwitchContainer = styled.div`
  ${FlexBox}
  width: 100%;
  height: 90%;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    ${ColBox}
  }
`;

const LeftContainer = styled.div`
  ${ColBox}
  width: 50%;
  height: 100%;
  input {
    padding: 8px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 50%;
  }
`;

const RigthContainer = styled.div`
  ${ColBox}
  height: 100%;
  width: 50%;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 50%;
  }
`;
