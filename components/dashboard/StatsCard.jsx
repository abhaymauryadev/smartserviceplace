export default function StatsCard({ label, value }) {
  return (
    <div className="bg-white border rounded p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
