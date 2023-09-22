import EssayDetailView from "@/components/QNA/Question/EssayDetailView";
import QuestionTitle from "@/components/UI/ListTitle";
import ControlMenu from "@/components/UI/ControlMenu";
import CustomButton from "@/components/UI/CustomButton";
import { InitiaState } from "@/components/redux/Essay/server/reducer";
import { writeBoard } from "@/components/redux/QnA/actions";
import { RootReducerType } from "@/components/redux/store";
import { Card, ColBox, FlexBox } from "@/styles/GlobalStyle";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TextArea from "@/components/UI/TextArea";

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

const QuestionWirte = () => {
  const [essayTitle, setEssayTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [essayId, setEssayId] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const essayReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.essay,
  );

  useEffect(() => {
    if (essayTitle !== "") {
      const findEssayId = essayReducer.essayList.filter(
        list => list.title === essayTitle,
      )[0].essayId;
      setEssayId(findEssayId);
    }
  }, [essayTitle]);

  const handleSubmit = () => {
    const data = {
      title,
      content,
      essayId,
    };
    dispatch(writeBoard(data));
    router.push("/qna/list");
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
            onChange={setEssayTitle}
            optionList={essayReducer.essayList}
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
