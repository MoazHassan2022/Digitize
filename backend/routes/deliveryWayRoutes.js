const express = require('express');
const deliveryWayController = require('../controllers/deliveryWayController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(deliveryWayController.getAllDeliveryWays)
  .post(authController.isAdmin, deliveryWayController.createDeliveryWay);

router
  .route('/:id')
  .get(deliveryWayController.getDeliveryWay)
  .patch(authController.isAdmin, deliveryWayController.updateDeliveryWay)
  .delete(authController.isAdmin, deliveryWayController.deleteDeliveryWay);

module.exports = router;
