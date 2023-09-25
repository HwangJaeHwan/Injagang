import useTemplateManager from "@/components/Admin/hooks/useTemplateManager";
import useUserTemplateManager from "@/components/Admin/hooks/useUserTemplateManager";
import { RootReducerType } from "@/components/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const useControlTemplate = () => {
  const [selectedTemplateTitle, setSelectedTemplateTitle] =
    useState<string>("");
  const { selectedTemplateList, setItemInfo } = useUserTemplateManager();
  const { getTemplateList } = useTemplateManager();
  const { templateList } = useSelector(
    (state: RootReducerType) => state.template,
  );

  const changeSelectedTemplate = (seleted: string) => {
    const searchTemplate = templateList.find(item => item.title === seleted);
    const initTemplate = {
      templateId: 100001,
      title: seleted,
      questions: [""],
    };
    if (searchTemplate) {
      setItemInfo(searchTemplate);
    } else if (seleted === "커스텀 자소서") {
      setItemInfo(initTemplate);
    }
    setSelectedTemplateTitle(seleted);
  };

  const templateTitles = templateList
    .map(q => ({ title: q.title }))
    .concat({ title: "커스텀 자소서" });

  return {
    selectedTemplateTitle,
    changeSelectedTemplate,
    selectedTemplateList,
    templateTitles,
    getTemplateList,
  };
};

export default useControlTemplate;
