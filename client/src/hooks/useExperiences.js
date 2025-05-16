import { useState, useEffect } from 'react';
import { experiencesApi } from '../lib/api';

export function useExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  };
} 