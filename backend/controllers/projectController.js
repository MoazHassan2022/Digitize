const Project = require('./../models/projectModel');
const factory = require('./handlerFactory');

exports.getAllProjects = factory.getAll(Project);
exports.createProject = factory.createOne(Project);
exports.getProject = factory.getOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
