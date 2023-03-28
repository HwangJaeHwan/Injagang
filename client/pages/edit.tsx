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
import { addEssay, readEssayList, updateEssay } from "@/components/redux/Essay/actions";
import essayReducer from "@/components/redux/Essay/reducer";

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
      justify-content: space-between;
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

type qna = {
  question: string;
  answer: string;
};

interface questionList {
  templateId?: number;
  title: string;
  qnaList: Array<string|qna>;
}

interface qnaListItem {
  question: string;
  answer: string;
}

interface qnaList extends Array<qnaListItem> {}

const Edit = () => {
  const dispatch = useDispatch();
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );

  const essayReducer = useSelector(
    (state:RootReducerType) => state.essay,
  )

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


    /** 최초 렌더링시 MyList 수정모드인지 생성모드인지 구분역할 */
    useEffect(() => {
      if (router.query.essayId) {
        const essayId = JSON.parse(
          router.query.essayId as string,
        ) as number;
        setIsEdit(true);
        dispatch(readEssayList(essayId))
        return;
      }
      dispatch(getTemplate())
    }, []);
  
    /** 템플릿의 로딩이 완료가되면 useState에 반영한다. */
    useEffect(() => {
      if(!templateReducer.loading){
        setQuestionLists(templateReducer.templateList)
      }
    },[templateReducer.loading])
  
    /** ESSAY의 로딩이 완료가되면 useState에 반영한다. */
    useEffect(() => {
      if(!essayReducer.loading){
        setQuestionLists(essayReducer.readEssayList)
        setQuestionTitle(essayReducer.readEssayList[0]?.title)
      }
    },[essayReducer.loading])

  /** 수정모드에서는 기존의 리스트를 반환, 작성모드에서는 선택된 템플릿 리스트를 반환 */
  const getQuestionItem = useCallback(() => {
    console.log(isEdit)
    if(isEdit){
      return questionLists
    }
    const filteItem = questionLists.filter(
      list => list.title === questionTitle,
    );
    return filteItem;
  }, [questionTitle]);


  /**질문FORM 추가 함수 */
  const handleAddQuestion = () => {
    if (questionTitle === "") {
      return;
    }
    setQuestionLists(prevLists => {
      const newLists = [...prevLists];
      const filterIndex = newLists.findIndex(a => a.title === questionTitle);
      console.log(filterIndex)
      const newContent = [...newLists[filterIndex].qnaList, addTitle];
      console.log(newContent)
      newLists[filterIndex].qnaList = newContent;
      return newLists;
    });
    //추가 폼을 닫아주고 초기화
    setIsAddContent(false);
    setAddTitle("");
  };

  /**서버에 새로운 질문리스트를 전송 */
  const handleSubmit = () => {
    const data = {
      title: questionListTitle,
      qnaList: questionContent,
    }
    if(isEdit){
      console.log(questionLists)
      dispatch(updateEssay(data,57))
      router.replace('/myEssay')
      return 
    }
    dispatch(addEssay(data,1))
    console.log({ title: questionListTitle, qnaList: [questionContent] });
    console.log({ questionContent });
    router.replace('/myEssay')
  };

  /** 질문추가 취소*/
  const handleCancelQuestion = () => {
    setIsAddContent(false);
  };
 
  /** 경고창 제어 */
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleTextChange = (index: number, value: string, title: string) => {
    const filterTitle = questionContent.filter(a => a.question === title)[0];
    // console.log({ filterTitle });
    if (filterTitle) {
      const newList = [...questionContent];
      newList[index].answer = value;
      setQuestionContent(newList);
    } else {
      setQuestionContent(cur => [...cur, { question: title, answer: " " }]);
    }
  };
  // console.log({ questionContent });

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
              onClick={()=> router.push('/myEssay')}
              text="뒤로가기"
            />
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
