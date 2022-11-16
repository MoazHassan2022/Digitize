const express = require("express");
const siteSupervisorMainController = require("../controllers/siteSupervisorMainController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(siteSupervisorMainController.getAllSiteSupervisorMains)
  .post(
    authController.isAdmin,
    siteSupervisorMainController.createSiteSupervisorMain
  );

router
  .route("/:id")
  .get(siteSupervisorMainController.getSiteSupervisorMain)
  .patch(
    authController.isAdmin,
    siteSupervisorMainController.updateSiteSupervisorMain
  )
  .delete(
    authController.isAdmin,
    siteSupervisorMainController.deleteSiteSupervisorMain
  );

module.exports = router;
