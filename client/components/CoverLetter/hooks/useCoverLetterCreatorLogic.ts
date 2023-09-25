import React, { useState, useCallback } from "react";
import { IReadQnaList } from "@/types/essay/EssayType";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { addEssay } from "@/components/redux/Essay/server/actions";

const useCoverLetterCreatorLogic = () => {
  const [qnaList, setQnAList] = useState<IReadQnaList[]>([]);
  const dispatch = useDispatch();

  const addQnAList = useCallback(() => {
    const newID = uuid4();
    setQnAList(prev => [...prev, { question: "", answer: "", qnaId: newID }]);
  }, []);

  const deleteQnAList = useCallback(
    (targetID: string | number) => {
      const filterItem = qnaList.filter(qna => qna.qnaId !== targetID);
      setQnAList(filterItem);
    },
    [qnaList],
  );

  const changeQnAList = useCallback(
    (targetID: string | number, newQuestion: string, newAnswer: string) => {
      setQnAList(prev =>
        prev.map((qna, idx) =>
          qna.qnaId === targetID
            ? { ...qna, question: newQuestion, answer: newAnswer }
            : { ...qna },
        ),
      );
    },
    [],
  );

  const handleDispatch = useCallback(
    (mainTitle: string) => {
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
    },
    [qnaList],
  );

  return {
    setQnAList,
    qnaList,
    addQnAList,
    changeQnAList,
    deleteQnAList,
    handleDispatch,
  };
};

export default useCoverLetterCreatorLogic;
