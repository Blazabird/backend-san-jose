"use client"
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';  
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { fetchHighlightedDays } from '../api/calendar'; 

dayjs.locale('es');  

export default function DateCalendarServerRequest() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDates, setHighlightedDates] = React.useState<{ [key: string]: string }>({});
  const [selectedEvent, setSelectedEvent] = React.useState<{ title: string; date: string } | null>(null);

  const currentYear = dayjs().year(); 

  const fetchAndSetHighlightedDays = async () => {
    setIsLoading(true);
    const events = await fetchHighlightedDays(); 
    setHighlightedDates(events); 
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchAndSetHighlightedDays();
  }, []);

  const ServerDay = (props: any) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const formattedDate = day.format('YYYY-MM-DD');
    const isSelected = !!highlightedDates[formattedDate];
    const isToday = day.isSame(dayjs(), 'day');  

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
          sx={{
            color: 'black', 
            ...(isSelected && {
              border: '2px solid black', 
              backgroundColor: 'transparent', 
            }),
            ...(isToday && {
              backgroundColor: 'green', 
              color: 'white', 
              border: '2px solid black', 
            }),
          }}
        />
      </Badge>
    );
  };

  const handleMonthChange = (date: Dayjs) => {
    if (date.year() !== currentYear) {
      return; 
    }
  };

  const minDate = dayjs().startOf('year'); 
  const maxDate = dayjs().endOf('year'); 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es"> 
      <DateCalendar
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{ day: ServerDay }}
        onMonthChange={handleMonthChange} 
        minDate={minDate} 
        maxDate={maxDate}
        sx={{
          '.MuiCalendarPicker-header': {
            backgroundColor: '#4caf50', 
            color: 'white',  
          },
          '.MuiPickersCalendarHeader-root': {
            backgroundColor: '#4caf50', 
            color: 'white',  
          },
          '.MuiPickersCalendarHeader-iconButton': {
            color: 'white',  
          },
          '.MuiCalendarPicker-view': {
            backgroundColor: '#4caf50', 
          },
          '.MuiCalendarPicker-root': {
            border: '2px solid #000', 
            borderRadius: '8px', 
            width: '500px', 
            height: '600px', 
          },
        }}
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
