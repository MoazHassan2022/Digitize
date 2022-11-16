const AppError = require("./../utils/appError");

const handleCastErrorDB = () => {
  const message = "لم يتم ايجاد البيانات المطلوبة";
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = () => {
  const message = "هذه البيانات موجودة من قبل. من فضلك استخدم قيم أخرى";
  return new AppError(message, 400);
};

const handleValidatorErrorDB = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const message = `${errors.join(". ")} يوجد خطأ في البيانات التي أدخلتها`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("يرجى تسجيل الدخول مرة أخرى", 401);

const handleTokenExpiredError = () =>
  new AppError("يرجى تسجيل الدخول مرة أخرى", 401);
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "حدث خطأ ما",
    });
  }
};
module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV !== "development") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldDB(error);
    if (err.name === "ValidationError") error = handleValidatorErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();
    sendErrorProd(error, res);
  } else sendErrorDev(err, res);
};
