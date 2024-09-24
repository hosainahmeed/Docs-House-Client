import { Helmet } from "react-helmet";
import { useState } from "react";
import PageHeader from "../../../Components/Common/PageHeader";
import reservedSchedule from "../../../assets/Images/Appointment/dentise bed.jpg";
import CavityProtection from "../../../assets/Images/Appointment/Cavity Protection.png";
import BFDCosmetic from "../../../assets/Images/Appointment/BFD-Cosmetic-Dentistry-Icon.png";
import OralSurgery from "../../../assets/Images/Appointment/Oral Surgery.png";
import PediatricDental from "../../../assets/Images/Appointment/Pediatric Dental.png";
import TeethOrthodontics from "../../../assets/Images/Appointment/Teeth Orthodontics.png";
import teethProtection from "../../../assets/Images/Appointment/teeth protection.png";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

function Appointment() {
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date);
    console.log("Selected date:", date);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const services = [
    {
      label: "Teeth Orthodontics",
      image: TeethOrthodontics,
      time: "8:00 AM - 9:00 AM",
    },
    {
      label: "Cosmetic Dentistry",
      image: BFDCosmetic,
      time: "10:00 AM - 11:30 AM",
    },
    {
      label: "Teeth Cleaning",
      image: teethProtection,
      time: "8:00 AM - 9:00 AM",
    },
    {
      label: "Cavity Protection",
      image: CavityProtection,
      time: "9:30 AM - 10:30 AM",
    },
    {
      label: "Pediatric Dental",
      image: PediatricDental,
      time: "11:00 AM - 12:00 PM",
    },
    {
      label: "Oral Surgery",
      image: OralSurgery,
      time: "12:30 PM - 1:30 PM",
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Handle form submission logic
    document.getElementById("my_modal_3").close();
  };

  return (
    <div>
      <Helmet>
        <title>Docs House | Appointment</title>
      </Helmet>
      <PageHeader
        pageSubTitle="Home / Appointment"
        pageTitle="Appointment"
      ></PageHeader>
      <div className="px-2">
        <div className="container bg-white mt-12 rounded-2xl border-2 shadow-2xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-5 px-4 py-12">
          <label className="w-full md:text-start text-center md:w-1/2">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              placeholderText="Select date"
              className="form-control input text-white input-bordered w-full md:max-w-xs bg-[#133D39]"
            />
            <h1 className="text-2xl md:text-5xl font-bold text-wrap mt-8">
              Hi , please pick your date for best experience
            </h1>
          </label>
          <div className="rounded-2xl md:w-[400px] overflow-hidden">
            <img src={reservedSchedule} alt="" />
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-28 container mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold">
              Available Services on {startDate?.toLocaleDateString() || "Select a Date"}
            </h3>
            <h1 className="text-4xl font-bold">Please select a service</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Selected Service Details Section */}
        {selectedService && (
          <div className="mt-12 container mx-auto bg-white rounded-2xl border-2 shadow-xl p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">{selectedService.label}</h1>
              <div className="w-28 md:w-[150px] md:h-[150px] mx-auto mt-4 rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={selectedService.image}
                  alt={selectedService.label}
                />
              </div>
              <p className="mt-4 text-lg">Appointment Time: {selectedService.time}</p>
              <button
                onClick={() => document.getElementById("my_modal_3").showModal()}
                className="bg-orange-500 text-white px-4 py-2 mt-6 rounded-lg hover:bg-orange-600 transition duration-300"
                disabled={!startDate} // Disable if no date is selected
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost btn-active relative top-0 left-[90%] mb-5">
                ✕
              </button>
            </form>
            <form
              className="flex items-center flex-col justify-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control w-full">
                <input
                  type="text"
                  value={selectedService?.label}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control w-full">
                <input
                  type="text"
                  value={selectedService?.time}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control w-full">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && <span className="text-red-500">Full Name is required</span>}
              </div>
              <div className="form-control w-full">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && <span className="text-red-500">Phone Number is required</span>}
              </div>
              <div className="form-control w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>
              <div className="form-control w-full">
                <button className="btn bg-[#07332F] text-white hover:text-black">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}

// Card Component
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

export default Appointment;
