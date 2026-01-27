import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { API_AUTH_BASE_URL, API_ENDPOINTS } from "../../constants/apiConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onLogin = async () => {
    if (!email) {
      toast.warning("Please enter email");
      return;
    }

    if (!password) {
      toast.warning("Please enter password");
      return;
    }

    setIsLoading(true);

    try {
      /*
         temp mock login (created this bcos backend auth wasnt running locally, so to test the login integration)
         
         // Simulate successful login
         localStorage.setItem("isLoggedIn", "true");
         localStorage.setItem("userRole", "user");
         localStorage.setItem("userEmail", email);
         
         toast.success("Login successful!");
         navigate("/user/home");
         */

      // API LOGIN (this the actual 1 4 when the auth service is up & runnin)

      const response = await fetch(API_AUTH_BASE_URL + API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Login successful!");
      navigate("/user/home");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your Samadhan account</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-indigo-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            onClick={onLogin}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <FaArrowRight />}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-bold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
