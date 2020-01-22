export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

// Reference: https://github.com/axios/axios#handling-errors
export const axiosHandleErrors = error => {
  const errorMsg = 'Something went wrong!';

  /* eslint no-console: 0 */
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);

    const { message } = error.response.data;

    return message || errorMsg;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);

    return errorMsg;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);

    return error.message;
  }
};
