// src/pages/Authority/components/StatCard.jsx
export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl p-5 border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold" style={{ color }}>
        {value}
      </h2>
    </div>
  );
}