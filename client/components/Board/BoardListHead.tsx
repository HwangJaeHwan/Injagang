import React from "react";

interface BoardListHeadProps {
  headItem: string[];
}
const BoardListHead = ({ headItem }: BoardListHeadProps) => {
  return (
    <thead>
      <tr>
        {headItem.map((title, idx) => (
          <th key={idx}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};

export default BoardListHead;
