import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTemplate } from "@/components/redux/Template/server/actions";
import useUserTemplateManager from "./useUserTemplateManager";

interface IAddTemplateList {
  templateTitle: string;
  templateQuestion: string[];
}

const MAX_QUESTIONS = 7;
const MIN_QUESTIONS = 1;

const useAddTemplateLogic = () => {
  const [templateList, setTemplateList] = useState<IAddTemplateList>({
    templateTitle: " ",
    templateQuestion: [],
  });
  const { setIsAddTemplate } = useUserTemplateManager();
  const dispatch = useDispatch();
  const templateMinLength =
    templateList.templateQuestion.length <= MIN_QUESTIONS;
  const templateMaxLength =
    templateList.templateQuestion.length >= MAX_QUESTIONS;

  const handleQuestionChange = (index: number, value: string) => {
    setTemplateList(prev => ({
      ...prev,
      templateQuestion: prev.templateQuestion.map((q, i) =>
        i === index ? value : q,
      ),
    }));
  };

  const addQuestion = () => {
    if (templateMaxLength) return;
    setTemplateList(prev => ({
      ...prev,
      templateQuestion: [...prev.templateQuestion, ""],
    }));
  };

  const removeLastQuestion = () => {
    setTemplateList(prev => ({
      ...prev,
      templateQuestion: prev.templateQuestion.slice(0, -1),
    }));
  };

  const resetTemplateList = () => {
    if (templateMinLength) return;
    setTemplateList({ templateTitle: "", templateQuestion: [] });
  };

  const confirmTemplateCreation = () => {
    const { templateTitle, templateQuestion } = templateList;
    dispatch(
      addTemplate({ title: templateTitle, questions: templateQuestion }),
    );
    resetTemplateList();
    setIsAddTemplate(false);
  };

  return {
    templateList,
    setTemplateList,
    handleQuestionChange,
    addQuestion,
    removeLastQuestion,
    resetTemplateList,
    confirmTemplateCreation,
    templateMinLength,
    templateMaxLength,
  };
};

export default useAddTemplateLogic;
