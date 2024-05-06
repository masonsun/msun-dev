import React from "react";
import { Grid, Typography } from "@mui/material";

import Layout from "../layout/Layout";
import MotionBlurb from "../components/MotionBlurb";

export default function Blog() {
  return (
    <Layout>
      <Grid container></Grid>
      <Grid item xs={12}>
        <MotionBlurb open={true}>
          <Grid container>
            <Grid>
              <Typography variant="h5">Work in progress 👷</Typography>
            </Grid>
          </Grid>
        </MotionBlurb>
      </Grid>
    </Layout>
  );
}
