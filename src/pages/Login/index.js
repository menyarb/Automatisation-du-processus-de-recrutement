import React from 'react';
import { AppBar, Button, Toolbar, Typography, Container, Grid, Box,Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DemoPCImage from '../../assets/images/demo_PC.0f47bdbe.webp';
import RecInovLogo from '../../assets/images/logo.png';

const StyledButton = styled(Button)({
  marginRight: '10px',
});

const App = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
                  {/* Remplacez l'Avatar par votre logo */}
        <Avatar sx={{ m: 2 }} src={RecInovLogo}>
            {/* Vous pouvez également utiliser votre propre composant d'Avatar */}
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rec-inov
          </Typography>
          <StyledButton component={Link} to="/signin/candidate" color="inherit" sx={{ color: '#fff', background: '#1890ff' }}>
            Espace Candidat
          </StyledButton>
          <StyledButton component={Link} to="/signin/company" color="inherit" sx={{ color: '#fff', background: '#1890ff' }}>
            Espace Entreprise
          </StyledButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <img src={DemoPCImage} alt="Demo PC" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Notre mission :</strong>
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Vous aider à choisir l'emploi idéal. Simplifier et faciliter vos recherches d'emploi avec REC-Inov, une plateforme de recherche de travail puissante, fiable et facile à utiliser qui répond à vos besoins et défis.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              NOUS REJOINDRE
            </Typography>
            <Grid container justifyContent="center">
              <StyledButton component={Link} to="/signin/candidate" variant="contained" sx={{ color: '#fff', background: '#1890ff' }}>
                Espace Candidat
              </StyledButton>
              <StyledButton component={Link} to="/signin/company" variant="contained" sx={{ color: '#fff', background: '#1890ff' }}>
                Espace Entreprise
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{  bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto' ,marginTop:'110px'}} >
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
    </div>
  );
}

export default App;
