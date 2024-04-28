import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const getOfferById = (offreId, setOffer) => {
    axios.get(`http://localhost:3001/offres/${offreId}`)
        .then((response) => {
            setOffer(response.data);
        })
        .catch((error) => {
            console.error('Error fetching offer:', error);
        });
}



const RecruitmentProcessPage = () => {
    const [recruitmentSteps, setRecruitmentSteps] = useState([]);
    const { idOffer } = useParams();
    const { idCandidat } = useParams();
    const [offer, setOffer] = useState({});
    console.log(idCandidat);
    const [process, setProcess] = useState({});
    useEffect(() => {
        getOfferById(idOffer, setOffer);
    }, [idOffer]);
    useEffect(() => {
        getProcessByOfferAndCandidateIds(idOffer, idCandidat, setProcess);
    }, [idOffer, idCandidat]);
    // const recruitmentSteps = [
    //     ['Présélection des CV', 'Entretien téléphonique', 'Entretien en personne', 'Offre d\'emploi'],
    // ];
    const getProcessByOfferAndCandidateIds = (offreId, candidatId, setProcess) => {
        axios.get(`http://localhost:3001/processCandidat/${offreId}/${candidatId}`)
            .then((response) => {
                const processSteps = [];
                if (response.data) {
                    setProcess(response.data);
                    Object.keys(response.data).forEach((key) => {
                        if (key.startsWith('etape') && response.data[key] !== undefined) {
                            processSteps.push(response.data[key]);
                        }
                    });
                }
                setRecruitmentSteps(processSteps);
                setCurrentStep(response.data.step);
                console.log("new steps", processSteps);
            })
            .catch((error) => {
                console.error('Error fetching process:', error);
            });
    }
    const [currentStep, setCurrentStep] = useState(process.step || 0);
    const totalSteps = recruitmentSteps.length;

    const handleChange = (e) => {
        // handle your input changes
    };

    const handleFileChange = (event) => {
        // handle file input changes
    };

    const handleNextStep = () => {

        const nextStep = currentStep < totalSteps ? currentStep + 1 : currentStep;
        setCurrentStep(nextStep);

        process[`etat${currentStep}`] = 1;
        process.step = nextStep;
        // console.log("process step", process);


        // updateProcessCandidat(process);
    };

    const handleValidate = () => {
        process[`etat${currentStep}`] = 1;

        // console.log("process step", process);


        updateProcessCandidat(process);
    };


    const handlePreviousStep = () => {
        const previousStep = currentStep > 0 ? currentStep - 1 : currentStep;

        setCurrentStep(previousStep);

        process[`etat${currentStep}`] = 0;
        process[`etat${previousStep}`] = 0;
        process.step = previousStep;
        // console.log("process step", process);
        //updateProcessCandidat(process);
    };
    useEffect(() => {
        if (!sessionStorage.getItem('entrepriseId')) {
            window.location.href = "/signin/company";
        }
    })
    const updateProcessCandidat = (updatedProcessCandidat) => {
        axios.put(`http://localhost:3001/processCandidat/${process._id}`, updatedProcessCandidat)
            .then((response) => {
                console.log('Processus candidat mis à jour avec succès:', response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour du processus candidat:', error);
            });
    };

    const theme = useTheme();

    return (
        <div style={{ backgroundColor: '#ced4da', padding: '20px' }}>
            <Box>
                <main style={{ padding: '10px', margin: '60px' }}>
                    <Paper elevation={3} style={{ borderRadius: '16px', padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '96' }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>
                            Etape {currentStep}: {recruitmentSteps[currentStep - 1]}
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
                                <Button sx={{ marginTop: '50px' }} variant="contained" component="span" startIcon={<CloudUploadIcon />} >
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
                            <Button disabled={currentStep === 1} onClick={handlePreviousStep}>
                                Étape précédente
                            </Button>
                            <Button disabled={currentStep === totalSteps} onClick={handleNextStep}>
                                Étape suivante
                            </Button>
                        </Box>

                        <Button component={Link} onClick={handleValidate} to="" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} color="success">
                            valider
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
