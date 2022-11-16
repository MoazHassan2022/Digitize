const DeliveryWay = require("./../models/deliveryWayModel");
const factory = require("./handlerFactory");

exports.getAllDeliveryWays = factory.getAll(DeliveryWay);
exports.createDeliveryWay = factory.createOne(DeliveryWay);
exports.getDeliveryWay = factory.getOne(DeliveryWay);
exports.updateDeliveryWay = factory.updateOne(DeliveryWay);
exports.deleteDeliveryWay = factory.deleteOne(DeliveryWay);
