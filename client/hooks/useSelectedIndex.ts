import React, { useCallback, useState } from "react";

const useSelectedIndex = (
  defaultValue: number,
): [number, (idx: number) => void] => {
  const [index, setIndex] = useState(defaultValue);

  const changeCurIndex = useCallback((seletedIdx: number) => {
    setIndex(seletedIdx);
  }, []);

  return [index, changeCurIndex];
};

export default useSelectedIndex;
