import { useCallback, useEffect, useState } from "react";

import { LocalStorageManager } from "@/util/localStorageManager";

const useThemeToggler = (defaultValue: boolean): [boolean, () => void] => {
  const [toggle, setToggle] = useState<boolean>(defaultValue);
  const storage = new LocalStorageManager("theme");

  const ChangeToggleTheme = useCallback(() => {
    const currentMode = !toggle;
    setToggle(currentMode);
    storage.save(currentMode);
  }, [toggle]);

  useEffect(() => {
    const currentSaveMode = storage.get();
    if (currentSaveMode) {
      setToggle(currentSaveMode);
    }
  }, []);

  return [toggle, ChangeToggleTheme];
};

export default useThemeToggler;
