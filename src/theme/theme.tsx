import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // source: https://colorhunt.co/palette/557571d49a89f7d1baf4f4f4
      main: "#557571",
      light: "#F7D1BA",
      dark: "#D49A89",
      contrastText: "#F4F4F4"
    },
    background: {
      default: "rgb(242, 243, 245)",
      paper: "rgb(255, 255, 255)",
    },
    text: {
      primary: "rgb(60, 60, 60)",
      secondary: "rgb(123, 132, 140)",
    },
    divider: "rgb(197, 197, 197)",
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: '"Roboto", sans-serif',
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "3.00rem",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h5: {
      fontSize: "1.0625rem",
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h6: {
      fontSize: "0.9rem",
      fontWeight: 400,
      lineHeight: 1.25,
    },
    overline: {
      fontWeight: 600,
    },
  },
});

export default theme;
