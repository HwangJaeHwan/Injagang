import QuestionItem from "@/components/Edit/QuestionItem";
import ControlMenu from "@/components/UI/ControlMenu";
import { ColBox } from "@/styles/GlobalStyle";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@/components/UI/Modal";
import AddQustionList from "@/components/Edit/AddQustionList";
import CustomButton from "@/components/UI/CustomButton";

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
  }

  select {
    width: 50%;
    height: 40px;
  }

  .button_container {
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    width: 250px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const questionList = [
  {
    title: "카카오 자소서",
    content: ["1.자신의장점", "2.자신의장단점", "3.프로젝트경험담"],
  },
  {
    title: "네이버 자소서",
    content: ["1.자신의장점", "2.자신의장단점", "3.프로젝트경험담"],
  },
  {
    title: "당근 자소서",
    content: ["1.자신의장점", "2.자신의장단점", "3.프로젝트경험담"],
  },
];

interface questionList {
  title: string;
  content: string[];
}

interface ContentItem {
  title: string;
  content: string;
}

interface Content extends Array<ContentItem> {}

const edit = () => {
  const [questionLists, setQuestionLists] =
    useState<questionList[]>(questionList);
  const [questionTitle, setQuestionTitle] = useState<string>("커스텀 자소서");
  const [isAddContent, setIsAddContent] = useState<boolean>(false);
  const [addTitle, setAddTitle] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [questionContent, setQuestionContent] = useState<Content>([
    {
      title: "",
      content: "",
    },
  ]);

  const getQuestionItem = () => {
    const filteItem = questionLists.filter(
      list => list.title === questionTitle,
    );
    return filteItem;
  };

  useEffect(() => {
    setQuestionLists((cur: questionList[]) => [
      ...cur,
      { title: "커스텀 자소서", content: [] },
    ]);
  }, []);

  const handleAddQuestion = () => {
    if (questionTitle === "") {
      return;
    }
    setQuestionLists(prevLists => {
      const newLists = [...prevLists];
      const filterIndex = newLists.findIndex(a => a.title === questionTitle);
      const newContent = [
        ...newLists[filterIndex].content,
        `${newLists[filterIndex].content.length + 1}.${addTitle}`,
      ];
      newLists[filterIndex].content = newContent;
      return newLists;
    });
    setIsAddContent(false);
    setAddTitle("");
  };

  const handleSubmit = () => {
    console.log(questionContent);
  };

  const handleCancelQuestion = () => {
    setIsAddContent(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleTextChange = (index: number, value: string, title: string) => {
    if (questionContent[0].title === "") {
      setQuestionContent([{ title, content: "" }]);
      return;
    }
    if (title === questionContent[questionContent.length - 1].title) {
      const newList = [...questionContent];
      newList[index].content = value;
      setQuestionContent(newList);
    } else {
      setQuestionContent(cur => [...cur, { title, content: " " }]);
    }
  };

  return (
    <EditStyle>
      <h2>자소서 작성하기</h2>
      <Container>
        <ControlMenu
          value={questionTitle}
          optionList={questionLists}
          onChange={setQuestionTitle}
        />
        {questionLists &&
          getQuestionItem().map((list, index) => (
            <div className="content-container" key={index}>
              {list.content.map((content, idx) => (
                <QuestionItem
                  key={idx}
                  content={content}
                  onChange={handleTextChange}
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
          <CustomButton
            onClick={() => setIsAddContent(true)}
            text={"항목추가"}
          />
          <CustomButton onClick={handleSubmit} text={"작성완료"} />
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
          contents={{ title: "fds", content: "sdfs" }}
        />
      )}
    </EditStyle>
  );
};

export default edit;
