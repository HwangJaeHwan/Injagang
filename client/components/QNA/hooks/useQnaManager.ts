import { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import { deleteBoard, getBoardList } from "@/components/redux/QnA/actions";
import { RootReducerType } from "@/components/redux/store";

const useQnaManager = () => {
  const dispatch = useDispatch();
  const { qnaIdList, boardList, boardInFoList, isUpdated } = useSelector(
    (state: RootReducerType) => state.board,
  );

  //AnswerDetail
  const dispatchRemoveBoard = useCallback((targetId: number) => {
    dispatch(deleteBoard(targetId));
  }, []);

  const dispatchGetBoardList = useCallback(
    (targetId: number, title?: string, content?: string) => {
      dispatch(getBoardList(targetId, title, content));
    },
    [],
  );

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
