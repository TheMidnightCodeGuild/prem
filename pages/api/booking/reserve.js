import connectToDatabase from "../../../lib/mongoose";
import Booking from "../../../models/Booking";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      selectedRooms,
      checkIn,
      checkOut,
      adults,
      children,
      totalPrice
    } = req.body;

    await connectToDatabase();

    // Calculate number of nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    // Create new booking
    const booking = await Booking.create({
      id: Date.now().toString(), // Add unique ID
      user: {
        name,
        email,
        phone
      },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      numberOfAdults: adults,
      numberOfChildren: children,
      totalGuests: adults + children, // Add total guests
      rooms: selectedRooms.map(room => ({
        type: room.type, // Changed from roomType to type
        isAC: room.isAC,
        quantity: room.quantity
      })),
      totalPrice,
      numberOfNights,
      status: 'reserved',
      bookingSummary: {
        guestInfo: {
          name,
          email,
          phone
        },
        stayDetails: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
          numberOfNights,
          adults,
          children
        },
        roomDetails: selectedRooms,
        totalAmount: totalPrice
      }
    });

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email template
    const emailContent = `
      <h2>Booking Confirmation</h2>
      <h3>Guest Information</h3>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>

      <h3>Stay Details</h3>
      <p>Check-in: ${checkInDate.toLocaleDateString()}</p>
      <p>Check-out: ${checkOutDate.toLocaleDateString()}</p>
      <p>Number of Nights: ${numberOfNights}</p>
      <p>Adults: ${adults}</p>
      <p>Children: ${children}</p>

      <h3>Room Details</h3>
      ${selectedRooms.map(room => `
        <p>${room.quantity}x ${room.type} (${room.isAC ? 'AC' : 'Non-AC'})</p>
      `).join('')}

      <h3>Total Price</h3>
      <p>₹${totalPrice}</p>

      <p>Booking ID: ${booking._id}</p>
    `;

    // Send email to guest
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Booking Confirmation - Hotel Prem Chaya',
      html: emailContent
    });

    // Send email to hotel
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: process.env.HOTEL_EMAIL || 'mayanktilwankar.dev@gmail.com',
      subject: 'New Booking Received',
      html: emailContent
    });

    return res.status(200).json({
      success: true,
      message: 'Booking confirmed successfully',
      bookingId: booking._id
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
}
