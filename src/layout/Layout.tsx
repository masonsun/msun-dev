import React from "react";
import PropTypes from "prop-types";

import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import GlassBox from "../components/GlassBox";
import HeroText from "../components/HeroText";
import DrawerAppBar from "../components/DrawerAppBar";
import BackToTopButton from "../components/BackToTopButton";
import Copyright from "../components/Copyright";

const BaseLayout = ({ children }) => {
  return (
    <>
      <CssBaseline />  
      <Box component="div" id="page-top" sx = {{ backgroundColor: "#e1f5fe" }}>
        <DrawerAppBar />

          
        <Grid container sx={{ position: "static", height: "100vh" }}>
          <Grid item md={8} xs={12}>

          </Grid>
          <Grid item md={4} xs={12}>
            <GlassBox />
          </Grid>
  

        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ position: "absolute", top: "50%", left: "50%", width: "400px" }}>
            <HeroText />
          </Grid>
        </Grid>
        <Copyright />
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