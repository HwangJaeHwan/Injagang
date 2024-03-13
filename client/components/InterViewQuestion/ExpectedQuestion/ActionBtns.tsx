import React from "react";

import useMyProfileManager from "@/components/MyProfile/hooks/useMyProfileManager";

import { StyleButton } from "@/styles/GlobalStyle";

import { InterviewQuestionList } from "@/components/redux/InterViewQuestion/types";


interface ActionBtnProps {
  checkList: number[];
  selectedType: string;
  onRemove: (checkList: number[], selectedType: string) => void;
  onToggleAll: () => void;
  isAllChecked: boolean;
  onAdd: (questions: InterviewQuestionList[], checkList: number[]) => void;
  questions: InterviewQuestionList[];
}

const ActionBtns = ({
  onToggleAll,
  onRemove,
  checkList,
  selectedType,
  isAllChecked,
  onAdd,
  questions,
}: ActionBtnProps) => {
  const { role } = useMyProfileManager();
  const isAdmin = role === "ADMIN" ? "ADMIN" : "USER";

  const handleRemove = () => {
    onToggleAll();
    onRemove(checkList, selectedType);
  };

  const btnConfig = {
    ADMIN: {
      onClick: handleRemove,
      text: "삭제하기",
    },
    USER: {
      onClick: () => onAdd(questions, checkList),
      text: "항목추가",
    },
  };

  return (
    <div>
      <StyleButton
        onClick={onToggleAll}
        Size={{ width: "100px", font: "15px" }}
      >
        {isAllChecked ? "전체해제" : "전체선택"}
      </StyleButton>
      <StyleButton
        onClick={btnConfig[isAdmin].onClick}
        Size={{ width: "100px", font: "15px" }}
      >
        {btnConfig[isAdmin].text}
      </StyleButton>
    </div>
  );
};

export default ActionBtns;
