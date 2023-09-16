import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import {
  addTemplaetToggle,
  setCurTemplateList,
} from "@/components/redux/Template/user/actions";
import { IGetTemplate } from "@/types/template/TemplateType";

const useUserTemplateManager = () => {
  const dispatch = useDispatch();
  const { selectedTemplateList, isAddTemplate } = useSelector(
    (state: RootReducerType) => state.userTemplaetList,
  );

  const setItemInfo = useCallback((itemList: IGetTemplate) => {
    dispatch(setCurTemplateList(itemList));
  }, []);

  const setIsAddTemplate = useCallback((isAdd: boolean) => {
    dispatch(addTemplaetToggle(isAdd));
  }, []);

  return { selectedTemplateList, isAddTemplate, setItemInfo, setIsAddTemplate };
};

export default useUserTemplateManager;
