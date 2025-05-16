import { useState, useEffect } from 'react';
import { skillsApi } from '../lib/api';

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await skillsApi.getAll();
      setSkills(data);
      setError(null);
    } catch (err) {
      setError("Failed to load skills data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
  };
} 