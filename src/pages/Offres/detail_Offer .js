import React, { useState,useEffect }  from 'react';
import { Typography, Paper, Button, Box, Grid,useTheme } from '@mui/material';
import Image from '../../assets/images/logoo.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
      
      content: {
        padding: 3,
        maxWidth: 1500,
        minWidth: 375,
        height: 'calc(100vh - 200px)', overflowY: 'auto',
       marginLeft: drawerWidth + 15,
      }
    }
  }
  const getOfferById = (offreId, setOffer) => {
    axios.get(`http://localhost:3001/offres/${offreId}`)
      .then((response) => {
        setOffer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offer:', error);
      });
  }

const OfferDetailsPage = () => {
  const theme = useTheme();
  const { idOffer } = useParams();
  const [offer, setOffer] = useState({});
  useEffect(() => {
    getOfferById(idOffer, setOffer); 
  }, [idOffer]); 
  useEffect(() => {if(!sessionStorage.getItem('entrepriseId')){
    window.location.href="/signin/company";}})

   return (
    
    <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Détails de l'offre</Typography>
        {/* {offers.map((offer) => ( */}
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            
            <img src={Image}alt={offer.titre} style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>{offer.titre}</Typography>
            <Typography variant="body1" gutterBottom>{offer.mission}</Typography>
            <Typography variant="body1" gutterBottom>{offer.profile}</Typography>
            <Typography variant="body1" gutterBottom>{offer.technicalSkills}</Typography>
            <Typography variant="body1" gutterBottom>{offer.interpersonalSkills}</Typography>
            <Typography variant="body1" gutterBottom>{offer.languages}</Typography>
            <Box mt={3}>
              <Button variant="contained" color="primary" component={Link} to={`/company/EditOffres/${offer._id}`}>
                Modifier l'offre
              </Button>
              <Button variant="contained" color="secondary" href="/company/ListeOffres" sx={{ marginLeft: '10px' }}>
                Voir la liste des offres
              </Button>
              <br></br>
              <Button variant="contained" color="error" href="/company/RecruitmentProcessCandidate" sx={{ marginTop: '10px' }}>
              Affichez les étapes du processus de recrutement
              </Button>
            </Box>
          </Grid>
        </Grid>
       
        {/* } */}
      </Paper>
      </main>
      </Box>
    </div>
  );
};

export default OfferDetailsPage;
