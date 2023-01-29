const SiteSupervisorMain = require("./../models/siteSupervisorMainModel");
const factory = require("./handlerFactory");

exports.getAllSiteSupervisorMains = factory.getAll(SiteSupervisorMain);
exports.createSiteSupervisorMain = factory.createOne(SiteSupervisorMain);
exports.getSiteSupervisorMain = factory.getOne(SiteSupervisorMain);
exports.updateSiteSupervisorMain = factory.updateOne(SiteSupervisorMain);
exports.deleteSiteSupervisorMain = factory.deleteOne(SiteSupervisorMain);
