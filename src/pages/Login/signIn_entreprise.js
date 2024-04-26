import React, { useState,useEffect } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link,
  Grid, Box, Typography, Container, AppBar, Toolbar, Snackbar, Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import RecInovLogo from '../../assets/images/logo.png'; // Ensure your logo is imported correctly

// Default MUI theme
const defaultTheme = createTheme();

function LoginEntreprise() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/entreprises/login', { email, password });
      const { entrepriseName, token, entrepriseId } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('entrepriseId', entrepriseId);
      sessionStorage.setItem('entrepriseName', entrepriseName);
      window.location.href = '/company/ListeOffres'; 
      // Set success message
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setError('Adresse e-mail ou mot de passe incorrect');
      setSnackbarMessage('Login failed: Email or password is incorrect.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {if(sessionStorage.getItem( 'entrepriseId' )){
    window.location.href="/company/ListeOffres";}})

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Avatar sx={{ m: 2 }} src={RecInovLogo} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rec-Inov
          </Typography>
          <LockIcon />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={RecInovLogo} />
          <Typography component="h1" variant="h5">
            LOGIN ENTREPRISE
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup/company" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, marginTop: '110px' }}>
        <Typography variant="body1" align="center">
          Footer Content
        </Typography>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Your Website
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default LoginEntreprise;
