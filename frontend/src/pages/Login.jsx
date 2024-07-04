import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-3xl  text-center font-bold font-heading tracking-px-n leading-tight">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                type="email"
                placeholder="Enter Email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </label>

            <label className="block mb-5 relative">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}

              <div className="absolute top-1/2 right-3 -translate-y-1/2">
                {showPassword ? (
                  <FaRegEye
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </label>

            <button
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              type="submit"
            >
              Login
            </button>

            <div>
              <div className="text-center mb-3">
                <p className="text-gray-500 font-medium">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-indigo-600 hover:text-indigo-700 transition ease-in-out duration-200"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 font-medium">
                  Forgot Password?{" "}
                  <Link
                    to="/forgot-password"
                    className="text-indigo-600 hover:text-indigo-700 transition ease-in-out duration-200"
                  >
                    Reset Password
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
