import { ScrollBar } from "@/styles/GlobalStyle";
import React, { useState, useEffect, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import { BiMessageAltAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import boardReducer, { InitiaState } from "./redux/QnA/reducer";
import { RootReducerType } from "./redux/store";

const EssayDragStyle = styled.div`
  ${ScrollBar}
  padding: 15px;
  background-color: #858080e8;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
  color: black;
  .essay_title {
    text-align: center;
  }
`;

const EssayDragItems = styled.div`
  margin: 20px;
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
interface EssayDragProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

/**드래그 첨삭 기능을 가진 자소서 View */
const EssayDragView = ({ onChange }: EssayDragProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const boardReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.board,
  );
  /**드래그 첨삭 탐색*/
  const handleSelect = (dragTitleNumber: number) => {
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
        newNode.style.backgroundColor = "#e446163d";
        try {
          range?.surroundContents(newNode);
        } catch (error) {
          btn.remove();
          setAdded(false);
          return;
        }
        onChange(`질문제목번호:${dragTitleNumber}번 ==> ${selectedText}`);
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
      onChange("");
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
        {boardReducer.boardList[0]?.essayTitle &&
          boardReducer.boardList[0].essayTitle}
      </h2>
      {boardReducer.boardList[0]?.qnaList &&
        boardReducer.boardList[0].qnaList.map((a, i) => (
          <EssayDragItems key={i}>
            <h3 className="essay_question">
              <span>질문: </span>
              {a.question}
            </h3>
            <p
              className="essay_answer"
              onMouseUp={() => handleSelect(i + 1)}
              onDoubleClick={handleRemove}
              onClick={handleSpan}
            >
              {a.answer}
            </p>
          </EssayDragItems>
        ))}
    </EssayDragStyle>
  );
};

export default EssayDragView;
