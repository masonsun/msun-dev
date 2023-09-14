import React from "react";
import PropTypes from "prop-types";

import { Box, Grid, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import CloudsCanvas from "../components/objects/CloudsCanvas";
import BananasCanvas from "../components/objects/BananasCanvas";
import GlassBox from "../components/objects/GlassBox";

import HeroText from "../components/HeroText";
import DrawerAppBar from "../components/DrawerAppBar";
import BackToTopButton from "../components/BackToTopButton";
import AboutMe from "../components/AboutMe";
import NextSectionButton from "../components/NextSectionButton";

// @ts-ignore
const BaseLayout = ({ children }) => {
  return (
    <>
      <CssBaseline />

      {/* Hero */} 
      <Box component="div" id="page-top">
        <DrawerAppBar />
        <Grid container sx={{ position: "static", minWidth: "100%", height: "100vh" }}>
            <CloudsCanvas />
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ position: "absolute", top: "50%", left: "50%", width: "400px" }}>
            <HeroText />
          </Grid>
        </Grid>
      </Box>

      {/* Back-to-top fab button */}
      <NextSectionButton elementId="about-me" />
      <BackToTopButton elementId="page-top" />

      {/* About Me */}
      <Box component="div" id="about-me" sx={{ backgroundColor: "#e1f5fe"}}>
        <AboutMe />
      </Box>

      <Box component="div" sx={{ backgroundColor: "#e1f5fe"}}>
        <Grid container sx={{ position: "static", height: "100vh" }}>
          <Grid item xs={12}>
            <GlassBox />
          </Grid>
        </Grid>
      </Box>


    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
