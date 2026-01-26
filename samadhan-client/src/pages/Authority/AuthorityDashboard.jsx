// src/pages/Authority/AuthorityDashboard.jsx
import { useState } from "react";
import AuthorityNavbar from "../../components/Authority/AuthorityNavabar";
import StatCard from "./components/StatCard";
import IssueCard from "./components/IssueCard";
import UpdateStatusModal from "./components/UpdateStatusModal";
import SuccessModal from "./components/SucessModal";

export default function AuthorityDashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const issue = {
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic hazard near intersection",
    status: "In Progress",
    category: "Road Maintenance",
    user: "John Doe",
    date: "Oct 1, 2025, 03:30 PM",
    location: "123 Main Street, Downtown",
    image: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7",
  };

  return (
    <>
      <AuthorityNavbar />

      <div className="p-8 bg-gray-50 min-h-screen">

        <h1 className="text-2xl font-bold">My Assigned Issues</h1>
        <p className="text-gray-500 mb-6">
          Road & Transportation Department
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Assigned" value="1" />
          <StatCard title="Pending Action" value="0" color="orange" />
          <StatCard title="In Progress" value="1" color="blue" />
          <StatCard title="Resolved" value="0" color="green" />
        </div>

        <IssueCard issue={issue} onUpdate={setSelectedIssue} />

        {selectedIssue && (
          <UpdateStatusModal
            issue={selectedIssue}
            onClose={() => setSelectedIssue(null)}
            onSuccess={() => {
              setSelectedIssue(null);
              setShowSuccess(true);
            }}
          />
        )}

        {showSuccess && (
          <SuccessModal onClose={() => setShowSuccess(false)} />
        )}

      </div>
    </>
  );
}