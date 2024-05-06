import React from "react";
import { Grid, Typography } from "@mui/material";

import Layout from "../layout/Layout";
import MotionBlurb from "../components/MotionBlurb";
import SocialMedia from "../components/SocialMedia";
import Copyright from "../components/Copyright";

import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({
  open: true,
});

export default function Home() {
  const state = useProxy(store);

  return (
    <Layout>
      <Grid container sx={{ padding: 3 }}>
        <Grid item xs={12}>
          <MotionBlurb open={state.open}>
            <Grid container>
              <Grid item>
                <img src="imgs/bust.svg" height="300px" />
              </Grid>
              <Grid item>
                <Typography variant="h1">Hi there.</Typography>
                <Typography variant="h5">
                  Welcome to Mason's corner on the internet.
                </Typography>
                <Typography variant="h5">
                  Feel free to email me, schedule a call, or reach out on any of
                  the following platforms:
                </Typography>
                <SocialMedia />
              </Grid>
            </Grid>
          </MotionBlurb>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 5 }}>
          <Copyright />
        </Grid>
      </Grid>
    </Layout>
  );
}
