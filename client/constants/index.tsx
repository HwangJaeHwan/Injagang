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
      path: "/myEssay",
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