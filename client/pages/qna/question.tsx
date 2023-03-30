import EssayDetailView from "@/components/EssayDetailView";
import MyList from "@/components/MyList";
import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState } from "react";
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
  background-color: #cabbbb;
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
  ${ScrollBar}
`;

const question = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  return (
    <WirteStyle>
      <Card size={{ width: "80%", height: "65vh", flex: "row" }}>
        <LeftContainer>
          <Input value={title} onChange={e => setTitle(e.target.value)}></Input>
          <TextArea
            value={content}
            onChange={e => setContent(e.target.value)}
          ></TextArea>
        </LeftContainer>
        <RigthContainer>
          <EssayDetailView essayId={2}/>
        </RigthContainer>
      </Card>
    </WirteStyle>
  );
};

export default question;
