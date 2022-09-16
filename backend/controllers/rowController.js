const Row = require('./../models/rowModel');
const factory = require('./handlerFactory');

exports.createDate = (req, res, next) => {
  req.body.date = new Date().toLocaleDateString();
  next();
};

exports.getAllRows = factory.getAll(Row);
exports.createRow = factory.createOne(Row);
exports.getRow = factory.getOne(Row);
exports.updateRow = factory.updateOne(Row);
exports.deleteRow = factory.deleteOne(Row);
