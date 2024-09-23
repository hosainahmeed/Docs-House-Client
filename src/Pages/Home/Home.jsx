import { useEffect } from "react";
import InfoCard from "../../Components/InfoCard/InfoCard";
import Banner from "./banner/Banner";
import Contact from "./Contact/Contact";
import ExpertDoctors from "./ExpertDoctors/ExpertDoctors";
import OureServices from "./Our-service/OurServices";
import Review from "./Review/Review";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Banner></Banner>
      <div className="max-w-screen-2xl mx-auto">
        <OureServices></OureServices>
        <InfoCard></InfoCard>
        <Review></Review>
        <ExpertDoctors></ExpertDoctors>
        <Contact></Contact>
      </div>
    </div>
  );
}

export default Home;
