const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    isAC: {
        type: Boolean,
        required: true
    },
    maxOccupancy: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: [{
        date: {
            type: String,
            required: true
        },
        availableRooms: {
            type: Number,
            required: true
        }
    }]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;