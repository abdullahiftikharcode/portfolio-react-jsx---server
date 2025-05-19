import { useState, useEffect } from 'react';
import { skillsApi } from '../lib/api';

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const createSkill = async (skillData) => {
    try {
      setActionLoading(true);
      const newSkill = await skillsApi.create(skillData);
      setSkills(prev => [...prev, newSkill]);
      return { success: true, data: newSkill };
    } catch (err) {
      setError("Failed to create skill. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const updateSkill = async (id, skillData) => {
    try {
      setActionLoading(true);
      const updatedSkill = await skillsApi.update(id, skillData);
      setSkills(prev => prev.map(skill => 
        skill._id === id ? updatedSkill : skill
      ));
      return { success: true, data: updatedSkill };
    } catch (err) {
      setError("Failed to update skill. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    try {
      setActionLoading(true);
      await skillsApi.delete(id);
      setSkills(prev => prev.filter(skill => skill._id !== id));
      return { success: true };
    } catch (err) {
      setError("Failed to delete skill. Please try again.");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    actionLoading,
    refetch: fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill
  };
} 