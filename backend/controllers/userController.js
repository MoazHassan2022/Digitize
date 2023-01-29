const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/usersModel");

const filterObj = (obj, ...allowed) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowed.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "This route is not for updating the password, Please use this route /updateMyPassword",
        400
      )
    );
  const filteredBody = filterObj(req.body, "name", "email", "companyName");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, // return the updated user
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    results: 1,
    requiredAt: req.requestTime,
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({
    status: "success",
    data: {
      message: "Your account has been deleted successfully!",
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    requestAt: req.requestTime,
    data: {
      users,
    },
  });
});
