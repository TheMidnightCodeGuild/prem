import connectToDatabase from "../../../lib/mongoose";
import mongoose from "mongoose";
import Room from "../../../models/Room";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { selectedRooms, adults, children, checkIn, checkOut } = req.body;
    
    // Validate required fields
    if (!selectedRooms?.length) {
      return res.status(400).json({
        success: false,
        message: 'Selected rooms are required'
      });
    }

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-in and check-out dates are required'
      });
    }

    if (typeof adults !== 'number' || adults < 1) {
      return res.status(400).json({
        success: false,
        message: 'At least 1 adult is required'
      });
    }

    if (typeof children !== 'number' || children < 0) {
      return res.status(400).json({
        success: false,
        message: 'Number of children must be 0 or greater'
      });
    }

    const totalGuests = adults + children;

    await connectToDatabase();

    // Get room details for selected rooms
    const roomDetails = await Promise.all(
      selectedRooms.map(async (selectedRoom) => {
        const room = await Room.findOne({
          roomType: selectedRoom.type,
          isAC: selectedRoom.isAC
        });

        if (!room) {
          throw new Error(`Room type "${selectedRoom.type}" (${selectedRoom.isAC ? 'AC' : 'Non-AC'}) not found`);
        }

        return {
          ...room.toObject(),
          quantity: selectedRoom.quantity
        };
      })
    );

    // Calculate total capacity of selected rooms
    const totalCapacity = roomDetails.reduce((sum, room) => {
      return sum + (room.maxOccupancy * room.quantity);
    }, 0);

    if (totalGuests > totalCapacity) {
      // Find rooms with higher capacity
      const alternativeRooms = await Room.find({
        maxOccupancy: { $gt: Math.ceil(totalGuests / selectedRooms[0].quantity) }
      }).sort({ maxOccupancy: 1 }).limit(3);

      return res.status(400).json({
        success: false,
        message: 'The selected rooms cannot accommodate all guests',
        suggestedActions: {
          increaseRooms: `Consider booking ${Math.ceil(totalGuests / roomDetails[0].maxOccupancy)} rooms of the same type`,
          upgradeRooms: alternativeRooms.length > 0 
            ? `Consider upgrading to ${alternativeRooms.map(r => r.roomType).join(' or ')} which can accommodate more guests`
            : null
        },
        currentCapacity: totalCapacity,
        requiredCapacity: totalGuests
      });
    }

    // Validate room availability
    for (const room of roomDetails) {
      if (room.quantity > room.totalRooms) {
        return res.status(400).json({
          success: false,
          message: `Only ${room.totalRooms} ${room.roomType} rooms (${room.isAC ? 'AC' : 'Non-AC'}) are available`
        });
      }
    }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const totalPrice = roomDetails.reduce((sum, room) => {
      return sum + (room.price * room.quantity * numberOfNights);
    }, 0);

    return res.status(200).json({
      success: true,
      message: 'Room capacity validation successful',
      totalPrice,
      numberOfNights
    });

  } catch (error) {
    console.error('Error validating room capacity:', error);
    return res.status(500).json({
      success: false,
      message: 'Error validating room capacity',
      error: error.message
    });
  }
}
