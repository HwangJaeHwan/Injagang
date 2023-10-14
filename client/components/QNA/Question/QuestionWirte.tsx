import React, { useState, useEffect } from "react";
import EssayDetailView from "@/components/QNA/Question/EssayDetailView";
import QuestionTitle from "@/components/UI/ListTitle";
import ControlMenu from "@/components/UI/ControlMenu";
import CustomButton from "@/components/UI/CustomButton";
import { writeBoard } from "@/components/redux/QnA/actions";
import { Card, ColBox, FlexBox } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TextArea from "@/components/UI/TextArea";
import useCoverLetterManager from "@/components/CoverLetter/hooks/useCoverLetterManager";

const QuestionWirte = () => {
  const [essayTitle, setEssayTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [essayId, setEssayId] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { essayList } = useCoverLetterManager();

  const navigateToList = () => router.push("/qna/list");

  const handleChangeTitle = (title: string) => {
    setEssayTitle(title);
    const findEssay = essayList.find(list => list.title === title);
    if (findEssay) setEssayId(findEssay?.essayId);
  };

  const handleSubmit = () => {
    const data = {
      title,
      content,
      essayId,
    };
    dispatch(writeBoard(data));
    navigateToList();
  };

  const handleChangeMainTtitle = (title: string) => {
    setTitle(title);
  };

  const handleChangeText = (text: string) => {
    setContent(text);
  };

  return (
    <Card size={{ width: "80%", height: "80%", flex: "row" }}>
      <SwitchContainer>
        <LeftContainer>
          <QuestionTitle onChange={handleChangeMainTtitle}></QuestionTitle>
          <ControlMenu
            Size={{ width: "100%", height: "40px" }}
            value={essayTitle}
            onChange={e => handleChangeTitle(e)}
            optionList={essayList}
          ></ControlMenu>
          <TextArea handleChangeText={handleChangeText} />
          <CustomButton
            Size={{ width: "100%", font: "15px" }}
            text="작성완료"
            onClick={handleSubmit}
          ></CustomButton>
        </LeftContainer>
        <RigthContainer>
          <EssayDetailView essayId={essayId} />
        </RigthContainer>
      </SwitchContainer>
    </Card>
  );
};

export default QuestionWirte;
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
