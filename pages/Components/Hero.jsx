import React, { useState, useEffect } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false); 
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [validationError, setValidationError] = useState(null);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    if (isRoomModalOpen) {
      fetchRooms();
    }
  }, [isRoomModalOpen]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rooms/getRooms');
      const data = await response.json();
      if (data.success) {
        setRooms(data.rooms);
      } else {
        throw new Error(data.message || 'Failed to fetch rooms');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setValidationError('Failed to load rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReserveClick = () => {
    setIsModalOpen(true);
  };

  const handleRoomSelection = (roomType, isAC, quantity) => {
    setSelectedRooms(prev => {
      const existingRoom = prev.find(room => room.type === roomType && room.isAC === isAC);
      
      if (existingRoom) {
        if (quantity === 0) {
          return prev.filter(room => room !== existingRoom);
        }
        return prev.map(room => 
          room === existingRoom ? { ...room, quantity } : room
        );
      } else if (quantity > 0) {
        return [...prev, { type: roomType, isAC, quantity }];
      }
      return prev;
    });
  };

  const handleValidateBooking = async () => {
    if (!checkIn || !checkOut) {
      setValidationError('Please select check-in and check-out dates');
      return;
    }

    if (selectedRooms.length === 0) {
      setValidationError('Please select at least one room');
      return;
    }

    try {
      const response = await fetch('/api/booking/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedRooms,
          adults,
          children,
          checkIn,
          checkOut
        }),
      });

      const data = await response.json();

      if (data.success) {
        setValidationError(null);
        setIsRoomModalOpen(false);
        setIsBookingModalOpen(true);
        setBookingSummary({
          totalPrice: data.totalPrice,
          numberOfNights: data.numberOfNights
        });
      } else {
        setValidationError(data.message);
      }
    } catch (error) {
      console.error('Error validating booking:', error);
      setValidationError('An error occurred while validating your booking');
    }
  };

  const handleReservation = async () => {
    // Validate booking details
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      setBookingStatus('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingDetails.email)) {
      setBookingStatus('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/booking/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingDetails,
          selectedRooms,
          checkIn,
          checkOut,
          adults,
          children,
          totalPrice: bookingSummary?.totalPrice
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingStatus('Your room has been reserved. The hotel will confirm your booking shortly.');
        // Reset all states after successful booking
        setTimeout(() => {
          setIsModalOpen(false);
          setIsRoomModalOpen(false);
          setIsBookingModalOpen(false);
          setIsSummaryModalOpen(false);
          setSelectedRooms([]);
          setBookingDetails({
            name: '',
            email: '',
            phone: ''
          });
          setBookingStatus(null);
        }, 3000);
      } else {
        setBookingStatus(data.message || 'Failed to reserve room. Please try again.');
      }
    } catch (error) {
      console.error('Error reserving room:', error);
      setBookingStatus('An error occurred while reserving the room');
    }
  };

  return (
    <div className="relative h-[93vh] sm:h-screen md:h-screen lg:h-screen xl:h-screen w-full  bg-gradient-to-b from-[#AFAFDA] to-white mt-10">
      <div className="relative z-10 h-full w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-white w-full lg:w-1/2">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-2 sm:mb-4 tracking-tight leading-tight">
            Welcome to  <span className="text-[#6B6BE3]">Hotel Prem Chaya</span> in Ujjain
          </h1>
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl mb-4 sm:mb-8  italic font-semibold">
            Your Home Away From Home
          </h2>
          <p className="mb-6 sm:mb-10 text-base sm:text-lg md:text-lg max-w-xl leading-relaxed text-slate-600 font-semibold">
            &quot;Experience the perfect blend of luxury and comfort at Hotel Prem Chaya. 
            Situated in the heart of Ujjain, we offer exceptional hospitality with modern amenities 
            while keeping you connected to the spiritual essence of the holy city. 
            Conveniently located near the sacred Mahakaleshwar Temple, making your stay both comfortable and divine.&quot;
          </p>
          
          <button
            onClick={handleReserveClick}
            className="rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 w-fit overflow-hidden group bg-[#6B6BE3] relative hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 text-white text-sm sm:text-base md:text-lg font-semibold hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all ease-out duration-300 shadow-lg">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Reserve Your Room Now</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-1/2 h-full relative">
          <Image
            src="/images/home.png"
            alt="Hotel Prem Chaya"
            fill
            className="object-cover rounded-l-3xl"
            priority
          />
        </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Reserve Your Stay</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  className="w-full p-2 border rounded-md"
                  placeholderText="Select check-in date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn}
                  className="w-full p-2 border rounded-md"
                  placeholderText="Select check-out date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  {[0, 1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Child' : 'Children'}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-[#6B6BE3] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => {
                  if (checkIn && checkOut) {
                    setIsModalOpen(false);
                    setIsRoomModalOpen(true);
                  }
                }}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Selection Modal */}
      {isRoomModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Select Your Rooms</h3>
              <button 
                onClick={() => setIsRoomModalOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-4">Loading rooms...</div>
            ) : (
              <div className="space-y-4">
                {validationError && (
                  <div className="text-red-500 text-sm">{validationError}</div>
                )}
                
                {rooms.map((room, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{room.roomType}</h4>
                        <p className="text-sm text-gray-600">{room.isAC ? 'AC' : 'Non-AC'}</p>
                        <p className="text-sm text-gray-600">Max Occupancy: {room.maxOccupancy}</p>
                        <p className="text-sm font-semibold">₹{room.price}/night</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <select
                          className="p-2 border rounded-md"
                          onChange={(e) => handleRoomSelection(room.roomType, room.isAC, Number(e.target.value))}
                          value={selectedRooms.find(r => r.type === room.roomType && r.isAC === room.isAC)?.quantity || 0}
                        >
                          {[...Array(room.totalRooms + 1)].map((_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="w-full bg-[#6B6BE3] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleValidateBooking}
                  disabled={selectedRooms.length === 0}
                >
                  Continue to Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Enter Your Details</h3>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button
                className="w-full bg-[#6B6BE3] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => {
                  if (bookingDetails.name && bookingDetails.email && bookingDetails.phone) {
                    setIsBookingModalOpen(false);
                    setIsSummaryModalOpen(true);
                  }
                }}
              >
                View Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Summary Modal */}
      {isSummaryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Booking Summary</h3>
              <button 
                onClick={() => setIsSummaryModalOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Guest Information</h4>
                <p>Name: {bookingDetails.name}</p>
                <p>Email: {bookingDetails.email}</p>
                <p>Phone: {bookingDetails.phone}</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Stay Details</h4>
                <p>Check-in: {checkIn?.toLocaleDateString()}</p>
                <p>Check-out: {checkOut?.toLocaleDateString()}</p>
                <p>Number of Nights: {bookingSummary?.numberOfNights}</p>
                <p>Adults: {adults}</p>
                <p>Children: {children}</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Room Details</h4>
                {selectedRooms.map((room, index) => {
                  const roomDetails = rooms.find(r => r.roomType === room.type && r.isAC === room.isAC);
                  return (
                    <div key={index} className="mb-2">
                      <p>{room.quantity}x {room.type} ({room.isAC ? 'AC' : 'Non-AC'})</p>
                      <p className="text-sm text-gray-600">₹{roomDetails?.price} per night</p>
                    </div>
                  );
                })}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">Total Amount: ₹{bookingSummary?.totalPrice}</p>
              </div>
              {bookingStatus && (
                <div className={`text-center p-2 rounded ${bookingStatus.includes('reserved') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {bookingStatus}
                </div>
              )}
              <button
                className="w-full bg-[#6B6BE3] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                onClick={handleReservation}
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
