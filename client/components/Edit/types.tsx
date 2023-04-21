export type qna = {
    qnaId: number;
    question: string;
    answer: string;
  };
  
export interface QnAList {
    essayId?: number;
    templateId?: number;
    title: string;
    qnaList: Array<qna | string>;
  }
  
export interface qnaListItem {
    qnaId: number;
    question: string;
    answer: string;
  }
  
export interface qnaList extends Array<qnaListItem> {}
  
export type QnAEditorProps = {
    isEdit: boolean;
  };
  