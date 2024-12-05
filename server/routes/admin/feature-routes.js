const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  removeFeatureImage,
} = require("../../controllers/admin/feature-controller");

const router = express.Router();

// Define routes
router.post("/add", addFeatureImage);               // To add a feature image
router.get("/get", getFeatureImages);                // To get all feature images
router.delete("/delete/:id", removeFeatureImage);   // Use DELETE method and expect an ID parameter

module.exports = router;
