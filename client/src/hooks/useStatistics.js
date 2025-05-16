import { useState, useEffect } from 'react';
import { statisticsApi } from '../lib/api/apiService';

export function useStatistics() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const data = await statisticsApi.getAll();
      setStatistics(data);
      setError(null);
    } catch (err) {
      setError("Failed to load statistics data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Helper function to get a specific statistic by name
  const getStatByName = (name) => {
    return statistics.find(stat => stat.name === name) || { value: 0 };
  };

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,
    getStatByName,
    // Return individual stats for convenience
    totalHours: getStatByName('total_hours').value,
    projectsDone: getStatByName('projects_done').value,
    satisfied: getStatByName('satisfied').value,
    certifications: getStatByName('certifications').value
  };
} 