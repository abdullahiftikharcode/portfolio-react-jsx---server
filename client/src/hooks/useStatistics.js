import { useState, useEffect } from 'react';
import { statisticsApi } from '../lib/api/apiService';

export function useStatistics() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const createStatistic = async (statisticData) => {
    try {
      setActionLoading(true);
      const newStatistic = await statisticsApi.create(statisticData);
      setStatistics(prev => [...prev, newStatistic]);
      return { success: true, data: newStatistic };
    } catch (err) {
      setError("Failed to create statistic. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const updateStatistic = async (name, statisticData) => {
    try {
      setActionLoading(true);
      const updatedStatistic = await statisticsApi.update(name, statisticData);
      setStatistics(prev => prev.map(stat => 
        stat.name === name ? updatedStatistic : stat
      ));
      return { success: true, data: updatedStatistic };
    } catch (err) {
      setError("Failed to update statistic. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteStatistic = async (name) => {
    try {
      setActionLoading(true);
      await statisticsApi.delete(name);
      setStatistics(prev => prev.filter(stat => stat.name !== name));
      return { success: true };
    } catch (err) {
      setError("Failed to delete statistic. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
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
    actionLoading,
    refetch: fetchStatistics,
    getStatByName,
    // CRUD operations
    createStatistic,
    updateStatistic,
    deleteStatistic,
    // Return individual stats for convenience
    totalHours: getStatByName('total_hours').value,
    projectsDone: getStatByName('projects_done').value,
    satisfied: getStatByName('satisfied').value,
    certifications: getStatByName('certifications').value
  };
} 