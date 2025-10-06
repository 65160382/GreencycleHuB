import {
  TicketCheck,
  Hourglass,
  CircleCheck,
  CalendarCheck,
  Truck,
  CircleX,
  MapPinCheck,
} from "lucide-react";

const BookingSummaryCard = ( {reserves, statusCount}) => {
  const item = [
    {
      img: <TicketCheck size={24} />,
      total: reserves.length,
      label: "Total Booking",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      img: <CalendarCheck size={24} />,
      total: statusCount.confirmed || 0,
      label: "Confirm Booking",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      img: <Hourglass size={24} />,
      total: statusCount.pending || 0,
      label: "Pending Booking",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      img: <Truck size={24} />,
      total: statusCount.picking_up || 0,
      label: "PickingUp Booking",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      img: <CircleCheck size={24} />,
      total: statusCount.complete || 0,
      label: "Complete Booking",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      img: <CircleX size={24} />,
      total: statusCount.canceled || 0,
      label: "Cancel Booking",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {item.map((item) => (
          <div
            key={item.res_id}
            className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-5"
          >
            <div
              className={`p-3 rounded-full mr-4 ${item.bgColor} ${item.iconColor}`}
            >
              {item.img}
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{item.total}</p>
              <span className="text-sm text-gray-500">{item.label}</span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default BookingSummaryCard;
