import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import Content from "../config/content.json";

const Copyright = () => {
  const theme = useTheme();
  const { copyright } = Content;

  return (
    <Grid container sx={{ paddingX: 10, paddingY: 3 }}>
      <Grid container item xs={12} md={12} justifyContent="left">
        <Typography variant="body2" color={theme.palette.text.secondary}>
          &copy; {new Date().getFullYear()} {copyright}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Copyright;
