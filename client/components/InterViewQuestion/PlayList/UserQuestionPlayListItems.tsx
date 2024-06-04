import React from "react";

import { BiTrash } from "react-icons/bi";

import styled from "styled-components";


const AddQuestionItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  line-height: 1.5;

  svg {
    cursor: pointer;
    font-size: 25px;
    margin-left: 30px;
  }
`;

type AddQuestionItemProps = {
  item: string;
  index: number;
  handleRemoveText: (index: number) => void;
};

const UserQuestionPlayListItems = ({
  item,
  index,
  handleRemoveText,
}: AddQuestionItemProps) => {
  return (
    <AddQuestionItemStyle>
      {item}
      <BiTrash onClick={() => handleRemoveText(index)} />
    </AddQuestionItemStyle>
  );
};

export default React.memo(UserQuestionPlayListItems);
