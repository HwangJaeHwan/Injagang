import React, { useState, useCallback } from "react";
import { IReadQnaList } from "@/types/essay/EssayType";
import { v4 as uuid4 } from "uuid";
import { useDispatch } from "react-redux";
import { addEssay } from "@/components/redux/Essay/server/actions";
import { runValidationChecks } from "@/util/runValidationChecks";
import { useRouter } from "next/router";

const useCoverLetterCreatorLogic = () => {
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>("");
  const [qnaList, setQnAList] = useState<IReadQnaList[]>([]);
  const router = useRouter();
  const moveCoverLetterMainPage = "/coverLetter";
  const dispatch = useDispatch();

  const MIN_QUESTIONS = 1;
  const MAX_QUESTIONS = 3;

  const coverLetterMinLength = qnaList.length <= MIN_QUESTIONS;
  const coverLetterMaxLength = qnaList.length >= MAX_QUESTIONS;

  const addQnAList = useCallback(() => {
    if (coverLetterMaxLength) return;
    const newID = uuid4();
    setQnAList(prev => [...prev, { question: "", answer: "", qnaId: newID }]);
  }, [qnaList]);

  const deleteQnAList = useCallback(
    (targetID: string | number) => {
      if (coverLetterMinLength) return;
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
    [qnaList],
  );

  const 자기소개서작성규칙 = [
    {
      check: () => coverLetterTitle === "",
      message: "제목을 입력해주세요.",
    },
    {
      check: () => qnaList.length < 1,
      message: "질문과 답변은 1개이상 작성해주세요.",
    },
    {
      check: () => qnaList.some(q => q.answer === ""),
      message: "답변이 비어있습니다.",
    },
  ];

  const handleDispatch = useCallback(() => {
    const isChecked = runValidationChecks(자기소개서작성규칙);
    if (isChecked) return;

    const formatQnAList = qnaList.map(qna => ({
      question: qna.question,
      answer: qna.answer,
    }));

    const qnaListForSubmission = {
      title: coverLetterTitle,
      owner: true,
      qnaList: formatQnAList,
    };

    dispatch(addEssay(qnaListForSubmission));
    router.push(moveCoverLetterMainPage);
  }, [qnaList, coverLetterTitle]);

  return {
    setQnAList,
    qnaList,
    addQnAList,
    changeQnAList,
    deleteQnAList,
    handleDispatch,
    setCoverLetterTitle,
    coverLetterTitle,
  };
};

export default useCoverLetterCreatorLogic;
