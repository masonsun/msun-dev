import React from "react";
import { Grid, Typography } from "@mui/material";

import Layout from "../layout/Layout";
import MotionBlurb from "../components/MotionBlurb";
import Copyright from "../components/Copyright";

export default function Misc() {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} sx={{ padding: 3 }}>
          <MotionBlurb open={true}>
            <Grid container>
              <Grid>
                <Typography variant="h5">Work in progress 👷</Typography>
              </Grid>
            </Grid>
          </MotionBlurb>
        </Grid>
        <Grid container xs={12} sx={{ position: "absolute", bottom: 0 }}>
          <Copyright />
        </Grid>
      </Grid>
    </Layout>
  );
}
