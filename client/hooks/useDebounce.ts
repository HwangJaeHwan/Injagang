import { useEffect, useState } from "react";

const useDebounce = (value: string, time?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      setDebounceValue(value);
    }, time || 500);

    return () => {
      clearTimeout(debounceDelay);
    };
  }, [value, time]);

  return debounceValue;
};
export default useDebounce;
