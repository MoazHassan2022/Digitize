const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.route("/").get((req, res) => {
  res.status(200).json({
    status: "success",
    results: 16,
    requestAt: req.requestTime,
    data: {
      labels: [
        "Date",
        "Project Code",
        "Site Name",
        "Cabinet Serial",
        "Activity ID",
        "Activity Group",
        "Activity Type",
        "Measurment Unit",
        "Day Progress",
        "Delivery Way",
        "Delivery Team",
        "Site Engineer",
        "Site Supervisor (Main)",
        "Site Supervisor (Assistant)",
        "Photo",
        "Sender",
      ],
    },
  });
});

module.exports = router;
