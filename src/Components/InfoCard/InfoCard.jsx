import { CiClock2 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

// Updated schedule time data with icons
const sheduleTime = [
  {
    _id: "1",
    icon: CiClock2,
    title: "Opening Hours",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    descreption: "We are open every day.",
  },
  {
    _id: "2",
    icon: CiLocationOn,
    title: "Our Main Location",
    placeName: "Dhanmondi 17",
    descreption: "Dhaka -1200, Bangladesh",
  },
  {
    _id: "3",
    icon: FaPhoneAlt,
    title: "Contact Us",
    mobile: "+88 01750 00 00 00",
  },
];

// InfoCard Component
const InfoCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-12 md:mt-28 px-12">
      {sheduleTime.map((detail) => (
        <div
          key={detail._id}
          className="card bg-[#07332F] text-white hover:bg-[#F7A582] transition-all w-[340px] h-[202px] shadow-xl text-wrap"
        >
          <div className="rounded-xl p-12 flex items-center gap-4">
            <detail.icon className="text-4xl" />
            <div>
              <h2 className="card-title">{detail.title}</h2>
              {detail.startTime && detail.endTime && (
                <p>
                  Time: {detail.startTime} - {detail.endTime}
                </p>
              )}
              {detail.placeName && <p>Place: {detail.placeName}</p>}
              <p>{detail.descreption || "Description not available"}</p>
              {detail.mobile && <p>{detail.mobile}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
