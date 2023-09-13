import React, { useCallback, useEffect, useState } from "react";

const useThemeToggler = (defaultValue: boolean): [boolean, () => void] => {
  const [toggle, setToggle] = useState<boolean>(defaultValue);

  const ChangeToggleTheme = useCallback(() => {
    console.log(toggle);
    const currentMode = !toggle;
    setToggle(currentMode);
    localStorage.setItem("theme", JSON.stringify(currentMode));
  }, [toggle]);

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      const currentMode = JSON.parse(storageTheme);
      if (currentMode !== defaultValue) {
        setToggle(currentMode);
      }
    }
  }, []);

  return [toggle, ChangeToggleTheme];
};

export default useThemeToggler;
