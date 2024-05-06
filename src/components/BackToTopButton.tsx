import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Fab,
  Zoom,
  NoSsr,
  useTheme,
  useScrollTrigger,
} from "@mui/material";

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
    <Box component="div" sx={{ position: "absolute", zIndex: 2, color: theme.palette.primary.dark  }}>
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
                  border: "2px solid" + theme.palette.primary.contrastText
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
