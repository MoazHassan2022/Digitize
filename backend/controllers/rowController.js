const Row = require('./../models/rowModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
var mongoXlsx = require('mongo-xlsx');
const fs = require('fs');
const path = require('path');

exports.createDate = (req, res, next) => {
  req.body.date = new Date().toLocaleDateString();
  next();
};

exports.getAllRows = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Row.find(), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate();
  const rows = await features.query;

  let model = [
    {
      displayName: 'Project Code',
      access: 'projectCode',
      type: 'string',
    },
    {
      displayName: 'Site Name',
      access: 'siteName',
      type: 'string',
    },
    {
      displayName: 'Cabinet Serial',
      access: 'cabinetSerial',
      type: 'string',
    },
    {
      displayName: 'Activity ID',
      access: 'activityID',
      type: 'number',
    },
    {
      displayName: 'Activity Group',
      access: 'activityGroup',
      type: 'string',
    },
    {
      displayName: 'Activity Type',
      access: 'activityType',
      type: 'string',
    },
    {
      displayName: 'Measurment Unit',
      access: 'measurmentUnit',
      type: 'string',
    },
    {
      displayName: 'Day Progress',
      access: 'dayProgress',
      type: 'string',
    },
    {
      displayName: 'Delivery Way',
      access: 'deliveryWay',
      type: 'string',
    },
    {
      displayName: 'Delivery Team',
      access: 'deliveryTeam',
      type: 'string',
    },
    {
      displayName: 'Site Engineer',
      access: 'siteEngineer',
      type: 'string',
    },
    {
      displayName: 'Site Supervisor (Main)',
      access: 'siteSupervisorMain',
      type: 'string',
    },
    {
      displayName: 'Site Supervisor (Assistant)',
      access: 'siteSupervisorAssistant',
      type: 'string',
    },
  ];
  mongoXlsx.mongoData2Xlsx(rows, model, function (err, data) {
    const excelFilePath = path.resolve(__dirname + '/../' + data.fullPath);
    res.sendFile(excelFilePath, (err) => {
      if (err) return next(new AppError(err.message, 500));
      fs.unlink(excelFilePath, (err) => {
        if (err) return next(new AppError(err.message, 500));
      });
    });
  });
});
exports.createRow = factory.createOne(Row);
exports.getRow = factory.getOne(Row);
exports.updateRow = factory.updateOne(Row);
exports.deleteRow = factory.deleteOne(Row);
