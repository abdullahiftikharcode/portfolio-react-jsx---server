import { useState, useEffect } from 'react';
import { projectsApi } from '../lib/api';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Failed to load projects data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      setActionLoading(true);
      const newProject = await projectsApi.create(projectData);
      setProjects(prev => [...prev, newProject]);
      return { success: true, data: newProject };
    } catch (err) {
      setError("Failed to create project. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      setActionLoading(true);
      const updatedProject = await projectsApi.update(id, projectData);
      setProjects(prev => prev.map(project => 
        project._id === id ? updatedProject : project
      ));
      return { success: true, data: updatedProject };
    } catch (err) {
      setError("Failed to update project. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setActionLoading(true);
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(project => project._id !== id));
      return { success: true };
    } catch (err) {
      setError("Failed to delete project. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    actionLoading,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
} 