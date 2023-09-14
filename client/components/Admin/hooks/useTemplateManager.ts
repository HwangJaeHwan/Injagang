import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Template/reducer";
import {
  getTemplate,
  removeTemplate,
} from "@/components/redux/Template/actions";

const useTemplateManager = () => {
  const dispatch = useDispatch();
  const templateReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.template,
  );

  useEffect(() => {
    dispatch(getTemplate());
  }, []);

  const removeTemplateItem = useCallback((index: number) => {
    dispatch(removeTemplate(index));
  }, []);

  return { templateReducer, removeTemplateItem };
};

export default useTemplateManager;
