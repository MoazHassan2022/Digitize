const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(
    authController.isAdmin,
    projectController.uploadProjectMap,
    projectController.resizeProjectMap,
    projectController.createProject
  );

router
  .route('/:id')
  .get(projectController.getProject)

  .patch(
    authController.isAdmin,
    projectController.uploadProjectMap,
    projectController.resizeProjectMap,
    projectController.updateProject
  )
  .delete(authController.isAdmin, projectController.deleteProject);

module.exports = router;
