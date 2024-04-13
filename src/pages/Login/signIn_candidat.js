import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RecInovLogo from '../../assets/images/logo.png'; // Importez votre logo ici
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LockIcon from '@mui/icons-material/Lock'; // Importez l'icône de connexion ici
import axios from 'axios'; // Importez axios pour les requêtes HTTP

// Thème par défaut MUI
const defaultTheme = createTheme();

function LoginCandidat() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/candidats/login', { email, password });
      const candidatName = response.data.candidatName;
      const token = response.data.token;
      const candidatId = response.data.candidatId;
      sessionStorage.setItem('token', token); // Stockage du token dans le sessionStorage
      sessionStorage.setItem('candidatId', candidatId); // Stockage de l'ID du candidat dans le sessionStorage
      sessionStorage.setItem('candidatName', candidatName); 
      window.location.href = '/candidate/AddCondidat'; // Mettez ici le chemin de votre tableau de bord
    } catch (err) {
      setError('Adresse e-mail ou mot de passe incorrect');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static">
        <Toolbar>
          {/* Remplacez l'Avatar par votre logo */}
          <Avatar sx={{ m: 2 }} src={RecInovLogo}>
            {/* Vous pouvez également utiliser votre propre composant d'Avatar */}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rec-Inov
          </Typography>
          <LockIcon />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Remplacez l'Avatar par votre logo */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={RecInovLogo}>
            {/* Vous pouvez également utiliser votre propre composant d'Avatar */}
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN CANDIDAT
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup/candidate" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" href="/signup/candidate">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, marginTop: "110px" }}>
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
    </ThemeProvider>
  );
}

export default LoginCandidat;
