import React, { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import { IReadQnaList } from "@/types/essay/EssayType";
import CoverLetterQuestionItems from "./CoverLetterQuestionItems";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { addEssay } from "@/components/redux/Essay/server/actions";

const CoverLetterCreator = () => {
  const [mainTitle, setMainTitle] = useState<string>("");
  const [qnaList, setQnAList] = useState<IReadQnaList[]>([]);
  const dispatch = useDispatch();

  const addQnAList = () => {
    const newID = uuid4();
    setQnAList(prev => [...prev, { question: "", answer: "", qnaId: newID }]);
  };

  const deleteQnAList = (targetID: string | number) => {
    const filterItem = qnaList.filter(qna => qna.qnaId !== targetID);
    setQnAList(filterItem);
  };

  const changeQnAList = (
    targetID: string | number,
    newQuestion: string,
    newAnswer: string,
  ) => {
    setQnAList(prev =>
      prev.map((qna, idx) =>
        qna.qnaId === targetID
          ? { ...qna, question: newQuestion, answer: newAnswer }
          : { ...qna },
      ),
    );
  };

  useEffect(() => {
    console.log(qnaList);
  }, [qnaList]);

  const handleDispatch = () => {
    const formatQnAList = qnaList.map(qna => ({
      question: qna.question,
      answer: qna.answer,
    }));
    const data = {
      title: mainTitle,
      owner: true,
      qnaList: formatQnAList,
    };
    dispatch(addEssay(data));
  };

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자소서 작성하기</MainTitle>
      <input
        value={mainTitle}
        onChange={e => setMainTitle(e.target.value)}
      ></input>
      {qnaList.map((qna, i) => (
        <CoverLetterQuestionItems
          key={qna.qnaId}
          item={qna}
          onDelete={deleteQnAList}
          onUpdate={changeQnAList}
        ></CoverLetterQuestionItems>
      ))}
      <BiPlus onClick={addQnAList}></BiPlus>
      <button onClick={handleDispatch}>클릭</button>
    </CoverLetterCreatorContainer>
  );
};

export default CoverLetterCreator;
const CoverLetterCreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MainTitle = styled.h2`
  font-size: 26rm;
`;
