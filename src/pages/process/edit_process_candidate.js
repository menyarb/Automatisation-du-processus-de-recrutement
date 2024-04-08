import React from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { green, blue } from '@mui/material/colors';

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
    // Définir les étapes du processus de recrutement
    const recruitmentSteps = [
        'Présélection des CV',
        'Entretien téléphonique',
        'Entretien en personne',
        'Offre d\'emploi'
    ];

    const theme = useTheme();

    const handleConfirmSteps = () => {
        // Logique pour confirmer les étapes
        console.log("Étapes confirmées !");
    };

    const handleEditSteps = () => {
        // Logique pour modifier les étapes
        console.log("Modification des étapes...");
    };

    return (
        <div sx={{ backgroundColor: '#f0f2f5' }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={themedStyles(theme).paper}>
                        <Typography variant="h5" gutterBottom align="center">Modifier Processus de Recrutement</Typography>
                        <h3 variant="h5" gutterBottom>Offre 1:Candidat 1</h3>   
                           <Grid container spacing={2}>
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
                            <Button href="/company/RecruitmentProcessCandidate" variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />} onClick={handleConfirmSteps}>Conforme Modification</Button>

                        </Box>
                    </Paper>
                </main>
            </Box>
        </div>
    );
};

export default RecruitmentProcessPage;
