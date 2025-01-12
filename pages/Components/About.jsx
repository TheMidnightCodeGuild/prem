import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BannerSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div >
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full h-screen bg-gradient-to-b from-white to-[#f0f0ff] py-16 md:py-24 px-4 md:px-8 mt-10">
      <div className="w-full mx-auto">
        <motion.div 
          variants={fadeIn} 
          className="text-center "
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#4444d1] to-[#6b6be3] bg-clip-text text-transparent drop-shadow-sm">
            PREM CHAYA INN
          </h1>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl backdrop-blur-sm bg-white/30 rounded-2xl  p-6 md:p-8">
            <motion.p
              variants={fadeIn}
              className="text-center text-base xs:text-lg text-gray-800 md:hidden">
              &quot;Experience comfort and convenience at Prem Chaya Inn in Ujjain.&quot;
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="hidden  font-semibold md:block text-center text-lg lg:text-xl leading-relaxed text-gray-800 px-4 lg:px-16">
              &quot;Welcome to Prem Chaya Inn, your ideal accommodation in Ujjain. Located near the railway station 
              with easy access to Mahakaleshwar Temple, we offer comfortable rooms with modern amenities. Experience 
              our warm hospitality and peaceful atmosphere that makes us your perfect home away from home.&quot;
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-sm rounded-xl transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="https://www.anamalahomestays.com/assets/img/icons/ep.svg"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="Prime Location"
                width={56}
                height={56}
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              Prime Location
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-sm rounded-xl transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="https://www.anamalahomestays.com/assets/img/icons/hf.svg"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="24/7 Reception"
                width={56}
                height={56}
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              24/7 Reception
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="https://www.anamalahomestays.com/assets/img/icons/pl.svg"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="Clean Rooms"
                width={56}
                height={56}
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              Clean Rooms
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="https://www.anamalahomestays.com/assets/img/icons/ec.svg"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="Professional Service"
                width={56}
                height={56}
                loading="lazy"
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              Professional Service
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 sm:w-14 sm:h-14 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              Free Wi-Fi
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="/images/water.svg"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="Hot & Cold Water"
                width={56}
                height={56}
                loading="lazy"
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              Hot & Cold Water
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="/images/security.svg"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="24/7 Security"
                width={56}
                height={56}
                loading="lazy"
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              24/7 Security
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            className="transition-all duration-300 p-4">
            <div className="bg-gradient-to-br from-[#4444d1] to-[#6b6be3] rounded-lg p-3 w-fit mx-auto">
              <Image
                src="/images/ac.png"
                className="w-10 h-10 sm:w-14 sm:h-14 invert"
                alt="Air Conditioned Rooms"
                width={56}
                height={56}
                loading="lazy"
              />
            </div>
            <p className="text-gray-800 mt-2 font-semibold text-sm sm:text-base lg:text-lg text-center">
              Air Conditioned Rooms
            </p>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
    </div>
  );
};

export default BannerSection;
