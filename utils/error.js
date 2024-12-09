export const errorHandler = (statusCode, message) => {
  // console.log(`error occurred`)
    const error = new Error(message);
    error.statusCode = statusCode;
    // error.message = message;
    return error;
  };
  