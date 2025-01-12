import connectToDatabase from "../../../lib/mongoose";
import Booking from "../../../models/Booking";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Get month from query params, default to current month
    const { month } = req.query;
    let dateFilter = {};

    if (month) {
      // If month is provided, filter bookings for that month
      const year = new Date().getFullYear();
      const startDate = new Date(year, month - 1, 1); // month is 0-based
      const endDate = new Date(year, month, 0); // Get last day of month

      dateFilter = {
        checkIn: {
          $gte: startDate,
          $lte: endDate
        }
      };
    }

    const bookings = await Booking.find(dateFilter)
      .sort({ checkIn: -1 }) // Sort by check-in date, most recent first
      .select({
        'user.name': 1,
        'user.email': 1,
        'user.phone': 1,
        checkIn: 1,
        checkOut: 1,
        numberOfNights: 1,
        numberOfAdults: 1,
        numberOfChildren: 1,
        rooms: 1,
        totalPrice: 1,
        status: 1,
        _id: 1
      });

    return res.status(200).json({
      success: true,
      bookings: bookings
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
}
