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
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">Error</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add Room Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Add New Room</h2>
          <form onSubmit={handleRoomSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type</label>
                  <input
                    type="text"
                    value={roomData.roomType}
                    onChange={(e) => setRoomData({...roomData, roomType: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    placeholder="e.g. Deluxe Room"
                    required
                  />
                </div>
                
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={roomData.isAC}
                      onChange={(e) => setRoomData({...roomData, isAC: e.target.checked})}
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-gray-700">Air Conditioned</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Night</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">₹</span>
                    </div>
                    <input
                      type="number"
                      value={roomData.price}
                      onChange={(e) => setRoomData({...roomData, price: e.target.value})}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Rooms</label>
                  <input
                    type="number"
                    value={roomData.totalRooms}
                    onChange={(e) => setRoomData({...roomData, totalRooms: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    placeholder="Number of rooms available"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={roomData.description}
                    onChange={(e) => setRoomData({...roomData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    rows="4"
                    placeholder="Describe the room features and highlights..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label>
                  <input
                    type="text"
                    value={roomData.amenities}
                    onChange={(e) => setRoomData({...roomData, amenities: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    placeholder="e.g. TV, WiFi, Mini-bar (comma separated)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Occupancy</label>
                  <input
                    type="number"
                    value={roomData.maxOccupancy}
                    onChange={(e) => setRoomData({...roomData, maxOccupancy: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    placeholder="Maximum number of guests"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Add Room
              </button>
            </div>
          </form>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bookings</h2>
            <div className="w-48">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Bookings</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guest</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rooms</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guests</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{booking.user.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{booking.user.email}</div>
                      <div className="text-sm text-gray-600">{booking.user.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-900">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">{booking.numberOfNights} nights</div>
                    </td>
                    <td className="px-6 py-4">
                      {booking.rooms.map((room, index) => (
                        <div key={index} className="text-sm text-gray-900">
                          {room.quantity}x {room.type} ({room.isAC ? 'AC' : 'Non-AC'})
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Adults: {booking.numberOfAdults}</div>
                      <div className="text-sm text-gray-600">Children: {booking.numberOfChildren}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">₹{booking.totalPrice}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
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
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Details</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  formData.map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.mobile || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{entry.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAdminDashboard;
