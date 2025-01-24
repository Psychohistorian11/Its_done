"use client";

import React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: "#FFFFFF",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFC300",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#28A745",
          },
        },
        input: {
          color: "#FFFFFF",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

interface DateTimePickerProps {
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
}

export default function DateTime_Picker({
  date,
  setDate,
}: DateTimePickerProps) {
  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          spacing={2}
          sx={{ minWidth: 305 }}
          className="bg-primary p-2 rounded-sm"
        >
          <DateTimePicker
            value={date}
            onChange={handleChange}
            referenceDate={dayjs()}
          />
        </Stack>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
