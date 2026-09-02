import React, { useRef } from "react";
import EventCard from "./EventCard";

const Day = React.memo(
  function Day({
    date,
    dayNumber,
    events,
    selectedDate,
    optimized,
    isCurrentMonth,
    onDateChange,
    onEventDrop,
    onDeleteEvent,
  }) {

    /*
     * This counter is only a visual/debug
     * counter for each calendar cell.
     */
    const renderCount =
      useRef(0);

    renderCount.current += 1;


    const handleDragEnter = (e) => {
      e.preventDefault();

      e.currentTarget.classList.add(
        "drag-over"
      );
    };


    const handleDragOver = (e) => {
      e.preventDefault();

      e.dataTransfer.dropEffect =
        "move";

      e.currentTarget.classList.add(
        "drag-over"
      );
    };


    const handleDragLeave = (e) => {

      e.currentTarget.classList.remove(
        "drag-over"
      );

    };


    const handleDrop = (e) => {

      e.preventDefault();
      e.stopPropagation();

      e.currentTarget.classList.remove(
        "drag-over"
      );

      const eventId =
        e.dataTransfer.getData(
          "eventId"
        );

      if (!eventId) {
        return;
      }

      onEventDrop(
        Number(eventId),
        date
      );
    };


    return (
      <div
        className={`
          day
          ${
            selectedDate === date
              ? "selected"
              : ""
          }
          ${
            !isCurrentMonth
              ? "outside-month"
              : ""
          }
        `}
        onClick={() =>
          onDateChange(date)
        }
        onDragEnter={
          handleDragEnter
        }
        onDragOver={
          handleDragOver
        }
        onDragLeave={
          handleDragLeave
        }
        onDrop={handleDrop}
      >

        <div className="day-top">

          <span className="day-number">
            {dayNumber}
          </span>

          <span className="render-badge">
            R{renderCount.current}
          </span>

        </div>


        <div className="day-events">

          {events.map((event) => (

            <EventCard
              key={event.id}
              event={event}
              onDelete={
                onDeleteEvent
              }
            />

          ))}

        </div>

      </div>
    );
  },


  /*
   * ========================================
   * PERFORMANCE OPTIMIZATION
   * ========================================
   *
   * Unoptimized:
   * every Day renders.
   *
   * Optimized:
   * unchanged Days are skipped.
   */

  (oldProps, newProps) => {

    if (!newProps.optimized) {
      return false;
    }

    const oldEventIds =
      oldProps.events
        .map(
          (event) =>
            event.id
        )
        .join(",");

    const newEventIds =
      newProps.events
        .map(
          (event) =>
            event.id
        )
        .join(",");

    return (
      oldProps.date ===
        newProps.date &&

      oldProps.selectedDate ===
        newProps.selectedDate &&

      oldEventIds ===
        newEventIds &&

      oldProps.isCurrentMonth ===
        newProps.isCurrentMonth
    );
  }
);

export default Day;
