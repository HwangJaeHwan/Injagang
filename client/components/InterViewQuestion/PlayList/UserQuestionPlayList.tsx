import React, { useState, useEffect } from "react";
import QuestionAdder from "./QuestionAdder";
import { Card, ScrollBar } from "@/styles/GlobalStyle";
import styled from "styled-components";
import UserQuestionPlayListItems from "./UserQuestionPlayListItems";
import useEUserQuestionManager from "../hooks/useEUserQuestionManager";
import useModal from "@/hooks/useModal";
import useExpectedQuestionManager from "../hooks/useExpectedQuestionManager";
import useMyProfileManager from "@/components/MyProfile/hooks/useMyProfileManager";
import { ERROR_MESSAGES, MODAL_MESSAGES } from "@/constants";

const UserQuestionPlayList = () => {
  const { selectedType, selectedQuestions } = useEUserQuestionManager();
  const { dispatchAddQuestions, dispatchAddInterViewList } =
    useExpectedQuestionManager();
  const { role } = useMyProfileManager();
  const { setModal, Modal } = useModal();
  const [userQuestion, setUserQuestion] = useState<string[]>([]);

  //유저가 추가한 리스트를 입력
  useEffect(() => {
    if (selectedQuestions) {
      setUserQuestion(cur => [...cur, ...selectedQuestions]);
    }
  }, [selectedQuestions]);

  /**입력한 텍스트 리스트에 추가 */
  const handleAddText = (text: string) => {
    if (text === "") {
      setModal({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          content: ERROR_MESSAGES.FILL_BLANKS,
        },
      });
      return;
    }
    setUserQuestion(cur => [...cur, text]);
  };

  /**현재 리스트에서 삭제 */
  const handleRemoveText = (index: number) => {
    const filterItem = [...userQuestion];
    filterItem.splice(index, 1);
    setUserQuestion(filterItem);
  };

  /**ADMIN 인터뷰리스트 추가 */
  const handleSubmit = () => {
    if (selectedType === "ALL") {
      setModal({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          content: ERROR_MESSAGES.DOESN_T_TYPE,
        },
      });
      return;
    }
    const addList = {
      questions: userQuestion,
      questionType: selectedType,
    };
    dispatchAddQuestions(addList);
    setUserQuestion([]);
  };
  
  /**인터뷰촬영시 질문리스트 확정 */
  const handleSetInterViewQuestions = () => {
    if (userQuestion.length < 1) {
      setModal({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          content: ERROR_MESSAGES.EMPTY_LIST,
        },
      });
      return;
    }
    dispatchAddInterViewList(userQuestion);
    setModal({
      contents: {
        title: MODAL_MESSAGES.MSG,
        content: "리스트 설정이 완료되었습니다.",
      },
    });
  };

  return (
    <AddQuestionListViewStyle>
      <Card size={{ height: "450px", width: "100%", flex: "Col" }}>
        <Container>
          {userQuestion.map((question, idx) => (
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
            role === "ADMIN" ? handleSubmit : handleSetInterViewQuestions
          }
        />
      </Card>
      <Modal />
    </AddQuestionListViewStyle>
  );
};

export default React.memo(UserQuestionPlayList);

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
