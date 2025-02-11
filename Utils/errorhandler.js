export const errorHandler = (errObj, req, res, next) => {
  let statusCode = errObj.statusCode || 500;
  let message = errObj.message || "internal error";

  if (message.includes("E11000")) {
    statusCode = 400;
    message = "Duplicate key user. EMMail must be unique";
  }

  return res.status(statusCode).json({
    status: "Error handling error",
    message: message,
  });
};
