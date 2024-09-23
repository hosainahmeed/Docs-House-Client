import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/Images/SignInImage/SignIn.png";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
function SignUP() {
  const [showPassword, setShowPassword] = useState(false);
 const navigate =  useNavigate()
  const onSubmit = (data) => {
    if (isSubmitSuccessful) {
      console.log(data);
      navigate("/login");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  return (
    <>
      <Helmet>
        <title>Docs House || Login page</title>
      </Helmet>
      <div className="flex items-center py-12 md:px-12 md:py-28 bg-[#07332F] flex-col md:flex-row justify-center w-full">
        <div className="w-2/5">
          <img className="w-full object-contain" src={loginImage} alt="" />
        </div>
        <div className="max-w-md mx-auto p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-white">Sign Up</h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-3">
              <input
                {...register("profilepic", {
                  required: true,
                })}
                type="text"
                placeholder="image url"
                className={`input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
                // required

                //TODO: make it requird
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            {/* Username Input */}
            <div className="form-control mb-3">
              <input
                {...register("username", { required: true, minLength: 3 })}
                type="text"
                placeholder="Enter your username"
                className={`input input-bordered ${
                  errors.username ? "input-error" : ""
                }`}
                required
              />
              {errors.username && (
                <ErrorMessage message="Username is required" />
              )}
            </div>

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
                    minLength: 6,
                    maxLength: 20,
                    required: true,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className={`${errors.password ? "input-error" : ""}`}
                />
                <span
                  className="cursor-pointer pl-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn bg-[#F7A582] border-none w-full"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center py-4 text-[#D1A054]">
              <small>
                Already registered?
                <Link to="/login"> Go to log in</Link>
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
    </>
  );
}

const ErrorMessage = ({ message }) => (
  <span className="text-red-600">{message}</span>
);

export default SignUP;
