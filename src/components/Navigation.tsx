import React from "react";
import { useTheme, Box, Button } from "@mui/material";
import Config from "../config/content.json";

const Navigation = ({ toggleSidebar }) => {
  const theme = useTheme();
  const { navigation: navbar } = Config;

  return (
    <>
      <Box
        component="div"
        sx={{
          flexGrow: 0,
          display: { xs: "none", md: "flex", marginLeft: "auto" },
        }}
      >
        {navbar.map((item) => (
          <Button
            href={item.href}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 15,
              color: theme.palette.text.primary,
            }}
          >
            {item.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Navigation;
