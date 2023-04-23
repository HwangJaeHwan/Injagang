import { ScrollBar } from "@/styles/GlobalStyle";
import React, { useState, useEffect, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import { BiMessageAltAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootReducerType } from "../../redux/store";
import { CorrectionItem } from "./AnswerWirte";

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
  padding: 12px ;
  line-height: 1.6;
`;

interface EssayDragProps {
  onChange: React.Dispatch<React.SetStateAction<CorrectionItem>>;
}

/**드래그 첨삭 기능을 가진 자소서 View */
const EssayDragView = ({ onChange }: EssayDragProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const boardList = useSelector(
    (state: RootReducerType) => state.board.boardList,
  );
  /**드래그 첨삭 탐색*/
  const handleSelect = (dragTitleNumber: number, qnaId: number) => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText === "") {
      return;
    }
    if (selectedText && !added && !document.querySelector(".select_span")) {
      const range = window.getSelection()?.getRangeAt(0);
      const newNode = document.createElement("span");
      const btn = document.createElement("span");
      newNode.className = "select_span";
      btn.className = "btnbtn";
      const icon = (
        <BiMessageAltAdd style={{ fontSize: "20px", opacity: 0.5 }} />
      );
      if (!document.querySelector(".btnbtn")) {
        ReactDOM.render(icon, btn);
        newNode.append(btn);
      }
      range?.insertNode(newNode);
      setAdded(true);
      btn.onclick = event => {
        event.stopPropagation();
        newNode.style.backgroundColor = "#e69a0def";
        try {
          range?.surroundContents(newNode);
        } catch (error) {
          btn.remove();
          setAdded(false);
          return;
        }
        onChange({
          targetQuestion: dragTitleNumber,
          targetAnswer: selectedText,
          targetQuestionIndex: qnaId,
        });
        setAdded(false);
      };
    }
  };

  /**드래그 첨삭 삭제 */
  const handleSpan: MouseEventHandler<HTMLParagraphElement> = event => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === "span") {
      const parent = target.parentNode as HTMLElement;
      const targetText = document.createTextNode(target.innerText);
      parent.replaceChild(targetText, target);
      onChange({ targetAnswer: "", targetQuestion: 0, targetQuestionIndex: 0 });
      setAdded(false);
    }
  };

  /**드래그 첨삭 버튼삭제 */
  const handleRemove = () => {
    if (added) {
      const btn = document.querySelector(".btnbtn");
      const newNode = document.querySelector(".spspsp");
      btn?.remove();
      newNode?.remove();
      setAdded(false);
    }
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
                onDoubleClick={handleRemove}
                onClick={handleSpan}
              >
                답변: {list.answer}
              </p>
            </EssayAnswerContainer>
          </EssayDragItems>
        ))}
    </EssayDragStyle>
  );
};

export default EssayDragView;
