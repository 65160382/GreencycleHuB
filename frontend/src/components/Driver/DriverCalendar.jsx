import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockDriverTasks = {
  "2025-01-01": [{ id: "1", title: "New Year Delivery", time: "10am", color: "bg-amber-500" }],
  "2025-01-03": [{ id: "2", title: "Warehouse Pickup", time: "9am", color: "bg-emerald-500" }],
  "2025-01-06": [{ id: "3", title: "Route Planning", time: "8am", color: "bg-blue-500" }],
};

export function DriverCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date()); // ตั้งเป็นวันที่ปัจจุบัน
  };

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDay = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
  };

  const formatDateKey = (date) => date.toISOString().split("T")[0];
  const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth();
  const isToday = (date) => new Date().toDateString() === date.toDateString();

  const calendarDays = getCalendarDays();

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={goToToday}
              className="px-3 py-1.5 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100"
            >
              Today
            </button>
            <h1 className="text-2xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white border rounded-lg overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b">
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dateKey = formatDateKey(day);
              const dayTasks = mockDriverTasks[dateKey] || [];
              const isCurrentMonthDay = isCurrentMonth(day);
              const isTodayDay = isToday(day);

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border-r border-b 
                  ${!isCurrentMonthDay ? "bg-gray-50 text-gray-400" : ""}
                  ${isTodayDay ? "bg-blue-50" : ""}`}
                >
                  {/* Day number */}
                  <div
                    className={`text-sm mb-2 ${
                      isTodayDay
                        ? "bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                        : ""
                    }`}
                  >
                    {day.getDate()}
                  </div>

                  {/* Task events */}
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className={`${task.color} text-white text-xs px-2 py-1 rounded cursor-pointer`}
                      >
                        {task.time} {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-xs text-gray-500 px-2">
                        + {dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
