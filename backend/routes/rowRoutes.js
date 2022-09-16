const express = require('express');
const rowController = require('../controllers/rowController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.isAdmin, rowController.getAllRows)
  .post(rowController.createDate, rowController.createRow);

router
  .route('/:id')
  .get(authController.isAdmin, rowController.getRow)
  .patch(authController.isAdmin, rowController.updateRow)
  .delete(authController.isAdmin, rowController.deleteRow);

module.exports = router;
