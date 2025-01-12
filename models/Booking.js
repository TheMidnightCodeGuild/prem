const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    rooms: [{
        type: {
            type: String,
            required: true
        },
        isAC: {
            type: Boolean,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalGuests: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['reserved', 'confirmed', 'cancelled', 'completed']
    }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

module.exports = Booking;