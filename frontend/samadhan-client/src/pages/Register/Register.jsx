import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { registerUser } from "../../services/authService";


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // frontend-only for now
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onRegister = async () => {
    // Frontend validations

    if (!firstName) return toast.warning("Please enter your name");
    if (!email) return toast.warning("Please enter email");
    if (!phone) return toast.warning("Please enter phone number");
    if (!password) return toast.warning("Please enter password");
    if (!confirmPassword) return toast.warning("Please confirm password");
    if (password !== confirmPassword)
      return toast.warning("Passwords do not match");

    setIsLoading(true);

    try {
      /* 
      
      // temp mock register, using this because backend DB/auth service is not running locally right now.

      toast.success("Registration successful (mock)");
      setTimeout(() => {
        navigate("/login");
        setIsLoading(false);
      }, 500);
        
      */

      //  real backend register

      await registerUser(firstName, email, password);


      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") onRegister();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex justify-center items-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md">
        <div className="bg-white backdrop-blur-xl bg-opacity-95 rounded-2xl shadow-2xl p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
              <h1 className="text-4xl font-bold text-white">S</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join Samadhan today</p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Phone (frontend-only) */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your phone number"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Create password"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Confirm password"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onRegister}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
            {!isLoading && <FaArrowRight />}
          </button>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-bold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
