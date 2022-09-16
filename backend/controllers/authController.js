const { promisify } = require('util'); // built in nofe module
const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.isAdmin) delete req.body.isAdmin;
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('يرجى تقديم البريد الإلكتروني وكلمة المرور', 401));
  const user = await User.findOne({ email }).select('+password'); // {email: email} = {email}
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('البريد أو كلمة المرور غير صحيحة', 401));
  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  // Check if there is no token
  if (!token)
    return next(
      new AppError('لم يتم تسجيل دخولك! الرجاء تسجيل الدخول للوصول', 401)
    ); // 401 unauthorized
  // payload here is user id
  // verify the token
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // check if the user is still exists
  const user = await User.findById(decodedPayload.id);
  if (!user)
    return next(
      new AppError('لم يعد المستخدم الذي ينتمي إلى هذا الحساب موجودًا', 401)
    );
  // check if the user changed his password after this token
  if (user.changedPasswordAfter(decodedPayload.iat))
    // iat: issued at
    return next(
      new AppError(
        'قام المستخدم بتغيير كلمة المرور مؤخرًا! الرجاد الدخول على الحساب من جديد'
      ),
      401
    );

  // save the user for the next middleware
  req.user = user;
  next();
});

exports.isAdmin = (req, res, next) => {
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin)
    return next(new AppError('ليس لديك إذن للقيام بهذا الإجراء', 403));
  next();
};
