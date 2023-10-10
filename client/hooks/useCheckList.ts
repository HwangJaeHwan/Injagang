import React, { useEffect, useState, useCallback } from "react";

type ItemWithID<T> = T & {
  id: number;
};

const useCheckList = <T extends { id: number }>(
  targetList: ItemWithID<T>[],
) => {
  const [checkList, setCheckList] = useState<number[]>([]);
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);

  useEffect(() => {
    isAllCheck ? checkAllItems(targetList) : unCheckAllItems();
  }, [isAllCheck]);

  const handleAllCheck = useCallback(() => {
    setIsAllCheck(prev => !prev);
  }, []);

  const checkAllItems = useCallback(
    <T extends { id: number }>(targetList: ItemWithID<T>[]) => {
      const allItems = targetList.map(item => item.id);
      setCheckList(allItems);
    },
    [targetList],
  );

  const unCheckAllItems = useCallback(() => {
    setCheckList([]);
  }, []);

  const handleCheckList = useCallback((id: number, isCheck: boolean) => {
    isCheck ? removeCheckItem(id) : addCheckItem(id);
  }, []);

  const addCheckItem = useCallback((id: number) => {
    setCheckList(prev => [...prev, id]);
  }, []);

  const removeCheckItem = useCallback((targetId: number) => {
    const removeItem = checkList.filter(id => id !== targetId);
    setCheckList(removeItem);
  }, []);

  return { handleCheckList, handleAllCheck, checkList, isAllCheck };
};

export default useCheckList;
