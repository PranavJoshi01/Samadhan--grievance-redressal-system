// src/pages/Authority/components/IssueCard.jsx
export default function IssueCard({ issue, onUpdate }) {
  return (
    <div className="bg-white rounded-xl border p-6 flex gap-6">

      <img
        src={issue.image}
        alt=""
        className="w-32 h-24 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{issue.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{issue.description}</p>

        <div className="flex gap-6 text-sm text-gray-500 mt-3">
          <span>{issue.category}</span>
          <span>{issue.user}</span>
          <span>{issue.date}</span>
        </div>

        <p className="text-sm mt-2">{issue.location}</p>

        <button
          onClick={() => onUpdate(issue)}
          className="mt-4 px-4 py-2 border rounded-lg text-sm"
        >
          Update Status & Notify Citizen
        </button>
      </div>

      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 h-fit">
        {issue.status}
      </span>

    </div>
  );
}