interface IQnaList {
  question: string;
  answer: string;
}

export interface IReadQnaList extends IQnaList {
  qnaId: number;
}

interface IEssayBase {
  title: string;
  owner: boolean;
}

export interface IWriteEssayList extends IEssayBase {
  qnaList: IQnaList[];
}

export interface IReadEssayList extends IEssayBase {
  essayId: number;
  qnaList: IReadQnaList[];
}

export interface IGetEssayList extends IEssayBase {
  questions: string[];
}

export interface IReviseEssayList {
  title: string;
  qnaList: IQnaList[];
}
