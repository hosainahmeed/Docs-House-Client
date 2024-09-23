import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import signUpimage from "../../assets/Images/SignUpImage/SignUp.png";
import Swal from "sweetalert2";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }, 0);
  };

  return (
    <div className="flex items-center py-12 md:px-12 md:py-28 bg-[#07332F] flex-col md:flex-row justify-center w-full">
      <div className="w-2/5">
        <img className="w-full object-contain" src={signUpimage} alt="" />
      </div>
      <div className="max-w-md mx-auto p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-white">Login</h2>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="form-control mb-3">
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered ${
                errors.email ? "input-error" : ""
              }`}
              required
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>

          {/* Password Input */}
          <div className="form-control mb-3">
            <div className="flex items-center justify-between input input-bordered">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                className={`${errors.password ? "input-error" : ""}`}
                required
              />
              <span
                className="cursor-pointer pl-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn bg-[#F7A582] border-none w-full"
            >
              Login
            </button>
          </div>
          <p className="text-center py-4 text-[#D1A054]">
            <small>
              Dont have an account ??
              <Link to="/signup"> Go to SignUp</Link>
            </small>
          </p>
          {/* Success Message */}
          {isSubmitSuccessful && (
            <span className="text-green-500 mt-4">
              Registration successful!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

const ErrorMessage = ({ message }) => (
  <span className="text-red-600">{message}</span>
);

export default Login;
