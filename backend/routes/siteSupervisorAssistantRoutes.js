const express = require('express');
const siteSupervisorAssistantController = require('../controllers/siteSupervisorAssistantController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(siteSupervisorAssistantController.getAllSiteSupervisorAssistants)
  .post(
    authController.isAdmin,
    siteSupervisorAssistantController.createSiteSupervisorAssistant
  );

router
  .route('/:id')
  .get(siteSupervisorAssistantController.getSiteSupervisorAssistant)
  .patch(
    authController.isAdmin,
    siteSupervisorAssistantController.updateSiteSupervisorAssistant
  )
  .delete(
    authController.isAdmin,
    siteSupervisorAssistantController.deleteSiteSupervisorAssistant
  );

module.exports = router;
