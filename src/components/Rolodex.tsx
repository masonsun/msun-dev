import React, { useState, useRef, useCallback } from "react";
import { useTheme, useMediaQuery, Box, IconButton, Typography, Theme, SxProps } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown, OpenInNew } from "@mui/icons-material";
import { motion } from "framer-motion";
import workData from "../config/work.json";
const { cards } = workData;

const CARD_HEIGHT = 280;
const VISUAL_GAP = 10;
const SECOND_GAP = 4;

const SCALES = { adjacent: 0.88, second: 0.76, smAdjacent: 0.82, hidden: 0.7 };
const EASING = [0.4, 0, 0.2, 1] as const;

function getCardStyle(offset: number, compact: boolean) {
  if (offset === 0) return { y: 0, scale: 1, opacity: 1, rotateX: 0, zIndex: 4 };

  const sign = offset > 0 ? 1 : -1;
  const abs = Math.abs(offset);
  const adjScale = compact ? SCALES.smAdjacent : SCALES.adjacent;

  if (abs === 1) {
    const base = CARD_HEIGHT / 2 + VISUAL_GAP + (CARD_HEIGHT * adjScale) / (sign < 0 ? 2.5 : 2);
    return { y: sign * base, scale: adjScale, opacity: compact ? 0.3 : 0.4, rotateX: sign * -30, zIndex: 3 };
  }
  if (abs === 2 && !compact) {
    const adj = CARD_HEIGHT / 2 + VISUAL_GAP + (CARD_HEIGHT * adjScale) / 2;
    const secondHalf = sign > 0
      ? (CARD_HEIGHT * SCALES.second / 2) / 2
      : (CARD_HEIGHT * SCALES.second) / 2;
    return {
      y: sign * (adj + (CARD_HEIGHT * adjScale) / 2 + SECOND_GAP + secondHalf),
      scale: SCALES.second, opacity: 0.2, rotateX: sign * -45, zIndex: 2,
    };
  }
  const far = CARD_HEIGHT * 2;
  return { y: sign * far, scale: SCALES.hidden, opacity: 0, rotateX: sign * -50, zIndex: 1 };
}

function ProjectTitle({ title, subtitle, theme, sx }: { title: string; subtitle?: string; theme: Theme; sx?: SxProps<Theme> }) {
  return (
    // @ts-ignore - MUI Box sx union type too complex
    <Box sx={sx}>
      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: "0.9rem", lineHeight: 1.2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, lineHeight: 1.3, display: "block", mt: 0.5, fontSize: "0.78rem" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function CardsLayout({ card, theme }: { card: (typeof cards)[number]; theme: Theme }) {
  if (!card.projects) return null;
  return (
    <Box sx={{ display: "flex", gap: 1.5, px: 2.5, pb: 2, flex: 1, minHeight: 0 }}>
      {card.projects.map((project) => (
        <Box key={project.projectTitle} sx={{ flex: 1, borderRadius: 2, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {project.image && (
            <Box component="img" src={project.image} sx={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }} />
          )}
          <ProjectTitle title={project.projectTitle} subtitle={project.projectSubtitle || undefined} theme={theme} sx={{ pl: 0, pr: 1, pt: 1, pb: 0.75 }} />
        </Box>
      ))}
    </Box>
  );
}

function SidebarLayout({ card, theme }: { card: (typeof cards)[number]; theme: Theme }) {
  return (
    <Box sx={{ mx: 2.5, mb: 2, display: "flex", gap: 1.5, alignItems: "flex-start", flex: 1, minHeight: 0 }}>
      {card.image && (
        <Box
          component="img"
          src={card.image}
          sx={{
            width: card.imageWidth || "40%",
            maxHeight: card.showFullImage ? "100%" : 180,
            objectFit: card.showFullImage ? "contain" : "cover",
            objectPosition: "top",
            borderRadius: 2, display: "block", flexShrink: 0,
          }}
        />
      )}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {card.projectTitle && <ProjectTitle title={card.projectTitle} subtitle={card.projectSubtitle || undefined} theme={theme} />}
      </Box>
    </Box>
  );
}

function GalleryLayout({ card, theme }: { card: (typeof cards)[number]; theme: Theme }) {
  if (!card.projects) return null;

  const title = card.projectTitle || card.projects.map((p) => p.projectTitle).join(" · ");
  const subtitle = card.projectSubtitle || card.projects.map((p) => p.projectSubtitle).filter(Boolean).join(" · ") || undefined;

  return (
    <Box sx={{ mx: 2.5, mb: 1.5, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 1, height: 120 }}>
        {card.projects.map((project) => (
          <Box
            key={project.projectTitle}
            sx={{
              flex: 1, borderRadius: 2, overflow: "hidden",
              ...(project.image ? { boxShadow: "0 2px 8px rgba(0,0,0,0.1)" } : { p: 1.5 }),
            }}
          >
            {project.image ? (
              <Box component="img" src={project.image} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <ProjectTitle title={project.projectTitle} subtitle={project.projectSubtitle} theme={theme} />
            )}
          </Box>
        ))}
      </Box>
      {(card.projectTitle || card.projects.some((p) => p.image)) && (
        <ProjectTitle title={title} subtitle={subtitle} theme={theme} sx={{ pt: 1.5 }} />
      )}
    </Box>
  );
}

function CardHeader({ card, theme }: { card: (typeof cards)[number]; theme: Theme }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, pt: 2, pb: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <img src={card.logo} width="40" height="40" style={{ borderRadius: 8 }} />
        <Box>
          <Typography variant="h5" sx={{ color: theme.palette.text.primary, lineHeight: 1, fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.1px" }}>
            {card.title}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: -1 }}>
            {card.role} &middot; {card.date}
          </Typography>
        </Box>
      </Box>
      <IconButton href={card.url} target="_blank" size="small" sx={{ color: theme.palette.text.secondary, "&:hover": { color: theme.palette.text.primary } }}>
        <OpenInNew sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}

function CardContent({ card, theme }: { card: (typeof cards)[number]; theme: Theme }) {
  switch (card.layout) {
    case "cards": return <CardsLayout card={card} theme={theme} />;
    case "sidebar": return <SidebarLayout card={card} theme={theme} />;
    default: return <GalleryLayout card={card} theme={theme} />;
  }
}

export default function Rolodex() {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState(0);

  const atStart = activeIndex === 0;
  const atEnd = activeIndex === cards.length - 1;
  const flip = useCallback((dir: number) => setActiveIndex((prev) => Math.min(Math.max(prev + dir, 0), cards.length - 1)), []);

  const touchStartY = useRef<number | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 30) flip(delta > 0 ? 1 : -1);
    touchStartY.current = null;
  }, [flip]);

  const adjScale = compact ? SCALES.smAdjacent : SCALES.adjacent;
  const adjY = CARD_HEIGHT / 2 + VISUAL_GAP + (CARD_HEIGHT * adjScale) / 2;
  const topPad = atStart ? 24 : adjY * 0.25 + 24;
  const containerHeight = compact
    ? (atStart ? CARD_HEIGHT + CARD_HEIGHT * adjScale * 0.5 + VISUAL_GAP + 24 : adjY * 0.25 + CARD_HEIGHT + CARD_HEIGHT * adjScale * 0.5 + VISUAL_GAP)
    : (atStart ? CARD_HEIGHT + adjY + (CARD_HEIGHT * adjScale) / 2 + SECOND_GAP + (CARD_HEIGHT * SCALES.second) / 2 + 72
        : adjY * 0.25 + CARD_HEIGHT + adjY + (CARD_HEIGHT * adjScale) / 2 + SECOND_GAP + (CARD_HEIGHT * SCALES.second) / 2 + 48);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
      <motion.div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        animate={{ height: containerHeight }}
        transition={{ duration: 0.5, ease: EASING as unknown as number[] }}
        style={{ width: "min(450px, calc(100vw - 100px))", perspective: "1000px", position: "relative", overflow: "hidden", touchAction: "pan-x" }}
      >
        {cards.map((card, index) => {
          const offset = index - activeIndex;
          const style = getCardStyle(offset, compact);

          return (
            <motion.div
              key={card.title}
              animate={{ y: style.y, scale: style.scale, opacity: style.opacity, rotateX: style.rotateX, zIndex: style.zIndex }}
              transition={{ duration: 0.5, ease: EASING as unknown as number[] }}
              style={{ position: "absolute", width: "100%", height: CARD_HEIGHT, top: topPad, transformStyle: "preserve-3d", transformOrigin: "center center" }}
            >
              <Box
                sx={{
                  width: "100%", height: "100%", borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: offset === 0 ? "0 8px 30px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.08)",
                  display: "flex", flexDirection: "column", overflow: "hidden",
                }}
              >
                <CardHeader card={card} theme={theme} />
                <CardContent card={card} theme={theme} />
              </Box>
            </motion.div>
          );
        })}
      </motion.div>

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: 0, height: CARD_HEIGHT, marginTop: "24px" }}>
        <IconButton onClick={() => flip(-1)} disabled={atStart} size="small"
          sx={{ color: theme.palette.text.secondary, opacity: atStart ? 0.2 : 0.6, "&:hover": { opacity: atStart ? 0.2 : 1 } }}>
          <KeyboardArrowUp />
        </IconButton>
        <IconButton onClick={() => flip(1)} disabled={atEnd} size="small"
          sx={{ color: theme.palette.text.secondary, opacity: atEnd ? 0.2 : 0.6, "&:hover": { opacity: atEnd ? 0.2 : 1 } }}>
          <KeyboardArrowDown />
        </IconButton>
      </Box>
    </Box>
  );
}
