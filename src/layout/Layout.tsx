import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTheme, Box, Grid, CssBaseline } from "@mui/material";

import BackToTopButton from "../components/BackToTopButton";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";

const BaseLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Box
        component="div"
        id="page-top"
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: 5,
          minHeight: "100vh",
        }}
      >
        {/* Top */}
        <Grid container sx={{ paddingBottom: 5 }}>
          <Grid xs={12}>
            <Navbar toggleSidebar={true} />
          </Grid>
        </Grid>

        {/* Body (derived from <Layout> components inside pages/*.tsx) */}
        {children}

        {/* Bottom */}
        <Grid container sx={{ position: "fixed", bottom: 0 }}>
          <Grid xs={12}>
            <Copyright />
          </Grid>
        </Grid>
      </Box>

      {/* Back-to-top fab button */}
      <BackToTopButton elementId="page-top" />
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
