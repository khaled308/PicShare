import Image from "../models/Image.js";
import { destroy, upload } from "../utils/upload-image.js";

export const uploadImage = async (req, res) => {
  const { image: file, title } = req.body;
  try {
    if (!file) {
      return res.status(400).json({ error: "Image is required" });
    }

    if (!file.startsWith("data:image")) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const response = await upload(file, "photo-share");

    if (!response) {
      return res.status(500).json({ error: "Failed to upload image" });
    }
    const image = await Image.create({
      title,
      imageUrl: response.secure_url,
      public_id: response.public_id,
      //   user: req.user._id,
    });

    res.status(200).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    await destroy(image.public_id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const image = await Image.findByIdAndUpdate(id, { title }, { new: true });
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json({ message: "Image updated successfully", image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
