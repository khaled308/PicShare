import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import nodemailer from "nodemailer";

import {
  FRONTEND_URL,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER,
} from "./constants.js";

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

function getHtmlTemplate(replacements) {
  const templateSource = fs.readFileSync(
    path.resolve("./src/templates/email.hbs"),
    "utf-8"
  );
  const template = handlebars.compile(templateSource);
  return template(replacements);
}

async function sendEmail(options) {
  const { to, subject, replacements } = options;
  const html = getHtmlTemplate(replacements);

  const mailOptions = {
    from: MAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export const sendVerificationEmail = async (email, token) => {
  await sendEmail({
    to: email,
    subject: "Verify your account",
    replacements: {
      subject: "Verify your account",
      heading: "Verify your account",
      message: `Please click the link below to verify your account:\n\n${FRONTEND_URL}/verify-email?token=${token}`,
      link: `${FRONTEND_URL}/verify-email?token=${token}`,
      senderName: "PicShare",
    },
  });

  console.log("Verification email sent to:", email);
};
