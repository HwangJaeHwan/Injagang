import React, { useState, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import { BiMessageAltAdd } from "react-icons/bi";

const Drag = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [added, setAdded] = useState<boolean>(false);

  const handleSelect = () => {
    const selectedText = window.getSelection()?.toString()
    if(selectedText === ""){
      console.log("공백입니다.")
      return
    }
    if (selectedText && !added) {
      const range = window.getSelection()?.getRangeAt(0);
      console.log(range)
      const newNode = document.createElement("span");
      const btn = document.createElement("span");
      btn.className = "btnbtn";
      const icon = <BiMessageAltAdd style={{ fontSize: "20px",opacity: 0.5 }} />;
      ReactDOM.render(icon, btn);
      newNode.append(btn);
      range?.insertNode(newNode);
      setAdded(true);
      btn.onclick = event => {
        event.stopPropagation();
        newNode.style.backgroundColor = "yellow";
        try {
          range?.surroundContents(newNode);
        } catch (error) {
          btn.remove()
          setAdded(false)
          return
        }
        setSelection(cur => [...cur, selectedText]);
        setAdded(false);
      };
      // newNode.onclick = (event) => {
      //   event.stopPropagation();
      //   console.log(event.target)
      //   console.log(event)
      //   const text = newNode.innerText
      //   console.log(text); 
      //   newNode.parentNode?.replaceChild(document.createTextNode(text), newNode);

      //   setAdded(false);
      // };
    }
  };
  const handleSpan: MouseEventHandler<HTMLParagraphElement> = (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === "span") {
      console.log("이벤트 발생");
      console.log(selection);
      const parent = target.parentNode as HTMLElement;
      const targetText = document.createTextNode(target.innerText);
      parent.replaceChild(targetText, target);
      const filterSelection = selection.filter((a) => a !== targetText.textContent);
      setSelection(filterSelection);
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
    <div>
      <p onMouseUp={handleSelect} onDoubleClick={handleRemove} onClick={handleSpan}>
        어려서 부터 우리집은 가난했었고 남들 다하는 외식 몇 번 한 적이 없었고
        일터에 나가신 어머니 집에 없으면 언제나 혼자서 끓여 먹었던 라면 그러다
        라면이 너무 지겨워서 맛있는 것 좀 먹자고 대들었었어 그러자 어머님이 마지
        못해 꺼내신 숨겨두신 비상금으로 시켜주신 자장면 하나에 너무나 행복했었어
        하지만 어머니님은 자장면이 싫다고 하셨어 어머님은 자장면이 싫다고 하셨어
        ....
      </p>
      {selection.map((a, index) => (
        <h2 key={index}>{a}</h2>
      ))}
    </div>
  );
};

export default Drag;
