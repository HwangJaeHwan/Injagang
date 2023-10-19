import { deleteBoard, getBoardList } from "@/components/redux/QnA/actions";
import { RootReducerType } from "@/components/redux/store";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useQnaManager = () => {
  const dispatch = useDispatch();
  const { qnaIdList, boardList, boardInFoList, isUpdated } = useSelector(
    (state: RootReducerType) => state.board,
  );

  //AnswerDetail
  const dispatchRemoveBoard = useCallback((targetId: number) => {
    dispatch(deleteBoard(targetId));
  }, []);

  const dispatchGetBoardList = useCallback((targetId: number) => {
    dispatch(getBoardList(targetId));
  }, []);

  return {
    dispatchRemoveBoard,
    dispatchGetBoardList,
    qnaIdList,
    boardList,
    boardInFoList,
    isUpdated,
  };
};

export default useQnaManager;
