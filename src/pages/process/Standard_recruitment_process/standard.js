import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper,} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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




    const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value });
    };
//modifer style de h5
const h5Elements = document.querySelectorAll('h5');
h5Elements.forEach((element) => {
  element.style.fontSize = '14px';
  element.style.color = '#333';
  element.style.margin="2px";

});



    const handleFileChange = (event) => {
        // Votre logique pour gérer le changement de fichier ici
    };

 

    const theme = useTheme();
    return (
        <div sx={{ backgroundColor: '#ced4da', }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>Etape1: Informations Generales</Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

    <input
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        id="file"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }} 
    />
    <label htmlFor="file"  >
        <Button  sx={{ marginTop: '50px' }}  variant="contained" component="span"  startIcon={<CloudUploadIcon />} >
            Importer un fichier
        </Button>
    </label>
</Box>
                        <TextField
    sx={{ marginTop: '20px' }} 
    margin="normal"
    fullWidth
    id="comment"
    label="Commentaire"
    name="comment"
    multiline
    rows={5} // Nombre de lignes
    variant="outlined"
    onChange={handleChange} // Assurez-vous de définir la fonction handleChange pour gérer les changements dans le champ de commentaire
/>
<TextField
    id="note"
    label="Note"
    multiline
    rows={1}
    variant="outlined"
    fullWidth
    margin="normal"
   // onChange={} // Assurez-vous de définir la fonction setNote pour mettre à jour la valeur de la note
/>


 <Button component={Link} to="" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} color="success">
            Valideur
        </Button>
        <Button
    fullWidth
    variant="outlined"
    color="error" 
  //  onClick={cancelProcess} // Assurez-vous de définir la fonction cancelProcess pour gérer l'annulation du processus
>
    Annuler
</Button>
                    </Paper>
                </main>
            </Box>
        </div>
    )

}
