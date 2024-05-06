import React from "react";
import { Grid, Typography } from "@mui/material";

import Layout from "../layout/Layout";
import MotionBlurb from "../components/MotionBlurb";
import SocialMedia from "../components/SocialMedia";

import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({
  open: true,
});

export default function Home() {
  const state = useProxy(store);

  return (
    <Layout>
      <Grid container>
        
      </Grid>
        <Grid item xs={8}>
          <MotionBlurb open={state.open}>
            <Grid container>
              <Grid>
                <img src="imgs/bust.svg" height="300px" />
              </Grid>
              <Grid>
                <Typography variant="h1">
                  Hi there.
                </Typography>
                <Typography variant="h5"
                >
                  Welcome to Mason's corner on the internet. <br/>
                  Feel free to email me, schedule a call, or reach out on any of the following platforms:
                </Typography>
              </Grid>
            </Grid>
          </MotionBlurb>
        </Grid>
        <Grid xs={12}>
          <SocialMedia />
        </Grid>
    </Layout>
  );
}
