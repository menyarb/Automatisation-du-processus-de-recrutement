import React, { useState,useEffect } from 'react';import { Typography, Paper, Button, Box, Grid,useTheme,Snackbar } from '@mui/material';
import Image from '../../assets/images/logoo.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
      
      content: {
        padding: 3,
        maxWidth: 1500,
        minWidth: 375,
        height: 'calc(100vh - 200px)', overflowY: 'auto',
       marginLeft: drawerWidth + 15,
       marginTop: 95,
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
 
  useEffect(() => {if(!sessionStorage.getItem('candidatId')){
    window.location.href="/signin/candidate";}})
    const [showAlert, setShowAlert] = useState(false); // État pour gérer l'affichage de l'alerte

    const postulerOffre = (offerId) => {
      axios.post(`http://localhost:3001/candidatures/`, {
        idCandidat: sessionStorage.getItem("candidatId"),
        idOffre: offerId,
        etatCandidature: 'EN_ATTENTE'
      })
        .then(response => {
          console.log('Candidature envoyée avec succès :', response.data);
          setShowAlert(true); // Afficher l'alerte lorsque la candidature est réussie
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi de la candidature :', error);
        });
    };
  
    const handleAlertClose = () => {
      setShowAlert(false); // Fermer l'alerte lorsqu'elle est cliquée ou après un délai
    };
  
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
             
              <Button variant="contained" color="secondary" href="/candidate/ListeOffres" sx={{ marginLeft: '10px' }}>
               la liste des offres
              </Button>
             
              <Button sx={{ borderRadius: '16px', margin: '10px' }} variant="contained" color="success" onClick={() => postulerOffre(offer._id)}>
                          Postuler
                        </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleAlertClose}>
            <MuiAlert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
              La postulation a été envoyée avec succès.
            </MuiAlert>
          </Snackbar>
      </main>
      </Box>
    </div>
  );
};

export default OfferDetailsPage;
