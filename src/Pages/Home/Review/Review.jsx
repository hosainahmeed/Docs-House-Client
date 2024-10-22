import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./reviewStyle.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Card, Skeleton } from "@nextui-org/react";
import notFound from '../../../assets/404/404.jpg'
function Review() {
  const [axiosPublic] = useAxiosPublic();

  // Fetch the reviews data using TanStack Query
  const { data: reviewsData = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosPublic.get("/reviews");
      return response.data; // Ensure you return the data
    },
  });


  // Handle loading state
  if (isLoading) {
    return (
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className={`w-${index === 0 ? '3/5' : index === 1 ? '4/5' : '2/5'} rounded-lg`}>
              <div className="h-3 bg-default-200"></div>
            </Skeleton>
          ))}
        </div>
      </Card>
    );
  }


  if (!reviewsData || reviewsData.length === 0) {
    // Show 404 image or message if no data is found
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <img
          src={notFound}
          alt="404 Not Found"
          className="w-1/2 h-auto"
        />
        <p className="text-xl text-red-500 mt-5">No appointments found!</p>
      </div>
    );
  }


  return (
    <div className="mt-12 md:mt-28">
      <SectionTitle
        heading="What Our Patients Say"
        subHeading="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      />
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {reviewsData.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex items-start justify-around space-x-5 px-12 py-28">
              <div className="review-card min-h-48 text-start">
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
                  <FaQuoteLeft className="text-5xl md:block hidden" />
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
