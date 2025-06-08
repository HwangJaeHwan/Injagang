import { useState, useCallback } from "react";

import { useRouter } from "next/router";

import { v4 as uuid4 } from "uuid";

import { useDispatch } from "react-redux";
import { addEssay } from "@/components/redux/Essay/server/actions";


import { moveCoverLetterMainPage } from "../new/CoverLetterCreator";

import useModal from "@/hooks/useModal";

import { IReadQnaList } from "@/types/essay/EssayType";

import { runValidationChecks } from "@/util/runValidationChecks";
import { ERROR_MESSAGES } from "@/constants";

const useCoverLetterCreatorLogic = () => {
  const [coverLetterTitle, setCoverLetterTitle] = useState<string>("");
  const [qnaList, setQnAList] = useState<IReadQnaList[]>([]);
  const { setModal, Modal } = useModal();
  const router = useRouter();
  const dispatch = useDispatch();

  const MIN_QUESTIONS = 1;
  const MAX_QUESTIONS = 5;

  const coverLetterMinLength = qnaList.length <= MIN_QUESTIONS;
  const coverLetterMaxLength = qnaList.length >= MAX_QUESTIONS;

  const addQnAList = useCallback(() => {
    if (coverLetterMaxLength) {
      setModal({
        contents: {
          title: "Warring",
          content: `질문문항은 최대 ${MAX_QUESTIONS}개 제한입니다.`,
        },
      });
      return
    }
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
        prev.map((qna) =>
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
      message: ERROR_MESSAGES.EMPTY_TITLE,
    },
    {
      check: () => qnaList.length < 1,
      message: ERROR_MESSAGES.MINIMUM_QNA,
    },
    {
      check: () => qnaList.some(q => q.answer === ""),
      message: ERROR_MESSAGES.EMPTY_ANSWER,
    },
  ];

  const handleDispatch = useCallback(() => {
    const isWarringMsg = runValidationChecks(자기소개서작성규칙);
    if (isWarringMsg) {
      setModal({
        contents: {
          title: "Warring",
          content: isWarringMsg,
        },
      });
      return;
    }

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
    Modal,
  };
};

export default useCoverLetterCreatorLogic;
