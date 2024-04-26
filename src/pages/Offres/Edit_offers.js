import React, { useState,useEffect } from 'react';
import { Typography, Paper, Button, Box, Grid,useTheme } from '@mui/material';
import {  TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
      content: {
        padding: 3,
        height: 'calc(100vh - 200px)', overflowY: 'auto',
       marginLeft: drawerWidth + 15,
      
      }
    }
  }
  const getOfferById = (offreId, setOffer) => {
    axios.get(`http://localhost:3001/offres/${offreId}`)
      .then((response) => {
        console.log(response.data)
        setOffer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offer:', error);
      });
  }
export default function Offres() {
    
      const { idOffer } = useParams();
      const [offer, setOffer] = useState({});
      useEffect(() => {
        getOfferById(idOffer, setOffer); 
      }, [idOffer]);
    
      const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        const dataToSend = {
          _id: offer._id, // Supposons que l'identifiant de l'offre est stocké dans offer._id
          title: offer.title,
          mission: offer.mission,
          profile: offer.profile,
          technicalSkills: offer.technicalSkills,
          interpersonalSkills: offer.interpersonalSkills,
          languages: offer.languages,
        };
        axios.patch(`http://localhost:3001/offres/${offer._id}`, dataToSend).then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching offer:', error);
        });
        console.log(offer);
        // Here you would typically send the offer data to your server
      };
      const handleImageChange = (e) => {
        setOffer({ ...offer, image: e.target.files[0] });
      };
      useEffect(() => {if(!sessionStorage.getItem('entrepriseId')){
        window.location.href="/signin/company";}})
    
    const theme = useTheme();
  return (
    <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>modifier offres</Typography>
            {/* <input accept="image/*" id="image" type="file" onChange={handleImageChange} /> */}
      <TextField margin="normal" required fullWidth id="title"   value={offer.title} name="title" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="mission"  value={offer.mission} name="mission" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="profile"  value={offer.profile} name="profile" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="technicalSkills"  value={offer.technicalSkills} name="technicalSkills" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="interpersonalSkills"  value={offer.interpersonalSkills} name="interpersonalSkills" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="languages"  name="languages" value={offer.languages} onChange={handleChange} />
      <Button type="submit" onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} component={Link} to={`/company/ListeOffres`}>
      Modifier
      </Button>
      </Paper>
      </main>
      </Box>
     </div>  
  )
}