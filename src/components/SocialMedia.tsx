import React from "react";
import { Box, Slide, IconButton, useScrollTrigger } from "@mui/material";
import SocialMediaStack from "../config/socialMedia.json";

// @ts-ignore
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function SocialMedia() {
  return (
    <Box component="div" sx={{ display: { xs: "none", sm: "block" } }}>
      {SocialMediaStack.map((item) => (
        <IconButton
          href={item.href}
          target="_blank"
          disableRipple
          sx={{ minWidth: 0, minHeight: 0, padding: 0, margin: 0 }}
        >
          <img src={item.src} width="50%" />
        </IconButton>
      ))}
    </Box>
  );
}
