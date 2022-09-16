const express = require('express');
const siteEngineerController = require('../controllers/siteEngineerController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(siteEngineerController.getAllSiteEngineers)
  .post(authController.isAdmin, siteEngineerController.createSiteEngineer);

router
  .route('/:id')
  .get(siteEngineerController.getSiteEngineer)
  .patch(authController.isAdmin, siteEngineerController.updateSiteEngineer)
  .delete(authController.isAdmin, siteEngineerController.deleteSiteEngineer);

module.exports = router;
