import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import {
  getTemplate,
  removeTemplate,
} from "@/components/redux/Template/server/actions";
import { setCurTemplateList } from "@/components/redux/Template/user/actions";

const useTemplateManager = () => {
  const dispatch = useDispatch();
  const { templateList, loading, error } = useSelector(
    (state: RootReducerType) => state.template,
  );

  useEffect(() => {
    dispatch(getTemplate());
  }, []);

  const removeTemplateItem = useCallback((index: number) => {
    const resetCurTemplate = {
      templateId: 0,
      questions: [],
      title: "",
    };
    dispatch(removeTemplate(index));
    dispatch(setCurTemplateList(resetCurTemplate));
  }, []);

  return { templateList, removeTemplateItem, loading, error };
};

export default useTemplateManager;
