import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  TextField, 
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSkills } from '../../hooks/useSkills';

export default function SkillsManager() {
  const { skills, loading, error, actionLoading, createSkill, updateSkill, deleteSkill } = useSkills();
  
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 1,
    value: 0,
    description: '',
    icon: '',
    years: 0
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e, newValue) => {
    setFormData(prev => ({ ...prev, level: newValue }));
  };

  const handleValueChange = (e, newValue) => {
    setFormData(prev => ({ ...prev, value: newValue }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      level: 1,
      value: 0,
      description: '',
      icon: '',
      years: 0
    });
    setCurrentSkill(null);
  };

  const handleOpen = (skill = null) => {
    if (skill) {
      setCurrentSkill(skill);
      setFormData({
        name: skill.name || '',
        category: skill.category || '',
        level: skill.level || 1,
        value: skill.value || 0,
        description: skill.description || '',
        icon: skill.icon || '',
        years: skill.years || 0
      });
    } else {
      resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let result;
      if (currentSkill) {
        result = await updateSkill(currentSkill._id, formData);
        if (result.success) {
          setSnackbar({
            open: true,
            message: 'Skill updated successfully!',
            severity: 'success'
          });
        }
      } else {
        result = await createSkill(formData);
        if (result.success) {
          setSnackbar({
            open: true,
            message: 'Skill created successfully!',
            severity: 'success'
          });
        }
      }
      
      handleClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Error: ${err.message}`,
        severity: 'error'
      });
    }
  };

  const handleDeleteOpen = (skill) => {
    setCurrentSkill(skill);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setCurrentSkill(null);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteSkill(currentSkill._id);
      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Skill deleted successfully!',
          severity: 'success'
        });
      }
      handleDeleteClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Error: ${err.message}`,
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">Skills Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Years</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill._id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell>{skill.years}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(skill)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOpen(skill)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{currentSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Database">Database</MenuItem>
                  <MenuItem value="DevOps">DevOps</MenuItem>
                  <MenuItem value="Mobile">Mobile</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              
              <Box>
                <Typography gutterBottom>Skill Level (1-5)</Typography>
                <Slider
                  name="level"
                  value={formData.level}
                  onChange={handleSliderChange}
                  min={1}
                  max={5}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
              
              <Box>
                <Typography gutterBottom>Proficiency (0-100)</Typography>
                <Slider
                  name="value"
                  value={formData.value}
                  onChange={handleValueChange}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </Box>
              
              <TextField
                fullWidth
                label="Years of Experience"
                name="years"
                type="number"
                value={formData.years}
                onChange={handleChange}
                inputProps={{ min: 0, step: 1 }}
              />
              
              <TextField
                fullWidth
                label="Icon Name"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="e.g. react-icon"
              />
              
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={actionLoading}
            >
              {actionLoading ? <CircularProgress size={24} /> : (currentSkill ? 'Update' : 'Create')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Skill</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the skill "{currentSkill?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained"
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 