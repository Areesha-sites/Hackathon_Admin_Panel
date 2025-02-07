"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; 
const CalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2025-01-10' },
    { title: 'Event 2', date: '2025-01-15' },
    { title: 'Event 3', date: '2025-01-20' },
  ]);
  const handleDateClick = (arg: DateClickArg) => {
    const newEvent = { title: 'New Event', date: arg.dateStr };
    setEvents([...events, newEvent]);
  };
  return (
   <div className="lg:ml-[-40px] ml-[-10px] sm:px-2 px-4 lg:px-4 xxl:px-9">
     <div className="calendar-container bg-gray-800 text-gray-100 p-2 rounded-lg shadow-md " > 
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="100vh" 
        contentHeight="auto" 
      />
    </div>
   </div>
  );
};
export default CalendarComponent;
