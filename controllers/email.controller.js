import nodemailer from "nodemailer";
import { errorHandler } from "../utils/error.js";
import Email from "../models/email.model.js";

import dotenv from "dotenv";

dotenv.config();

export const postEmailHandler = async (req, res, next) => {
  const { name, email, message, phone } = req.body;

  if (!name || !email || !message) {
    return next(errorHandler(400, "All fields are required"));
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: email,
      to: process.env.COMPANY_EMAIL, // Your company's email
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
        Phone: ${phone}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    });

    // console.log(req.body);
    const newEmail = new Email(req.body);
    const savedEmail = await newEmail.save();
    console.log(savedEmail)

    res.status(200).json({savedEmail, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    next(errorHandler(500, "Failed to send email"));
  }
};
