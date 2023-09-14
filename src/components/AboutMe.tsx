import { Grid, Typography } from "@mui/material";

export default function AboutMe() {
  return (
    <Grid container sx={{ height: "30%" }}>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          sx={{ padding: 10, height: "50%", textAlign: "center" }}
        >
          施工中👷
        </Typography>
      </Grid>
    </Grid>
  );
}
