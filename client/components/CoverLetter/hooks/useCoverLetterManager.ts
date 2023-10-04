import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurEssayList } from "../../redux/Essay/user/actions";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";

import { useRouter } from "next/router";
import { IGetEssayList, IReadQnaList } from "@/types/essay/EssayType";
import {
  deleteEssayList,
  getDetailEssay,
  updateEssay,
} from "@/components/redux/Essay/server/actions";
import { moveCoverLetterMainPage } from "../new/CoverLetterCreator";

const useCoverLetterManager = () => {
  const { readEssayList, loading } = useSelector(
    (state: RootReducerType) => state.essay,
  );
  const coverLetterMainTitle = readEssayList[0].title;
  const dispatch = useDispatch();
  const router = useRouter();

  //CoverLetterItems
  const changeSeleted = (item: IGetEssayList) => {
    dispatch(setCurEssayList(item));
  };

  const moveEditPage = (essayId: number) => {
    router.push({
      pathname: `/coverLetter/${essayId}/edit`,
    });
  };

  //CoverLetterEdit
  const getDetailEssayList = useCallback((id: number) => {
    if (id) {
      dispatch(getDetailEssay(id));
    }
  }, []);

  const targetQnAData = useMemo(() => {
    return readEssayList.length > 0
      ? readEssayList[0].qnaList.map(a => ({
          qnaId: a.qnaId,
          question: a.question,
          answer: a.answer,
        }))
      : [];
  }, [readEssayList]);

  const changeCoverLetter = (
    essayId: number,
    title: string,
    qnaList: IReadQnaList[],
  ) => {
    const resetData = {
      title,
      qnaList: qnaList.map(qna => ({
        question: qna.question,
        answer: qna.answer,
      })),
    };
    dispatch(updateEssay(essayId, resetData));
    router.push(moveCoverLetterMainPage);
  };

  const deleteCoverLetter = (targetID: number) => {
    dispatch(deleteEssayList(targetID));
    router.push(moveCoverLetterMainPage);
  };

  return {
    changeSeleted,
    moveEditPage,
    readEssayList,
    loading,
    getDetailEssayList,
    coverLetterMainTitle,
    targetQnAData,
    changeCoverLetter,
    deleteCoverLetter,
  };
};

export default useCoverLetterManager;
