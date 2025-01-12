import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongoose";
import FormData from "@/models/FormData";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectToDatabase();

    const data = req.body; // Get form data from request
    const newData = new FormData(data);
    await newData.save(); // Save to MongoDB

    // Set up Nodemailer to send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Use your verified sender email
      to: "vakratundahomestay@gmail.com", // Recipient's email
      subject: `New Enquiry from ${data.name}!`, // Email subject
      text: `You have received a new enquiry.\n\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nMessage: ${data.message}`,
    };

    await transporter.sendMail(mailOptions); // Send the email

    // Respond with success
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
