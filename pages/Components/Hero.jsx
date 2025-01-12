import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleReserveClick = () => {
    setIsModalOpen(true);
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
                  // Handle reservation logic here
                  if (checkIn && checkOut) {
                    console.log('Reservation details:', { checkIn, checkOut, adults, children });
                    setIsModalOpen(false);
                  }
                }}>
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
