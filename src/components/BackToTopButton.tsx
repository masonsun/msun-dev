import React from "react";
import { useTheme } from "@mui/material";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import NoSsr from "@mui/material/NoSsr";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const BackToTopButton = ({ elementId = "page-top" }) => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

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
    <Box component="div" sx={{ position: "absolute", zIndex: 2 }}>
      <NoSsr>
        <Zoom in={trigger}>
          <Box
            component="div"
            onClick={scrollTo}
            role="presentation"
            sx={{ position: "fixed", bottom: 24, right: 32 }}
          >
            <Fab
              color="primary"
              size="small"
              aria-label="Back to top"
              sx={{
                "&:hover": {
                  backgroundColor: "inherit",
                  color: "inherit",
                  border: "2px solid" + theme.palette.primary.main,
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Zoom>
      </NoSsr>
    </Box>
  );
};

export default BackToTopButton;
