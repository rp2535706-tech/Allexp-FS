import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";


/* =========================================
   EVENT CARD
========================================= */

const EventCard = memo(function EventCard({
  event,
  onDelete,
}) {

  const handleDragStart = (e) => {

    e.dataTransfer.effectAllowed = "move";

    e.dataTransfer.setData(
      "eventId",
      String(event.id)
    );

    e.currentTarget.classList.add(
      "dragging"
    );
  };


  const handleDragEnd = (e) => {

    e.currentTarget.classList.remove(
      "dragging"
    );
  };


  const handleDelete = (e) => {

    e.stopPropagation();

    onDelete(event.id);
  };


  return (

    <div
      className="day-event"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <div className="event-main">

        <span className="event-grip">
          ⠿
        </span>


        <div className="event-content">

          <span className="event-title">
            {event.title}
          </span>


          <span className="event-time">
            {event.time}
          </span>

        </div>

      </div>


      <button
        className="delete-event"
        onClick={handleDelete}
        title="Delete event"
      >
        ×
      </button>

    </div>
  );
});



/* =========================================
   DAY
========================================= */

const Day = memo(function Day({
  day,
  events,
  isSelected,
  onSelect,
  onDrop,
  onDelete,
}) {

  const handleDragOver = (e) => {

    e.preventDefault();

    e.currentTarget.classList.add(
      "drag-over"
    );
  };


  const handleDragLeave = (e) => {

    e.currentTarget.classList.remove(
      "drag-over"
    );
  };


  const handleDropEvent = (e) => {

    e.preventDefault();

    e.currentTarget.classList.remove(
      "drag-over"
    );

    onDrop(e, day);
  };


  return (

    <div
      className={`day-card ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onSelect(day)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropEvent}
    >

      <div className="day-header">

        <span className="day-number">
          {String(day).padStart(2, "0")}
        </span>


        {events.length > 0 && (

          <span className="event-count">
            {events.length}
          </span>

        )}

      </div>


      <div className="events">

        {events.map((event) => (

          <EventCard
            key={event.id}
            event={event}
            onDelete={onDelete}
          />

        ))}

      </div>

    </div>
  );
});



/* =========================================
   INITIAL EVENTS
========================================= */

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



/* =========================================
   APP
========================================= */

function App() {

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


  /* =========================================
     CURRENT MONTH
     August 2026
  ========================================= */

  const currentMonth = useMemo(() => {

    return new Date(2026, 7, 1);

  }, []);


  /* =========================================
     DAYS IN MONTH
  ========================================= */

  const daysInMonth = useMemo(() => {

    return new Date(

      currentMonth.getFullYear(),

      currentMonth.getMonth() + 1,

      0

    ).getDate();

  }, [currentMonth]);


  /* =========================================
     CREATE DAYS
  ========================================= */

  const days = useMemo(() => {

    return Array.from(

      { length: daysInMonth },

      (_, index) => index + 1

    );

  }, [daysInMonth]);


  /* =========================================
     GROUP EVENTS BY DAY
  ========================================= */

  const eventsByDay = useMemo(() => {

    const grouped = {};

    days.forEach((day) => {

      grouped[day] = events.filter(

        (event) =>
          event.day === day

      );

    });

    return grouped;

  }, [events, days]);


  /* =========================================
     SELECT DAY
  ========================================= */

  const handleSelectDay = useCallback(
    (day) => {

      setSelectedDay(day);

    },
    []
  );


  /* =========================================
     ADD EVENT
  ========================================= */

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
    [
      title,
      time,
      selectedDay,
    ]
  );


  /* =========================================
     DELETE EVENT
  ========================================= */

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


  /* =========================================
     DROP EVENT
  ========================================= */

  const handleDrop = useCallback(
    (e, newDay) => {

      e.preventDefault();


      const eventId = Number(

        e.dataTransfer.getData(
          "eventId"
        )

      );


      if (!eventId) {

        return;

      }


      /* Drag happened */

      setHasDragged(true);


      /* Move event */

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


  /* =========================================
     CHANGE MODE
  ========================================= */

  const handleModeChange = useCallback(
    (isOptimized) => {

      setOptimized(isOptimized);

      setHasDragged(false);

    },
    []
  );


  /* =========================================
     RESET COUNTERS
  ========================================= */

  const handleResetCounters =
    useCallback(() => {

      setHasDragged(false);

    }, []);


  /* =========================================
     RENDER COUNT LOGIC
  ========================================= */

  const unoptimizedRenders =

    hasDragged && !optimized

      ? daysInMonth

      : 0;


  const optimizedRenders =

    hasDragged && optimized

      ? 1

      : 0;


  const currentRenderCount =

    optimized

      ? optimizedRenders

      : unoptimizedRenders;


  /* =========================================
     MONTH NAME
  ========================================= */

  const monthName = useMemo(() => {

    return currentMonth.toLocaleString(

      "default",

      {
        month: "long",
        year: "numeric",
      }

    );

  }, [currentMonth]);


  /* =========================================
     RETURN
  ========================================= */

  return (

    <div className="calendar-container">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="app-header">

        <div className="header-content">

          <div className="header-label">
            REACT PERFORMANCE LAB
          </div>


          <h1>
            Interactive Calendar
          </h1>


          <p className="subtitle">
            Drag events between days and
            compare React rendering
            performance.
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



      {/* =====================================
          PERFORMANCE PANEL
      ===================================== */}

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



        {/* MODE SELECTOR */}

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



        {/* COUNTERS */}

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



      {/* =====================================
          MAIN DASHBOARD
      ===================================== */}

      <div className="dashboard-layout">


        {/* CALENDAR */}

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



          {/* ADD EVENT */}

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



          {/* INSTRUCTION */}

          <div className="calendar-instruction">

            <span>
              💡
            </span>


            <p>

              Click a date to select it.
              Drag an event to another date.

            </p>

          </div>



          {/* WEEKDAYS */}

          <div className="weekday-header">

            <span>SUN</span>

            <span>MON</span>

            <span>TUE</span>

            <span>WED</span>

            <span>THU</span>

            <span>FRI</span>

            <span>SAT</span>

          </div>



          {/* CALENDAR GRID */}

          <div className="calendar-grid">

            {days.map((day) => (

              <Day

                key={day}

                day={day}

                events={eventsByDay[day]}

                isSelected={
                  day === selectedDay
                }

                onSelect={
                  handleSelectDay
                }

                onDrop={
                  handleDrop
                }

                onDelete={
                  handleDelete
                }

              />

            ))}

          </div>


        </main>



        {/* =====================================
            RIGHT SIDEBAR
        ===================================== */}

        <aside className="optimization-sidebar">


          <div className="sidebar-header">

            <span className="sidebar-label">
              CONCEPT ↔ CODE
            </span>


            <h2>
              Optimization Lab
            </h2>

          </div>



          {/* REACT MEMO */}

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
              memo(Day)
            </code>

          </div>



          {/* USE MEMO */}

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



          {/* USE CALLBACK */}

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



          {/* SUMMARY */}

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

                : "Unoptimized"

              }

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


export default App;
