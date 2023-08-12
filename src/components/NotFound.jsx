import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import logo512 from '../assets/logo.png';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h3">
              Page Not Found
            </Typography>
            <Typography variant="h6" sx={{
              marginTop: '50px',
              textAlign: 'center',
            }}>
              The page you’re looking for doesn’t exist or an another error occured.
            </Typography>
            <Button variant="contained" href='/' endIcon={<SendIcon />} sx={{
              marginTop: '20px',
              padding: "10px 15px",
              backgroundColor: "#5e714e",
              color: "#fff",
              ":hover": {
                backgroundColor: "#fff",
                color: "#5e714e"
              }
            }}>Go Back Home</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src={logo512}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}