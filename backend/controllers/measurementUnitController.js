const MeasurementUnit = require("../models/measurementUnitModel");
const factory = require("./handlerFactory");

exports.getAllMeasurementUnits = factory.getAll(MeasurementUnit);
exports.createMeasurementUnit = factory.createOne(MeasurementUnit);
exports.getMeasurementUnit = factory.getOne(MeasurementUnit);
exports.updateMeasurementUnit = factory.updateOne(MeasurementUnit);
exports.deleteMeasurementUnit = factory.deleteOne(MeasurementUnit);
