import React from "react";

import { BiTrash } from "react-icons/bi";

import styled from "styled-components";


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

export default React.memo(UserQuestionPlayListItems);
