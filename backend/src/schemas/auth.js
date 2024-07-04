import { z } from "zod";
import User from "../models/User.js";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .refine(
      async (val) => {
        const user = await User.findOne({ username: val });
        return !user;
      },
      { message: "Username already exists" }
    ),
  email: z
    .string()
    .email()
    .refine(
      async (val) => {
        const user = await User.findOne({ email: val });
        return !user;
      },
      { message: "Email already exists" }
    ),
  password: z.string().min(6),
});
