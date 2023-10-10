import React, { useState, useEffect } from "react";
import QuestionAdder from "./QuestionAdder";
import { Card, ScrollBar } from "@/styles/GlobalStyle";
import styled from "styled-components";
import UserQuestionPlayListItems from "./UserQuestionPlayListItems";
import Modal from "../../UI/Modal";
import { useDispatch } from "react-redux";
import { handleAddQuestion } from "../../redux/InterViewQuestion/action";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";
import { addInterViewList } from "../../redux/InterViewList/action";

const AddQuestionListViewStyle = styled.div`
  width: 45%;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  ${ScrollBar}
`;

type AddQuestionListViewProps = {
  qType: string;
  addList?: string[];
};

const UserQuestionPlayList = ({ qType, addList }: AddQuestionListViewProps) => {
  const [addText, setAddText] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState({ title: "", content: "" });
  const authRole = useSelector((state: RootReducerType) => state.profile.role);
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
      setModalMsg({ title: "경고", content: "값을 입력해주세요" });
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
    if (addText.length < 1) {
      setIsOpenModal(true);
      setModalMsg({ title: "경고", content: "현재는 리스트가 비어있습니다." });
      return;
    }
    dispatch(addInterViewList(addText));
    setIsOpenModal(true);
    setModalMsg({ title: "MSG", content: "리스트 설정이 완료되었습니다." });
  };
  return (
    <AddQuestionListViewStyle>
      <Card size={{ height: "450px", width: "100%", flex: "Col" }}>
        <Container>
          {addText.map((question, idx) => (
            <UserQuestionPlayListItems
              key={idx}
              item={question}
              index={idx}
              handleRemoveText={handleRemoveText}
            ></UserQuestionPlayListItems>
          ))}
        </Container>
        <QuestionAdder
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
          contents={modalMsg}
        ></Modal>
      )}
    </AddQuestionListViewStyle>
  );
};

export default React.memo(UserQuestionPlayList);
