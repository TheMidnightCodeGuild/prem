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
    <section className="min-h-screen py-2 md:py-16 lg:py-14 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#f0f0ff] to-white">
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
          <SwiperSlide>
            <div className="h-full">
              <div className="relative  w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity "
                  src="/images/img1.jpg"
                  alt="Bathroom"
                  onClick={() => openImage("/images/img1.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bathroom
              </div>
            </div>
          </SwiperSlide>

          {/* Swiper Slide 2 */}
          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity border-8 border-[#6B6BE3]"
                  src="/images/img2.jpg"
                  alt="Bedroom"
                  onClick={() => openImage("/images/img2.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bedroom
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img3.jpg"
                  alt="Bedroom"
                  onClick={() => openImage("/images/img3.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bedroom
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img4.jpg"
                  alt="Bedroom"
                  onClick={() => openImage("/images/img4.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Bedroom
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img5.jpg"
                  alt="Balcony"
                  onClick={() => openImage("/images/img5.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Balcony
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img6.jpg"
                  alt="Toilet"
                  onClick={() => openImage("/images/img6.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Toilet
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img7.jpg"
                  alt="Reception"
                  onClick={() => openImage("/images/img7.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Reception
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img8.jpg"
                  alt="Balcony"
                  onClick={() => openImage("/images/img8.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Balcony
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img9.jpg"
                  alt="Property"
                  onClick={() => openImage("/images/img9.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Property
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img10.jpg"
                  alt="Interior"
                  onClick={() => openImage("/images/img10.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Interior
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img13.jpg"
                  alt="Passage"
                  onClick={() => openImage("/images/img13.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Passage
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full">
              <div className="relative aspect-square w-full">
                <Image
                  className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  src="/images/img11.jpg"
                  alt="Parking Space"
                  onClick={() => openImage("/images/img11.jpg")}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="text-center mt-3 font-semibold text-gray-700 text-sm md:text-base">
                Parking Space
              </div>
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
              className="object-contain w-full h-full"
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
