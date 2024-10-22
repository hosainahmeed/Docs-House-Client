import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/Common/PageHeader";
import ReactStars from "react-rating-stars-component";
import { CiLocationOn } from "react-icons/ci";
import { ImCoinDollar } from "react-icons/im";
import { MdEventAvailable } from "react-icons/md";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Home/Review/reviewStyle.css";
import Review from "../Home/Review/Review";
import axios from "axios";
import toast from "react-hot-toast";

function DoctorProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const { state } = useLocation();
  const doctor = state?.doctor;
  const locationPage = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationPage]);
  const {
    name,
    expertise,
    education,
    work_experience,
    services,
    awards,
    specializations,
    location,
    available_on,
    price,
    rating,
    image,
  } = doctor;

  if (!doctor) {
    return <div>No doctor data available</div>;
  }

  const tabsData = [
    { id: 0, label: "About" },
    { id: 1, label: "Locations" },
    { id: 2, label: "Reviews" },
    { id: 3, label: "Available" },
  ];

  const appointmentHandle = async (doctor) => {
    const { _id, available_on, name, expertise } = doctor;
    console.log(doctor);
    
    const appointmentDetails = {
      name,
      services: expertise,
      date: available_on,
    };
  
    try {
      const response = await axios.post(`http://localhost:5000/appointment/${_id}`, appointmentDetails);
      if (response.data.insertedId) {
        toast.success('successfully appointed')
        navigate('/appointment')
      }
      
    } catch (error) {
      console.error("Failed to create appointment:", error);
      toast.error('something is wrong or already appointed')
    }
  
    console.log(_id, available_on, name, expertise); // Debugging purpose
  };
  

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageSubTitle="Home / Doctor Profile"
        pageTitle="Doctor Profile"
      />
      <div className="container mx-auto">
        {/* Doctor Hero Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg mt-6">
          <div className="flex flex-col lg:flex-row items-center">
            <img
              src={image}
              alt={name}
              className="max-w-xs rounded-lg shadow-md mb-6 lg:mb-0 lg:max-w-sm"
            />
            <div className="lg:ml-10 w-full">
              <h2 className="text-3xl font-bold text-gray-800 truncate">
                {name}
              </h2>
              <p className="text-lg text-gray-600 mb-4 truncate">
                BTP - {expertise}
              </p>
              <ReactStars count={rating} size={24} color="#ffd700" />
              <div className="mt-4 text-gray-700 space-y-2">
                <div className="flex items-center">
                  <CiLocationOn size={20} />
                  <span className="ml-2 truncate">{location}</span>
                </div>
                <div className="flex items-center">
                  <MdEventAvailable size={20} />
                  <span className="ml-2">{available_on}</span>
                </div>
                <div className="flex items-center">
                  <ImCoinDollar size={20} />
                  <span className="ml-2">${price}</span>
                </div>
                <button
                  onClick={() => appointmentHandle(doctor)}
                  className="btn btn-xl border-2 border-[#F7A582]"
                >
                  Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div
            role="tablist"
            className="flex justify-center lg:justify-start space-x-4 mb-6"
          >
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                className={`md:px-5 px-2 py-2 font-semibold rounded-t-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div role="tabpanel" className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">
              <h1 className="text-xl font-black">
                {tabsData[activeTab].label}
              </h1>
              <div>
                {tabsData[activeTab].label === "About" && (
                  <>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="container mx-auto px-4 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          {/* Education */}
                          <h1 className="text-xl font-black mt-4">Education</h1>
                          <ul className="list-disc ml-6">
                            {education.map((dets, index) => (
                              <li key={index} className="mb-2">
                                <p className="font-bold">{dets.institution}</p>
                                <p>{dets.degree}</p>
                                <p>{dets.year}</p>
                              </li>
                            ))}
                          </ul>

                          {/* Work & Experience */}
                          <h1 className="text-xl font-black mt-8">
                            Work & Experience
                          </h1>
                          <ul className="list-disc ml-6">
                            {work_experience.map((dets, index) => (
                              <li key={index} className="mb-2">
                                <p className="font-bold">{dets.clinic}</p>
                                <p>{dets.years}</p>
                              </li>
                            ))}
                          </ul>

                          {/* Services */}
                          <h1 className="text-xl font-black mt-8">Services</h1>
                          <ul className="list-disc ml-6">
                            {services.map((service, index) => (
                              <li key={index} className="mb-2">
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          {/* Awards */}
                          <h1 className="text-xl font-black mt-4">Awards</h1>
                          <ul className="list-disc ml-6">
                            {awards.map((award, index) => (
                              <li key={index} className="mb-2">
                                <p className="font-bold">{award.title}</p>
                                <p>{award.date}</p>
                              </li>
                            ))}
                          </ul>

                          {/* Specializations */}
                          <h1 className="text-xl font-black mt-8">
                            Specializations
                          </h1>
                          <ul className="list-disc ml-6">
                            {specializations.map((spec, index) => (
                              <li key={index} className="mb-2">
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {tabsData[activeTab].label === "Locations" && (
                  <div>
                    <h1>{location}</h1>
                  </div>
                )}

                {tabsData[activeTab].label === "Reviews" && (
                  <div>
                    <Review></Review>
                  </div>
                )}

                {tabsData[activeTab].label === "Available" && (
                  <div>
                    <h1>{available_on}</h1>
                    <p>9am to 7pm</p>
                  </div>
                )}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
