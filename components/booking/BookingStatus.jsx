export default function BookingStatus({ status }) {
  const color =
    status === "completed"
      ? "green"
      : status === "cancelled"
      ? "red"
      : "yellow";

  return (
    <span className={`text-${color}-600 font-medium`}>
      {status.toUpperCase()}
    </span>
  );
}
