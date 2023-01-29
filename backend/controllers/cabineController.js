const Cabine = require("../models/cabineModel");
const factory = require("./handlerFactory");

exports.getAllCabines = factory.getAll(Cabine);
exports.createCabine = factory.createOne(Cabine);
exports.getCabine = factory.getOne(Cabine);
exports.updateCabine = factory.updateOne(Cabine);
exports.deleteCabine = factory.deleteOne(Cabine);
