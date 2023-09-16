import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import {
  getTemplate,
  removeTemplate,
} from "@/components/redux/Template/server/actions";

const useTemplateManager = () => {
  const dispatch = useDispatch();
  const { templateList, loading, error } = useSelector(
    (state: RootReducerType) => state.template,
  );

  useEffect(() => {
    dispatch(getTemplate());
  }, []);

  const removeTemplateItem = useCallback((index: number) => {
    dispatch(removeTemplate(index));
  }, []);

  return { templateList, removeTemplateItem };
};

export default useTemplateManager;
