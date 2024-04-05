import React from 'react';
import { Typography, Paper, Button, Box, Grid,useTheme } from '@mui/material';
import Image from '../../assets/images/logoo.png';
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';

const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
      
      content: {
        padding: 3,
        maxWidth: 1500,
        minWidth: 375,
        height: 'calc(100vh )', overflowY: 'auto',
       marginLeft: drawerWidth + 15,
      }
    }
  }
const offers = [
  {
      image: require('../../assets/images/logoo.png').default,
      title: 'Title 1',
      mission: 'Mission 1',
      profile: 'Profile 1',
      technicalSkills: 'Technical Skills 1',
      interpersonalSkills: 'Interpersonal Skills 1',
      languages: 'Languages 1'
  },
  
  // Ajoutez d'autres offres si nécessaire
];
const OfferDetailsPage = ({ offer }) => {
  const theme = useTheme();
  
  return (
    
    <div sx={{backgroundColor: '#ced4da', }}>
       <MenuNavbarAddCandidat />
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Détails de l'offre</Typography>
        {offers.map((offer) => (
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            
            <img src={Image}alt={offer.title} style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>{offer.title}</Typography>
            <Typography variant="body1" gutterBottom>{offer.mission}</Typography>
            <Typography variant="body1" gutterBottom>{offer.profile}</Typography>
            <Typography variant="body1" gutterBottom>{offer.technicalSkills}</Typography>
            <Typography variant="body1" gutterBottom>{offer.interpersonalSkills}</Typography>
            <Typography variant="body1" gutterBottom>{offer.languages}</Typography>
            <Box mt={3}>
              <Button variant="contained" color="primary" href="">
              Postuler
              </Button>
              <Button variant="contained" color="secondary" href="/candidate/ListeOffres" sx={{ marginLeft: '10px' }}>
                Voir la liste des offres
              </Button>
              
              
            </Box>
          </Grid>
        </Grid>
        ))}
      </Paper>
      </main>
      </Box>
    </div>
  );
};

export default OfferDetailsPage;
