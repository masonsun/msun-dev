import { Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography variant="h6">
      {new Date().getFullYear()} &copy; Mason Sun. 
      All rights reserved. Made with ☕️ from Seattle.
    </Typography>
  );
}
