import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { registerSchema } from "../schemas/auth.js";
import { register } from "../controllers/auth.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

export default router;
