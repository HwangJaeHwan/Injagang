export const hasEmptyFields = (obj: { [key: string]: string }): boolean => {
    return Object.values(obj).some(value => value.length === 0);
  };
  