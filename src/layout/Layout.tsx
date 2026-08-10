import PropTypes from "prop-types";
import React from "react";
import { useTheme, Box } from "@mui/material";

import BackToTopButton from "../components/BackToTopButton";

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
        {children}
      </Box>

      <BackToTopButton elementId="page-top" />
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
