const SiteEngineer = require("./../models/siteEngineerModel");
const factory = require("./handlerFactory");

exports.getAllSiteEngineers = factory.getAll(SiteEngineer);
exports.createSiteEngineer = factory.createOne(SiteEngineer);
exports.getSiteEngineer = factory.getOne(SiteEngineer);
exports.updateSiteEngineer = factory.updateOne(SiteEngineer);
exports.deleteSiteEngineer = factory.deleteOne(SiteEngineer);
