import React from "react";
import Image from "next/image";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Blog1 = () => {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src="/images/card-1.webp"
              alt="Mahakaleshwar Temple"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500 mb-4">March 15, 2024</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Experience the Divine Stay Near Mahakaleshwar Temple
            </h1>

            <div className="prose max-w-none">
              <p className="mb-6">
                Welcome to Hotel Prem Chaya Inn, your spiritual sanctuary just steps away from the sacred Mahakaleshwar Temple. We understand the profound significance of your pilgrimage and have crafted an experience that combines comfort with convenience for all devotees and spiritual seekers.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Special Facilities for Pilgrims</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Early morning wake-up service for Bhasma Aarti</li>
                <li>Temple visit assistance and guidance</li>
                <li>Prayer room facilities</li>
                <li>Traditional prasad arrangements</li>
                <li>Special vegetarian meals</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Location Advantages</h2>
              <p className="mb-6">
                Our strategic location offers unparalleled access to the Mahakaleshwar Temple complex. The short walking distance ensures you can easily participate in all temple activities, from early morning ceremonies to evening aartis, without any transportation hassles.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Comfortable Accommodations</h2>
              <p className="mb-6">
                After your spiritual activities, retreat to our well-appointed rooms designed for complete relaxation. Each room features modern amenities while maintaining a serene atmosphere conducive to meditation and reflection.
              </p>

              <p>
                Book your stay with us and immerse yourself in the divine atmosphere of Ujjain while enjoying the comfort and convenience of Hotel Prem Chaya Inn.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog1;
