import React, { useState,useEffect }  from 'react';
import { useTheme } from "@mui/material/styles";
// import { Button, TextField, Box, Typography, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';import { Button, TextField, Box, Typography, Paper, Select, MenuItem, FormControlLabel, Checkbox ,FormGroup} from '@mui/material';

const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
        content: {
            padding: 3,
            height: 'calc(100vh - 200px )', overflowY: 'auto',
            marginLeft: drawerWidth + 15,
            marginTop: 95,
        }
    }
}
export default function Product() {
    const navigate = useNavigate();
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
        type: '',
        entrepriseId: sessionStorage.getItem('entrepriseId'),

    });

    const contracts = [
      { value: 'CIVP', label: 'CIVP' },
      { value: 'CDD', label: 'CDD' },
  ];
    const qualifications = [
      { value: 'Qualification', label: 'Qualification' },
      { value: 'Bac', label: 'Bac' },
      { value: 'Bac+2', label: 'Bac+2' },
      { value: 'Bac+3', label: 'Bac+3' },
      { value: 'Bac+4', label: 'Bac+4' },
      { value: 'Bac+5', label: 'Bac+5' },
  ];
    const jobTypes = [
      
      { value: 'Type de travail', label: 'Type de travail' },
        { value: 'Temps plein', label: 'Temps plein' },
        { value: 'Temps partiel', label: 'Temps partiel' },
        { value: 'Freelance', label: 'Freelance' },
        { value: 'Stage', label: 'Stage' },
        { value: 'CDD', label: 'CDD' },
        { value: 'CDI', label: 'CDI' },
    ];

    const locations = [
        { value: 'Paris', label: 'Paris' },
        { value: 'Lyon', label: 'Lyon' },
        { value: 'Marseille', label: 'Marseille' },
        { value: 'Toulouse', label: 'Toulouse' },
    ];

    const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value });
    };
const h5Elements = document.querySelectorAll('h5');
h5Elements.forEach((element) => {
  element.style.fontSize = '14px';
  element.style.color = '#333';
  element.style.margin="2px";

});

  const addOffer = () => {
    axios.post('http://localhost:3001/offres', offer)
        .then(response => {
            console.log('Offre ajoutée avec succès :', response.data);
            const addedOffer = response.data;
            navigate(`/company/RecruitmentProcess/${addedOffer._id}`);
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'offre :', error);
        });

};


const [setImagePreview] = useState('');

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
};
useEffect(() => {if(!sessionStorage.getItem('entrepriseId')){
    window.location.href="/signin/company";}})

    const theme = useTheme();
    return (
        <div sx={{ backgroundColor: '#ced4da', }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>Ajouter Offres</Typography>
                        
                        <Select
    value={offer.type}
    onChange={(e) => setOffer({ ...offer, type: e.target.value })}
    fullWidth
    displayEmpty
    inputProps={{ 'aria-label': 'Without label' }}
    sx={{ mt: 3, mb: 2 }}
>
    <MenuItem value="" disabled>
        Sélectionnez le type d'emploi
    </MenuItem>
    <MenuItem value="Technique">Technique</MenuItem>
    <MenuItem value="Communication">Communication</MenuItem>
    <MenuItem value="Emplacement">Emplacement</MenuItem>
</Select>
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
                        
                      

                        <Button fullWidth variant="contained" onClick={addOffer} sx={{ mt: 3, mb: 2 }}>
            Ajouter Offre
        </Button>
                    </Paper>
                </main>
            </Box>
        </div>
    )

}
