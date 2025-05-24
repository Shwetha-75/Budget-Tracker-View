import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import "./calender.css";
export default function DateCalendarValue() {
  const [value, setValue] = React.useState(dayjs(new Date()));

  return (
    <LocalizationProvider                                                               
    dateAdapter={AdapterDayjs}>
      <DemoContainer 
  sx={{
    color:'white'
  }}
      components={['DateCalendar', 'DateCalendar']}>
        
        <DemoItem  
         sx={{
          color:'white'
        }}
        label="Controlled calendar">
          <DateCalendar value={value} 
          sx={{
            color:'white'
          }}
          onChange={(newValue) => setValue(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
