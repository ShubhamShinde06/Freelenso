// errorHandler.js
const ErrorHandler = (res, message = "Something went wrong", error, status = 500) => {
  console.log(error)
  return res.status(status).json({
    success: false,
    message,
    error: error
  });
};

export default ErrorHandler;
