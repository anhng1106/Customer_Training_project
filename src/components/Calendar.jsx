import { Calendar as FullCalendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid"; // Import dayGridPlugin
import { useState, useEffect } from "react";
import { getTrainings } from "../trainingapi";
import dayjs from "dayjs";

function Calendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getTrainings();
      const formattedTrainings = data.map((training) => {
        const title = `${training.activity} / ${training.customer.firstname} ${training.customer.lastname} `;
        return {
          title: title,
          start: dayjs(training.date).format(),
          end: new Date(
              new Date(training.date).getTime() + training.duration * 60000),
        };
      });
      setTrainings(formattedTrainings);
    } catch (error) {
      console.error("Failed to fetch trainings:", error);
    }
  };

  useEffect(() => {
    const calendarEl = document.getElementById("calendar");

    if (calendarEl) {
      const calendar = new FullCalendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        slotLabelFormat: { // for time grid views
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        eventTimeFormat: { // for event times
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        events: trainings, // Assign the formatted training data as events
      });

      calendar.render();
    }
  }, [trainings]); // Re-render the calendar whenever the trainings data changes

  return <div id="calendar"></div>;
}

export default Calendar;
