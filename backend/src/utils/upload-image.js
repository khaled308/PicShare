import { v2 as cloudinary } from "cloudinary";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "../utils/constants.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const upload = async (file, folder, public_id) => {
  try {
    const response = await cloudinary.uploader.upload_large(file, {
      public_id,
      folder,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const destroy = async (public_id) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch (error) {
    return error;
  }
};
