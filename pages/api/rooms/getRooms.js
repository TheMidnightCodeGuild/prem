import connectToDatabase from "../../../lib/mongoose";
import mongoose from "mongoose";

// Define Room Schema if not already defined elsewhere
const RoomSchema = new mongoose.Schema({
  roomType: String,
  isAC: Boolean,
  price: Number,
  totalRooms: Number,
  description: String,
  amenities: String,
  maxOccupancy: Number
});

// Get or create Room model
const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    
    const rooms = await Room.find({});
    
    return res.status(200).json({ 
      success: true,
      rooms 
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching rooms',
      error: error.message 
    });
  }
}
