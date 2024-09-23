import bannerImage from "../../../assets/Images/Banner/banner.png";
import SmallButton from "../../../Components/button/SmallButton";

function Banner() {
  return (
    <div className="hero bg-[#07332F] text-white px-3">
      <div className="flex items-center max-h-svh overflow-hidden max-w-screen-2xl flex-col md:flex-row">
        <div className="w-full md:text-start text-center">
          <h1 className="text-3xl md:text-7xl font-semibold mt-28">
            Your Best Medical Help Center
          </h1>
          <p className="py-6 text-sm md:text-base">
            At Your Best Medical Help Center, we provide exceptional,
            personalized healthcare services. Our dedicated team ensures
            top-quality care with compassion and expertise.
          </p>
          <SmallButton
            value="All Service"
          ></SmallButton>
        </div>
        <img src={bannerImage} className="opacity-80" />
      </div>
    </div>
  );
}

export default Banner;
