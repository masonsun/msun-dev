import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import SocialMediaStack from "../config/socialMediaLinks.json";

// @ts-ignore
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function DrawerAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  { /* Side drawer */ }
  const sideDrawer = (
    <>
      <Box
        component="div"
        onClick={handleDrawerToggle}
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        {/* Top span */}
        <List>
          {SocialMediaStack.map((item) => (
            <IconButton
              disableRipple
              href={item.href}
              target="_blank"
              sx={{ minWidth: 0, minHeight: 0, padding: 0, margin: 0 }}
            >
              <img src={item.src} width="50%" />
            </IconButton>
          ))}
        </List>
      </Box>

      {/* Bottom span */}
      <Box component="div" sx={{ padding: 1, textAlign: "center" }}>
        <Typography sx={{ fontSize: 11 }}>Created by Mason Sun</Typography>
      </Box>
    </>
  );

  {/* Hide-on-scroll nav bar */}
  return (
    <Box component="div" sx={{ display: "flex", flexDirection: "row" }}>
      <React.Fragment>
        <HideOnScroll>
          <AppBar
            position="fixed"
            color="primary"
            elevation={0}
            sx={{ top: 0, bottom: "auto", backgroundColor: "rgba(1,0,0,0)" }}
          >
            <Toolbar>
              <Box
                component="div"
                sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
              />

              <IconButton
                disableRipple
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  margin: 0,
                  padding: 0,
                  display: { sm: "none", xs: drawerOpen ? "none" : "block" },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              />
              <Box
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {SocialMediaStack.map((item) => (
                  <IconButton
                    href={item.href}
                    target="_blank"
                    disableRipple
                    sx={{ minWidth: 0, minHeight: 0, padding: 0, margin: -3 }}
                  >
                    <img src={item.src} width="50%" />
                  </IconButton>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </React.Fragment>
      <nav>
        <Drawer
          anchor="right"
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 100,
              backgroundColor: "rgba(0,0,0,0)",
            },
          }}
        >
          {sideDrawer}
        </Drawer>
      </nav>
    </Box>
  );
}
