import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { BiX } from "react-icons/bi";

const Card = styled.div`
  ${ColBox}
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  margin: 25px auto;
  .essay_title {
    width: 88%;
    word-break: break-all;
  }
`;

const TitleTextArea = styled.textarea`
  font-family: "Nanum Pen Script";
  font-size: 15px;

  box-sizing: border-box;
  width: 90%;
  min-height: 30px;
  max-height: 200px;
  resize: vertical;

  border-radius: 5px;
  background-color: #444654;
  color: white;

  padding: 15px;
  ${ScrollBar};
`;

const AnswerTextArea = styled.textarea`
  resize: vertical;
  font-family: "Nanum Pen Script";
  font-weight: normal;
  width: 90%;
  line-height: 2;
  height: 300px;
  border-radius: 5px;
  margin: 8px auto;
  padding: 20px;
  color: white;
  background-color: #444654;
  ${ScrollBar}
`;

interface qnaListItem {
  question: string;
  answer: string;
}

interface qnaList extends Array<qnaListItem> {}

interface QnAListItemProps {
  content: string | { question: string; answer: string; quna?: number };
  index: number;
  onChange: (index: number, question: string, answer: string) => void;
  curInfo: (index: number, question: string, answer: string) => void;
}

const QnAListItem = ({
  content,
  index,
  onChange,
  curInfo,
}: QnAListItemProps) => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const originQuestion =
    typeof content === "string" ? content : content.question;
  const originAnswer = typeof content === "string" ? "" : content.answer;

  useEffect(() => {
    setQuestion(originQuestion);
    setAnswer(originAnswer);
    curInfo(index, originQuestion, originAnswer);
  }, []);

  /**질문 작성이 끝난후 QnAEiditor에 전달 */
  const handleJudge = () => {
    onChange(index, question, answer);
  };

  return (
    <Card>
      <TitleTextArea
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <AnswerTextArea
        value={answer}
        placeholder="자기소개서 답변을 입력해주세요.
        스크롤도 가능하고 아래로 사이즈 조절도 가능합니다."
        onChange={e => setAnswer(e.target.value)}
        onBlur={handleJudge}
      />
      <p>
        글자 수: {answer.length}/{500}
      </p>
    </Card>
  );
};

export default QnAListItem;
