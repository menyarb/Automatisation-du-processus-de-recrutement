import React, { useState } from 'react';
import { Typography, Button, TextField, Box,Grid,Paper} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTheme } from "@mui/material/styles";
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';
const AddCandidateForm = ({ handleAddCandidate }) => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    naissance: '',
    genre: '',
    salaire: '',
    lieux: '',
    adresse: '',
    tele: '',
    Date: '',
    souhaite: '',
    Poste: '',
    experience: '',
    education: '',
    langues: '',
    competencestechniques: '',
    competencesinterprsonnelles:'',
    Certificats:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate(prevCandidate => ({
      ...prevCandidate,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCandidate(candidate);
    setCandidate({
      name: '',
      email: '',
      naissance: '',
      genre: '',
      salaire: '',
      lieux: '',
      adresse: '',
      tele: '',
      Date: '',
      souhaite: '',
      Poste: '',
      experience: '',
      education: '',
      langues: '',
      competencestechniques: '',
      competencesinterprsonnelles:'',
      Certificats:'',
    });
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

    <div sx={{backgroundColor: '#ced4da', }}>
       <MenuNavbarAddCandidat />
    <Box p="20px">
         <main style={{ ...themedStyles(theme).content }}>
         <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
         <Typography variant="h5" gutterBottom>Mon Profil</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>

        <TextField margin="normal" required fullWidth id="name" label="Nom" name="name" value={candidate.name} onChange={handleChange} />
      <TextField margin="normal" required fullWidth id="email" label="Email" name="email" value={candidate.email} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="naissance" label="Date de naissance" name="naissance" value={candidate.naissance} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="genre" label="Genre" name="genre" value={candidate.genre} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="salaire" label="Salaire" name="salaire" value={candidate.salaire} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="lieux" label="Lieux" name="lieux" value={candidate.lieux} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="adresse" label="Adresse" name="adresse" value={candidate.adresse} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="tele" label="Téléphone" name="tele" value={candidate.tele} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
       
      <TextField margin="normal" fullWidth id="" type='date' label="" name="" value={candidate.Date} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="souhaite" label="Souhaite" name="souhaite" value={candidate.souhaite} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="Poste" label="Poste" name="Poste" value={candidate.Poste} onChange={handleChange} />

      <TextField margin="normal" fullWidth id="experience" label="Expérience" name="experience" value={candidate.experience} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="education" label="Éducation" name="education" value={candidate.education} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="langues" label="Langues" name="langues" value={candidate.langues} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="competences" label="Compétences" name="competences" value={candidate.competencestechniques} onChange={handleChange} />
       
      <TextField margin="normal" fullWidth id="competencesinterprsonnelles" label="competencesinterprsonnelles" name="competencesinterprsonnelles" value={candidate.competencesinterprsonnelles} onChange={handleChange} />
      <TextField margin="normal" fullWidth id="Certificats" label="Certificats" name="Certificats" value={candidate.Certificats} onChange={handleChange} />
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

<input
    accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
    id="file"
    type="file"
    onChange={handleChange}
    style={{ display: 'none' }} 
/>
<label htmlFor="file"  >
    <Button  sx={{ marginTop: '50px' }}  variant="contained" component="span"  startIcon={<CloudUploadIcon />} >
        Importer un fichier
    </Button>
</label>
</Box>
        </Grid>
      </Grid>

<Button type="submit" onClick={handleSubmit} variant="contained" sx={{ mt: 3, mb: 2 }}>Enregistrer</Button>

      </Paper>
      </main>
    </Box>
    </div>
  );
};



export default AddCandidateForm;
