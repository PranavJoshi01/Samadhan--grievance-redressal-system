export default function IssueCard({ issue, onEdit }) {

  return (
    <div className="bg-white shadow p-5 rounded flex justify-between">

      <div>
        <h3 className="text-xl font-semibold">{issue.title}</h3>
        <p>Department: {issue.department}</p>
        <p>Status: {issue.status}</p>
        <p className="text-gray-500 text-sm">{issue.date}</p>
      </div>

      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={onEdit}
      >
        ✏ Edit
      </button>

    </div>
  );
}

