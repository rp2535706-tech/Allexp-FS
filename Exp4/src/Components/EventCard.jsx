import React from "react";

const EventCard = React.memo(
  function EventCard({
    event,
    onDelete,
  }) {

    const handleDragStart = (e) => {

      e.dataTransfer.effectAllowed =
        "move";

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
  }
);

export default EventCard;
