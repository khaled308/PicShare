import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { registerSchema } from "../schemas/auth.js";
import { login, register, verifyEmail } from "../controllers/auth.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", login);
router.put("/verify-email/:token", verifyEmail);

export default router;
