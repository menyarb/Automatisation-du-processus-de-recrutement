import * as React from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
  Link, Grid, Box, Typography, Container, Snackbar, Alert, AppBar, Toolbar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';

import RecInovLogo from '../../assets/images/logo.png'; // Import your logo here

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar sx={{ m: 1 }} src={RecInovLogo} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rec-Inov
        </Typography>
        <Button color="inherit" href="/signin/company">Sign In</Button>
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
        © {new Date().getFullYear()} Your Website
      </Typography>
    </Box>
  );
}

function SignUp() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      name: formData.get('entrepriseName'),
      email: formData.get('email'),
      password: formData.get('password'),
      phoneNumber: formData.get('phoneNumber'),
      site: formData.get('site'),
      address: formData.get('adress'),
      logo: formData.get('logo'),
    };

    try {
      const response = await fetch('http://localhost:3001/entreprises/register', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        setSnackbarMessage('Registration successful! Redirecting to login...');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/signin/company'), 3000);
      } else {
        console.error('Registration failed:', response.statusText);
        setSnackbarMessage('Registration failed. Please try again.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            INSCRIPTION ENTREPRISE
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item xs={12} container spacing={1} alignItems="center">
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Ajouter un logo
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar variant="rounded">
                      <AddPhotoAlternateIcon />
                    </Avatar>
                  </Grid>
                </Grid>
                <input accept="../../assets/images" id="logo" type="file" name="logo"  />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="entrepriseName"
                  label="Nom de l'entreprise"
                  name="entrepriseName"
                  autoComplete="entrepriseName"
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
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Numéro de téléphone"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="site" label="Site web" name="site" autoComplete="site" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="adress" label="Adresse" name="adress" autoComplete="adress" />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
           
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin/company" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </ThemeProvider>
  );
}

export default SignUp;
