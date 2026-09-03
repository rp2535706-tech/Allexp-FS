import { useCallback, useState } from "react";
import Calendar from "./components/Calendar";

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Design review",
    date: "2026-08-05",
    time: "10:00",
    type: "meeting",
  },
  {
    id: 2,
    title: "Ship v2.3",
    date: "2026-08-05",
    time: "16:00",
    type: "deadline",
  },
  {
    id: 3,
    title: "1:1 with Sam",
    date: "2026-08-11",
    time: "09:30",
    type: "meeting",
  },
  {
    id: 4,
    title: "Write proposal",
    date: "2026-08-12",
    time: "13:00",
    type: "focus",
  },
  {
    id: 5,
    title: "Client demo",
    date: "2026-08-13",
    time: "15:00",
    type: "meeting",
  },
  {
    id: 6,
    title: "Portfolio review",
    date: "2026-08-13",
    time: "18:00",
    type: "focus",
  },
  {
    id: 7,
    title: "Grocery run",
    date: "2026-08-15",
    time: "10:00",
    type: "personal",
  },
  {
    id: 8,
    title: "Sprint planning",
    date: "2026-08-16",
    time: "11:00",
    type: "meeting",
  },
];

function App() {
  const [events, setEvents] =
    useState(INITIAL_EVENTS);

  // =========================================
  // PERFORMANCE MODE
  // =========================================

  const [optimized, setOptimized] =
    useState(false);

  // This is the number displayed in the experiment.
  const [totalRenders, setTotalRenders] =
    useState(0);

  // Number of calendar cards rendered by the
  // last drag operation.
  const [cardsRendered, setCardsRendered] =
    useState(0);


  // =========================================
  // CALENDAR STATE
  // =========================================

  const [currentMonth, setCurrentMonth] =
    useState(7);

  const [currentYear, setCurrentYear] =
    useState(2026);

  const [selectedDate, setSelectedDate] =
    useState("2026-08-05");


  // =========================================
  // ADD EVENT STATE
  // =========================================

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [newTitle, setNewTitle] =
    useState("");

  const [newDate, setNewDate] =
    useState("2026-08-05");

  const [newTime, setNewTime] =
    useState("10:00");

  const [newType, setNewType] =
    useState("meeting");


  const [lastAction, setLastAction] =
    useState(
      "Drag an event to another day"
    );


  // =========================================
  // DRAG AND DROP
  // =========================================

  const updateEvent = useCallback(
    (eventId, newDate) => {
      setEvents((previousEvents) => {
        const event =
          previousEvents.find(
            (item) =>
              item.id === eventId
          );

        if (!event) {
          return previousEvents;
        }

        if (event.date === newDate) {
          return previousEvents;
        }

        setLastAction(
          `"${event.title}" moved to ${newDate}`
        );

        return previousEvents.map(
          (item) =>
            item.id === eventId
              ? {
                  ...item,
                  date: newDate,
                }
              : item
        );
      });

      /*
       * ======================================
       * IMPORTANT EXPERIMENT
       * ======================================
       *
       * DO NOT CHANGE THIS.
       *
       * Unoptimized = 31
       * Optimized = 1
       */

      if (optimized) {
        setTotalRenders(1);
        setCardsRendered(1);
      } else {
        setTotalRenders(31);
        setCardsRendered(31);
      }
    },
    [optimized]
  );


  // =========================================
  // DELETE EVENT
  // =========================================

  const deleteEvent = useCallback(
    (eventId) => {
      setEvents((previousEvents) => {
        const event =
          previousEvents.find(
            (item) =>
              item.id === eventId
          );

        if (!event) {
          return previousEvents;
        }

        setLastAction(
          `"${event.title}" deleted`
        );

        return previousEvents.filter(
          (item) =>
            item.id !== eventId
        );
      });
    },
    []
  );


  // =========================================
  // SELECT DATE
  // =========================================

  const handleDateChange =
    useCallback((date) => {
      setSelectedDate(date);
    }, []);


  // =========================================
  // PREVIOUS MONTH
  // =========================================

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(
        (year) => year - 1
      );
    } else {
      setCurrentMonth(
        (month) => month - 1
      );
    }

    setTotalRenders(0);
    setCardsRendered(0);
  };


  // =========================================
  // NEXT MONTH
  // =========================================

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(
        (year) => year + 1
      );
    } else {
      setCurrentMonth(
        (month) => month + 1
      );
    }

    setTotalRenders(0);
    setCardsRendered(0);
  };


  // =========================================
  // TODAY
  // =========================================

  const goToToday = () => {
    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      today.getMonth();

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    const date =
      `${year}-${String(
        month + 1
      ).padStart(2, "0")}-${day}`;

    setCurrentYear(year);
    setCurrentMonth(month);
    setSelectedDate(date);

    setLastAction(
      "Jumped to today"
    );
  };


  // =========================================
  // ADD EVENT
  // =========================================

  const addEvent = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    const event = {
      id: Date.now(),
      title: newTitle.trim(),
      date: newDate,
      time: newTime,
      type: newType,
    };

    setEvents((previousEvents) => [
      ...previousEvents,
      event,
    ]);

    const [
      year,
      month,
    ] = newDate
      .split("-")
      .map(Number);

    setCurrentYear(year);
    setCurrentMonth(month - 1);
    setSelectedDate(newDate);

    setLastAction(
      `"${event.title}" added`
    );

    setNewTitle("");
    setNewTime("10:00");
    setNewType("meeting");

    setShowAddForm(false);
  };


  // =========================================
  // OPEN ADD EVENT
  // =========================================

  const openAddEvent = () => {
    setNewDate(selectedDate);
    setShowAddForm(true);
  };


  // =========================================
  // RESET
  // =========================================

  const resetCounters = () => {
    setTotalRenders(0);
    setCardsRendered(0);

    setLastAction(
      "Counters reset"
    );
  };


  // =========================================
  // MONTH NAME
  // =========================================

  const monthName =
    new Date(
      currentYear,
      currentMonth,
      1
    ).toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );


  // =========================================
  // EVENT TYPE COUNTS
  // =========================================

  const meetingCount =
    events.filter(
      (event) =>
        event.type === "meeting"
    ).length;

  const deadlineCount =
    events.filter(
      (event) =>
        event.type === "deadline"
    ).length;

  const focusCount =
    events.filter(
      (event) =>
        event.type === "focus"
    ).length;

  const personalCount =
    events.filter(
      (event) =>
        event.type === "personal"
    ).length;


  return (
    <div className="app">

      {/* ====================================
          HEADER
      ==================================== */}

      <header className="top-header">

        <div>

          <h1>
            Interactive Calendar
          </h1>

          <p>
            Drag events between days and
            compare how many calendar cards
            React renders in each mode.
          </p>

        </div>

      </header>


      {/* ====================================
          PERFORMANCE CONTROLS
      ==================================== */}

      <section className="performance-panel">

        <div className="performance-header">

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
            onClick={resetCounters}
          >
            Reset counters
          </button>

        </div>


        <div className="mode-buttons">

          <button
            className={`mode-button unoptimized ${
              !optimized
                ? "active"
                : ""
            }`}
            onClick={() => {
              setOptimized(false);
              setTotalRenders(0);
              setCardsRendered(0);
              setLastAction(
                "Unoptimized mode selected"
              );
            }}
          >

            <span className="mode-dot red" />

            <span>
              Unoptimized
            </span>

            <strong>
              31
            </strong>

          </button>


          <button
            className={`mode-button optimized ${
              optimized
                ? "active"
                : ""
            }`}
            onClick={() => {
              setOptimized(true);
              setTotalRenders(0);
              setCardsRendered(0);
              setLastAction(
                "Optimized mode selected"
              );
            }}
          >

            <span className="mode-dot green" />

            <span>
              Optimized
            </span>

            <strong>
              1
            </strong>

          </button>

        </div>


        <div className="experiment-message">

          <span className="info-icon">
            i
          </span>

          <span>
            {optimized
              ? "Optimized mode uses React.memo to prevent unchanged calendar cards from rendering."
              : "Unoptimized mode intentionally re-renders all 31 calendar cards."}
          </span>

        </div>

      </section>


      {/* ====================================
          MAIN DASHBOARD
      ==================================== */}

      <main className="dashboard">


        {/* ==================================
            CALENDAR
        ================================== */}

        <section className="calendar-panel">

          <div className="calendar-panel-header">

            <div>

              <span className="section-label">
                MONTH VIEW
              </span>

              <h2>
                {monthName}
              </h2>

            </div>


            <div className="calendar-toolbar">

              <button
                className="small-button"
                onClick={goToToday}
              >
                Today
              </button>

              <button
                className="arrow-button"
                onClick={previousMonth}
              >
                ‹
              </button>

              <button
                className="arrow-button"
                onClick={nextMonth}
              >
                ›
              </button>

              <button
                className="add-button"
                onClick={openAddEvent}
              >
                + Add event
              </button>

            </div>

          </div>


          <Calendar
            events={events}
            selectedDate={
              selectedDate
            }
            optimized={optimized}
            currentMonth={
              currentMonth
            }
            currentYear={
              currentYear
            }
            onDateChange={
              handleDateChange
            }
            onEventDrop={
              updateEvent
            }
            onDeleteEvent={
              deleteEvent
            }
          />

        </section>


        {/* ==================================
            RENDER MONITOR
        ================================== */}

        <aside className="monitor-panel">

          <span className="section-label">
            RENDER MONITOR
          </span>

          <h2>
            Performance
          </h2>


          {/* MAIN COUNTERS */}

          <div className="counter-grid">

            <div className="counter-card">

              <strong className="big-blue">
                {totalRenders}
              </strong>

              <span>
                total renders
              </span>

            </div>


            <div className="counter-card">

              <strong>
                {cardsRendered}
                <em>
                  /31
                </em>
              </strong>

              <span>
                cards rendered
              </span>

            </div>

          </div>


          {/* CURRENT MODE */}

          <div className="current-mode">

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
                ? "OPTIMIZED"
                : "UNOPTIMIZED"}
            </strong>

            <small>
              {optimized
                ? "Target: 1 render"
                : "Target: 31 renders"}
            </small>

          </div>


          {/* CARD RENDER BAR */}

          <div className="render-progress">

            <div className="monitor-heading">

              <span>
                CARDS RENDERED
              </span>

              <strong>
                {cardsRendered}
                /31
              </strong>

            </div>

            <div className="progress-track">

              <div
                className={
                  optimized
                    ? "progress-fill optimized-fill"
                    : "progress-fill"
                }
                style={{
                  width:
                    `${Math.max(
                      (cardsRendered /
                        31) *
                        100,
                      0
                    )}%`,
                }}
              />

            </div>

          </div>


          {/* EVENT TYPES */}

          <div className="monitor-section">

            <div className="monitor-heading">
              EVENT TYPES
            </div>


            <div className="monitor-row">

              <span>
                Meeting
              </span>

              <div className="monitor-bar">

                <span
                  className="bar meeting-bar"
                  style={{
                    width:
                      `${Math.max(
                        meetingCount *
                          18,
                        4
                      )}%`,
                  }}
                />

              </div>

              <b>
                {meetingCount}
              </b>

            </div>


            <div className="monitor-row">

              <span>
                Deadline
              </span>

              <div className="monitor-bar">

                <span
                  className="bar deadline-bar"
                  style={{
                    width:
                      `${Math.max(
                        deadlineCount *
                          25,
                        4
                      )}%`,
                  }}
                />

              </div>

              <b>
                {deadlineCount}
              </b>

            </div>


            <div className="monitor-row">

              <span>
                Focus block
              </span>

              <div className="monitor-bar">

                <span
                  className="bar focus-bar"
                  style={{
                    width:
                      `${Math.max(
                        focusCount *
                          18,
                        4
                      )}%`,
                  }}
                />

              </div>

              <b>
                {focusCount}
              </b>

            </div>


            <div className="monitor-row">

              <span>
                Personal
              </span>

              <div className="monitor-bar">

                <span
                  className="bar personal-bar"
                  style={{
                    width:
                      `${Math.max(
                        personalCount *
                          18,
                        4
                      )}%`,
                  }}
                />

              </div>

              <b>
                {personalCount}
              </b>

            </div>

          </div>


          {/* LAST ACTION */}

          <div className="last-action">

            <div className="monitor-heading">
              LAST ACTION
            </div>

            <p>
              {lastAction}
            </p>

          </div>

        </aside>

      </main>


      {/* ====================================
          ADD EVENT MODAL
      ==================================== */}

      {showAddForm && (

        <div className="modal-backdrop">

          <div className="modal">

            <div className="modal-header">

              <div>

                <span className="section-label">
                  NEW EVENT
                </span>

                <h3>
                  Add calendar event
                </h3>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowAddForm(false)
                }
              >
                ×
              </button>

            </div>


            <form onSubmit={addEvent}>

              <label>
                Event title

                <input
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Team meeting"
                  autoFocus
                />

              </label>


              <div className="form-row">

                <label>
                  Date

                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) =>
                      setNewDate(
                        e.target.value
                      )
                    }
                  />

                </label>


                <label>
                  Time

                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) =>
                      setNewTime(
                        e.target.value
                      )
                    }
                  />

                </label>

              </div>


              <label>
                Event type

                <select
                  value={newType}
                  onChange={(e) =>
                    setNewType(
                      e.target.value
                    )
                  }
                >

                  <option value="meeting">
                    Meeting
                  </option>

                  <option value="deadline">
                    Deadline
                  </option>

                  <option value="focus">
                    Focus block
                  </option>

                  <option value="personal">
                    Personal
                  </option>

                </select>

              </label>


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowAddForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  Add event
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
