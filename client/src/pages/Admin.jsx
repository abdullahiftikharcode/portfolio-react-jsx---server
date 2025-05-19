import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs, 
  Tab 
} from '@mui/material';
import Layout from "../layouts/Layout";
import SkillsManager from '../components/AdminControls/SkillsManager';
import ProjectsManager from '../components/AdminControls/ProjectsManager';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Admin() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout activePage="ADMIN" title="Admin Dashboard">
      <Container maxWidth="xl" sx={{ pt: 4, pb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your portfolio content
        </Typography>

        <Paper sx={{ borderRadius: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Skills" />
            <Tab label="Projects" />
            {/* Add more tabs as needed */}
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <SkillsManager />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <ProjectsManager />
          </TabPanel>
          
          {/* Add more tab panels as needed */}
        </Paper>
      </Container>
    </Layout>
  );
} 