// pages/api/getData.js
import connectToDatabase from "../../lib/mongoose";
import FormData from "@/models/FormData";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    // Fetch the data from a collection
    const data = await FormData.find({});

    res.status(200).json({ success: true, data });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ success: false, error: "Database connection error" });
  }
}
