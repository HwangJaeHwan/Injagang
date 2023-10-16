import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ISelectedText } from "../hooks/useDragCorrection";
import { qnaList } from "@/components/redux/QnA/types";
import ColorPicker from "./ColorPicker";

interface AnswerDragItemProps {
  onSelect: (dragTitleId: number, targetId: number) => void;
  onRemove: () => void;
  selectedText: ISelectedText;
  list: qnaList;
  index: number;
}

const AnswerDragItem = ({
  list,
  onSelect,
  onRemove,
  selectedText,
  index,
}: AnswerDragItemProps) => {
  const [selectedColor, setSelectedColor] = useState("#e69a0def");
  const isSelected = selectedText.added && selectedText.targetId === list.qnaId;
  const { selectedText: preSelectedText } = selectedText;
  const { qnaId, question, answer } = list;
  const 시작점부터타겟까지문장 = list.answer.substring(0, selectedText.start);
  const 타겟부터끝나는지점문장 = list.answer.substring(
    selectedText.end,
    answer.length,
  );

  return (
    <EssayDragItems>
      <EssayQuestionContainer>
        <h4 className="essay_question">
          <span>질문:</span> {question}
        </h4>
      </EssayQuestionContainer>
      <EssayAnswerContainer>
        <p
          className="essay_answer"
          onMouseUp={() => onSelect(index+1, qnaId)}
        >
          답변:
          {isSelected ? (
            <>
              {시작점부터타겟까지문장}
              <span
                style={{ backgroundColor: selectedColor }}
                onClick={onRemove}
              >
                {preSelectedText}
              </span>
              {타겟부터끝나는지점문장}
            </>
          ) : (
            list.answer
          )}
        </p>
      </EssayAnswerContainer>
      <ColorPicker
        onSelectColor={color => {
          setSelectedColor(color);
        }}
      />
    </EssayDragItems>
  );
};

export default AnswerDragItem;

const EssayDragItems = styled.div`
  margin: 30px auto;
  font-family: "Noto Sans KR", sans-serif;
  .essay_question {
    margin-bottom: 15px;
    > span {
    }
  }
  .essay_answer {
    font-weight: normal;
    font-size: 15px;
    line-height: 1.7em;
  }
`;

const EssayQuestionContainer = styled.div`
  border-top: 1.5px solid #e4dddd;
  border-bottom: 1.5px solid #e4dddd;
  padding: 12px;
  margin: 15px auto;
  font-size: 14px;
  line-height: 1.45;
`;

const EssayAnswerContainer = styled.div`
  padding: 12px;
  line-height: 1.6;
`;
