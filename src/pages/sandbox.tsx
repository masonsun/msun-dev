import React from "react";
import { useTheme, Box } from "@mui/material";
import Layout from "../layout/Layout";
import GlassBox from "../components/GlassBox";

export default function Sandbox() {
  const theme = useTheme();
  return (
    <Layout>
      <Box component="div" sx={{ height: "100vh" }}>
        <GlassBox />
      </Box>
    </Layout>
  );
}
