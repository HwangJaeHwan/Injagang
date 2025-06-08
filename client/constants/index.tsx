import { ReactElement } from "react";

import {
  BiEdit,
  BiUserVoice,
  BiCommentDetail,
  BiSearchAlt2,
} from "react-icons/bi";

export const BRAND = {
  title: "INJAGANG",
};

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
  EMPTY_NICK: "닉네임이 비어있습니다.",
  EMPTY_LIST: "리스트가 비어있습니다.",
  DUPLICATION_NICK: "중복된 닉네임이 존재합니다.",
  DUPLICATION_TEXT: "선택한 문장이 존재합니다.",
  DOESN_T_MATCH_PASSWORD: "입력한 정보가 일치하지 않습니다.",
  DOESN_T_TYPE: "TYPE을 선택해주세요.",
  USER_NOT_FOUND: "해당하는 유저를 찾을 수 없습니다.",
  NO_AUTHORIZATION: "권한이 없습니다. ",
  JWT_EXPIRED: "JWT가 만료되었습니다.",
  REFRESH_TOKEN_EXPIRED: "Refresh 토큰이 만료되었습니다.",

  ADDED_ESSAY: "나의 자소서 목록 추가를 실패했습니다.",
  DELETED_ESSAY: "나의 자소서 목록 삭제를 실패했습니다.",
  UPDATED_ESSAY: "나의 자소서 목록 수정을 실패했습니다.",

  ADDED_QUESTION: "나의 질문이 추가를 실패했습니다.",
  DELETED_QUESTION: "나의 질문 삭제를 실패했습니다.,",
  UPDATED_QUESTION: "나의 질문 수정을 실패했습니다.",

  UPDATED_FEED: "나의 댓글 수정을 실패했습니다.,",
  ADDED_FEED: "댓글 등록을 실패했습니다.,",
};

export const SUCCESS_MESSAGES = {
  CHANGE_NICK: "닉네임 변경을 완료하였습니다.",
  CHANGE_PASSWORD: "패스워드 변경을 완료하였습니다.",

  DELETED_TEMPLATE: "템플릿이 성공적으로 삭제되었습니다.,",
  ADDED_TEMPLATE: "템플릿이 추가되었습니다.",

  ADDED_ESSAY: "나의 자소서 목록이 추가되었습니다.",
  DELETED_ESSAY: "나의 자소서 목록이 성공적으로 삭제되었습니다.,",
  UPDATED_ESSAY: "나의 자소서 목록 수정을 하였습니다.",

  ADDED_QUESTION: "나의 질문이 추가되었습니다.",
  DELETED_QUESTION: "나의 질문이 성공적으로 삭제되었습니다.,",
  UPDATED_QUESTION: "나의 질문 수정을 하였습니다.",

  UPDATED_FEED: "나의 댓글을 성공적으로 수정을 하였습니다.,",
  ADDED_FEED: "댓글 등록을 하였습니다."
};

export const MODAL_MESSAGES = {
  WARNING: "Warning",
  MSG: "Message",
};

export const TOAST_MODE = {
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
  INFO: "INFO",
};
