import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button, TextField, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green, red } from '@mui/material/colors';

const drawerWidth = 240;

const themedStyles = (theme) => {
    return {
        content: {
            padding: 3,
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            marginLeft: drawerWidth + 15,
            marginTop: 95,
        },
        paper: {
            borderRadius: '16px',
            padding: '20px',
            backgroundColor: theme.palette.background.paper,
        },
        stepBox: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            '& svg': {
                marginRight: '10px',
            },
        },
        buttonContainer: {
            marginTop: '20px',
            textAlign: 'center',
        },
        addButton: {
            backgroundColor: green[500],
            color: '#fff',
            '&:hover': {
                backgroundColor: green[700],
            },
           
        },
        removeButton: {
            backgroundColor: red[500],
            color: '#fff',
            '&:hover': {
                backgroundColor: red[700],
            },
        },
    }
}

const RecruitmentProcessPage = () => {
    // Définir les étapes du processus de recrutement
    const [recruitmentSteps, setRecruitmentSteps] = useState([
        'Présélection des CV',
        'Entretien téléphonique',
        'Entretien en personne',
        'Offre d\'emploi'
    ]);

    const theme = useTheme();

    const handleConfirmSteps = () => {
        // Logique pour confirmer les étapes
        console.log("Étapes confirmées !");
    };

    const handleStepChange = (index, value) => {
        const newSteps = [...recruitmentSteps];
        newSteps[index] = value;
        setRecruitmentSteps(newSteps);
    };

    const handleAddStep = () => {
        setRecruitmentSteps([...recruitmentSteps, '']);
    };

    const handleRemoveStep = (index) => {
        const newSteps = [...recruitmentSteps];
        newSteps.splice(index, 1);
        setRecruitmentSteps(newSteps);
    };

    useEffect(() => {if(!sessionStorage.getItem('entrepriseId')){
        window.location.href="/signin/company";}})
    
    return (
        <div sx={{ backgroundColor: '#f0f2f5' }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={themedStyles(theme).paper}>
                        <Typography variant="h4" gutterBottom align="center" style={{margin:"10px"}}>Modifier Processus de Recrutement</Typography>
                        <Grid container spacing={2}>
                            {recruitmentSteps.map((step, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box sx={themedStyles(theme).stepBox}>
                                        <Typography variant="h6" sx={{ marginRight: '10px' }}>{index + 1}.</Typography>
                                        <CheckCircleOutlineIcon sx={{ color: green[500] }} />
                                        <TextField
                                            variant="outlined"
                                            value={step}
                                            onChange={(e) => handleStepChange(index, e.target.value)}
                                            style={{ width: "900px", marginTop: "8px", marginRight: "8px", marginBottom: "8px"}}
                                        />
                                        <IconButton onClick={() => handleRemoveStep(index)} sx={themedStyles(theme).removeButton}>
                                            <DeleteIcon style={{marginLeft:"12px"}}/>
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={themedStyles(theme).buttonContainer}>
                            <Button onClick={handleAddStep} variant="contained" color="primary" startIcon={<AddIcon />} sx={themedStyles(theme).addButton} style={{margin:"10px"}}>Ajouter une étape</Button>
                            <Button href="/company/RecruitmentProcessCandidate" variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={handleConfirmSteps}>Conforme Modification</Button>
                        </Box>
                    </Paper>
                </main>
            </Box>
        </div>
    );
};

export default RecruitmentProcessPage;
