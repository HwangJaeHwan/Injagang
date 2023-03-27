import QuestionItem from "@/components/Edit/QuestionItem";
import ControlMenu from "@/components/UI/ControlMenu";
import { ColBox } from "@/styles/GlobalStyle";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Modal from "@/components/UI/Modal";
import AddQustionList from "@/components/Edit/AddQustionList";
import CustomButton from "@/components/UI/CustomButton";
import { BiPlus } from "react-icons/bi";
import { useRouter } from "next/router";


import { useSelector, useDispatch } from "react-redux";
import {
  getTemplate,
} from "@/components/redux/Template/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Template/reducer";

const EditStyle = styled.div`
  ${ColBox}
  width: 100%;
  .content-container {
    ${ColBox}
    width: 100%;
    margin: 15px auto;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    text-decoration-line: underline;
  }

  select {
    width: 50%;
    height: 40px;
  }

  .button_container {
    ${ColBox}
    margin: 13px auto;
    width: 50%;
    .flex-end {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    svg {
      font-size: 50px;
      cursor: pointer;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 20px auto;
  padding: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */
`;

const TitleInput = styled.input`
  width: 50%;
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
`;


interface questionList {
  templateId: number;
  title: string;
  qnaList: string[];
}

interface qnaListItem {
  title: string;
  qnaList: string;
}

interface qnaList extends Array<qnaListItem> {}

interface Qna {
  question: string;
  answer: string;
  quna: number;
}

const Edit = () => {
  const dispatch = useDispatch();
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );
  const [questionLists, setQuestionLists] =
    useState<questionList[]>([]);
  const [questionTitle, setQuestionTitle] = useState<string>("커스텀 자소서");
  const [questionListTitle, setQuestionListTitle] = useState<string>("");
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [questionContent, setQuestionContent] = useState<qnaList>([]);
  const router = useRouter();


  const getQuestionItem = useCallback(() => {
    const filteItem = questionLists.filter(
      list => list.title === questionTitle,
    );
    console.log({ filteItem });
    return filteItem;
  }, [questionTitle]);

  useEffect(() => {
    if (router.query.editData) {
      const editData = JSON.parse(
        router.query.editData as string,
      ) as questionList[];
      setIsEdit(true);
      setQuestionLists(editData);
      setQuestionTitle(editData[0].title);
      return;
    }
    dispatch(getTemplate())
    /*서버통신을 이용해 템플릿을 불러온다.*/
  }, []);

  useEffect(() => {
    if(!templateReducer.loading){
      setQuestionLists(templateReducer.templateList)
    }
  },[templateReducer.loading])

  const handleAddQuestion = () => {
    if (questionTitle === "") {
      return;
    }
    setQuestionLists(prevLists => {
      const newLists = [...prevLists];
      const filterIndex = newLists.findIndex(a => a.title === questionTitle);
      const newContent = [...newLists[filterIndex].qnaList, addTitle];
      newLists[filterIndex].qnaList = newContent;
      return newLists;
    });
    setIsAddContent(false);
    setAddTitle("");
  };

  const handleSubmit = () => {
    console.log({ title: questionListTitle, qnaList: [{ questionContent }] });
    console.log({ questionContent });
  };

  const handleCancelQuestion = () => {
    setIsAddContent(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleTextChange = (index: number, value: string, title: string) => {
    const filterTitle = questionContent.filter(a => a.title === title)[0];
    console.log({ filterTitle });
    if (filterTitle) {
      const newList = [...questionContent];
      newList[index].qnaList = value;
      setQuestionContent(newList);
    } else {
      setQuestionContent(cur => [...cur, { title, qnaList: " " }]);
    }
  };
  console.log({ questionContent });

  return (
    <EditStyle>
      <h2>{isEdit ? "자소서 수정하기" : "자소서 작성하기"}</h2>
      <Container>
        <TitleInput
          value={questionListTitle}
          onChange={e => setQuestionListTitle(e.target.value)}
          placeholder="자소서의 제목을 입력해주세요."
        ></TitleInput>
        <ControlMenu          
          value={questionTitle}
          optionList={questionLists}
          onChange={setQuestionTitle}
        />
        {questionLists &&
          getQuestionItem().map((list, index) => (
            <div className="content-container" key={index}>
              {list.qnaList.map((list, idx) => (
                <QuestionItem
                  key={idx}
                  content={list}
                  onChange={handleTextChange}
                  questionContent={setQuestionContent}
                  questionTitle={questionTitle}
                  index={idx}
                ></QuestionItem>
              ))}
            </div>
          ))}
        {isAddContent ? (
          <AddQustionList
            title={addTitle}
            handleAddQuestion={handleAddQuestion}
            handleCancelQuestion={handleCancelQuestion}
            onChange={setAddTitle}
          />
        ) : (
          <></>
        )}
        <div className="button_container">
          <BiPlus onClick={() => setIsAddContent(true)}></BiPlus>
          <div className="flex-end">
            <CustomButton
              onClick={handleSubmit}
              text={isEdit ? "수정완료" : "작성완료"}
            />
          </div>
        </div>
      </Container>
      {/* 템플릿 불러오기 select */}
      {/* 자소서 질문 추가 버튼 
                자소서 질문 제목
            */}
      {/* 자소서 질문에 대한 내용예시 */}
      {/* 작성완료 버튼  */}
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={closeModal}
          contents={{ title: "fds", qnaList: "sdfs" }}
        />
      )}
    </EditStyle>
  );
};

export default Edit;
