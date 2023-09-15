import React from "react";
import PropTypes from "prop-types";

import { Box, Grid, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import CloudsCanvas from "../components/objects/CloudsCanvas";
import GlassBox from "../components/objects/GlassBox";
import AboutMe from "../components/AboutMe";
import Copyright from "../components/Copyright";
import HeroText from "../components/HeroText";
import DrawerAppBar from "../components/DrawerAppBar";
import BackToTopButton from "../components/BackToTopButton";
import NextSectionButton from "../components/NextSectionButton";

// @ts-ignore
const BaseLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box component="div" sx={{ backgroundColor: theme.palette.primary.main }}>
      <CssBaseline />

      {/* Hero */}
      <Box component="div" id="page-top">
        <DrawerAppBar />
        <Grid
          container
          sx={{ position: "static", minWidth: "100%", height: "100vh" }}
        >
          <CloudsCanvas />
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "400px",
            }}
          >
            <HeroText />
          </Grid>
        </Grid>
      </Box>

      {/* Navigation buttons */}
      <NextSectionButton elementId="about-me" />
      <BackToTopButton elementId="page-top" />

      {/* About Me */}
      <Box component="div" id="about-me">
        <AboutMe />
      </Box>

      <Box component="div">
        <Grid container sx={{ position: "static", height: "100vh" }}>
          <Grid item xs={12}>
            <GlassBox />
          </Grid>
        </Grid>
      </Box>

      {/* Copyright */}
      <Box component="div">
        <Copyright />
      </Box>
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
