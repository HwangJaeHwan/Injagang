import React from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";

const AddQuestionItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
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

export default UserQuestionPlayListItems;
