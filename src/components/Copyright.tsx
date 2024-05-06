import { Button, useTheme } from "@mui/material";

export default function Copyright() {
  const theme = useTheme();
  return (
    <Button
      disabled
      sx={{
        textTransform: "none",
        fontWeight: 400,
        fontSize: "0.9em",
        color: theme.palette.text.primary,
      }}
    >
      {new Date().getFullYear()} &copy; Mason Sun. All rights reserved.
    </Button>
  );
}
