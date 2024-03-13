import React, { useState } from "react";

import { useRouter } from "next/router";

import styled from "styled-components";

import { BiDotsHorizontal, BiTrash, BiMessageAltEdit } from "react-icons/bi";

import useQnaManager from "../../hooks/useQnaManager";
import useModal from "@/hooks/useModal";

type EditMenuBarProps = {
  boardID: number;
};
const EditMenuBar = ({ boardID }: EditMenuBarProps) => {
  const [tagPosition, setTagPosition] = useState(false);
  const { Modal, setModal } = useModal();
  const { dispatchRemoveBoard } = useQnaManager();
  const router = useRouter();

  const navigateToList = () => {
    router.replace("/qna/list");
  };

  const handleElementClick = () => {
    setTagPosition(!tagPosition);
  };

  const handleRemoveBoard = () => {
    dispatchRemoveBoard(boardID);
    navigateToList();
  };

  const userConfirm = () => {
    setModal({
      onAction: handleRemoveBoard,
      contents: { title: "경고", content: "정말 삭제하시겠습니까?" },
    });
  };

  return (
    <MycomponetStyle>
      <BiDotsHorizontal onClick={handleElementClick} />
      {tagPosition && (
        <ButtonContainer>
          <BiTrash onClick={userConfirm} />
          <BiMessageAltEdit />
        </ButtonContainer>
      )}
      <Modal />
    </MycomponetStyle>
  );
};

export default EditMenuBar;

const MycomponetStyle = styled.div`
  position: relative;
  right: 5px;
  svg {
    font-size: 25px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }
  width: 15px;
  .p-tag {
    height: 30px;
  }
`;
const ButtonContainer = styled.div``;
