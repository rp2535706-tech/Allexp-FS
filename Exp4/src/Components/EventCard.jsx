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

      e.preventDefault();
      e.stopPropagation();

      const confirmed =
        window.confirm(
          `Delete "${event.title}"?`
        );

      if (confirmed) {
        onDelete(event.id);
      }

    };


    return (
      <div
        className={`event-card ${event.type}`}
        draggable={true}
        onDragStart={
          handleDragStart
        }
        onDragEnd={
          handleDragEnd
        }
      >

        <div className="event-content">

          <span className="event-time">
            {event.time}
          </span>

          <span className="event-name">
            {event.title}
          </span>

        </div>


        <button
          className="event-delete"
          onClick={handleDelete}
          draggable={false}
          title="Delete event"
        >
          ×
        </button>

      </div>
    );
  }
);

export default EventCard;
