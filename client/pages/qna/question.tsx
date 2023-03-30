import { Card, ColBox, FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";

const WirteStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 80vw;
`;

const Container = styled.div`
  ${ColBox}
  margin: 30px auto;
  width: 80%;
`;

const Input = styled.input`
  padding: 8px;
  width: 90%;
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
  width: 90%;
  line-height: 1.5;
  height: 300px;
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
      <Card size={{ width: "80%", height: "65vh", flex: "col" }}>
        <Container>
          <Input value={title} onChange={e => setTitle(e.target.value)}></Input>
          <TextArea
            value={content}
            onChange={e => setContent(e.target.value)}
          ></TextArea>
        </Container>
      </Card>
    </WirteStyle>
  );
};

export default question;
