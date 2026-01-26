import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaArrowRight } from "react-icons/fa";
//import { register } from "../../api/authApi"; // ← use your API function

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onRegister = async () => {
    if (!firstName) {
      return toast.warning("Please enter first name");
    }
    if (!email) {
      return toast.warning("Please enter email");
    }
    if (!phone) {
      return toast.warning("Please enter phone number");
    }
    if (!password) {
      return toast.warning("Please enter password");
    }
    if (!confirmPassword) {
      return toast.warning("Please confirm your password");
    }
    if (password !== confirmPassword) {
      return toast.warning("Passwords do not match!");
    }

    setIsLoading(true);

    // Call your API (replace with actual function)
    /*
    const response = await register(firstName, email, password, phone);
    if (response.status === "success") {
      toast.success("Successfully registered");
      navigate("/login");
    } else {
      toast.error(response.error);
    }
    */
    // TEMP SUCCESS
    toast.success("Form validated (connect API next)");
    
    setTimeout(() => {
      navigate("/login");
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onRegister();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex justify-center items-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white backdrop-blur-xl bg-opacity-95 rounded-2xl shadow-2xl p-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
              <h1 className="text-4xl font-bold text-white">S</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Join Samadhan today</p>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your phone number"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Create a strong password"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Confirm your password"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={onRegister}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
            {!isLoading && <FaArrowRight />}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:text-purple-600 font-bold transition">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
