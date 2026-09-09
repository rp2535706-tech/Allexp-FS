import React, { memo } from "react";

import EventCard from "./EventCard";

function Day({
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
}

export default memo(Day);
