import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;
