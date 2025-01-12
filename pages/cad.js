import React, { useEffect, useState } from "react";

const ContactAdminDashboard = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [roomData, setRoomData] = useState({
    roomType: '',
    isAC: false,
    price: '',
    totalRooms: '',
    description: '',
    amenities: '',
    maxOccupancy: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getData");
        if (!res.ok) {
          const errorDetails = await res.text();
          throw new Error(`Error fetching data: ${errorDetails}`);
        }
        const jsonData = await res.json();
        setFormData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const queryParams = selectedMonth ? `?month=${selectedMonth}` : '';
        const response = await fetch(`/api/booking/view${queryParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
      }
    };

    fetchBookings();
  }, [selectedMonth]);

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/rooms/addRooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomData)
      });

      if (!res.ok) {
        throw new Error('Failed to add room');
      }

      setRoomData({
        roomType: '',
        isAC: false,
        price: '',
        totalRooms: '',
        description: '',
        amenities: '',
        maxOccupancy: ''
      });

      alert('Room added successfully!');
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Failed to add room');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Add Room Section */}
      <div className="mb-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Room</h2>
        <form onSubmit={handleRoomSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Type</label>
            <input
              type="text"
              value={roomData.roomType}
              onChange={(e) => setRoomData({...roomData, roomType: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={roomData.isAC}
                onChange={(e) => setRoomData({...roomData, isAC: e.target.checked})}
                className="mr-2"
              />
              Air Conditioned
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price per Night</label>
            <input
              type="number"
              value={roomData.price}
              onChange={(e) => setRoomData({...roomData, price: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Rooms</label>
            <input
              type="number"
              value={roomData.totalRooms}
              onChange={(e) => setRoomData({...roomData, totalRooms: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={roomData.description}
              onChange={(e) => setRoomData({...roomData, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
            <input
              type="text"
              value={roomData.amenities}
              onChange={(e) => setRoomData({...roomData, amenities: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Occupancy</label>
            <input
              type="number"
              value={roomData.maxOccupancy}
              onChange={(e) => setRoomData({...roomData, maxOccupancy: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Room
          </button>
        </form>
      </div>

      {/* Bookings Section */}
      <div className="mb-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Bookings</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Bookings</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{booking.user.email}</div>
                    <div>{booking.user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</div>
                    <div>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</div>
                    <div>Nights: {booking.numberOfNights}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.rooms.map((room, index) => (
                      <div key={index}>
                        {room.quantity}x {room.type} ({room.isAC ? 'AC' : 'Non-AC'})
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Adults: {booking.numberOfAdults}</div>
                    <div>Children: {booking.numberOfChildren}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{booking.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Details Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Details</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Name
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Email
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Mobile
              </th>
              <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-3 text-gray-600 font-bold tracking-wider uppercase text-xs">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              formData.map((entry) => (
                <tr key={entry._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.mobile || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {entry.message}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactAdminDashboard;
