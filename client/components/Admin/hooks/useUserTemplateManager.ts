import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import {
  addTemplaetToggle,
  setCurTemplateList,
} from "@/components/redux/Template/user/actions";
import { IGetTemplate } from "@/types/template/TemplateType";

const useUserTemplateManager = () => {
  const dispatch = useDispatch();

  const setItemInfo = useCallback((itemList: IGetTemplate) => {
    dispatch(setCurTemplateList(itemList));
  }, []);

  const setIsAddTemplate = useCallback((isAdd: boolean) => {
    dispatch(addTemplaetToggle());
  }, []);

  const { selectedTemplateList, isAddTemplate } = useSelector(
    (state: RootReducerType) => state.userTemplaetList,
  );
  console.log(selectedTemplateList, isAddTemplate);

  return { selectedTemplateList, isAddTemplate, setItemInfo, setIsAddTemplate };
};

export default useUserTemplateManager;
