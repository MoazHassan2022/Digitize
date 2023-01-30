const fs = require("fs");
const Activity = require("./../models/activityModel");
const Cabine = require("../models/cabineModel");
const DeliveryTeam = require("./../models/deliveryTeamModel");
const DeliveryWay = require("./../models/deliveryWayModel");
const Project = require("./../models/projectModel");
const Row = require("./../models/rowModel");
const SiteEngineer = require("./../models/siteEngineerModel");
const SiteSupervisorAssistant = require("./../models/siteSupervisorAssistantModel");
const SiteSupervisorMain = require("./../models/siteSupervisorMainModel");
const User = require("./../models/usersModel");
const dbConnect = require("./../db-connection/connection");

dbConnect();

const activities = JSON.parse(fs.readFileSync(`${__dirname}/activities.json`, "utf-8"));
const cabines = JSON.parse(fs.readFileSync(`${__dirname}/cabines.json`, "utf-8"));
const deliveryteams = JSON.parse(fs.readFileSync(`${__dirname}/deliveryteams.json`, "utf-8"));
const deliveryways = JSON.parse(fs.readFileSync(`${__dirname}/deliveryways.json`, "utf-8"));
const projects = JSON.parse(fs.readFileSync(`${__dirname}/projects.json`, "utf-8"));
const rows = JSON.parse(fs.readFileSync(`${__dirname}/rows.json`, "utf-8"));
const siteengineers = JSON.parse(fs.readFileSync(`${__dirname}/siteengineers.json`, "utf-8"));
const sitesupervisorassistants = JSON.parse(fs.readFileSync(`${__dirname}/sitesupervisorassistants.json`, "utf-8"));
const sitesupervisormains = JSON.parse(fs.readFileSync(`${__dirname}/sitesupervisormains.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

/**
 * Inserts all seeds in the collections
 */
const importData = async () => {
  try {
    await Activity.create(activities, { validateBeforeSave: false });
    await Cabine.create(cabines, { validateBeforeSave: false });
    await DeliveryTeam.create(deliveryteams, { validateBeforeSave: false });
    await DeliveryWay.create(deliveryways, { validateBeforeSave: false });
    await Project.create(projects, { validateBeforeSave: false });
    await Row.create(rows, { validateBeforeSave: false });
    await SiteEngineer.create(siteengineers, { validateBeforeSave: false });
    await SiteSupervisorAssistant.create(sitesupervisorassistants, { validateBeforeSave: false });
    await SiteSupervisorMain.create(sitesupervisormains, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

/**
 * Deletes all collections' documents
 */
const deleteData = async () => {
  try {
    await Activity.deleteMany();
    await Cabine.deleteMany();
    await DeliveryTeam.deleteMany();
    await DeliveryWay.deleteMany();
    await Project.deleteMany();
    await Row.deleteMany();
    await SiteEngineer.deleteMany();
    await SiteSupervisorAssistant.deleteMany();
    await SiteSupervisorMain.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
