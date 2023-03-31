import { ScrollBar } from "@/styles/GlobalStyle";
import React, { useState, useEffect, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import { BiMessageAltAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import boardReducer, { InitiaState } from "./redux/QnA/reducer";
import { RootReducerType } from "./redux/store";

const AnswerDragStyle = styled.div`
  ${ScrollBar}
  padding: 15px;
  background-color: #858080e8;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
`;
const EssayContainer = styled.div``;
const EssayContent = styled.div`
  margin: 15px;
  aside {
    margin: 15px;
  }
`;
interface AnswerProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const AnswerDragView = ({ onChange }: AnswerProps) => {
  const [selection, setSelection] = useState<string[]>([]);
  const [added, setAdded] = useState<boolean>(false);
  const boardReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.board,
  );

  const handleSelect = (dragTitle: string) => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText === "") {
      console.log("공백입니다.");
      return;
    }
    if (selectedText && !added) {
      const range = window.getSelection()?.getRangeAt(0);
      console.log(range);
      const newNode = document.createElement("span");
      const btn = document.createElement("span");
      btn.className = "btnbtn";
      const icon = (
        <BiMessageAltAdd style={{ fontSize: "20px", opacity: 0.5 }} />
      );
      ReactDOM.render(icon, btn);
      newNode.append(btn);
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
        onChange(`질문제목:${dragTitle} ==> ${selectedText}`);
        setAdded(false);
      };
    }
  };
  const handleSpan: MouseEventHandler<HTMLParagraphElement> = event => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === "span") {
      console.log("이벤트 발생");
      console.log(selection);
      const parent = target.parentNode as HTMLElement;
      const targetText = document.createTextNode(target.innerText);
      parent.replaceChild(targetText, target);
      onChange("");
      setAdded(false);
    }
  };

  const handleRemove = () => {
    if (added) {
      const btn = document.querySelector(".btnbtn");
      btn?.remove();
      setAdded(false);
    }
  };
  return (
    <AnswerDragStyle>
      <h2>
        {boardReducer.boardList[0]?.essayTitle &&
          boardReducer.boardList[0].essayTitle}
      </h2>
      {boardReducer.boardList[0]?.qnaList &&
        boardReducer.boardList[0].qnaList.map((a, i) => (
          <div key={i}>
            <h2>{a.question}</h2>
            <p
              onMouseUp={()=>handleSelect(a.question)}
              onDoubleClick={handleRemove}
              onClick={handleSpan}
            >
              {a.answer}
            </p>
          </div>
        ))}
    </AnswerDragStyle>
  );
};

export default AnswerDragView;
