import React from "react";
interface ControlMenuProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    optionList: { title: string; content: string[] }[];
  }

const ControlMenu = ({ value, onChange, optionList }: ControlMenuProps) => {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {optionList.map((option, index) => (
        <option key={index} value={option.title}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default ControlMenu;
