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
  const [isProcessing, setIsProcessing] = useState(false);

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

    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReservation = async () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      setBookingStatus('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingDetails.email)) {
      setBookingStatus('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B6BE3]"></div>
    </div>
  );

  return (
    <div className="relative h-[93vh] sm:h-screen md:h-screen lg:h-screen xl:h-screen w-full bg-gradient-to-b from-[#AFAFDA] to-white mt-10">
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-white w-full lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-2 sm:mb-4 tracking-tight leading-tight text-center lg:text-left">
            Welcome to <span className="text-[#6B6BE3]">Hotel Prem Chaya</span> in Ujjain
          </h1>
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl mb-4 sm:mb-8 italic font-semibold text-center lg:text-left">
            Your Home Away From Home
          </h2>
          <p className="mb-6 sm:mb-10 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed text-slate-600 font-semibold text-center lg:text-left px-4 lg:px-0">
            &quot;Experience the perfect blend of luxury and comfort at Hotel Prem Chaya. 
            Situated in the heart of Ujjain, we offer exceptional hospitality with modern amenities 
            while keeping you connected to the spiritual essence of the holy city. 
            Conveniently located near the sacred Mahakaleshwar Temple, making your stay both comfortable and divine.&quot;
          </p>
          
          <div className="flex justify-center lg:justify-start">
            <button
              onClick={handleReserveClick}
              className="rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 w-fit overflow-hidden group bg-[#6B6BE3] relative hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 text-white text-sm sm:text-base md:text-lg font-semibold hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all ease-out duration-300 shadow-lg">
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Reserve Your Room Now</span>
            </button>
          </div>
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

        {/* Mobile Image */}
        <div className="lg:hidden w-full h-64 relative mt-8 mb-4">
          <Image
            src="/images/home.png"
            alt="Hotel Prem Chaya"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Reserve Your Stay</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in Date</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholderText="Select check-in date"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out Date</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholderText="Select check-out date"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Adults</label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Children</label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {[0, 1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Child' : 'Children'}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-[#6B6BE3] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Select Your Rooms</h3>
              <button 
                onClick={() => setIsRoomModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-6">
                {validationError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{validationError}</div>
                )}
                
                {rooms.map((room, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{room.roomType}</h4>
                        <p className="text-sm text-gray-600">{room.isAC ? 'AC' : 'Non-AC'}</p>
                        <p className="text-sm text-gray-600">Max Occupancy: {room.maxOccupancy}</p>
                        <p className="text-lg font-bold text-[#6B6BE3] mt-2">₹{room.price}/night</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                        <select
                          className="p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full bg-[#6B6BE3] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleValidateBooking}
                  disabled={selectedRooms.length === 0 || isProcessing}
                >
                  {isProcessing ? <LoadingSpinner /> : 'Continue to Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Enter Your Details</h3>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button
                className="w-full bg-[#6B6BE3] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Booking Summary</h3>
              <button 
                onClick={() => setIsSummaryModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-lg mb-3">Guest Information</h4>
                <p className="text-sm text-gray-700">Name: {bookingDetails.name}</p>
                <p className="text-sm text-gray-700">Email: {bookingDetails.email}</p>
                <p className="text-sm text-gray-700">Phone: {bookingDetails.phone}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-lg mb-3">Stay Details</h4>
                <p className="text-sm text-gray-700">Check-in: {checkIn?.toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">Check-out: {checkOut?.toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">Number of Nights: {bookingSummary?.numberOfNights}</p>
                <p className="text-sm text-gray-700">Adults: {adults}</p>
                <p className="text-sm text-gray-700">Children: {children}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-lg mb-3">Room Details</h4>
                {selectedRooms.map((room, index) => {
                  const roomDetails = rooms.find(r => r.roomType === room.type && r.isAC === room.isAC);
                  return (
                    <div key={index} className="mb-3">
                      <p className="text-sm font-semibold text-gray-900">{room.quantity}x {room.type} ({room.isAC ? 'AC' : 'Non-AC'})</p>
                      <p className="text-sm text-gray-600">₹{roomDetails?.price} per night</p>
                    </div>
                  );
                })}
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-xl font-bold text-[#6B6BE3] text-right">Total Amount: ₹{bookingSummary?.totalPrice}</p>
              </div>
              {bookingStatus && (
                <div className={`p-4 rounded-xl text-center ${bookingStatus.includes('reserved') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {bookingStatus}
                </div>
              )}
              <button
                className="w-full bg-[#6B6BE3] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReservation}
                disabled={isProcessing}
              >
                {isProcessing ? <LoadingSpinner /> : 'Reserve Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
