import { ReactElement } from "react";
import {
  BiEdit,
  BiUserVoice,
  BiCommentDetail,
  BiSearchAlt2,
} from "react-icons/bi";

type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

/**Navbar에 생성할 리스트를 통제하기 위한 역할*/
export const navItems: MenuItem[] = [
  {
    title: "자소서작성",
    path: "/coverLetter",
    icon: <BiEdit />,
  },
  {
    title: "탐색하기",
    path: "/search",
    icon: <BiSearchAlt2 />,
  },
  {
    title: "면접연습",
    path: "/interview",
    icon: <BiUserVoice />,
  },
  {
    title: "Q&A",
    path: "/qna/list",
    icon: <BiCommentDetail />,
  },
];

export const ERROR_MESSAGES = {
  FILL_BLANKS: "빈칸을 채워주세요.",
  CHECK_PASSWORD: "비밀번호를 재확인해주세요",
  DOESN_T_MATCH: "아이디나 비밀번호가 일치하지 않습니다.",
  EMPTY_TITLE: "제목을 입력해주세요.",
  MINIMUM_QNA: "질문과 답변은 1개이상 작성해주세요.",
  EMPTY_ANSWER: "답변이 비어있습니다.",
  EMPTY_NICK: "닉네임이 비어있습니다."
};
