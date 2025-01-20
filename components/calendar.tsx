"use client";

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { fetchHighlightedDays } from '../api/calendar'; // Import the fetch function

export default function DateCalendarServerRequest() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDates, setHighlightedDates] = React.useState<{ [key: string]: string }>({});
  const [selectedEvent, setSelectedEvent] = React.useState<{ title: string; date: string } | null>(null);

  const currentYear = dayjs().year(); // Get the current year

  // Fetch the highlighted days from the API
  const fetchAndSetHighlightedDays = async () => {
    setIsLoading(true);
    const events = await fetchHighlightedDays(); // Fetch events
    setHighlightedDates(events); // Set the events for highlighting
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchAndSetHighlightedDays();
  }, []);

  // Custom Day rendering with Badge to highlight dates
  const ServerDay = (props: any) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const formattedDate = day.format('YYYY-MM-DD');
    const isSelected = !!highlightedDates[formattedDate];

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🌟' : undefined}
      >
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
          onClick={() => {
            if (isSelected) setSelectedEvent({ title: highlightedDates[formattedDate], date: formattedDate });
          }}
        />
      </Badge>
    );
  };

  // Restrict to the current year and month
  const handleMonthChange = (date: Dayjs) => {
    if (date.year() !== currentYear) {
      return; // Prevent changing the year
    }
  };

  // Restrict navigation to the current year by setting min and max dates
  const minDate = dayjs().startOf('year'); // Start of current year
  const maxDate = dayjs().endOf('year'); // End of current year

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{ day: ServerDay }}
        onMonthChange={handleMonthChange} // Restrict month change to the current year
        minDate={minDate} // Restrict to the start of the current year
        maxDate={maxDate} // Restrict to the end of the current year
      />
      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <DialogTitle>{selectedEvent?.title}</DialogTitle>
        <div style={{ padding: 16 }}>
          <p>Fecha: {selectedEvent?.date}</p>
        </div>
      </Dialog>
    </LocalizationProvider>
  );
}
