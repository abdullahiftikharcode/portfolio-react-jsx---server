"use client"

import { useState, useEffect } from "react"
import { fetchGitHubRepos } from "../lib/github"

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRepos = async () => {
    try {
      setLoading(true)
      const data = await fetchGitHubRepos(username)
      
      // Make sure we have an array of repos with required fields
      if (Array.isArray(data) && data.length > 0) {
        // Ensure each repo has the required properties to prevent errors
        const sanitizedRepos = data.map(repo => ({
          id: repo.id || Math.random().toString(36).substring(7),
          name: repo.name || 'Unnamed Project',
          description: repo.description || 'No description available',
          language: repo.language || null,
          html_url: repo.html_url || '#',
          updated_at: repo.updated_at || new Date(),
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          owner: repo.owner || { login: 'unknown' }
        }));
        
        setRepos(sanitizedRepos)
        setError(null)
      } else {
        throw new Error("No repositories found or invalid data format")
      }
    } catch (err) {
      setError("Failed to load repositories. Please try again later.")
      console.error(err)
      setRepos([]) // Set empty array so we can fall back to database projects
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [username])

  return {
    repos,
    loading,
    error,
    refetch: fetchRepos,
  }
} 