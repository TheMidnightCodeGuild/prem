import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

const Testimonial = () => {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const TestimonialData = [
    {
      id: 1,
      content:
        "Our stay at this homestay was beyond amazing! The hosts were incredibly welcoming, and the ambiance made us feel at home. We loved waking up to the scenic views and peaceful environment every day.",
      name: "Ram Chaturvedi",
      role: "Guest from Lucknow",
    },
    {
      id: 2,
      content:
        "The homestay was perfect for our family vacation. The rooms were cozy, and the food was delicious. The kids especially enjoyed the garden and outdoor activities. Definitely coming back!",
      name: "Rajesh Kumar",
      role: "Family Guest",
    },
    {
      id: 3,
      content:
        "I had an unforgettable experience at this homestay. The personalized service, attention to detail, and the warmth of the hosts made all the difference. Highly recommend .",
      name: "Krish Gupta",
      role: "Solo Traveler",
    },
    {
      id: 4,
      content:
        "The perfect escape from city life! The homestay offered serene views, excellent hospitality, and a truly relaxing environment. It was exactly what we needed for our weekend retreat.",
      name: "Arjun Srivastav & Tapasya Srivastav",
      role: "Couple from New Delhi",
    },
  ];

  return (
    <>
      <section className="min-h-screen  -mt-20   px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              What Our Guests Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the experiences of those who&apos;ve stayed with us
            </p>
          </div>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 25,
              },
              1024: {
                spaceBetween: 30,
              },
            }}
            className="swiper-container">
            {TestimonialData.map((data) => (
              <SwiperSlide key={data.id}>
                <div className="bg-white border-2 border-black rounded-lg shadow-xl overflow-hidden h-[250px] sm:h-[280px] md:h-[300px] ">
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">
                    <div className="text-gray-600 italic mb-4 flex-grow overflow-y-auto text-sm sm:text-base">
                      &quot;{data.content}&quot;
                    </div>
                    <div className="flex items-center mt-auto">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${data.name}&background=random`}
                          alt={data.name}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-base sm:text-lg font-medium text-gray-900">
                          {data.name}
                        </div>
                        <div className="text-sm sm:text-base text-gray-500">
                          {data.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
