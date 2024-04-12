import React, { useState } from 'react';
import { Typography, Button, TextField, Box, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from 'axios';
import { Link } from 'react-router-dom';
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';
const AddCandidateForm = ({ handleAddCandidate }) => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    genre: '',
    salaire: '',
    lieux: '',
    adresse: '',
    tele: '',
    date: '',
    souhaite: '',
    poste: '',
    experience: '',
    education: '',
    langues: '',
    competencesTechniques: '',
    
    certificats: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate(prevCandidate => ({
      ...prevCandidate,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/candidats', candidate);
      console.log('Réponse du serveur:', response.data);
      // Réinitialiser le formulaire après l'envoi des données
      setCandidate({
        name: '',
        email: '',
        genre: '',
        salaire: '',
        lieux: '',
        adresse: '',
        tele: '',
        date: '',
        souhaite: '',
        poste: '',
        experience: '',
        education: '',
        langues: '',
        competencesTechniques: '',
        certificats: '',

      });
      // Ajoutez ici un message de succès ou redirigez l'utilisateur vers une autre page si nécessaire
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données au serveur:', error);
      // Ajoutez ici une gestion des erreurs appropriée
    }
  };

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
  const theme = useTheme();
  return (

    <div sx={{ backgroundColor: '#ced4da', }}>
      <MenuNavbarAddCandidat />
      <Box p="20px">
        <main style={{ ...themedStyles(theme).content }}>
          <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>Mon Profil</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField margin="normal" required fullWidth id="name" label="Nom" name="name" value={candidate.name} onChange={handleChange} />
                <TextField margin="normal" required fullWidth id="email" label="Email" name="email" value={candidate.email} onChange={handleChange} />
                {/* <TextField margin="normal" fullWidth id="naissance" label="Date de naissance" name="naissance" value={candidate.naissance} onChange={handleChange} /> */}
                <TextField margin="normal" fullWidth id="genre" label="Genre" name="genre" value={candidate.genre} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="salaire" label="Salaire" name="salaire" value={candidate.salaire} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="lieux" label="Lieux" name="lieux" value={candidate.lieux} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="adresse" label="Adresse" name="adresse" value={candidate.adresse} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="tele" label="Téléphone" name="tele" value={candidate.tele} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>

                <TextField margin="normal" fullWidth id="date" type='date' label="date" name="date" value={candidate.date} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="souhaite" label="Souhaite" name="souhaite" value={candidate.souhaite} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="poste" label="poste" name="poste" value={candidate.poste} onChange={handleChange} />

                <TextField margin="normal" fullWidth id="experience" label="Expérience" name="experience" value={candidate.experience} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="education" label="Éducation" name="education" value={candidate.education} onChange={handleChange} />
                <TextField margin="normal" fullWidth id="langues" label="Langues" name="langues" value={candidate.langues} onChange={handleChange} />
                {/* <TextField margin="normal" fullWidth id="competences" label="Compétences" name="competences" value={candidate.competencesTechniques} onChange={handleChange} /> */}

                <TextField margin="normal" fullWidth id="competences" label="competences" name="competencesTechniques" value={candidate.competencesTechniques} onChange={handleChange} />
                {/* <TextField margin="normal" fullWidth id="competencesinterprsonnelles" label="competencesinterprsonnelles" name="competencesinterprsonnelles" value={candidate.competencesinterprsonnelles} onChange={handleChange} /> */}
                <TextField margin="normal" fullWidth id="certificats" label="certificats" name="certificats" value={candidate.certificats} onChange={handleChange} />
              </Grid>
            </Grid>

            <Button component={Link} to="/candidate/ListeOffres" fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 3, mb: 2 }}>
              Enregistrer
            </Button>


          </Paper>
        </main>
      </Box>
    </div>
  );
};



export default AddCandidateForm;
