import React, { useState } from "react";
import { Grid, Typography, Link, Dialog, DialogContent, IconButton, Box, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";

import Layout from "../layout/Layout";
import MotionBlurb from "../components/MotionBlurb";
import SocialMedia from "../components/SocialMedia";
import Rolodex from "../components/Rolodex";

import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

const store = proxy({
  open: true,
});

export default function Home() {
  const state = useProxy(store);
  const canHover = useMediaQuery("(hover: hover)");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sunHovered, setSunHovered] = useState(false);
  const [bustFlipping, setBustFlipping] = useState(false);
  const [bustShowSunglasses, setBustShowSunglasses] = useState(() => Math.random() < 0.5);

  return (
    <Layout>
      <Box sx={{ maxWidth: { xs: 600, md: 750 }, mx: "auto", px: { xs: 2, md: 4 }, pt: { xs: 4, md: 4 }, pb: { xs: 12, md: 0 } }}>
      <Grid container sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
        <Grid item xs={12} md={5} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", position: { md: "sticky" }, top: { md: 32 }, alignSelf: "flex-start" }}>
          <MotionBlurb open={state.open}>
            <Grid container sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
              <Grid item>
                <Box
                  component={motion.div}
                  onClick={() => {
                    if (!bustFlipping) {
                      setBustFlipping(true);
                      setTimeout(() => setBustShowSunglasses((prev) => !prev), 250);
                      setTimeout(() => setBustFlipping(false), 500);
                    }
                  }}
                  animate={{ rotateY: bustFlipping ? [0, 90, 0] : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] }}
                  sx={{ cursor: "pointer", perspective: "800px" }}
                >
                  <img
                    src={bustShowSunglasses ? "illustrations/bust-1.svg" : "illustrations/bust-0.svg"}
                    height="250px"
                  />
                </Box>
              </Grid>
              <Grid item sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Typography variant="h1" sx={{ fontSize: "2.8em", letterSpacing: "-2.0px" }}>
                  {"Mason "}
                  <Box
                    component="span"
                    onMouseEnter={canHover ? () => setSunHovered(true) : undefined}
                    onMouseLeave={canHover ? () => setSunHovered(false) : undefined}
                    onClick={!canHover ? () => setSunHovered((prev) => !prev) : undefined}
                    sx={{
                      display: "inline-block",
                      position: "relative",
                      perspective: "800px",
                      cursor: "default",
                    }}
                  >
                    <Box
                      component={motion.span}
                      sx={{
                        display: "inline-block",
                        transformOrigin: "bottom center",
                        backfaceVisibility: "hidden",
                      }}
                      animate={{ rotateX: sunHovered ? -90 : 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.8 }}
                    >
                      Sun
                    </Box>
                    <Box
                      component={motion.span}
                      sx={{
                        display: "inline-block",
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        transformOrigin: "bottom center",
                        backfaceVisibility: "hidden",
                      }}
                      initial={{ rotateX: 91, visibility: "hidden" }}
                      animate={{
                        rotateX: sunHovered ? 0 : 91,
                        visibility: sunHovered ? "visible" : "hidden",
                      }}
                      transition={{
                        rotateX: { type: "spring", stiffness: 180, damping: 20, mass: 0.8 },
                        visibility: { delay: sunHovered ? 0 : 0.15 },
                      }}
                    >
                      孫
                    </Box>
                  </Box>
                </Typography>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Based in Seattle.<br />
                  <Link
                    component="button"
                    onClick={() => setAboutOpen(true)}
                    underline="none"
                    sx={{
                      fontWeight: 350,
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      lineHeight: "inherit",
                      color: "#1a4d8f",
                      cursor: "pointer",
                      verticalAlign: "baseline",
                      "@media (hover: hover)": { "&:hover": { color: "#0d3468" } },
                      "&:active": { color: "#0d3468" },
                    }}
                  >
                    {"About →"}
                  </Link>
                </Typography>
                <SocialMedia />
              </Grid>
            </Grid>
          </MotionBlurb>
        </Grid>
        <Grid item xs={12} md={7} sx={{ display: "flex", alignItems: "flex-start", justifyContent: { xs: "center", md: "flex-start" } }}>
          <Rolodex />
        </Grid>
      </Grid>
      </Box>

      <Dialog
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 0,
            overflow: "hidden",
          },
        }}
      >
        <IconButton
          onClick={() => setAboutOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        >
          <Close fontSize="small" />
        </IconButton>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 3 }, flexDirection: { xs: "column", sm: "row" } }}>
            <Box component="img" src="illustrations/bust-2.svg" sx={{ height: { xs: 160, sm: 220 } }} />
            <Box>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.2 }}>
                10+ years of experience in data science and machine learning.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
