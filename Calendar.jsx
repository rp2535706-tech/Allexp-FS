import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import Day from "./Day";

const initialEvents = [
  {
    id: 1,
    title: "DSA Practice",
    time: "10:00 AM",
    date: "2026-09-05",
  },
  {
    id: 2,
    title: "Full Stack Lab",
    time: "1:00 PM",
    date: "2026-09-10",
  },
  {
    id: 3,
    title: "CN Assignment",
    time: "3:00 PM",
    date: "2026-09-15",
  },
  {
    id: 4,
    title: "ML Project",
    time: "11:00 AM",
    date: "2026-09-20",
  },
];

function Calendar() {
  /*
   * September 2026 initially
   */
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    "2026-09-02"
  );

  const [events, setEvents] = useState(initialEvents);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const [editingEventId, setEditingEventId] =
    useState(null);

  console.log("Calendar rendered");

  /*
   * Current year
   */
  const year = currentDate.getFullYear();

  /*
   * Current month
   *
   * JavaScript:
   * January = 0
   * February = 1
   * ...
   * September = 8
   */
  const month = currentDate.getMonth();

  /*
   * Month name
   */
  const monthName = useMemo(() => {
    return currentDate.toLocaleString("default", {
      month: "long",
    });
  }, [currentDate]);

  /*
   * Number of days in current month
   */
  const daysInMonth = useMemo(() => {
    return new Date(
      year,
      month + 1,
      0
    ).getDate();
  }, [year, month]);

  /*
   * First day of month
   *
   * Sunday = 0
   * Monday = 1
   * ...
   * Saturday = 6
   */
  const firstDayOfMonth = useMemo(() => {
    return new Date(
      year,
      month,
      1
    ).getDay();
  }, [year, month]);

  /*
   * Create calendar days
   *
   * Empty spaces are added before day 1
   * so the calendar starts on the correct weekday.
   */
  const calendarDays = useMemo(() => {
    const days = [];

    // Empty spaces
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDayOfMonth, daysInMonth]);

  /*
   * Create date string
   */
  const createDateString = useCallback(
    (day) => {
      return `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
    },
    [year, month]
  );

  /*
   * Go to previous month
   */
  const handlePreviousMonth = useCallback(() => {
    setCurrentDate((prev) => {
      return new Date(
        prev.getFullYear(),
        prev.getMonth() - 1,
        1
      );
    });
  }, []);

  /*
   * Go to next month
   */
  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => {
      return new Date(
        prev.getFullYear(),
        prev.getMonth() + 1,
        1
      );
    });
  }, []);

  /*
   * Select date
   */
  const handleSelectDate = useCallback(
    (day) => {
      if (!day) {
        return;
      }

      const date = createDateString(day);

      setSelectedDate(date);
    },
    [createDateString]
  );

  /*
   * Get events for a particular day
   */
  const getEventsForDay = useCallback(
    (day) => {
      if (!day) {
        return [];
      }

      const date = createDateString(day);

      return events.filter(
        (event) => event.date === date
      );
    },
    [events, createDateString]
  );

  /*
   * Add OR update event
   */
  const handleSubmitEvent = useCallback(
    (e) => {
      e.preventDefault();

      if (!title.trim()) {
        return;
      }

      /*
       * Editing existing event
       */
      if (editingEventId !== null) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === editingEventId
              ? {
                  ...event,
                  title: title.trim(),
                  time: time || "All Day",
                }
              : event
          )
        );

        setEditingEventId(null);
      }

      /*
       * Adding new event
       */
      else {
        const newEvent = {
          id: Date.now(),
          title: title.trim(),
          time: time || "All Day",
          date: selectedDate,
        };

        setEvents((prevEvents) => [
          ...prevEvents,
          newEvent,
        ]);
      }

      setTitle("");
      setTime("");
    },
    [
      title,
      time,
      selectedDate,
      editingEventId,
    ]
  );

  /*
   * Edit event
   */
  const handleEdit = useCallback((event) => {
    setEditingEventId(event.id);

    setTitle(event.title);
    setTime(event.time);

    setSelectedDate(event.date);

    /*
     * If editing an event from another month,
     * automatically move calendar to that month.
     */
    const eventDate = new Date(
      event.date + "T00:00:00"
    );

    setCurrentDate(
      new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        1
      )
    );
  }, []);

  /*
   * Cancel edit
   */
  const handleCancelEdit = useCallback(() => {
    setEditingEventId(null);

    setTitle("");
    setTime("");
  }, []);

  /*
   * Delete event
   */
  const handleDelete = useCallback(
    (eventId) => {
      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) => event.id !== eventId
        )
      );
    },
    []
  );

  /*
   * Start dragging event
   */
  const handleDragStart = useCallback(
    (e, event) => {
      e.dataTransfer.setData(
        "eventId",
        String(event.id)
      );

      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  /*
   * Drop event on another date
   */
  const handleDrop = useCallback(
    (e, newDay) => {
      e.preventDefault();

      if (!newDay) {
        return;
      }

      const eventId = Number(
        e.dataTransfer.getData("eventId")
      );

      if (!eventId) {
        return;
      }

      const newDate = createDateString(newDay);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                date: newDate,
              }
            : event
        )
      );

      setSelectedDate(newDate);
    },
    [createDateString]
  );

  /*
   * Selected date display
   */
  const formattedSelectedDate = useMemo(() => {
    const date = new Date(
      selectedDate + "T00:00:00"
    );

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="calendar-container">

      {/* HEADER */}

      <header className="calendar-header">
        <div>
          <h1>Interactive Calendar</h1>

          <p>
            Selected date:
            <strong>
              {" "}
              {formattedSelectedDate}
            </strong>
          </p>
        </div>
      </header>

      {/* MONTH NAVIGATION */}

      <div className="month-navigation">

        <button
          onClick={handlePreviousMonth}
          className="month-button"
        >
          ← Previous
        </button>

        <h2>
          {monthName} {year}
        </h2>

        <button
          onClick={handleNextMonth}
          className="month-button"
        >
          Next →
        </button>

      </div>

      {/* EVENT FORM */}

      <div className="event-panel">

        <h2>
          {editingEventId !== null
            ? "Edit Event"
            : "Add New Event"}
        </h2>

        <form
          className="event-form"
          onSubmit={handleSubmitEvent}
        >
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Time e.g. 10:00 AM"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

          <button type="submit">
            {editingEventId !== null
              ? "Update Event"
              : "Add Event"}
          </button>

          {editingEventId !== null && (
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </form>

        <p className="instruction">
          💡 Click a date to select it.
          Drag events between dates.
          Use ✏️ to edit and × to delete.
        </p>

      </div>

      {/* WEEK DAYS */}

      <div className="week-header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* CALENDAR */}

      <div className="calendar-grid">

        {calendarDays.map((day, index) => (
          <Day
            key={
              day
                ? `${year}-${month}-${day}`
                : `empty-${index}`
            }
            day={day}
            date={
              day
                ? createDateString(day)
                : null
            }
            events={getEventsForDay(day)}
            isSelected={
              day
                ? createDateString(day) ===
                  selectedDate
                : false
            }
            onSelect={handleSelectDate}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}

      </div>

    </div>
  );
}

export default Calendar;