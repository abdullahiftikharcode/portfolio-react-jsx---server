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
  Switch,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useProjects } from '../../hooks/useProjects';

export default function ProjectsManager() {
  const { projects, loading, error, actionLoading, createProject, updateProject, deleteProject } = useProjects();
  
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    technologies: [],
    language: '',
    repoUrl: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    images: [],
    startDate: null,
    endDate: null
  });
  const [techInput, setTechInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }));
      setImageInput('');
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      description: '',
      technologies: [],
      language: '',
      repoUrl: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      images: [],
      startDate: null,
      endDate: null
    });
    setTechInput('');
    setImageInput('');
    setCurrentProject(null);
  };

  const handleOpen = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        name: project.name || '',
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies || [],
        language: project.language || '',
        repoUrl: project.repoUrl || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        images: project.images || [],
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null
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
      if (currentProject) {
        result = await updateProject(currentProject._id, formData);
        if (result.success) {
          setSnackbar({
            open: true,
            message: 'Project updated successfully!',
            severity: 'success'
          });
        }
      } else {
        result = await createProject(formData);
        if (result.success) {
          setSnackbar({
            open: true,
            message: 'Project created successfully!',
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

  const handleDeleteOpen = (project) => {
    setCurrentProject(project);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setCurrentProject(null);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteProject(currentProject._id);
      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Project deleted successfully!',
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
        <Typography variant="h5" component="h2">Projects Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
        >
          Add Project
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Technologies</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  {project.description?.length > 50 
                    ? `${project.description.substring(0, 50)}...` 
                    : project.description}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <Chip key={index} label={tech} size="small" />
                    ))}
                    {project.technologies?.length > 3 && (
                      <Chip label={`+${project.technologies.length - 3}`} size="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {project.featured ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(project)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOpen(project)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{currentProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
              
              <TextField
                fullWidth
                label="Programming Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
              
              <Box>
                <Typography gutterBottom>Technologies</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {formData.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => removeTechnology(index)}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Add Technology"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button variant="outlined" onClick={addTechnology}>Add</Button>
                </Box>
              </Box>
              
              <Box>
                <Typography gutterBottom>Images</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  {formData.images.map((img, index) => (
                    <Chip
                      key={index}
                      label={img}
                      onDelete={() => removeImage(index)}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Add Image URL"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  />
                  <Button variant="outlined" onClick={addImage}>Add</Button>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                label="Repository URL"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
              />
              
              <TextField
                fullWidth
                label="Live Demo URL"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
              />
              
              <TextField
                fullWidth
                label="GitHub URL"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={handleChange}
                    name="featured"
                  />
                }
                label="Featured Project"
              />
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  
                  <DatePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={actionLoading}
            >
              {actionLoading ? <CircularProgress size={24} /> : (currentProject ? 'Update' : 'Create')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the project "{currentProject?.name}"? This action cannot be undone.
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