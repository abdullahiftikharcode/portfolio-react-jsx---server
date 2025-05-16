import { useState, useEffect } from 'react';
import { educationApi } from '../lib/api';

export function useEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const data = await educationApi.getAll();
      setEducation(data);
      setError(null);
    } catch (err) {
      setError("Failed to load education data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return {
    education,
    loading,
    error,
    refetch: fetchEducation,
  };
} 