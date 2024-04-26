import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Grid, Paper, Snackbar, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function CandidateProfile() {
    const [candidate, setProfile] = useState({
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
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const drawerWidth = 240;
    const candidatId = sessionStorage.getItem('candidatId');

    const themedStyles = (theme) => {
      return {
  
        content: {
          padding: 3,
          height: 'calc(100vh - 200px)', overflowY: 'auto',
          marginLeft: drawerWidth + 15,
        }
      }
    }
    useEffect(() => {
        if (!candidatId) {
            navigate("/signin/candidate");
            return;
        }

        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:3001/candidats/${candidatId}`);
                console.log("profile",response.data);
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile');
            }
        }

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    
      const dataToSend = {
        _id: candidate._id, 
        name: candidate.name,
        email: candidate.email,
        genre: candidate.genre,
        salaire: candidate.salaire,
        lieux: candidate.lieux,
        adresse: candidate.adresse,
        tele: candidate.tele,
        date: candidate.date ? new Date(candidate.date).toISOString().split('T')[0] : '',
        souhaite: candidate.souhaite,
        poste: candidate.poste,
        experience: candidate.experience,
        education: candidate.education,
        langues: candidate.langues,
        competencesTechniques: candidate.competencesTechniques,
        certificats: candidate.certificats,
      };
        try {
            const response = await axios.patch(`http://localhost:3001/candidats/${candidate._id}`, dataToSend);
            console.log('Profile updated:', response.data);
            setOpenSnackbar(true);
        } catch (err) {
            setError('Error updating profile');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
    
       
         
            <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
                    <Typography variant="h5" gutterBottom>Mon Profil</Typography>
                    <form onSubmit={handleSubmit}>
                 
                    <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                            <TextField margin="normal" required fullWidth id="name" label="Nom" name="name" value={candidate.name} onChange={handleChange} />
                <TextField margin="normal" required fullWidth id="email" label="Email" name="email" value={candidate.email} onChange={handleChange} />
               
                                <TextField margin="normal" fullWidth id="genre" label="Genre" name="genre" value={candidate.genre} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="salaire" label="Salaire" name="salaire" value={candidate.salaire} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="lieux" label="Lieux" name="lieux" value={candidate.lieux} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="adresse" label="Adresse" name="adresse" value={candidate.adresse} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="tele" label="Téléphone" name="tele" value={candidate.tele} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="date" label="Date" type="date" name="date" value={candidate.date || ''} onChange={handleChange} InputLabelProps={{shrink: true,}}/>

                            </Grid>
                            <Grid item xs={12} md={6}>

                                <TextField margin="normal" fullWidth id="souhaite" label="Souhaite" name="souhaite" value={candidate.souhaite} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="poste" label="Poste" name="poste" value={candidate.poste} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="experience" label="Expérience" name="experience" value={candidate.experience} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="education" label="Éducation" name="education" value={candidate.education} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="langues" label="Langues" name="langues" value={candidate.langues} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="competencesTechniques" label="Compétences Techniques" name="competencesTechniques" value={candidate.competencesTechniques} onChange={handleChange} />
                                <TextField margin="normal" fullWidth id="certificats" label="Certificats" name="certificats" value={candidate.certificats} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                            <Button type="submit" onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} component={Link} to={`/candidate/ListeOffres`}>
                            Enregistrer
                        </Button>
                                
                            </Grid>
                        </Grid>
                      </form>  
                      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Profile Updated Successfully!
                    </Alert>
                </Snackbar>
                        </Paper>
        </main>
      </Box>
    </div>
  );
};
    
 

export default CandidateProfile;
