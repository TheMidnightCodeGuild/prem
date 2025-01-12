import React from "react";
import { Carousel } from "react-responsive-3d-carousel";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Swiper() {
  const imageData = [
    {
      src: "/images/card-1.webp",
      alt: "Mahakal Temple",
      title: "Mahakaleshwar Jyotirlinga",
    },
    {
      src: "/images/chamundamata.jpg", 
      alt: "Mahakal Temple",
      title: "Chamunda Mata Mandir",
    },
    {
      src: "/images/card-2.webp",
      alt: "Harsidhi Mata Mandir",
      title: "Harsidhi Mata Mandir",
    },
    {
      src: "/images/card-3.webp",
      alt: "Mahakal Lok",
      title: "Mahakal Lok",
    },
    {
      src: "/images/card-5.webp",
      alt: "Harsidhi Mata Mandir",
      title: "Ram Ghat",
    },
    {
      src: "/images/card-6.webp",
      alt: "Kal Bharav Mandir",
      title: "Kal Bharav Mandir",
    },
    {
      src: "/images/card-7.webp",
      alt: "ISCKON Temple",
      title: "ISCKON Temple ",
    },
  ];

  const images = imageData.map((item) => (
    <motion.div
      key={item.alt}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{
        scale: 1.05,
        rotateY: 15,
        perspective: 1000,
      }}
      initial={{
        transformStyle: "preserve-3d",
        rotateY: 0,
        perspective: 1000,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        priority={item.alt === "Mahakal Temple"}
      />
      <h2 className="absolute bottom-0 left-0 right-0 bg-gray-900/30 text-white p-4 text-center text-lg font-semibold">
        {item.title}
      </h2>
    </motion.div>
  ));

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-screen mx-auto pt-28  ">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">
          Destinations Nearby
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Explore the most popular nearby attractions
        </p>
      </div>
      <Carousel
        showIndicators={false}
        depth={1}
        showStatus={false}
        className="rounded-xl"
        renderArrowPrev={(clickHandler) => (
          <button
            onClick={clickHandler}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        renderArrowNext={(clickHandler) => (
          <button
            onClick={clickHandler}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}>
        {images}
      </Carousel>
    </div>
  );
}
