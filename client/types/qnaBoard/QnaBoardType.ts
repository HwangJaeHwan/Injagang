import { IReadQnaList } from "../essay/EssayType";

interface IBoardList {
  id: number;
  title: string;
  nickname: string;
}

export interface IGetQnaBoardList {
  totalPage: number;
  boardLis: IBoardList[];
  isFirst: boolean;
  isLast: boolean;
}

export interface IWriteQnaBoard {
  title: string;
  content: string;
  essayId: number;
}

export interface IGetDetailQnaBoard {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  nickname: string;
  owner: boolean;
  essayTitle: string;
  qnaList: IReadQnaList;
}

export interface IReviseQnaBoard {
  boardId: number;
  changeTitle: string;
  changeContent: string;
}

export interface IDeleteQnaBoard {
  boardId: number;
}
