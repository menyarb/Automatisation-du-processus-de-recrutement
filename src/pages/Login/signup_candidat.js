
import React, { useState,useEffect } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link,
  Grid, Box, Typography, Container, AppBar, Toolbar, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RecInovLogo from '../../assets/images/logo.png';


function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar sx={{ m: 1 }} src={RecInovLogo} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rec-Inov
        </Typography>
        <Button color="inherit" href="/signin/candidate">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, marginTop: '30px' }}>
      <Typography variant="body1" align="center">
        Footer Content
      </Typography>
      <Typography variant="body2" align="center">
        {' © '}
        <Link color="inherit" href="#">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

function SignUp() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // Options: error, warning, info, success
  
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const postData = {
      name: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      password: data.get('password'),
    };
  
    try {
      const response = await fetch('http://localhost:3001/candidats/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
  
      const result = await response.json();
      if (response.ok) {
        setSnackbarMessage('Registration successful! You can now sign in.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // Optionally redirect to sign-in page or dashboard here
      } else {
        throw new Error(result.message || 'Failed to sign up.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to sign up. Please try again.');
      setSnackbarMessage(error.message || 'Failed to sign up. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  useEffect(() => {if(sessionStorage.getItem('candidatId'&&'entrepriseId' )){
    window.location.href="/candidate/AddCondidat";}})


  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            INSCRIPTION CANDIDAT
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin/candidate" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
  <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
  </Alert>
</Snackbar>

      <Footer />
    </ThemeProvider>
  );
}

export default SignUp;
