import React from 'react';
import {Typography, Grid, Card, CardMedia, Box } from '@mui/material';

import image2 from '../asscets/image2.jpeg';
import image3 from '../asscets/image3.jpeg';
import image4 from '../asscets/image4.jpeg';
import Navbar from "../components/Navbar";

const Blog = () => {
  return (<>
  <Navbar/>
    <Box sx={{ padding: 2, textAlign: 'center',background: "linear-gradient(135deg, #092311, #000)", color: "#fff" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Images
      </Typography>
      <Grid container spacing={4} justifyContent="center">


        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              image={image3}
              alt="Image 3"
              sx={{ height: 300, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              image={image2}
              alt="Image 2"
              sx={{ height: 300, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={5}>
          <Card>
            <CardMedia
              component="img"
              image={image4}
              alt="Image 4"
              sx={{ height: 300, objectFit: 'cover' }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Blog;
