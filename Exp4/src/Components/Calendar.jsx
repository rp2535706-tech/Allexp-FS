import React, { useMemo } from "react";
import Day from "./Day";

const Calendar = React.memo(function Calendar({
  events,
  selectedDate,
  optimized,
  currentMonth,
  currentYear,
  onDateChange,
  onEventDrop,
  onDeleteEvent,
}) {

  const dates = useMemo(() => {

    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    );

    const firstWeekday =
      firstDay.getDay();

    const startDate = new Date(
      currentYear,
      currentMonth,
      1 - firstWeekday
    );

    return Array.from(
      { length: 42 },
      (_, index) => {

        const date = new Date(
          startDate
        );

        date.setDate(
          startDate.getDate() +
            index
        );

        const year =
          date.getFullYear();

        const month =
          String(
            date.getMonth() + 1
          ).padStart(2, "0");

        const day =
          String(
            date.getDate()
          ).padStart(2, "0");

        return {
          date:
            `${year}-${month}-${day}`,

          day:
            date.getDate(),

          isCurrentMonth:
            date.getMonth() ===
              currentMonth &&
            date.getFullYear() ===
              currentYear,
        };
      }
    );

  }, [
    currentMonth,
    currentYear,
  ]);


  const eventsByDate = useMemo(() => {

    const result = {};

    dates.forEach((item) => {

      result[item.date] =
        events.filter(
          (event) =>
            event.date ===
            item.date
        );

    });

    return result;

  }, [
    dates,
    events,
  ]);


  return (
    <div className="calendar">

      <div className="weekdays">

        <div>MON</div>
        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
        <div>SAT</div>
        <div>SUN</div>

      </div>


      <div className="calendar-grid">

        {dates.map((item) => (

          <Day
            key={item.date}
            date={item.date}
            dayNumber={item.day}
            events={
              eventsByDate[item.date]
            }
            selectedDate={
              selectedDate
            }
            optimized={
              optimized
            }
            isCurrentMonth={
              item.isCurrentMonth
            }
            onDateChange={
              onDateChange
            }
            onEventDrop={
              onEventDrop
            }
            onDeleteEvent={
              onDeleteEvent
            }
          />

        ))}

      </div>

    </div>
  );
});

export default Calendar;
