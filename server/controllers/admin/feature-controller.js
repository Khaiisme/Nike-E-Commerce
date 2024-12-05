const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;


    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
const removeFeatureImage = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  
  try {
    // Use the correct model name
    const result = await Feature.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Feature image not found" });
    }

    res.status(200).json({ success: true, message: "Feature image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete feature image" });
  }
};


module.exports = { addFeatureImage, getFeatureImages, removeFeatureImage };
