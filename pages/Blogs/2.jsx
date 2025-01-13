import React from "react";
import Image from "next/image";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Blog2 = () => {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src="/images/card-2.webp"
              alt="Tourist Destinations"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500 mb-4">March 10, 2024</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Top 5 Tourist Destinations Around Our Hotel
            </h1>

            <div className="prose max-w-none">
              <p className="mb-6">
                Hotel Prem Chaya Inn is ideally situated to explore the rich cultural heritage of Ujjain. Here are the top 5 must-visit attractions that are easily accessible from our location.
              </p>

              <h2 className="text-2xl font-semibold mb-4">1. Ram Ghat</h2>
              <p className="mb-6">
                One of the most sacred ghats along the Shipra River, Ram Ghat is known for its spiritual significance and stunning sunrise views. It's a perfect spot for morning prayers and meditation.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Kal Bhairav Temple</h2>
              <p className="mb-6">
                This ancient temple is dedicated to the guardian deity of Ujjain. Known for its unique rituals and historical importance, it's a must-visit for both spiritual seekers and history enthusiasts.
              </p>

              <h2 className="text-2xl font-semibold mb-4">3. Vedh Shala (Observatory)</h2>
              <p className="mb-6">
                Built in the 18th century, this astronomical observatory showcases ancient Indian astronomical science. The instruments here still accurately calculate time, celestial positions, and astronomical events.
              </p>

              <h2 className="text-2xl font-semibold mb-4">4. Sandipani Ashram</h2>
              <p className="mb-6">
                This ancient gurukul is where Lord Krishna and Sudama received their education. The peaceful surroundings and historical significance make it a fascinating visit.
              </p>

              <h2 className="text-2xl font-semibold mb-4">5. Mangalnath Temple</h2>
              <p className="mb-6">
                Believed to be the birthplace of Mars (Mangal), this temple offers panoramic views of the city and is particularly significant for astrological purposes.
              </p>

              <p>
                Our hotel staff would be happy to arrange guided tours to these locations and provide additional information about their historical and cultural significance.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog2;
