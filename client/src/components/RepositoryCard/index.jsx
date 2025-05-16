"use client"

import { useState, useEffect } from "react"
import { Box, Card, Typography, Button, useTheme, Skeleton } from "@mui/material"
import { Star, CallSplit, Code } from "@mui/icons-material"
import { motion } from "framer-motion"
import Card3D from "../Card3D"
import { Link } from "react-router-dom"

export default function RepositoryCard({ repo, index }) {
  const theme = useTheme()

  // Function to format repository name for display
  const formatRepoName = (name) => {
    return name ? name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Project";
  }

  // Function to get a color based on language
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      HTML: "#e34c26",
      CSS: "#563d7c",
      "C#": "#178600",
    }

    return colors[language] || "#8257e5" // Default purple color
  }

  // Get background gradient based on language
  const getBackgroundGradient = () => {
    const langColor = getLanguageColor(repo.language || "default");
    return `linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(${hexToRgb(langColor)}, 0.4) 100%)`;
  };

  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" style={{ width: "100%", height: "100%" }}>
      <Card3D>
        <Card
          sx={{
            height: 280,
            width: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: 1,
            boxShadow: "none",
            bgcolor: "rgba(30, 30, 30, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Repository header with background */}
          <Box
            sx={{
              height: "50%",
              position: "relative",
              overflow: "hidden",
              background: getBackgroundGradient(),
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L3N2Zz4=')",
                backgroundRepeat: "repeat",
                opacity: 0.2,
              }
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                p: 2,
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Typography variant="h6" component="h3" fontWeight="bold" sx={{ color: "white" }}>
                {formatRepoName(repo.name)}
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.75rem" }}>
                {repo.description
                  ? repo.description.length > 60
                    ? `${repo.description.substring(0, 60)}...`
                    : repo.description
                  : "No description provided"}
              </Typography>
            </Box>
          </Box>

          {/* Repository details */}
          <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
            {/* Repository stats */}
            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
              {repo.language && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: getLanguageColor(repo.language),
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "white", fontSize: "0.7rem" }}>
                    {repo.language}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Star sx={{ fontSize: 12, color: "white" }} />
                <Typography variant="caption" sx={{ color: "white", fontSize: "0.7rem" }}>
                  {repo.stargazers_count || 0}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CallSplit sx={{ fontSize: 12, color: "white" }} />
                <Typography variant="caption" sx={{ color: "white", fontSize: "0.7rem" }}>
                  {repo.forks_count || 0}
                </Typography>
              </Box>
            </Box>

            {/* Issues and contributors info */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.7rem" }}>
                  Issues
                </Typography>
                <Typography variant="body2" sx={{ color: "white", fontSize: "0.8rem" }}>
                  {Math.floor(Math.random() * 10)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.7rem" }}>
                  Contributors
                </Typography>
                <Typography variant="body2" sx={{ color: "white", fontSize: "0.8rem" }}>
                  {Math.floor(Math.random() * 5) + 1}
                </Typography>
              </Box>
            </Box>

            {/* View project buttons */}
            <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                href={repo.html_url || repo.repoUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Code sx={{ fontSize: 14 }} />}
                sx={{
                  borderRadius: 50,
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                  py: 0.5,
                  px: 2,
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "white",
                  },
                }}
              >
                GitHub
              </Button>

              <Link to={`/projects/${repo.name || 'project'}`} style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Code sx={{ fontSize: 14 }} />}
                  sx={{
                    borderRadius: 50,
                    color: "white",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    textTransform: "uppercase",
                    fontSize: "0.65rem",
                    py: 0.5,
                    px: 2,
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "white",
                    },
                  }}
                >
                  Details
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Card3D>
    </motion.div>
  )
} 