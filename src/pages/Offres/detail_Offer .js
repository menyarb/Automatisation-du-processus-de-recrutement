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
            
            <img src={Image}  style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
          <h5 htmlFor="title">Title de Poste :</h5>
            <Typography variant="h6" gutterBottom>{offer.title}</Typography>
            <h5 htmlFor="mission" >Mission :</h5>
            <Typography variant="body1" gutterBottom>{offer.mission}</Typography>
            <h5 htmlFor="mission" >profile Demende :</h5>
            <Typography variant="body1" gutterBottom>{offer.profile}</Typography>
            <h5 htmlFor="mission" >Compétences techniques :</h5>
            <Typography variant="body1" gutterBottom>{offer.technicalSkills}</Typography>
            <h5 htmlFor="mission" >Compétences interpersonnelles :</h5>
            <Typography variant="body1" gutterBottom>{offer.interpersonalSkills}</Typography>
            <h5 htmlFor="mission" >languages :</h5>
            <Typography variant="body1" gutterBottom>{offer.languages}</Typography>
            <h5 htmlFor="mission" >Salaire :</h5>
            <Typography variant="body1" gutterBottom>{offer.Salaire}</Typography>
            <h5 htmlFor="mission" >Type de travail :</h5>
            <Typography variant="body1" gutterBottom>{offer.jobType}</Typography>
            <h5 htmlFor="mission" >Emplacement :</h5>
            <Typography variant="body1" gutterBottom>{offer.Emplacement}</Typography>
            <h5 htmlFor="mission" >Qualification :</h5>
            <Typography variant="body1" gutterBottom>{offer.Qualification}</Typography>
          
            <Box mt={3}>
              <Button variant="contained" color="primary" component={Link} to={`/company/EditOffres/${offer._id}`}>
                Modifier l'offre
              </Button>
              <Button variant="contained" color="secondary" href="/company/ListeOffres" sx={{ marginLeft: '10px' }}>
                Voir la liste des offres
              </Button>
              <br></br>
              <Button variant="contained" color="error"component={Link} to={`/company/RecruitmentProcess/${offer._id}`} sx={{ marginTop: '10px' }}>
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
