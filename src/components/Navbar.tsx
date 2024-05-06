import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme, Box, Button } from "@mui/material";
import Config from "../config/content.json";

const Navbar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const { navigation: navbar } = Config;
  const router = useRouter();

  return (
    <Box component="div">
      {navbar.map((item) => (
        <Button
          component={Link}
          href={item.href}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            fontSize: 15,
            color: theme.palette.text.primary,
            "&:hover": {
              color: theme.palette.primary.dark,
            },
          }}
        >
          {item.title}
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;
