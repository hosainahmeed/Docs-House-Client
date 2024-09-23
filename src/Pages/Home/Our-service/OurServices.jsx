import Cavity_Protection from "../../../assets/Images/ServiceImage/dental.jpg";
import cosmic from "../../../assets/Images/ServiceImage/cosmic.jpg";
import oral from "../../../assets/Images/ServiceImage/oral.jpeg";
import service from "../../../assets/Images/ServiceImage/Service.jpg";
import { useState } from "react";
import ProfileBtn from "../../../Components/button/ProfileBtn";

function OurServices() {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    { id: 0, label: "Cavity Protection", image: Cavity_Protection },
    { id: 1, label: "Cosmetic Dentistry", image: cosmic },
    { id: 2, label: "Oral Surgery", image: oral },
  ];

  return (
    <div className="flex flex-col-reverse gap-12 lg:flex-row items-center justify-between pt-16 w-full px-4 lg:px-0">
      {/* Left Section Image */}
      <div className="rounded-3xl overflow-hidden mb-8 lg:mb-0 flex items-center justify-center">
        <img src={service} alt="Service Overview" className="" />
      </div>

      {/* Right Section Content */}
      <div className="lg:w-1/2 space-y-8">
        {/* Intro Text */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          className="flex justify-center items-center space-x-5  lg:justify-start mb-4"
        >
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-t-lg transition-all duration-300 border border-gray-300 ${
                activeTab === tab.id
                  ? "bg-orange-400 text-white"
                  : "bg-white text-gray-700  hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          role="tabpanel"
          className="p-4 border w-full border-gray-300 rounded-lg shadow-md"
        >
          <img
            src={tabsData[activeTab].image}
            alt={tabsData[activeTab].label}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Service Description */}
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">
            Electro Gastrology Therapy
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>
        <ProfileBtn
         value="More Details"
        ></ProfileBtn>
      </div>
    </div>
  );
}

export default OurServices;
