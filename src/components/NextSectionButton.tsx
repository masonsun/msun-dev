import React from "react";
import { useTheme } from "@mui/material";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NextSectionButton = ({ elementId = "about-me" }) => {
  const theme = useTheme();

  const scrollTo = () => {
    setTimeout(() => {
      const element = document.querySelector(`#${elementId}`) as HTMLElement;
      {
        element &&
          window.scrollTo({
            left: 0,
            top: element.offsetTop,
            behavior: "smooth",
          });
      }
    });
  };

  return (
    <Box component="div" sx={{ position: "absolute", zIndex: 0 }}>
      <Box
        component="div"
        onClick={scrollTo}
        role="presentation"
        sx={{ position: "fixed", bottom: 24, right: 32 }}
      >
        <Fab
          color="inherit"
          size="small"
          sx={{
            "&:hover": {
              backgroundColor: "inherit",
              color: "inherit",
              border: "2px solid" + theme.palette.primary.main,
            },
          }}
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default NextSectionButton;
