import { useState, useEffect } from 'react';
import { experiencesApi } from '../lib/api';

export function useExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await experiencesApi.getAll();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError("Failed to load experience data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExperience = async (experienceData) => {
    try {
      setActionLoading(true);
      const newExperience = await experiencesApi.create(experienceData);
      setExperiences(prev => [...prev, newExperience]);
      return { success: true, data: newExperience };
    } catch (err) {
      setError("Failed to create experience. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const updateExperience = async (id, experienceData) => {
    try {
      setActionLoading(true);
      const updatedExperience = await experiencesApi.update(id, experienceData);
      setExperiences(prev => prev.map(experience => 
        experience._id === id ? updatedExperience : experience
      ));
      return { success: true, data: updatedExperience };
    } catch (err) {
      setError("Failed to update experience. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteExperience = async (id) => {
    try {
      setActionLoading(true);
      await experiencesApi.delete(id);
      setExperiences(prev => prev.filter(experience => experience._id !== id));
      return { success: true };
    } catch (err) {
      setError("Failed to delete experience. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    actionLoading,
    refetch: fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience
  };
} 