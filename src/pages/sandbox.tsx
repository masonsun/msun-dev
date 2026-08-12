import React from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import Layout from "../layout/Layout";
const GlassBox = dynamic(() => import("../components/GlassBox"), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <CircularProgress size={48} sx={{ color: "text.secondary" }} />
    </Box>
  ),
});

export default function Sandbox() {
  return (
    <Layout>
      <IconButton
        component={NextLink}
        href="/"
        sx={{
          position: "fixed",
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
