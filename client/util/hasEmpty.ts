export const hasEmptyFields = (obj: { [key: string]: string }): boolean => {
    return Object.values(obj).some(value => value.length === 0);
  };
  
export   const hasEmptyFieldKey = (obj: { [key: string]: string }) => {
  return Object.keys(obj).find(key => obj[key] === "");
};