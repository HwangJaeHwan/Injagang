import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";

import { CorrectionItem } from "./AnswerWirte";
import { ScrollBar } from "@/styles/GlobalStyle";
import useDragCorrection from "../hooks/useDragCorrection";

const EssayDragStyle = styled.div`
  ${ScrollBar}
  background-color: #191919;
  color: #dad6d1;
  padding: 15px;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
  .essay_title {
    text-align: center;
  }
`;

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

interface EssayDragProps {
  onChange: React.Dispatch<React.SetStateAction<CorrectionItem>>;
}

/**드래그 첨삭 기능을 가진 자소서 View */
const EssayDragView = ({ onChange }: EssayDragProps) => {
  const { handleCorrection, selectedText, removeCorrection, Modal } =
    useDragCorrection();

  const [selectedQnA, setSelectedQnA] = useState({
    dragTitleNumber: 0,
  });
  const { boardList } = useSelector((state: RootReducerType) => state.board);

  useEffect(() => {
    handleApply();
  }, [selectedText]);

  /**드래그 첨삭 탐색*/
  const handleSelect = (dragTitleNumber: number, targetID: number) => {
    setSelectedQnA({
      dragTitleNumber,
    });
    handleCorrection(targetID);
  };

  /**드래그 첨삭 적용 */
  const handleApply = () => {
    const { dragTitleNumber } = selectedQnA;
    onChange({
      targetQuestion: dragTitleNumber,
      targetAnswer: selectedText.selectedText,
      targetQuestionIndex: selectedText.targetId,
    });
  };

  /**현재 드래그 첨삭 삭제 */
  const handleRemove = () => {
    removeCorrection();
  };

  return (
    <EssayDragStyle>
      <h2 className="essay_title">{boardList?.essayTitle}</h2>
      {boardList?.qnaList &&
        boardList.qnaList.map((list, idx) => (
          <EssayDragItems key={list.qnaId}>
            <EssayQuestionContainer>
              <h4 className="essay_question">
                <span>질문:</span> {list.question}
              </h4>
            </EssayQuestionContainer>
            <EssayAnswerContainer>
              <p
                className="essay_answer"
                onMouseUp={() => handleSelect(idx + 1, list.qnaId)}
              >
                답변:
                {selectedText.added && selectedText.targetId === list.qnaId ? (
                  <>
                    {list.answer.substring(0, selectedText.start)}
                    <span
                      style={{ backgroundColor: "#e69a0def" }}
                      onClick={handleRemove}
                    >
                      {selectedText.selectedText}
                    </span>
                    {list.answer.substring(
                      selectedText.end,
                      list.answer.length,
                    )}
                  </>
                ) : (
                  list.answer
                )}
              </p>
            </EssayAnswerContainer>
          </EssayDragItems>
        ))}
      <Modal />
    </EssayDragStyle>
  );
};

export default EssayDragView;
