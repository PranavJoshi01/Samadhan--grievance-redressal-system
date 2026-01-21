import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
// import { login } from "../../services/users"; // Add later

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onLogin = async () => {
    if (email.length === 0) {
      toast.warning("Please enter email");
    } else if (password.length === 0) {
      toast.warning("Please enter password");
    } else {
      setIsLoading(true);
      // Call your backend here
      // const response = await login(email, password)

      // Store login info in localStorage (assume user role by default)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userEmail", email);

      toast.success("Login successful!");
      
      // Navigate to home
      setTimeout(() => {
        navigate("/");
        setIsLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-8">
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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your Samadhan account</p>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
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

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-indigo-600 hover:text-purple-600 font-semibold">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={onLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <FaArrowRight />}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link className="text-indigo-600 hover:text-purple-600 font-bold transition" to="/register">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
