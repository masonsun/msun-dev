import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

import Hero from "../modules/Hero";


// @ts-ignore
const BaseLayout = ({ children }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
    <Box component="div" id="page-top">   
        <Hero />
    </Box>
    </>
        
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
