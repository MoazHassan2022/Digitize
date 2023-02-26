const express = require("express");
const measurementUnitController = require("../controllers/measurementUnitController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(measurementUnitController.getAllMeasurementUnits)
  .post(
    authController.isAdmin,
    measurementUnitController.createMeasurementUnit
  );

router
  .route("/:id")
  .get(measurementUnitController.getMeasurementUnit)
  .patch(
    authController.isAdmin,
    measurementUnitController.updateMeasurementUnit
  )
  .delete(
    authController.isAdmin,
    measurementUnitController.deleteMeasurementUnit
  );

module.exports = router;
