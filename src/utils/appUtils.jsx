export const getErrorMessage = (error, isSendObj) => {
  return error && error.data && error.data.message;
};
