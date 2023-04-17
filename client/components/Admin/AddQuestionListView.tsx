import React, { useState, useEffect } from "react";
import AddTextInput from "./AddTextInput";
import { Card, ScrollBar } from "@/styles/GlobalStyle";
import styled from "styled-components";
import AddQuestionItem from "./AddQuestionItem";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import {
  QuestionType,
  handleAddQuestion,
} from "../redux/InterViewQuestion/action";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import { addInterViewList } from "../redux/InterViewList/action";

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
  addList?: string[];
};

const AddQuestionListView = ({ qType, addList }: AddQuestionListViewProps) => {
  const [addText, setAddText] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const authRole = useSelector((state: RootReducerType) => state.auth.role);
  const dispatch = useDispatch();

  //유저가 추가한 리스트를 입력
  useEffect(() => {
    if (addList) {
      setAddText(cur => [...cur, ...addList]);
    }
  }, [addList]);

  /**입력한 텍스트 리스트에 추가 */
  const handleAddText = (text: string) => {
    if (text === "") {
      setIsOpenModal(true);
      return;
    }
    setAddText(cur => [...cur, text]);
    console.log(qType);
  };

  /**현재 리스트에서 삭제 */
  const handleRemoveText = (index: number) => {
    const filterItem = [...addText];
    filterItem.splice(index, 1);
    setAddText(filterItem);
  };

  /**룰 위반시 경고 */
  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  /**ADMIN 인터뷰리스트 추가 */
  const handleSubmit = () => {
    if (qType === "ALL") {
      alert("타입을 선택해주세요");
      return;
    }
    const addList = {
      questions: addText,
      questionType: qType,
    };
    dispatch(handleAddQuestion(addList));
    setAddText([]);
  };
  /**인터뷰촬영시 질문리스트 확정 */
  const handleSetInterViewQuestions = () => {
    dispatch(addInterViewList(addText))
  };
  return (
    <AddQuestionListViewStyle>
      <Card size={{ height: "450px", width: "500px", flex: "Col" }}>
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
          handleCancelQuestion={
            authRole === "ADMIN" ? handleSubmit : handleSetInterViewQuestions
          }
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

export default React.memo(AddQuestionListView);
