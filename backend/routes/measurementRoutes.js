const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.route("/").get((req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: 3,
    data: {
      data: [{ unit: "م3" }, { unit: "م" }, { unit: "وحدة" }],
    },
  });
});
module.exports = router;
