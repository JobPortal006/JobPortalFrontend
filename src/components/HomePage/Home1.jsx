import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import SearchBar from '../searchBar';

const Home1 = () => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
             Heading
             <SearchBar />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home1;
