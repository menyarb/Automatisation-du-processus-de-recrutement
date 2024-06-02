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
        ['Entretiens RH', 'Test comportemental ', 'Entretiens en personne (vidéo)'],
        ['Entretiens RH', 'Test technique :niveaux 1', 'Entretiens en personne (vidéo)'],
        ['Entretiens RH', 'Évaluation des compétences comportementales', "Entretiens finaux avec des membres de l'équipe de direction", 'Vérification des références'],
        ['Préparation du test technique :niveaux 2', 'Préparation du test technique :niveaux 3', 'Entretiens en personne (vidéo)'],
        ['Entretiens en personne (vidéo)', 'Évaluation des compétences comportementales', 'test technique :niveaux 1'],
        ['Entretiens en personne (vidéo)', 'Évaluation des compétences comportementales', 'Préparation du test technique :niveaux 2','test technique :niveaux 3 (difficile)'],


    ];
    const [prediction, setprediction] = useState();

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
    const processPrediction = async () => {
        const tempsTravail = ['Temps plein', 'Temps partiel', 'Saisonnier', 'Freelance / Indépendant'];
        const tempsTravailEncodée=[3, 2, 1, 0];
        const domaine=['Emploi Pharmaceutiques', 'Emploi Banque', 'Emploi Mécanique','Emploi Assurances', 'Emploi Immobilier', 'Emploi Electronique','Emploi Textile', 'Emploi Construction', 'Emploi Sante','Emploi Automobile', 'Emploi Ressources humaines','Emploi Consulting', 'Emploi Hôtellerie et Tourisme','Emploi Administration', 'Emploi Gestion', 'Emploi Design','Emploi Comptabilité', 'Emploi Finance', 'Emploi Vente','Emploi Télécommunications', 'Emploi Marketing', 'Emploi Commerce','Emploi Industrie', "Emploi Technologie de l'information",'Emploi Ingénierie', "Emploi Centres d'appels",'Emploi Informatique']
        const domaineEncodée=[20,  3, 19,  1, 14, 10, 24,  7, 22,  2, 21,  8, 13,  0, 12,  9,  6,11, 26, 25, 18,  5, 15, 23, 17,  4, 16]
        const Emplacement=['Tunis', 'Mahdia', 'Gafsa', 'Bizerte', 'Zaghouan', 'Sfax','France', 'Sousse', 'Cameroun', 'Lybie', 'Canada', 'Null','Monastir', 'Congo', 'Kairouan', 'Kasserine', 'Nabeul','Switzerland', 'Jordanie', 'Angleterre', 'Moknine', 'Qatar','Allemagne', 'Afrique subsaharienne', 'Kelibia', 'Siliana','KORBA', 'Sénégal', 'Syrie', 'Burkina Faso', 'khartoum', 'Djerba','Belgique', 'Libya']
        const EmplacementEncodée=[31, 19, 11,  4, 32, 25, 10, 27,  6, 18,  7, 23, 21,  8, 14, 15, 22,28, 12,  2, 20, 24,  1,  0, 16, 26, 13, 30, 29,  5, 33,  9,  3, 17]
        const etude=['Bac + 3', 'Bac + 5', 'Bac', 'Bac + 2', 'Bac + 4','Etudiant']
        const etudeEncodée=[2, 4, 0, 1, 3, 6]
        const genre=['Indifférent', 'Masculin', 'Féminin']
        const genreEncodée=[1, 2, 0]
        const data=[{
            "technical skills":offer.technicalSkills ? 1:0,
            "Soft Skills": offer.interpersonalSkills ? 1:0,
            "job time": tempsTravailEncodée[tempsTravail.indexOf(offer.TempsTravail)] ,
            "domaine": domaineEncodée[domaine.indexOf(offer.domaine)] ,
            "localisation":EmplacementEncodée[Emplacement.indexOf(offer.Emplacement)] ,
            "experience": offer.Experience ? 1:0,
            "niveau d'étude": etudeEncodée[etude.indexOf(offer.Qualification)],
            "Langue": offer.languages ? 1:0,
            "genre": genreEncodée[genre.indexOf(offer.genre)] ,
        }]
        console.log("ia data",data);
        try {
        const response = await axios.post('http://127.0.0.1:5000/predict', data);
        console.log('la prediction est ', response.data[0]);
        setprediction(response.data[0])}
        catch{}
    }

    useEffect(() => {
        if (idOffer) {
            getOfferById(idOffer);
        }
    }, [idOffer]);

    useEffect(() => {
        processPrediction();
        if (prediction === "B") {
            setRecruitmentStep(recruitmentSteps[0]);
        } else if (prediction === "C") {
            setRecruitmentStep(recruitmentSteps[1]);
        } else if (prediction === "D") {
            setRecruitmentStep(recruitmentSteps[2]);
        }else if (prediction === "E") {
            setRecruitmentStep(recruitmentSteps[3]);
        }else if (prediction === "F") {
            setRecruitmentStep(recruitmentSteps[4]);
        }else if (prediction === "G") {
            setRecruitmentStep(recruitmentSteps[5]);
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
