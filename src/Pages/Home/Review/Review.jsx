import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./reviewStyle.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
function Review() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [reviewsData, setReviewsData] = useState([]);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // Fetch the reviews data
  useEffect(() => {
    fetch("/JSON/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviewsData(data);
      });
  }, []);

  return (
    <div className="mt-12 md:mt-28">
       <SectionTitle
        heading="What Our Patients Says"
        subHeading="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      ></SectionTitle>
      <Swiper
        spaceBetween={30}
        centeredSlides={false} // Disable centering for multiple slides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        breakpoints={{
          640: {
            slidesPerView: 1, // Show 1 card on mobile
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2, // Show 2 cards on desktop
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {reviewsData.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex items-start justify-around space-x-5 px-12 py-28">
              <div className="review-card min-h-48  text-start">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="ring-primary w-12 rounded-full border-2 border-[#07332F]">
                        <img
                          src={review.profile_image}
                          alt={review.name}
                          className="w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="leading-4 text-nowrap">{review.name}</h3>
                      <p className="leading-4">{review.designation}</p>
                    </div>
                  </div>
                  <FaQuoteLeft className="text-5xl md:block hidden"></FaQuoteLeft>
                </div>
                <p>{review.review_text}</p>
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold">Rating:</h1>
                  <ReactStars count={review.rating} size={24} color="#ffd700" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Review;
