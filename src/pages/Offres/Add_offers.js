import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
// import { Button, TextField, Box, Typography, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper, Select, MenuItem, FormControlLabel, Checkbox ,FormGroup} from '@mui/material';

// Dans votre composant React
const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
        content: {
            padding: 3,
            height: 'calc(100vh - 200px )', overflowY: 'auto',
            marginLeft: drawerWidth + 15,
        }
    }
}
export default function Product() {
    const [offer, setOffer] = useState({
        image: '',
        title: '',
        mission: '',
        profile: '',
        technicalSkills: '',
        interpersonalSkills: '',
        languages: '',
        Experience: '',
        jobType: 'Type de travail',
        Salaire: '',
        Emplacement: 'Paris',
        Qualification: 'Qualification',
        Contrat: '',
        Exigence: []

    });

    const contracts = [
      { value: 'CIVP', label: 'CIVP' },
      { value: 'CDD', label: 'CDD' },
      // Ajoutez d'autres types de contrat au besoin
  ];
    const qualifications = [
      { value: 'Qualification', label: 'Qualification' },
      { value: 'Bac', label: 'Bac' },
      { value: 'Bac+2', label: 'Bac+2' },
      { value: 'Bac+3', label: 'Bac+3' },
      { value: 'Bac+4', label: 'Bac+4' },
      { value: 'Bac+5', label: 'Bac+5' },
      // Ajoutez d'autres qualifications au besoin
  ];
    const jobTypes = [
      
      { value: 'Type de travail', label: 'Type de travail' },
        { value: 'Temps plein', label: 'Temps plein' },
        { value: 'Temps partiel', label: 'Temps partiel' },
        { value: 'Freelance', label: 'Freelance' },
        { value: 'Stage', label: 'Stage' },
        { value: 'CDD', label: 'CDD' },
        { value: 'CDI', label: 'CDI' },
        // Ajoutez d'autres types d'emploi au besoin
    ];

    const locations = [
        { value: 'Paris', label: 'Paris' },
        { value: 'Lyon', label: 'Lyon' },
        { value: 'Marseille', label: 'Marseille' },
        { value: 'Toulouse', label: 'Toulouse' },
        // Ajoutez d'autres emplacements au besoin
    ];

    const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setOffer({ ...offer, image: e.target.files[0].name });
    };
    const Exigence = [
      { value: 'Technique', label: 'Technique' },
      { value: 'commerciale', label: 'commerciale' },
      { value: 'Emplacement', label: 'Emplacement' },
      { value: 'commerciale', label: 'commerciale' },
  ];

  const addOffer = () => {
    axios.post('http://localhost:3001/offres', offer)
        .then(response => {
            console.log('Offre ajoutée avec succès :', response.data);
            // Réinitialiser le formulaire après l'ajout de l'offre
            setOffer({
                image: '',
                title: '',
                mission: '',
                profile: '',
                technicalSkills: '',
                interpersonalSkills: '',
                languages: '',
                Experience: '',
                jobType: 'Type de travail',
                Salaire: '',
                Emplacement: 'Paris',
                Qualification: 'Qualification',
                Contrat: ''
            });
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'offre :', error);
        });

};

  
  const handleExigenceChange = (value) => {
    const isExigenceSelected = offer.Exigence.includes(value);
    let updatedExigence;
    if (isExigenceSelected) {
        updatedExigence = offer.Exigence.filter(exigence => exigence !== value);
    } else {
        updatedExigence = [...offer.Exigence, value];
    }
    setOffer({ ...offer, Exigence: updatedExigence });
};
//modifer style de h5
const h5Elements = document.querySelectorAll('h5');

// Parcourir tous les éléments h5 et appliquer les modifications
h5Elements.forEach((element) => {
  // Modifier le style de chaque élément h5
  element.style.fontSize = '14px';
 
  element.style.color = '#333';
  element.style.margin="2px";
  // Autres modifications de style si nécessaire
});

    const theme = useTheme();
    return (
        <div sx={{ backgroundColor: '#ced4da', }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>Ajouter Offres</Typography>
                        
                        <input accept="image/*" id="image" type="file" onChange={handleImageChange} />
                        {offer.image && (
                            <Box sx={{ mt: 1 }}>
                                <img src={URL.createObjectURL(offer.image)} alt="uploaded" style={{ maxWidth: '500px', height: '500px' }} />
                            </Box>
                        )}
                        <h5 htmlFor="title">Title de Poste :</h5>
                        <TextField margin="normal" required fullWidth id="title" label="Title" name="title" onChange={handleChange} />
                        <h5 htmlFor="mission" >Mission :</h5>
                        <TextField margin="normal" required fullWidth id="mission" label="Mission" name="mission" onChange={handleChange} />
                        <h5 htmlFor="mission" >profile Demende :</h5>
                        <TextField margin="normal" required fullWidth id="profile" label="Profil recherché" name="profile" onChange={handleChange} />
                        <h5 htmlFor="mission" >Experience:</h5>
                        <TextField margin="normal" required fullWidth id="Experience" label="Experience" name="Experience" onChange={handleChange} />
                        <h5 htmlFor="mission" >Compétences techniques :</h5>
                        <TextField margin="normal" required fullWidth id="technicalSkills" label="Compétences techniques" name="technicalSkills" onChange={handleChange} />
                        <h5 htmlFor="mission" >Compétences interpersonnelles :</h5>
                        <TextField margin="normal" required fullWidth id="interpersonalSkills" label="Compétences interpersonnelles" name="interpersonalSkills" onChange={handleChange} />
                        <h5 htmlFor="mission" >languages :</h5>
                        <TextField margin="normal" required fullWidth id="languages" label="Langues" name="languages" onChange={handleChange} />
                        <h5 htmlFor="mission" >Salaire :</h5>
                        <TextField margin="normal" required fullWidth id="Salaire" label="Salaire" name="Salaire" onChange={handleChange} />

                        <h5 htmlFor="mission" >Type de travail :</h5>
                        <Select
                            value={offer.jobType}
                            onChange={(e) => setOffer({ ...offer, jobType: e.target.value })}
                            fullWidth
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {jobTypes.map((type, index) => (
                                <MenuItem key={index} value={type.value}>{type.label}</MenuItem>
                            ))}
                        </Select>
                        <h5 htmlFor="mission" >Emplacement :</h5>
                        <Select
                            value={offer.Emplacement}
                            onChange={(e) => setOffer({ ...offer, Emplacement: e.target.value })}
                            fullWidth
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {locations.map((location, index) => (
                                <MenuItem key={index} value={location.value}>{location.label}</MenuItem>
                            ))}
                        </Select>
                        <h5 htmlFor="mission" >Qualification :</h5>
                        <Select
                            value={offer.Qualification}
                            onChange={(e) => setOffer({ ...offer, Qualification: e.target.value })}
                            fullWidth
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {qualifications.map((qualification, index) => (
                                <MenuItem key={index} value={qualification.value}>{qualification.label}</MenuItem>
                            ))}
                        </Select>
                        <h5 htmlFor="mission" >  Exigence d'emploi :</h5>
                        <FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Technique" />
  <FormControlLabel  control={<Checkbox />} label="commerciale" />
  <FormControlLabel  control={<Checkbox />} label="Emplacement" />
</FormGroup>
                      

                        <Button component={Link} to="/company/ListeOffres" fullWidth variant="contained" onClick={addOffer} sx={{ mt: 3, mb: 2 }}>
            Ajouter Offre
        </Button>
                    </Paper>
                </main>
            </Box>
        </div>
    )

}
