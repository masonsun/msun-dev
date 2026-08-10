import React from "react";
import NextLink from "next/link";
import { Box, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import Layout from "../layout/Layout";
import GlassBox from "../components/GlassBox";

export default function Sandbox() {
  return (
    <Layout>
      <IconButton
        component={NextLink}
        href="/"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1,
          color: "text.secondary",
          "&:hover": { color: "text.primary" },
        }}
      >
        <ArrowBack />
      </IconButton>
      <Box component="div" sx={{ height: "100vh" }}>
        <GlassBox />
      </Box>
    </Layout>
  );
}
