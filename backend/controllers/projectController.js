const Project = require('./../models/projectModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const makeRandomString = require('./../utils/randomString');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('هذه ليست صورة! من فضلك ارفع صور فقط', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProjectMap = upload.single('map');

exports.resizeProjectMap = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `map-${makeRandomString()}-${Date.now()}.jpg`;
  await sharp(req.file.buffer)
    .toFormat('jpg')
    .toFile(`public/img/projectMaps/${req.file.filename}`);
  req.body.map = req.file.filename;
  next();
});

exports.fillSquares = catchAsync(async (req, res, next) => {
  req.body.squares = []
  for(let i = 0; i < 24 ; i++){
    req.body.squares.push(
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    )
  }
  next();
});

exports.getAllProjects = factory.getAll(Project);
exports.createProject = factory.createOne(Project);
exports.getProject = factory.getOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);