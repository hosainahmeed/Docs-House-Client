import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import reservedSchedule from "../../assets/Images/Appointment/dentise bed.jpg";
import CavityProtection from "../../assets/Images/Appointment/Cavity Protection.png";
import BFDCosmetic from "../../assets/Images/Appointment/BFD-Cosmetic-Dentistry-Icon.png";
import OralSurgery from "../../assets/Images/Appointment/Oral Surgery.png";
import PediatricDental from "../../assets/Images/Appointment/Pediatric Dental.png";
import TeethOrthodontics from "../../assets/Images/Appointment/Teeth Orthodontics.png";
import teethProtection from "../../assets/Images/Appointment/teeth protection.png";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import PageHeader from "../../Components/Common/PageHeader";
import useDocs from "../../hooks/useDocs";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

function Service() {
  const locationPage = useLocation();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationPage]);

  // Function to disable dates before today
  const isDateDisabled = (date) => {
    return date > new Date().setHours(0, 0, 0, 0);
  };

  const { users } = useAuth();

  const { docsData } = useDocs();

  const docsExpertise = docsData.map((doc) => doc.expertise);
  const docsExpertiseFilter = docsExpertise.filter(
    (expertise) => expertise === selectedService?.label
  );

  const evilable = docsExpertise.includes(selectedService?.label);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const services = [
    {
      label: "Endodontist",
      image: TeethOrthodontics,
      schedules: [
        "8:00 AM - 9:00 AM",
        "11:00 AM - 1:00 PM",
        "3:00 PM - 5:00 PM",
      ],
    },
    {
      label: "Orthodontist",
      image: BFDCosmetic,
      schedules: ["10:00 AM - 11:30 AM"],
    },
    {
      label: "Teeth Cleaning",
      image: teethProtection,
      schedules: ["8:00 AM - 9:00 AM"],
    },
    {
      label: "Cavity Protection",
      image: CavityProtection,
      schedules: ["9:30 AM - 10:30 AM"],
    },
    {
      label: "Pediatric Dental",
      image: PediatricDental,
      schedules: ["11:00 AM - 12:00 PM"],
    },
    {
      label: "Oral Surgery",
      image: OralSurgery,
      schedules: ["12:30 PM - 1:30 PM"],
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setIsScheduleModalOpen(false);
    setIsAppointmentModalOpen(true);
  };

  const onSubmit = (formData) => {
    const bookingData = {
      date: startDate.toLocaleDateString(),
      time: selectedSchedule,
      email: formData?.email,
      name: formData.fullName,
      phoneNumber: formData?.phoneNumber,
      services: selectedService.label,
    };
    // console.log(formData);
    
    axios.post("https://docs-point-server-bw7y6chty-hosains-projects-1e2169e4.vercel.app/appointment", bookingData,{withCredentials:true}).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("successfully appointed");
      }
      setIsAppointmentModalOpen(false);
    });
  };
  return (
    <div>
      <Helmet>
        <title>Docs House | Service</title>
      </Helmet>
      <PageHeader pageSubTitle="Home / Service" pageTitle="Service" />
      <div className="px-2">
        <div className="flex flex-col items-center relative">
          <div className="container bg-white mt-12 rounded-2xl border-2 shadow-2xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-5 px-4 py-12">
            <label className="w-full md:text-start text-center md:w-1/2">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                placeholderText="Select date"
                className="form-control input text-white input-bordered w-full md:max-w-xs bg-[#133D39]"
                minDate={new Date()} // Set minimum date to today
                filterDate={isDateDisabled} // Use the filter function
              />
              <h1 className="text-2xl md:text-5xl font-bold text-wrap mt-8">
                Hi , please pick your date for best experience
              </h1>
            </label>
            <div className="rounded-2xl md:w-[400px] overflow-hidden">
              <img src={reservedSchedule} alt="Reserved Schedule" />
            </div>
          </div>
          <div className="animate-bounce h-12 flex items-center justify-center text-2xl  w-12 absolute rounded-full bottom-0">
            <FaArrowDown></FaArrowDown>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-28 container mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold">
              Available Services on{" "}
              {startDate?.toLocaleDateString() || "Select a Date"}
            </h3>
            <h1 className="text-4xl font-bold">Please select a service</h1>
          </div>
          <div
            id="service"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <Card
                key={index}
                label={service.label}
                image={service.image}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </div>

        {/* Schedule Selection Modal */}
        {isScheduleModalOpen && (
          <Modal onClose={() => setIsScheduleModalOpen(false)}>
            {selectedService && (
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-4">
                  {selectedService.label}
                </h1>
                <h2 className="text-xl mb-4">Available Schedules</h2>
                <div className="flex flex-col gap-2">
                  {selectedService.schedules.map((schedule, index) => (
                    <button
                      key={index}
                      className="btn btn-outline"
                      onClick={() => handleScheduleSelect(schedule)}
                    >
                      {schedule}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Modal>
        )}

        {/* Appointment Details Modal */}
        {isAppointmentModalOpen && (
          <Modal onClose={() => setIsAppointmentModalOpen(false)}>
            {selectedService && selectedSchedule && (
              <div className="text-center mb-6">
                <h1 className="text-xl md:text-3xl font-bold mb-4">
                  {selectedService.label}
                </h1>
                <div className="hidden md:block md:w-[150px] md:h-[150px] mx-auto mb-4 rounded-xl overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={selectedService.image}
                    alt={selectedService.label}
                  />
                </div>
                <p className="text-lg mb-4">
                  Appointment Time: {selectedSchedule}
                </p>
              </div>
            )}
            <form
              className="flex items-center flex-col justify-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:form-control w-full hidden ">
                <input
                  type="text"
                  value={selectedService?.label}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="md:form-control w-full hidden">
                <input
                  type="text"
                  value={selectedSchedule}
                  className="input input-bordered"
                  disabled
                />
              </div>

              <div className="form-control w-full">
                <select className="select select-bordered w-full">
                  <option value="">Select a Doctor</option>
                  {docsData &&
                    docsData
                      .filter((doc) => doc.expertise === selectedService?.label)
                      .map((doc, index) => (
                        <option
                          key={index}
                          className="text-black"
                          value={doc.name.first}
                        >
                          {doc.name}
                        </option>
                      ))}
                </select>
              </div>

              <div className="form-control w-full">
                <input
                  type="text"
                  defaultValue={users?.displayName}
                  placeholder="Full Name"
                  className="input input-bordered"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-500">Full Name is required</span>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">Phone Number is required</span>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  type="email"
                  defaultValue={users?.email}
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="form-control w-full">
                <button className="btn bg-[#133D39] text-white" type="submit">
                  Confirm Appointment
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

const Card = ({ label, image, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer rounded-2xl border-2 p-6 border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center bg-white"
  >
    <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-gray-100">
      <img className="w-full h-full object-cover" src={image} alt={label} />
    </div>
    <h1 className="text-lg font-semibold">{label}</h1>
  </div>
);

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg z-50 w-full md:w-1/3 relative">
        <button
          className="absolute top-2 right-2 text-xl bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
export default Service;
