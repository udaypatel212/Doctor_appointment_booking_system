const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,        // smtp.gmail.com
  port: process.env.MAIL_PORT,        // 587
  secure: false,                      // false for 587
  auth: {
    user: process.env.MAIL_USER,      // your gmail
    pass: process.env.MAIL_PASS,      // app password
  },
});

const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"MyClinic" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
};

module.exports = sendMail;
