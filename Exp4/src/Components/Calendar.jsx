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
    day: 5,
  },
  {
    id: 2,
    title: "Full Stack Lab",
    time: "1:00 PM",
    day: 10,
  },
  {
    id: 3,
    title: "CN Assignment",
    time: "3:00 PM",
    day: 15,
  },
  {
    id: 4,
    title: "ML Project",
    time: "11:00 AM",
    day: 20,
  },
];

function Calendar() {
  const [selectedDay, setSelectedDay] =
    useState(1);

  const [events, setEvents] =
    useState(initialEvents);

  const [title, setTitle] =
    useState("");

  const [time, setTime] =
    useState("");

  const [optimized, setOptimized] =
    useState(false);

  const [hasDragged, setHasDragged] =
    useState(false);

  const [currentMonth] = useState(
    new Date(2026, 7, 1)
  );

  const daysInMonth = useMemo(() => {
    return new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
  }, [currentMonth]);

  const days = useMemo(() => {
    return Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );
  }, [daysInMonth]);

  const eventsByDay = useMemo(() => {
    const grouped = {};

    days.forEach((day) => {
      grouped[day] = events.filter(
        (event) => event.day === day
      );
    });

    return grouped;
  }, [events, days]);

  const handleSelectDay = useCallback(
    (day) => {
      setSelectedDay(day);
    },
    []
  );

  const handleAddEvent = useCallback(
    (e) => {
      e.preventDefault();

      if (!title.trim()) {
        return;
      }

      const newEvent = {
        id: Date.now(),
        title: title.trim(),
        time: time || "All Day",
        day: selectedDay,
      };

      setEvents((prevEvents) => [
        ...prevEvents,
        newEvent,
      ]);

      setTitle("");
      setTime("");
    },
    [title, time, selectedDay]
  );

  const handleDelete = useCallback(
    (eventId) => {
      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) =>
            event.id !== eventId
        )
      );
    },
    []
  );

  const handleDrop = useCallback(
    (e, newDay) => {
      e.preventDefault();

      const eventId = Number(
        e.dataTransfer.getData("eventId")
      );

      if (!eventId) {
        return;
      }

      setHasDragged(true);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                day: newDay,
              }
            : event
        )
      );
    },
    []
  );

  const handleModeChange = useCallback(
    (isOptimized) => {
      setOptimized(isOptimized);
      setHasDragged(false);
    },
    []
  );

  const handleResetCounters =
    useCallback(() => {
      setHasDragged(false);
    }, []);

  const unoptimizedRenders =
    hasDragged && !optimized
      ? daysInMonth
      : 0;

  const optimizedRenders =
    hasDragged && optimized
      ? 1
      : 0;

  const monthName = useMemo(() => {
    return currentMonth.toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );
  }, [currentMonth]);

  const currentRenderCount =
    optimized
      ? optimizedRenders
      : unoptimizedRenders;

  return (
    <div className="calendar-container">

      <header className="app-header">

        <div className="header-content">

          <div className="header-label">
            REACT PERFORMANCE LAB
          </div>

          <h1>
            Interactive Calendar
          </h1>

          <p className="subtitle">
            Drag events between days and compare
            React rendering performance.
          </p>

        </div>

        <div className="header-render-card">

          <span>
            RENDERS THIS DRAG
          </span>

          <strong>
            {currentRenderCount}
          </strong>

        </div>

      </header>


      <section className="performance-panel">

        <div className="performance-top">

          <div>

            <span className="section-label">
              PERFORMANCE MODE
            </span>

            <h2>
              Render experiment
            </h2>

          </div>

          <button
            className="reset-button"
            onClick={handleResetCounters}
          >
            ↻ Reset counters
          </button>

        </div>


        <div className="mode-selector">

          <button
            className={
              !optimized
                ? "mode-button active-unoptimized"
                : "mode-button"
            }
            onClick={() =>
              handleModeChange(false)
            }
          >

            <span className="mode-status red"></span>

            <span>
              Unoptimized
            </span>

          </button>


          <button
            className={
              optimized
                ? "mode-button active-optimized"
                : "mode-button"
            }
            onClick={() =>
              handleModeChange(true)
            }
          >

            <span className="mode-status green"></span>

            <span>
              Optimized
            </span>

          </button>

        </div>


        <div className="counter-container">

          <div className="counter-card unoptimized-counter">

            <div className="counter-card-top">

              <span className="counter-dot red"></span>

              <span>
                UNOPTIMIZED
              </span>

            </div>

            <strong className="counter-number">
              {unoptimizedRenders}
            </strong>

            <small>
              calendar cards rendered
            </small>

          </div>


          <div className="counter-card optimized-card">

            <div className="counter-card-top">

              <span className="counter-dot green"></span>

              <span>
                OPTIMIZED
              </span>

            </div>

            <strong className="counter-number">
              {optimizedRenders}
            </strong>

            <small>
              calendar cards rendered
            </small>

          </div>

        </div>


        <div className="optimization-info">

          <span className="info-icon">
            i
          </span>

          <span>
            {optimized
              ? "Optimized mode: only the changed calendar card is rendered."
              : `Unoptimized mode: all ${daysInMonth} calendar cards are rendered.`
            }
          </span>

        </div>

      </section>


      <div className="dashboard-layout">

        <main className="calendar-main">

          <div className="calendar-main-header">

            <div>

              <span className="section-label">
                MONTH VIEW
              </span>

              <h2>
                {monthName}
              </h2>

            </div>


            <div className="selected-day-info">

              <span>
                SELECTED DAY
              </span>

              <strong>
                {String(selectedDay).padStart(
                  2,
                  "0"
                )}
              </strong>

            </div>

          </div>


          <form
            className="event-form"
            onSubmit={handleAddEvent}
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
              placeholder="Time"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
            />

            <button type="submit">
              + Add event
            </button>

          </form>


          <div className="calendar-instruction">

            <span>
              💡
            </span>

            <p>
              Click a date to select it.
              Drag an event to another date.
            </p>

          </div>


          <div className="weekday-header">

            <span>SUN</span>
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>

          </div>


          <div className="calendar-grid">

            {days.map((day) => (

              <Day
                key={day}
                day={day}
                events={eventsByDay[day]}
                isSelected={
                  day === selectedDay
                }
                onSelect={handleSelectDay}
                onDrop={handleDrop}
                onDelete={handleDelete}
              />

            ))}

          </div>

        </main>


        <aside className="optimization-sidebar">

          <div className="sidebar-header">

            <span className="sidebar-label">
              CONCEPT ↔ CODE
            </span>

            <h2>
              Optimization Lab
            </h2>

          </div>


          <div className="optimization-item active">

            <div className="optimization-item-top">

              <div>

                <span className="optimization-icon">
                  ⚡
                </span>

                <strong>
                  React.memo
                </strong>

              </div>

              <span className="status-on">
                ON
              </span>

            </div>

            <p>
              Prevents unchanged day
              components from rendering.
            </p>

            <code>
              export default memo(Day)
            </code>

          </div>


          <div className="optimization-item active">

            <div className="optimization-item-top">

              <div>

                <span className="optimization-icon">
                  ◈
                </span>

                <strong>
                  useMemo
                </strong>

              </div>

              <span className="status-on">
                ON
              </span>

            </div>

            <p>
              Caches days and grouped
              calendar events.
            </p>

            <code>
              useMemo(() =&gt; ...)
            </code>

          </div>


          <div className="optimization-item active">

            <div className="optimization-item-top">

              <div>

                <span className="optimization-icon">
                  ↻
                </span>

                <strong>
                  useCallback
                </strong>

              </div>

              <span className="status-on">
                ON
              </span>

            </div>

            <p>
              Keeps event handlers stable
              between renders.
            </p>

            <code>
              useCallback(() =&gt; ...)
            </code>

          </div>


          <div className="sidebar-summary">

            <span>
              CURRENT MODE
            </span>

            <strong
              className={
                optimized
                  ? "green-text"
                  : "red-text"
              }
            >

              {optimized
                ? "Optimized"
                : "Unoptimized"}

            </strong>

            <p>
              {optimized
                ? "Only the changed day is counted."
                : `All ${daysInMonth} days are counted.`
              }
            </p>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default Calendar;
