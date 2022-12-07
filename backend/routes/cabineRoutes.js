const express = require("express");
const cabineController = require("../controllers/cabineController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(cabineController.getAllCabines)
  .post(authController.isAdmin, cabineController.createCabine);

router
  .route("/:id")
  .get(cabineController.getCabine)
  .patch(authController.isAdmin, cabineController.updateCabine)
  .delete(authController.isAdmin, cabineController.deleteCabine);

module.exports = router;
