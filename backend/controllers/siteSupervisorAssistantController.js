const SiteSupervisorAssistant = require('./../models/siteSupervisorAssistantModel');
const factory = require('./handlerFactory');

exports.getAllSiteSupervisorAssistants = factory.getAll(
  SiteSupervisorAssistant
);
exports.createSiteSupervisorAssistant = factory.createOne(
  SiteSupervisorAssistant
);
exports.getSiteSupervisorAssistant = factory.getOne(SiteSupervisorAssistant);
exports.updateSiteSupervisorAssistant = factory.updateOne(
  SiteSupervisorAssistant
);
exports.deleteSiteSupervisorAssistant = factory.deleteOne(
  SiteSupervisorAssistant
);
