const express = require("express");
const activityController = require("../controllers/activityController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(activityController.getAllActivities)
  .post(authController.isAdmin, activityController.createActivity);

router
  .route("/:id")
  .get(activityController.getActivity)
  .patch(authController.isAdmin, activityController.updateActivity)
  .delete(authController.isAdmin, activityController.deleteActivity);

module.exports = router;
