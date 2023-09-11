enum QuestionType {
  CS = "CS",
  SITUATION = "SITUATION",
  JOB = "JOB",
  PERSONALITY = "PERSONALITY",
}

interface IAddQuestions {
  questions: string[];
  questionType: QuestionType;
}

interface IGetQuestion {
  id: number;
  questions: string[];
}

interface IRandomQuestions {
  size: number;
  questionType: QuestionType;
}

interface IDeleteQuestions {
  ids: number[];
}
