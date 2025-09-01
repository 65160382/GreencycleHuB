const getStatusStyle = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-orange-100 text-orange-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "picking_up":
      return "bg-cyan-100 text-cyan-600";
    case "arrived":
      return "bg-blue-100 text-blue-600";
    case "completed":
      return "bg-emerald-100 text-emerald-600";
    case "canceled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
