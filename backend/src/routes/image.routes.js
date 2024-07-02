import { Router } from "express";
import {
  deleteImage,
  getImages,
  updateImage,
  uploadImage,
} from "../controllers/image.js";

const router = Router();

router.route("/").post(uploadImage).get(getImages);

router.route("/:id").delete(deleteImage).put(updateImage);

export default router;
