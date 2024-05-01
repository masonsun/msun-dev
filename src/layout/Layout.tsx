import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTheme, Box, Grid, CssBaseline } from "@mui/material";

import BackToTopButton from "../components/BackToTopButton";
import Copyright from "../components/Copyright";
import Navigation from "../components/Navigation";

const BaseLayout = ({ children }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <CssBaseline />
      <Box
        component="div"
        id="page-top"
        sx={{
          backgroundColor: theme.palette.primary.light,
          height: "100vh",
          padding: 5,
        }}
      >
        <Grid container>
          <Grid xs={12}>
            <Navigation toggleSidebar={() => setIsSidebarOpen(true)} />
          </Grid>
        </Grid>

        {children}

        <Grid container>
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
