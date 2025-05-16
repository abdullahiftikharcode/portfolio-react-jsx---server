"use client"
import { useState, useEffect, useMemo } from "react"
import { Box, Grid, Typography, useTheme, Skeleton } from "@mui/material"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useLanguage } from "../LanguageContext"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import { useStatistics } from "../../hooks/useStatistics"

export default function CounterSection() {
  const theme = useTheme()
  const [inView, setInView] = useState(false)
  const { t } = useLanguage()
  const { 
    statistics, 
    loading: statsLoading, 
    error: statsError,
    totalHours,
    projectsDone,
    satisfied,
    certifications
  } = useStatistics()

  const { ref, controls } = useScrollAnimation({
    threshold: 0.3,
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    },
  })

  // Use the statistics from the API if available, or fall back to defaults
  const stats = useMemo(() => [
    { value: totalHours || 1500, label: "total_hours" },
    { value: projectsDone || 50, label: "projects_done" },
    { value: satisfied || 40, label: "satisfied" },
    { value: certifications || 10, label: "certifications" },
  ], [totalHours, projectsDone, satisfied, certifications]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("counter-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <Box id="counter-section" ref={ref}>
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate={controls}
      >
        <Grid container spacing={4} textAlign="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div variants={itemVariants}>
                {statsLoading ? (
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={80} 
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }}
                  />
                ) : (
                  <>
                    <Typography
                      variant="h2"
                      component="div"
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(45deg, #ffffff 30%, #aaaaaa 90%)"
                            : "linear-gradient(45deg, #000000 30%, #555555 90%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {inView ? <CountUp start={0} end={stat.value} duration={2.5} separator="," /> : "0"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.mode === "dark" ? "grey.400" : "grey.700",
                        fontWeight: "medium",
                      }}
                    >
                      {t(stat.label)}
                    </Typography>
                  </>
                )}
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  )
} 