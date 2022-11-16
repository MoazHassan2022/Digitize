const DeliveryTeam = require("./../models/deliveryTeamModel");
const factory = require("./handlerFactory");

exports.getAllDeliveryTeams = factory.getAll(DeliveryTeam);
exports.createDeliveryTeam = factory.createOne(DeliveryTeam);
exports.getDeliveryTeam = factory.getOne(DeliveryTeam);
exports.updateDeliveryTeam = factory.updateOne(DeliveryTeam);
exports.deleteDeliveryTeam = factory.deleteOne(DeliveryTeam);
