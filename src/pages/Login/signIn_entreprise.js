import * as React from 'react';
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



// Thème par défaut MUI
const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
        {/* Ajoutez votre icône de connexion ici */}
        {/* <Typography variant="h8" component="div">
        connexion
        </Typography>*/}
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" href="/Signup/company">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 ,marginTop:"110px"}}>
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
