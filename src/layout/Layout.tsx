import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTheme, Box, Grid } from "@mui/material";

import BackToTopButton from "../components/BackToTopButton";
import Navbar from "../components/Navbar";

const BaseLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        component="div"
        id="page-top"
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: 0,
          margin: 0,
          minHeight: "100vh",
        }}
      >
        {/* Top */}
        <Grid container sx={{ padding: 3 }}>
          <Grid xs={12}>
            <Navbar toggleSidebar={true} />
          </Grid>
        </Grid>

        {/* Body (derived from <Layout> components inside pages/*.tsx) */}
        {children}
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
