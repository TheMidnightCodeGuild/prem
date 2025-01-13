"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";

import "swiper/css/autoplay";
import "swiper/css/parallax";
import Image from "next/image";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="min-h-screen py-2 md:py-16 pt-48 lg:py-14 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#f0f0ff] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center pb-6 md:pb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
            Our Gallery
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            Explore the essence of beauty in our gallery intimate space.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay, Pagination, Parallax]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full">
          {/* Swiper Slide 1 */}
          {/* <SwiperSlide>
            <div className="h-full">
              <div className="relative  w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/1.png"
                  alt="Bathroom"
                  onClick={() => openImage("/images/1.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bathroom
              </div>
            </div>
          </SwiperSlide> */}

          {/* Swiper Slide 2 */}
          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/2.png"
                  alt="Bedroom"
                  onClick={() => openImage("/images/2.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bedroom
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/3.png"
                  alt="Bedroom"
                  onClick={() => openImage("/images/3.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bedroom
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/4.png"
                  alt="Bedroom"
                  onClick={() => openImage("/images/4.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bedroom
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/5.png"
                  alt="Balcony"
                  onClick={() => openImage("/images/5.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Balcony
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/6.png"
                  alt="Toilet"
                  onClick={() => openImage("/images/6.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Toilet
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/7.png"
                  alt="Reception"
                  onClick={() => openImage("/images/7.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Reception
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/8.png"
                  alt="Balcony"
                  onClick={() => openImage("/images/8.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Balcony
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/9.png"
                  alt="Property"
                  onClick={() => openImage("/images/9.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Property
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/10.png"
                  alt="Interior"
                  onClick={() => openImage("/images/10.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Interior
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/11.png"
                  alt="Passage"
                  onClick={() => openImage("/images/11.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Passage
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/12.png"
                  alt="Parking Space"
                  onClick={() => openImage("/images/12.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/13.png"
                  alt="Parking Space"
                  onClick={() => openImage("/images/13.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/14.png"
                  alt="Parking Space"
                  onClick={() => openImage("/images/14.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/15.png"
                  alt="Parking Space"
                  onClick={() => openImage("/images/15.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/16.png"
                  alt="Parking Space"
                  onClick={() => openImage("/images/16.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border border-gray-900"
                  src="/images/17.png"
                  alt="Parking Space"
                  onClick={() => openImage("/images/17.png")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div> */}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Full-screen image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImage}>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] mx-auto">
            <Image
              src={selectedImage}
              alt="Full-screen view"
              className="object-contain w-full h-full border border-gray-900"
              fill
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
