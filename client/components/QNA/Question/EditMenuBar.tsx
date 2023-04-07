import Modal from "@/components/UI/Modal";
import { deleteBoard } from "@/components/redux/QnA/actions";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiDotsHorizontal, BiTrash, BiMessageAltEdit } from "react-icons/bi";
import { useDispatch } from "react-redux";
import styled from "styled-components";

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

type EditMenuBarProps = {
  boardID: number;
};
const EditMenuBar = ({ boardID }: EditMenuBarProps) => {
  const [tagPosition, setTagPosition] = useState(false);
  const [modalClose, setModalClose] = useState(Boolean);
  const [isOpenModal, setIsOpenModal] = useState(Boolean);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(boardID);
  const handleElementClick = () => {
    setTagPosition(!tagPosition);
  };
  const handleRemoveBoard = () => {
    setIsOpenModal(!isOpenModal);
    dispatch(deleteBoard(boardID));
    router.replace("/qna/list");
  };

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <MycomponetStyle>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={handleModal}
          onAction={handleRemoveBoard}
          contents={{ title: "경고", content: "정말 삭제하시겠습니까?" }}
        />
      )}
      <BiDotsHorizontal onClick={handleElementClick} />
      {tagPosition && (
        <ButtonContainer>
          <BiTrash onClick={handleModal} />
          <BiMessageAltEdit />
        </ButtonContainer>
      )}
    </MycomponetStyle>
  );
};

export default EditMenuBar;
