import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
//import { register } from "../../api/authApi"; // ← use your API function

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>

        
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Phone Number</label>
          <input
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <p className="text-gray-600 text-sm mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        
        <button
          onClick={onRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md 
                     transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
