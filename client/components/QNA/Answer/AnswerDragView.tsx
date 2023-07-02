import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";

import { CorrectionItem } from "./AnswerWirte";
import { ScrollBar } from "@/styles/GlobalStyle";
import useModal from "@/hooks/useModal";

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
  const [selectedData, setSelectedData] = useState({
    dragTitleNumber: 0,
    qnaId: 0,
    selectedText: "",
    start: 0,
    end: 0,
    added: false,
  });
  const boardList = useSelector(
    (state: RootReducerType) => state.board.boardList
  );
  
  const {setModal, Modal} = useModal()
  useEffect(() => {
    handleApply()
  },[selectedData])

  /**드래그 첨삭 탐색*/
  const handleSelect = (dragTitleNumber: number, qnaId: number) => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText !== "" && selectedData.added) {
      setModal({
        contents: {
          title: "Message",
          content: "이미 선택한 문장이 존재합니다."
        }
      })
      return
    }

    if (selectedText && selectedText !== "") {
      const range = window.getSelection()?.getRangeAt(0);
      const start = range?.startOffset || 0;
      const end = range?.endOffset || 0;

      setSelectedData({
        dragTitleNumber,
        qnaId,
        selectedText,
        start,
        end,
        added: true,
      });
    }
  };

  /**드래그 첨삭 적용 */
  const handleApply = () => {
    const { dragTitleNumber, selectedText, qnaId } = selectedData;
    onChange({
      targetQuestion: dragTitleNumber,
      targetAnswer: selectedText,
      targetQuestionIndex: qnaId,
    });
  };

  /**현재 드래그 첨삭 삭제 */
  const handleRemove = () => {
    setSelectedData({
      dragTitleNumber: 0,
      qnaId: 0,
      selectedText: "",
      start: 0,
      end: 0,
      added: false,
    });
  };

  return (
    <EssayDragStyle>
      <h2 className="essay_title">
        {boardList[0]?.essayTitle && boardList[0].essayTitle}
      </h2>
      {boardList[0]?.qnaList &&
        boardList[0].qnaList.map((list, idx) => (
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
                {selectedData.added && selectedData.qnaId === list.qnaId ? (
                  <>
                    {list.answer.substring(0, selectedData.start)}
                    <span
                      style={{ backgroundColor: "#e69a0def" }}
                      onClick={handleRemove}
                    >
                      {selectedData.selectedText}
                    </span>
                    {list.answer.substring(
                      selectedData.end,
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
        <Modal/>
    </EssayDragStyle>
  );
};

export default EssayDragView;
