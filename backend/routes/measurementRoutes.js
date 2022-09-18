const express = require('express');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router.route('/').get((req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: 3,
    data: {
      data: ['م3', 'م', 'وحدة'],
    },
  });
});
module.exports = router;
