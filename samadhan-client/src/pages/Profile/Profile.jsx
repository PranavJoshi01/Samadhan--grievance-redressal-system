import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      {/* PAGE HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          User Profile
        </h1>
        <p className="text-gray-500 mt-1">
          View your personal details and account information
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LIGHT PURPLE BANNER */}
        <div className="h-32 bg-gradient-to-r from-purple-400 to-purple-300"></div>

        {/* CONTENT */}
        <div className="relative px-8 pb-8">

          {/* PROFILE IMAGE + BASIC INFO */}
          <div className="-mt-16 flex items-center gap-6">
            <img
              src="https://via.placeholder.com/140"
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white"
            />

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                User Name
              </h2>
              <p className="text-gray-600">user@email.com</p>

              <span className="inline-block mt-2 px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
                Active User
              </span>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-medium text-gray-800">
                Citizen
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="text-lg font-medium text-gray-800">
                XXXXXXXXXX
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-lg font-medium text-gray-800">
                Public Services
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-lg font-medium text-gray-800">
                User
              </p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-600 transition">
              Edit Profile
            </button>

            <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition">
              Change Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;


