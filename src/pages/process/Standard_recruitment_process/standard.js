import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material/styles";

import { Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const RecruitmentProcessPage = () => {
    const recruitmentSteps = [
        ['Présélection des CV', 'Entretien téléphonique', 'Entretien en personne', 'Offre d\'emploi'],
        ['Présélection des CV2', 'Entretien téléphonique2', 'Entretien en personne2', 'Offre d\'emploi2', 'Offre d\'emploi2'],
        ['Présélection des CV3', 'Entretien téléphonique3', 'Entretien en personne3', 'Offre d\'emploi3']
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = recruitmentSteps.length;

    const handleChange = (e) => {
        // handle your input changes
    };

    const handleFileChange = (event) => {
        // handle file input changes
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep < totalSteps - 1 ? prevStep + 1 : prevStep);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep > 0 ? prevStep - 1 : prevStep);
    };
    useEffect(() => {if(!sessionStorage.getItem('entrepriseId')){
        window.location.href="/signin/company";}})
    
    const theme = useTheme();

    return (
        <div style={{ backgroundColor: '#ced4da', padding: '20px' }}>
            <Box>
                <main style={{ padding: '10px' }}>
                    <Paper elevation={3} style={{ borderRadius: '16px', padding: '20px', maxWidth: '600px', margin: 'auto',marginTop:'96' }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>
                            Etape {currentStep + 1}: {recruitmentSteps[currentStep][0]}
                        </Typography>

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
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button disabled={currentStep === 0} onClick={handlePreviousStep}>
                                Étape précédente
                            </Button>
                            <Button disabled={currentStep === totalSteps - 1} onClick={handleNextStep}>
                                Étape suivante
                            </Button>
                        </Box>

                        <Button component={Link} to="" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} color="success">
                            Valideur
                        </Button>

                        <Button fullWidth variant="outlined" color="error">
                            Annuler
                        </Button>
                    </Paper>
                </main>
            </Box>
        </div>
    )
}

export default RecruitmentProcessPage;
