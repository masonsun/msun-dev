import React from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import mediaData from "../config/media.json";
const { socialMedia } = mediaData;

const placements = [
  { x: 11, y: 5, rotate: -7 },
  { x: 68, y: -9, rotate: 4 },
  { x: 129, y: 7, rotate: -3 },
  { x: 33, y: 58, rotate: 6 },
  { x: 99, y: 48, rotate: -5 },
  { x: 161, y: 53, rotate: 2 },
  { x: -2, y: 110, rotate: 5 },
  { x: 64, y: 116, rotate: -8 },
  { x: 130, y: 106, rotate: 3 },
  { x: 33, y: 163, rotate: -4 },
  { x: 99, y: 155, rotate: 6 },
];

export default function SocialMedia() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: 230,
        height: 240,
      }}
    >
      {socialMedia.map((item, i) => {
        const p = placements[i];
        return (
          <Tooltip
            key={item.title}
            title={item.disabled ? "" : item.title}
            placement="bottom"
            componentsProps={{
              tooltip: {
                sx: {
                  fontWeight: 400,
                  fontSize: "0.85em",
                  letterSpacing: "-0.3px",
                  color: "#fff",
                  bgcolor: "rgba(60, 60, 60, 0.85)",
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.5,
                  backdropFilter: "blur(4px)",
                },
              },
            }}
          >
            <IconButton
              {...(item.disabled ? {} : {
                href: item.href,
                ...(item.href.startsWith("http") || item.href.startsWith("mailto") ? { target: "_blank" } : {}),
              })}
              disableRipple
              sx={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: 56,
                height: 56,
                borderRadius: 1.5,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "2px 3px 6px rgba(0,0,0,0.1)",
                transform: `rotate(${p.rotate}deg)`,
                cursor: item.disabled ? "default" : "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                ...(!item.disabled && {
                  "&:hover": {
                    transform: `rotate(${p.rotate}deg) translateY(-4px)`,
                    boxShadow: "3px 5px 12px rgba(0,0,0,0.15)",
                  },
                }),
              }}
            >
              <img src={item.src} width="36" height="36" />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
}
