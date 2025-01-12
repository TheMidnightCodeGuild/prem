import Room from '../../../models/Room';
import connectToDatabase from '../../../lib/mongoose';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectToDatabase();
        
        const { roomType, isAC, maxOccupancy, price, totalRooms, description, amenities } = req.body;

        // Validate required fields
        if (!roomType || isAC === undefined || !maxOccupancy || !price || !totalRooms) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new room
        const room = new Room({
            roomType,
            isAC,
            maxOccupancy: parseInt(maxOccupancy),
            price: parseFloat(price),
            totalRooms: parseInt(totalRooms),
            description: description || '',
            amenities: amenities || '',
        });

        await room.save();

        return res.status(201).json({ 
            message: 'Room added successfully',
            room
        });

    } catch (error) {
        console.error('Error adding room:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
