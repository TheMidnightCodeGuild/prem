import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const DestinationsNearby = () => {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="min-h-screen pt-32 sm:pt-0  px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
            Destinations Nearby
          </h4>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Explore the most popular nearby attractions
          </p>
        </div>

        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            640: {
              spaceBetween: 15,
            },
            768: {
              spaceBetween: 20,
            },
          }}
          className="swiper-container mb-6 sm:mb-10">
          {[
            {
              src: "/images/card-1.webp",
              alt: "Mahakal Temple",
              title: "Mahakaleshwar Jyotirlinga",
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
              alt: "Ram Ghat",
              title: "Ram Ghat",
            },
            {
              src: "/images/card-6.webp",
              alt: "Kal Bharav Mandir",
              title: "Kal Bharav Mandir",
            },
            {
              src: "/images/card-7.webp",
              alt: "Isckon Temple",
              title: "Isckon Temple",
            },
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-slide-content">
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={slide.src}
                    loading="lazy"
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
                <div className="text-center mt-3 font-semibold text-gray-700 text-sm sm:text-base">
                  {slide.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DestinationsNearby;
