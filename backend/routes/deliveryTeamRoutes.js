const express = require("express");
const deliveryTeamController = require("../controllers/deliveryTeamController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(deliveryTeamController.getAllDeliveryTeams)
  .post(authController.isAdmin, deliveryTeamController.createDeliveryTeam);

router
  .route("/:id")
  .get(deliveryTeamController.getDeliveryTeam)
  .patch(authController.isAdmin, deliveryTeamController.updateDeliveryTeam)
  .delete(authController.isAdmin, deliveryTeamController.deleteDeliveryTeam);

module.exports = router;
