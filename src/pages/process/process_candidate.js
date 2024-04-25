import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const themedStyles = (theme) => {
    return {
        content: {
            padding: 3,
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            marginLeft: drawerWidth + 15,
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
    }
}

const RecruitmentProcessPage = () => {
    const recruitmentSteps = [
        'Présélection des CV',
        'Entretien téléphonique',
        'Entretien en personne',
        'Offre d\'emploi'
    ];

    const theme = useTheme();

    const handleConfirmSteps = () => {
        console.log("Étapes confirmées !");
    };

    useEffect(() => {if(!sessionStorage.getItem('entrepriseId')){
        window.location.href="/signin/company";}})
    

    return (
        <div sx={{ backgroundColor: '#f0f2f5' }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={themedStyles(theme).paper}>
                        <Typography variant="h5" gutterBottom>Processus de Recrutement</Typography>
                  
                        <Typography variant="h5" gutterBottom>Offre 1:Candidat 1</Typography>      <Grid container spacing={2}>
                            {recruitmentSteps.map((step, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box sx={themedStyles(theme).stepBox}>
                                        <Typography variant="h6" sx={{ marginRight: '10px' }}>{index + 1}.</Typography>
                                        <CheckCircleOutlineIcon sx={{ color: green[500] }} />
                                        <Typography variant="body1">{step}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={themedStyles(theme).buttonContainer}>
    <Link to="/company/Standard_Process" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={handleConfirmSteps}>
            Lancer le Processus
        </Button>
    </Link>
    <Link to="/company/EditProcessCandidate" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={handleConfirmSteps}>
        Modifier les Étapes
        </Button>
    </Link>
    
</Box>

                    </Paper>
                </main>
            </Box>
        </div>
    );
};

export default RecruitmentProcessPage;
