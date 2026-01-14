"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default function ProviderCalendar({ events }) {
  return (
    <div className="bg-white p-7 rounded-xl h-screen text-black">
      <div className="flex justify-between items-center mb-4 ">
        <div>
          <h1 className="text-2xl font-bold  ">Bookings Calendar</h1>
          <p className="text-sm text-gray-500">
            View your upcoming jobs and manage availability.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="border px-3 py-2 rounded-md text-sm">
            Block Time
          </button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
            Sync Calendar
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={events}
        height="auto"
        eventClassNames={(arg) =>
          arg.event.extendedProps.status === "pending"
            ? "bg-orange-500"
            : "bg-blue-600"
        }
      />

      <div className="flex gap-4 mt-4 text-sm ">
        <Legend color="bg-blue-600" label="Confirmed Booking" />
        <Legend color="bg-orange-500" label="Pending Approval" />
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
