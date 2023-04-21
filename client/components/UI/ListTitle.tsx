import React, { useState } from "react";
import styled from "styled-components";
import { v } from "@/styles/variables";
const TitleInput = styled.input`
  width: ${v.lgItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
  @media screen and (max-width: 900px) {
      width: ${v.smItemWidth};
  }
`;

type QnAListTitleProps = {
  onChange: (title: string) => void;
};

const ListTitle = ({ onChange }: QnAListTitleProps) => {
  const [title, setTitle] = useState<string>("");
  return (
    <TitleInput
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={() => onChange(title)}
      placeholder="제목을 입력해주세요"
    ></TitleInput>
  );
};

export default ListTitle;
