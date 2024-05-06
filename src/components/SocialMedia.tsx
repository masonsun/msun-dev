import React from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { socialMedia } from "../config/media.json";

export default function SocialMedia() {
  const theme = useTheme();
  return (
    <Box component="div" sx={{ marginLeft: -1, padding: 0 }}>
      {socialMedia.map((item) => (
        <Tooltip arrow title={item.title} componentsProps={{
          tooltip: {
            sx: {
              fontWeight: 350,
              fontSize: "1em",
              letterSpacing: "-0.5px",
              color: theme.palette.text.primary,
              bgcolor: theme.palette.primary.light,
              '& .MuiTooltip-arrow': {
                color: theme.palette.primary.light
              }
            }
          }
        }}>
        <IconButton
          href={item.href}
          target="_blank"
          disableRipple
          sx={{ minWidth: 0, minHeight: 0, padding: 0, marginBottom: 1, marginX: -2.5 }}
        >
          <img src={item.src} width="50%" />
        </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
