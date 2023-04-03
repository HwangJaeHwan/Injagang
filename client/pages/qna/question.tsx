import EssayDetailView from "@/components/EssayDetailView";
import MyList from "@/components/MyList";
import { getEssayList } from "@/components/redux/Essay/actions";
import essayReducer, { InitiaState } from "@/components/redux/Essay/reducer";
import { writeBoard } from "@/components/redux/QnA/actions";
import { RootReducerType } from "@/components/redux/store";
import ControlMenu from "@/components/UI/ControlMenu";
import CustomButton from "@/components/UI/CustomButton";
import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import Cookies from "js-cookie";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const WirteStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 80vw;
`;

const LeftContainer = styled.div`
  ${ColBox}
  margin: 30px auto;
  width: 45%;
  height: 100%;
`;

const RigthContainer = styled.div`
  ${ColBox}
  margin: 30px auto;
  height: 100%;
  width: 45%;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  ${FlexBox}
  ${ScrollBar}
  resize: vertical;
  box-sizing: border-box;
  color: #22272e;
  background-color: #ffffff;
  font-weight: bold;
  width: 100%;
  line-height: 1.5;
  height: 400px;
  padding: 10px 15px;
  border-radius: 5px;
  overflow-y: auto;
  margin: 15px auto;
`;

const question = () => {
  const [essayTitle, setEssayTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [essayId, setEssayId] = useState<number>(0);
  const dispatch = useDispatch();
  const essayReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.essay,
  );

  useEffect(() => {
    dispatch(getEssayList(Number(Cookies.get("userId"))));
  }, []);

  useEffect(() => {
    const findEssayId = essayReducer.essayList.filter(
      (list, idx) => list.title === essayTitle,
    )[0].essayId;
    setEssayId(findEssayId);
  }, [essayTitle]);

  const handlTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  },[content])

  const handleSubmit = () => {
    const data = {
      title,
      content,
      essayId,
    };
    dispatch(writeBoard(data));
  };

  return (
    <WirteStyle>
      <Card size={{ width: "80%", height: "65vh", flex: "row" }}>
        <LeftContainer>
          <Input value={title} onChange={e => setTitle(e.target.value)}></Input>
          <ControlMenu
            Size={{ width: "100%", height: "40px" }}
            value={essayTitle}
            onChange={setEssayTitle}
            optionList={essayReducer.essayList}
          ></ControlMenu>
          <TextArea
            value={content}
            onChange={e => handlTextChange(e)}
          ></TextArea>
          <CustomButton
            Size={{ width: "100%", font: "15px" }}
            text="작성완료"
            onClick={handleSubmit}
          ></CustomButton>
        </LeftContainer>
        <RigthContainer>
          <EssayDetailView essayId={essayId} />
        </RigthContainer>
      </Card>
    </WirteStyle>
  );
};

export default question;
