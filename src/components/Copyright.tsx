import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Copyright() {
    return (
        <Box component="div" sx={{ padding: 1 }}>
            <Typography variant="h6">
                Mason Sun &copy; {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}