import { useForm } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import DatePicking from "../../../Components/DatePicker/DatePicking";
import TimePicking from "../../../Components/DatePicker/TimePicking";

function Contact() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-[#07332F] card mx-2 p-4 md:p-[100px] mt-28 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-white w-full md:w-2/4">
        <h1 className="text-2xl md:text-4xl my-2">Contact With Us</h1>
        <p className="my-2">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi.
        </p>
        <ContactInfo 
          icon={<FaPhoneAlt size={18} color="#ffd700" />} 
          text="+88 01750 14 14 14" 
        />
        <div className="h-[2px] my-2 bg-[#F7A582] block md:hidden"></div>
        <ContactInfo 
          icon={<CiLocationOn size={18} color="#ffd700" />} 
          text="Dhanmondi, Dhaka, Bangladesh" 
        />
      </div>
      
      <form className="md:grid flex flex-col md:grid-cols-2 gap-2 text-white" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Name"
          register={register("Name", { required: true })}
          error={errors.Name}
        />
        <InputField
          type="email"
          placeholder="Email"
          register={register("Email", { required: true })}
          error={errors.Email}
        />
        <InputField
          type="text"
          placeholder="Mobile number"
          register={register("Mobile", { required: true })}
          error={errors.Mobile}
        />
        <InputField
          type="text"
          placeholder="Doctor Name"
          register={register("doctorName", { required: true })}
          error={errors.doctorName}
        />
        <label>
          <DatePicking
            setValue={setValue}
            name="datepick"
          />
          {errors.datepick && <ErrorMessage message="Please select Date" />}
        </label>
        <label>
          <TimePicking />
        </label>
        <input className="col-span-2 btn bg-[#F7A582] border-none" type="submit" />
      </form>
    </div> 
  );
}

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center mt-4">
    {icon}
    <h1 className="text-xl ml-4">{text}</h1>
  </div>
);

const InputField = ({ type, placeholder, register, error }) => (
  <label className="form-control w-full max-w-xl">
    <input
      type={type}
      placeholder={placeholder}
      className="input input-bordered w-full max-w-xs bg-[#133D39] "
      {...register}
    />
    {error && <ErrorMessage message={`${placeholder} is required`} />}
  </label>
);

const ErrorMessage = ({ message }) => (
  <span className="text-red-600 animate-pulse">{message}</span>
);

export default Contact;
