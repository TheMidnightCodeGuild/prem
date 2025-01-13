import React from "react";
import Image from "next/image";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Blog3 = () => {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src="/images/card-3.webp"
              alt="Simhasth Kumbh Mela"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500 mb-4">March 5, 2024</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Your Ultimate Guide to Ujjain's Simhasth Kumbh Mela
            </h1>

            <div className="prose max-w-none">
              <p className="mb-6">
                The Simhasth Kumbh Mela in Ujjain is one of the largest spiritual gatherings in the world. As your trusted accommodation partner, Hotel Prem Chaya Inn is here to help you plan your visit during this auspicious event.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Understanding Simhasth Kumbh Mela</h2>
              <p className="mb-6">
                The Kumbh Mela occurs in Ujjain every 12 years when celestial alignments bring special spiritual significance to the holy waters of the Shipra River. Millions of devotees gather to participate in sacred bathing rituals and seek spiritual enlightenment.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Special Arrangements at Hotel Prem Chaya Inn</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Advanced booking system for guaranteed accommodation</li>
                <li>Extended stay packages with special rates</li>
                <li>Additional security measures during the event</li>
                <li>24/7 assistance for navigation and information</li>
                <li>Special meal arrangements during peak days</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Essential Tips for Attendees</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Book your accommodation well in advance</li>
                <li>Keep important documents and valuables secure</li>
                <li>Stay hydrated and carry necessary medications</li>
                <li>Follow official guidelines and announcements</li>
                <li>Use authorized transportation services</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Our Location Advantage</h2>
              <p className="mb-6">
                Hotel Prem Chaya Inn's strategic location provides easy access to major Kumbh Mela sites while offering a peaceful retreat from the crowds. Our staff is well-versed with the event schedule and can help you plan your activities efficiently.
              </p>

              <p>
                Make your Simhasth Kumbh Mela experience memorable and comfortable with Hotel Prem Chaya Inn. Contact us today to discuss your accommodation needs during this sacred event.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog3;
