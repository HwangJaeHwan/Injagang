interface IBaseTemplate {
  title: string;
  questions: string[];
}

export interface IAddTemplate extends IBaseTemplate {}

export interface IGetTemplate extends IBaseTemplate {
  templateId: number;
}

export interface IDeleteTemplate {
  templateId: number;
}

