interface IValid {
  check: () => boolean;
  message: string;
}

export const runValidationChecks = (validation: IValid[]) => {
  const isValidation = validation.find(item => item.check());
  if (isValidation) {
    return isValidation.message;
  }
  return false;
};
