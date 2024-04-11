import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button, Select, MenuItem, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green, red } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    const [recruitmentSteps, setRecruitmentSteps] = useState([]);
    const [stepOptions, setStepOptions] = useState(["Présélection des CV","Entretien téléphonique","Entretien en personne","Offre d\'emploi","Présélection des CV1","Entretien téléphonique1","Entretien en personne1","Offre d\'emploi1","Présélection des CV2","Entretien téléphonique2","Entretien en personne2","Offre d\'emploi2","entretien1","entretien2","entretien1"]);

    const { idOffer } = useParams();
    useEffect(() => {
        const getProcessByIdOffre = (idOffer) => {
            axios.get(`http://localhost:3001/processoffre/${idOffer}`)
                .then((response) => {    
                    // Mettre à jour recruitmentSteps après avoir défini process
                    const newSteps = [];
                    if (response.data.length > 0) {
                        const stepsData = response.data[0];
                        if (stepsData.etape1 !== undefined) {
                            newSteps.push(stepsData.etape1);
                            
                        }
                        if (stepsData.etape2 !== undefined) {
                            newSteps.push(stepsData.etape2);
                        }
                        if (stepsData.etape3 !== undefined) {
                            newSteps.push(stepsData.etape3);
                        }
                        if (stepsData.etape4 !== undefined) {
                            newSteps.push(stepsData.etape4);
                        }if (stepsData.etape5 !== undefined) {
                            newSteps.push(stepsData.etape5);
                        }
                        if (stepsData.etape6 !== undefined) {
                            newSteps.push(stepsData.etape6);
                        }
                        if (stepsData.etape7 !== undefined) {
                            newSteps.push(stepsData.etape7);
                        }
                        if (stepsData.etape8 !== undefined) {
                            newSteps.push(stepsData.etape8);
                        }if (stepsData.etape9 !== undefined) {
                            newSteps.push(stepsData.etape9);
                        }if (stepsData.etape10 !== undefined) {
                            newSteps.push(stepsData.etape10);
                        }
                        // Ajoutez les autres étapes de la même manière
                    }
                    setRecruitmentSteps(newSteps);
                    console.log("recruitmentstep est ", newSteps);
                })
                .catch((error) => {
                    console.error('Error fetching offer:', error);
                });
        };
    
        getProcessByIdOffre(idOffer)
        
    }, [idOffer]);
    

    const theme = useTheme();

    const handleConfirmSteps = () => {
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
                                        <Select
                                            variant="outlined"
                                            value={step}
                                            onChange={(e) => handleStepChange(index, e.target.value)}
                                            style={{ width: "900px", marginTop: "8px", marginRight: "8px", marginBottom: "8px"}}
                                        >
                                            {stepOptions.map((option, optionIndex) => (
                                                <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
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
