import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import React from 'react';

export default function DataPicker ({setTime, time}) {
    const handleChange = (newValue) => {
        setTime(newValue);
    };
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    required
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={time}
                    onChange={handleChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                />
        </LocalizationProvider>
    )
}