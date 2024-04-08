import React from 'react';
import { useState } from 'react';
import { Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { Button, TextField, Box,Paper } from '@mui/material';
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
export default function Offres() {
    const [offer, setOffer] = useState({
        image: '',
        title: '',
        mission: '',
        profile: '',
        technicalSkills: '',
        interpersonalSkills: '',
        languages: ''
      });
    
      const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(offer);
        // Here you would typically send the offer data to your server
      };
      const handleImageChange = (e) => {
        setOffer({ ...offer, image: e.target.files[0] });
      };
    const theme = useTheme();
  return (
    <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>modifier offres</Typography>
            <input accept="image/*" id="image" type="file" onChange={handleImageChange} />
      <TextField margin="normal" required fullWidth id="title" label="Title" name="title" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="mission" label="Mission" name="mission" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="profile" label="Profil recherché" name="profile" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="technicalSkills" label="Compétences techniques" name="technicalSkills" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="interpersonalSkills" label="Compétences interpersonnelles" name="interpersonalSkills" onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="languages" label="Langues" name="languages" onChange={handleChange} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      Modifier
      </Button>
      </Paper>
      </main>
      </Box>
     </div>  
  )
}