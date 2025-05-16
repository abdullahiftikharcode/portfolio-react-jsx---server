"use client"
import { useState, useEffect, useMemo } from "react"

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  useTheme,
  Skeleton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
} from "@mui/material"
import Layout from "../layouts/Layout"
import RepositoryCard from "../components/RepositoryCard"
import RepositoryFallback from "../components/RepositoryFallback"
import { useGitHubRepos } from "../hooks/useGitHubRepos"
import { Search, FilterList, Sort } from "@mui/icons-material"
import { motion } from "framer-motion"
import ScrollReveal from "../components/ScrollReveal"
import { staggerContainer } from "../hooks/useScrollAnimation"
import ParticleBackground from "../components/ui/particle-background"
import { useProjects } from "../hooks/useProjects"

export default function WorksPage() {
  const theme = useTheme()
  const { repos, loading: githubLoading, error: githubError } = useGitHubRepos("abdullahiftikharcode")
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()

  // Filter and sort state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredRepos, setFilteredRepos] = useState(repos)

  // Fallback data in case the GitHub API fails
  const fallbackProjects = [
    {
      id: 1,
      name: "Titan-Factory",
      description: "AI-powered industrial management system that streamlines factory operations",
      repoUrl: "https://github.com/abdullahiftikharcode/Titan-Factory",
      language: "JavaScript", 
      html_url: "https://github.com/abdullahiftikharcode/Titan-Factory",
      updated_at: new Date(),
      stargazers_count: 5,
      forks_count: 2
    },
    {
      id: 2,
      name: "Campus-Pulse",
      description: "Robust club and society management app crafted using Java and XML",
      repoUrl: "https://github.com/abdullahiftikharcode/Campus-Pulse",
      language: "Java",
      html_url: "https://github.com/abdullahiftikharcode/Campus-Pulse",
      updated_at: new Date(),
      stargazers_count: 3,
      forks_count: 1
    },
    {
      id: 3,
      name: "Bookstore-Management-System",
      description: "Bookstore Management System in Python with a custom-built face verification system",
      repoUrl: "https://github.com/abdullahiftikharcode/Bookstore-Management-System",
      language: "Python",
      html_url: "https://github.com/abdullahiftikharcode/Bookstore-Management-System",
      updated_at: new Date(),
      stargazers_count: 4,
      forks_count: 0
    },
    {
      id: 4,
      name: "Chess",
      description: "Chess game in C++ with features like Highlight, Check, Checkmate, Undo and Redo",
      repoUrl: "https://github.com/abdullahiftikharcode/Chess",
      language: "C++",
      html_url: "https://github.com/abdullahiftikharcode/Chess",
      updated_at: new Date(),
      stargazers_count: 2,
      forks_count: 1
    },
  ]

  // Combine GitHub repos with database projects when appropriate
  const allProjects = useMemo(() => {
    try {
      // First priority: If database projects exist and are valid, use those
      if (projects && Array.isArray(projects) && projects.length > 0) {
        return projects.map(project => ({
          id: project._id || Math.random().toString(36).substring(7),
          name: project.name || 'Unnamed Project',
          description: project.description || 'No description available',
          language: project.language || null,
          repoUrl: project.repoUrl || '#',
          html_url: project.repoUrl || '#',
          updated_at: project.updated_at || new Date(),
          stargazers_count: project.stargazers_count || 0,
          forks_count: project.forks_count || 0
        }));
      }
      
      // Second priority: If GitHub API worked and returned repos, use those
      if (repos && Array.isArray(repos) && repos.length > 0 && !githubError) {
        return repos.map(repo => ({
          id: repo.id || Math.random().toString(36).substring(7),
          name: repo.name || 'Unnamed Project',
          description: repo.description || 'No description available',
          language: repo.language || null,
          html_url: repo.html_url || '#',
          updated_at: repo.updated_at || new Date(),
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0
        }));
      }
      
      // Last resort: Fallback to static projects data
      console.log("Using fallback projects data");
      return fallbackProjects;
    } catch (error) {
      console.error("Error combining projects:", error);
      return fallbackProjects;
    }
  }, [repos, projects, githubError, projectsError, fallbackProjects]);

  // Get unique languages from repos
  const languages = useMemo(() => {
    if (!allProjects || allProjects.length === 0) return ["all"];
    return ["all", ...Array.from(new Set(allProjects.filter((repo) => repo.language).map((repo) => repo.language)))];
  }, [allProjects]);

  // Filter and sort repos when dependencies change
  useEffect(() => {
    if (!allProjects || allProjects.length === 0) return;

    let result = [...allProjects];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          (repo.description && repo.description.toLowerCase().includes(query)),
      );
    }

    // Filter by language
    if (selectedLanguage !== "all") {
      result = result.filter((repo) => repo.language === selectedLanguage);
    }

    // Sort repos
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "oldest":
          return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        case "stars":
          return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        case "forks":
          return (b.forks_count || 0) - (a.forks_count || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredRepos(result);
  }, [allProjects, searchQuery, selectedLanguage, sortBy]);

  // Handle filter changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value)
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLanguage("all")
    setSortBy("newest")
  }

  return (
    <Layout activePage="WORKS" title="MY WORKS">
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <ScrollReveal>
          <Box component="section" sx={{ mt: 4, mb: 6 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                textTransform: "uppercase",
                mb: 3,
                fontSize: "0.9rem",
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              MY REPOSITORIES
            </Typography>

            {/* Filter and sort controls */}
            <Box
              sx={{
                mb: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                alignItems: { xs: "stretch", md: "center" },
                backgroundColor: theme.palette.mode === "dark" ? "rgba(30, 30, 30, 0.6)" : "rgba(240, 240, 240, 0.6)",
                p: 2,
                borderRadius: 2,
              }}
            >
              <TextField
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.8)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl
                size="small"
                sx={{
                  minWidth: 150,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.8)",
                  },
                }}
              >
                <InputLabel id="language-filter-label">Language</InputLabel>
                <Select
                  labelId="language-filter-label"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  label="Language"
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterList fontSize="small" />
                    </InputAdornment>
                  }
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang === "all" ? "All Languages" : lang}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{
                  minWidth: 150,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.8)",
                  },
                }}
              >
                <InputLabel id="sort-filter-label">Sort By</InputLabel>
                <Select
                  labelId="sort-filter-label"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                  startAdornment={
                    <InputAdornment position="start">
                      <Sort fontSize="small" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="stars">Most Stars</MenuItem>
                  <MenuItem value="forks">Most Forks</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                onClick={clearFilters}
                size="small"
                sx={{
                  minWidth: 120,
                  borderColor: theme.palette.mode === "dark" ? "white" : "black",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    borderColor: theme.palette.mode === "dark" ? "white" : "black",
                  },
                }}
              >
                Clear Filters
              </Button>
            </Box>

            {/* Repositories Section */}
            <Box>
              {githubLoading ? (
                <Grid container spacing={3}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                      <Card sx={{ height: 300, p: 2, borderRadius: 2 }}>
                        <Skeleton variant="rectangular" width="100%" height={140} />
                        <Box sx={{ pt: 2 }}>
                          <Skeleton variant="text" width="60%" height={30} />
                          <Skeleton variant="text" width="100%" height={20} />
                          <Skeleton variant="text" width="100%" height={20} />
                          <Box sx={{ display: "flex", mt: 2 }}>
                            <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
                            <Skeleton variant="text" width={60} height={20} />
                            <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1, ml: 2 }} />
                            <Skeleton variant="text" width={30} height={20} />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : githubError ? (
                <Box>
                  <Typography variant="h6" color="error" gutterBottom>
                    Error loading repositories from GitHub
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
                    We&apos;re displaying some of our highlighted projects below:
                  </Typography>
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <Grid container spacing={3}>
                      {fallbackProjects.map((project, index) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                          <ScrollReveal delay={index * 0.1}>
                            <RepositoryFallback
                              id={project.id}
                              name={project.name}
                              description={project.description}
                              repoUrl={project.repoUrl}
                              index={index}
                            />
                          </ScrollReveal>
                        </Grid>
                      ))}
                    </Grid>
                  </motion.div>
                </Box>
              ) : filteredRepos && filteredRepos.length > 0 ? (
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <Grid container spacing={3}>
                    {filteredRepos.map((repo, index) => (
                      <Grid item xs={12} sm={6} md={4} key={repo.id}>
                        <ScrollReveal delay={index * 0.1}>
                          <RepositoryCard repo={repo} index={index} />
                        </ScrollReveal>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(30, 30, 30, 0.3)" : "rgba(240, 240, 240, 0.6)",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    No repositories found matching your criteria
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Try adjusting your filters or search term.
                  </Typography>
                  <Button variant="contained" onClick={clearFilters} color="primary">
                    Clear All Filters
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </ScrollReveal>
      </Container>
    </Layout>
  )
} 