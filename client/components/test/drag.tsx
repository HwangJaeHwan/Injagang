import React, { useState } from "react";

const Drag = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [added, setAdded] = useState<boolean>(false);

  const handleSelect = () => {
    const selectedText = window.getSelection()?.toString() || " ";
    if (selectedText && !added) {
      const range = window.getSelection()?.getRangeAt(0);
      console.log(range);
      const newNode = document.createElement("span");
      const btn = document.createElement("button");
      btn.textContent = "+";
      btn.style.width = "50px";
      btn.style.height = "50px";
      btn.style.zIndex = "100"
      newNode.append(btn)
      btn.onclick = () => {
        newNode.style.backgroundColor = "yellow";
        range?.surroundContents(newNode);
        setSelection(cur => [...cur, selectedText]);
        setAdded(false);
        console.log("추가")
      };
      range?.insertNode(newNode);
      setAdded(true);
    }
  };

  return (
    <div>
      <p onMouseUp={handleSelect}>
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