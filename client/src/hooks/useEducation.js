import { useState, useEffect } from 'react';
import { educationApi } from '../lib/api';

export function useEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const createEducation = async (educationData) => {
    try {
      setActionLoading(true);
      const newEducation = await educationApi.create(educationData);
      setEducation(prev => [...prev, newEducation]);
      return { success: true, data: newEducation };
    } catch (err) {
      setError("Failed to create education entry. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const updateEducation = async (id, educationData) => {
    try {
      setActionLoading(true);
      const updatedEducation = await educationApi.update(id, educationData);
      setEducation(prev => prev.map(edu => 
        edu._id === id ? updatedEducation : edu
      ));
      return { success: true, data: updatedEducation };
    } catch (err) {
      setError("Failed to update education entry. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteEducation = async (id) => {
    try {
      setActionLoading(true);
      await educationApi.delete(id);
      setEducation(prev => prev.filter(edu => edu._id !== id));
      return { success: true };
    } catch (err) {
      setError("Failed to delete education entry. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return {
    education,
    loading,
    error,
    actionLoading,
    refetch: fetchEducation,
    createEducation,
    updateEducation,
    deleteEducation
  };
} 