"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#df5a1f",
      dark: "#b83d12",
      light: "#f58a50",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fff9f4",
      paper: "#ffffff",
    },
    text: {
      primary: "#2a1b15",
      secondary: "#77645b",
    },
    divider: "#eaded5",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 650,
      letterSpacing: "-0.04em",
    },
    h4: {
      fontWeight: 650,
      letterSpacing: "-0.035em",
    },
    button: {
      fontWeight: 650,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "medium",
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#ffffff",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bda99d",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(223, 90, 31, 0.12)",
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  },
});

export default theme;
