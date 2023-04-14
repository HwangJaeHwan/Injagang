import React, { useState } from "react";
import AddTextInput from "./AddTextInput";
import { Card, ScrollBar } from "@/styles/GlobalStyle";
import styled from "styled-components";
import AddQuestionItem from "./AddQuestionItem";
import { RxContainer } from "react-icons/rx";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import {
  QuestionType,
  getInterViewQnaList,
  handleAddQuestion,
} from "../redux/InterViewQuestion/action";

const AddQuestionListViewStyle = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  ${ScrollBar}
`;

type AddQuestionListViewProps = {
  qType: QuestionType | string;
};

const AddQuestionListView = ({ qType }: AddQuestionListViewProps) => {
  const [addText, setAddText] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleAddText = (text: string) => {
    if (text === "") {
      setIsOpenModal(true);
      return;
    }
    setAddText(cur => [...cur, text]);
    console.log(qType)
  };

  const handleRemoveText = (index: number) => {
    const filterItem = [...addText];
    filterItem.splice(index, 1);
    setAddText(filterItem);
  };

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmit = () => {
    const addList = {
      questions: addText,
      questionType: qType,
    };
    dispatch(handleAddQuestion(addList));
    setAddText([]);
  };
  return (
    <AddQuestionListViewStyle>
      <Card size={{ height: "450px", width: "300px", flex: "Col" }}>
        <Container>
          {addText.map((question, idx) => (
            <AddQuestionItem
              key={idx}
              item={question}
              index={idx}
              handleRemoveText={handleRemoveText}
            ></AddQuestionItem>
          ))}
        </Container>
        <AddTextInput
          handleAddQuestion={handleAddText}
          handleCancelQuestion={handleSubmit}
        />
      </Card>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={handleModal}
          contents={{ title: "경고", content: "값을 입력해주세요." }}
        ></Modal>
      )}
    </AddQuestionListViewStyle>
  );
};

export default AddQuestionListView;
