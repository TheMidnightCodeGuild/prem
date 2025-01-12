const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true
    },
    isAC: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amenities: {
        type: String,
        required: true
    },
    maxOccupancy: {
        type: Number,
        required: true
    }
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

module.exports = Room;