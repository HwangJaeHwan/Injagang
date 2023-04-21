export interface QnaList {
  question: string;
  answer: string;
}

export interface EssayList {
  essayId: number;
  title: string;
  qnaList: QnaList[];
}

export interface CurList {
  index: number;
  essayId: number;
}
