import React from "react";
import { Grid } from "@mui/material";

import Layout from "../layout/Layout";
import GlassBox from "../components/GlassBox";
import HeroText from "../components/Hero";
import SocialMedia from "../components/SocialMedia";

export default function Home() {
  return (
    <Layout>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{ position: "absolute", top: "50%", left: "50%", width: "400px" }}
        >
          <HeroText />
          <SocialMedia />
        </Grid>
      </Grid>
      <Grid container sx={{ position: "static", height: "100vh" }}>
        <Grid item md={4} xs={12}>
          <GlassBox />
        </Grid>
      </Grid>
    </Layout>
  );
}
