import { Link } from 'react-router-dom';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { green } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
    }
}

const RecruitmentProcessPage = () => {
    const recruitmentSteps = [
        ['Présélection des CV', 'Entretien téléphonique', 'Entretien en personne', 'Offre d\'emploi'],
        ['Présélection des CV2', 'Entretien téléphonique2', 'Entretien en personne2', 'Offre d\'emploi2', 'Offre d\'emploi2'],
        ['Présélection des CV3', 'Entretien téléphonique3', 'Entretien en personne3', 'Offre d\'emploi3']
    ];

    const [redirect, setRedirect] = useState(false);
    const [process1, setProcess1] = useState({});
    const [recruitmentStep, setRecruitmentStep] = useState([]);
    const [offer, setOffer] = useState({});
    const [loading, setLoading] = useState(false);
    const { idOffer } = useParams();

    const theme = useTheme();

    const getOfferById = async (idOffer) => {
        try {
            const response = await axios.get(`http://localhost:3001/offres/${idOffer}`);
            console.log(response.data);
            setOffer(response.data);
        } catch (error) {
            console.error('Error fetching offer:', error);
        }
    };

    const addProcessOffre = async (idOffre) => {
        try {
            setLoading(true);

            const processOffreData = {
                idOffre: idOffre,
            };

            for (let i = 0; i < recruitmentStep.length; i++) {
                processOffreData['etape' + (i + 1)] = recruitmentStep[i];
            }

            const response = await axios.post('http://localhost:3001/processOffre', processOffreData);
            console.log('Processus ajouté avec succès:', response.data);
            setProcess1(response.data);
            console.log("Process ID est:", response.data._id);

            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du processus:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idOffer) {
            getOfferById(idOffer);
        }
    }, [idOffer]);

    useEffect(() => {
        if (offer.type === "Technique") {
            setRecruitmentStep(recruitmentSteps[0]);
        } else if (offer.type === "Communication") {
            setRecruitmentStep(recruitmentSteps[1]);
        } else if (offer.type === "Emplacement") {
            setRecruitmentStep(recruitmentSteps[2]);
        }
    }, [offer]);

    useEffect(() => {
        if (loading === false && process1._id !== undefined) {
            console.log("Process ID mis à jour:", process1._id);

        }
    }, [process1, loading]);
    useEffect(() => {
        if (!sessionStorage.getItem('entrepriseId')) {
            window.location.href = "/signin/company";
        }
    })

    const handleConfirmSteps = () => {
        console.log("Étapes confirmées !");
        addProcessOffre(offer._id);
        window.location.href = `/company/listeoffres`;

    };
    useEffect(() => {
        if (redirect && process1._id) {
            console.log("Redirection en cours...");
            window.location.href = `/company/EditProcess/${process1._id}/${process1.idOffre}`;
        }
    }, [process1._id, redirect]);
    const handleEditSteps = () => {
        setRedirect(true);
        console.log("Modification des étapes...");
        addProcessOffre(offer._id);

        console.log('id process est ', process1._id);
    };
    useEffect(() => {
        if (!sessionStorage.getItem('entrepriseId')) {
            window.location.href = "/signin/company";
        }
    })

    return (
        <div sx={{ backgroundColor: '#f0f2f5' }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={themedStyles(theme).paper}>
                        <Typography variant="h5" gutterBottom>Processus de Recrutement</Typography>
                        <Grid container spacing={2}>
                            {recruitmentStep.map((step, index) => (
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



                            <Button variant="contained" color="primary" onClick={handleConfirmSteps} disabled={loading} startIcon={<CheckCircleOutlineIcon />}>
                                Enregistrer
                            </Button>

                            <Button variant="contained" color="info" startIcon={<EditIcon />} onClick={handleEditSteps} disabled={loading} sx={{ marginLeft: '10px' }}>Modifier les Étapes</Button>
                        </Box>
                    </Paper>
                </main>
            </Box>
        </div>
    );
};

export default RecruitmentProcessPage;
