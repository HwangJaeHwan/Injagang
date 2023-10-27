import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { BiPlus, BiRedo, BiCheck, BiX } from "react-icons/bi";
import {
  ColBox,
  ScrollBar,
  StyleTextArea,
  StyledInput,
} from "@/styles/GlobalStyle";
import useAddTemplateLogic from "../hooks/useAddTemplateLogic";

interface AddTemplateProps {
  onClose: (isClose: boolean) => void;
}

const AddTemplate = ({ onClose }: AddTemplateProps) => {
  const {
    templateList,
    setTemplateList,
    handleQuestionChange,
    addQuestion,
    removeLastQuestion,
    confirmTemplateCreation,
  } = useAddTemplateLogic();
  const questionRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    questionRef.current?.focus();
  }, [templateList.templateQuestion.length]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const ControllerData = [
    { icon: <BiPlus onClick={addQuestion} />, text: "질문추가" },
    { icon: <BiRedo onClick={removeLastQuestion} />, text: "되돌리기" },
    { icon: <BiCheck onClick={confirmTemplateCreation} />, text: "확정하기" },
  ];

  const ControllerBtns = React.memo(() => (
    <Controller>
      {ControllerData.map((info, idx) => (
        <IconButton key={idx}>
          {info.icon}
          <IconLabel>{info.text}</IconLabel>
        </IconButton>
      ))}
    </Controller>
  ));

  return (
    <TemplateAddStyled>
      <TopMenu>
        <BiX onClick={() => onClose(false)} />
      </TopMenu>
      <StyledInput
        ref={titleRef}
        type="text"
        value={templateList.templateTitle}
        onChange={e =>
          setTemplateList(prev => ({ ...prev, templateTitle: e.target.value }))
        }
        placeholder="제목을 입력해주세요"
      />
      <QuestionContainer>
        {templateList.templateQuestion.map((question, index) => (
          <QuestionItem key={`question-${index}`}>
            {index + 1}. 질문:
            <StyleTextArea
              ref={questionRef}
              value={question}
              onChange={e => handleQuestionChange(index, e.target.value)}
              placeholder="질문을 입력해주세요"
            />
          </QuestionItem>
        ))}
      </QuestionContainer>
      <ControllerBtns />
    </TemplateAddStyled>
  );
};

export default AddTemplate;

const TemplateAddStyled = styled.div`
  ${ColBox}
  height: 100%;
  width: 100%;
  position: relative;
`;

const TopMenu = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const QuestionContainer = styled.div`
  ${ScrollBar}
  overflow-y: auto;
  justify-content: center;
  width: 100%;
  margin: 40px auto;
`;

const QuestionItem = styled.div`
  width: 80%;
  margin: 20px;
`;



const Controller = styled.div`
  display: flex;
  svg {
    font-size: 40px;
    cursor: pointer;
  }
`;

const IconButton = styled.div`
  position: relative;
  margin: auto 15px;
  cursor: pointer;

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

const IconLabel = styled.span`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
`;