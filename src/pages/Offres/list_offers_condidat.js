import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Snackbar, TextField } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import axios from 'axios';
import Image from '../../assets/images/mpbs.png';
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const drawerWidth = 240;
const themedStyles = (theme) => {
  return {
    content: {
      padding: 3,
      height: 'calc(100vh - 200px)', overflowY: 'auto',
      marginLeft: drawerWidth + 15,
      //  marginTop:96,
    }
   
  }
  
}

const ListeOffres = () => {
  const [offers, setOffers] = useState([]);
  const [searchText, setSearchText] = useState(''); // État pour la recherche
  const [showAlert, setShowAlert] = useState(false); // État pour gérer l'affichage de l'alerte
  const theme = useTheme();

  const getOffer = () => {
    axios.get('http://localhost:3001/offres', offers)
      .then(response => {
        console.log('Offre ajoutée avec succès :', response.data);
        setOffers(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'offre :', error);
      });
  };

  useEffect(() => {
    getOffer();
  }, []);

  const postulerOffre = (offerId) => {
    axios.post(`http://localhost:3001/candidatures/`, {
      idCandidat: sessionStorage.getItem("candidatId"),
      idOffre: offerId,
      etatCandidature: 'EN_ATTENTE'
    })
      .then(response => {
        console.log('Candidature envoyée avec succès :', response.data);
        setShowAlert(true); // Afficher l'alerte lorsque la candidature est réussie
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi de la candidature :', error);
        if (error.response && error.response.status === 400) {
          setShowErrorAlert(true); // Afficher l'alerte si vous avez déjà postulé sur cette offre
        } else {
          // Gérer d'autres types d'erreurs ici si nécessaire
        }
      });
  };
  const [showErrorAlert, setShowErrorAlert] = useState(false); // État pour gérer l'affichage de l'alerte d'erreur

  // Fonction pour gérer la fermeture de l'alerte d'erreur
  const handleErrorAlertClose = () => {
    setShowErrorAlert(false);
  };
  const handleAlertClose = () => {
    setShowAlert(false); // Fermer l'alerte lorsqu'elle est cliquée ou après un délai
  };

  useEffect(() => {
    if (!sessionStorage.getItem('candidatId')) {
      window.location.href = "/signin/candidate";
    }
  }, []);

  // Fonction de gestion de la recherche
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filtrer les offres en fonction du texte de recherche
  const filteredOffers = offers.filter(offer =>
    (offer.title || '').toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div style={{ backgroundColor: '#ced4da' }}>
      <MenuNavbarAddCandidat />
      <Box p="20px">
        <main style={{ ...themedStyles(theme).content }}>
          <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>Liste des Offres</Typography>
            <TextField
              label="Recherche par nom d'entreprise"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchText}
              onChange={handleSearchChange}
            />
            <TableContainer>
              <Table aria-label="simple table" style={{ minWidth: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Mission</TableCell>
                    <TableCell>Profile</TableCell>
                    <TableCell>Technical Skills</TableCell>
                    <TableCell>Interpersonal Skills</TableCell>
                    <TableCell>Languages</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOffers.map((offer, index) => (
                    <TableRow key={index}>
                      <TableCell> <img src={Image} alt="Demo PC" style={{ width: '50px', height: '50px', borderRadius: '8px' }} /></TableCell>
                      <TableCell>{offer.title}</TableCell>
                      <TableCell>{offer.mission}</TableCell>
                      <TableCell>{offer.profile}</TableCell>
                      <TableCell>{offer.technicalSkills}</TableCell>
                      <TableCell>{offer.interpersonalSkills}</TableCell>
                      <TableCell>{offer.languages}</TableCell>
                      <TableCell>
                        <Button sx={{ borderRadius: '16px', margin: '10px' }} variant="contained" color="primary" component={Link} to={`/candidate/DetailOffres/${offer._id}`}>
                          Details
                        </Button>
                        <br></br>
                        <Button sx={{ borderRadius: '16px', margin: '10px' }} variant="contained" color="success" onClick={() => postulerOffre(offer._id)}>
                          Postuler
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Snackbar pour l'alerte */}
          <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleAlertClose}>
            <MuiAlert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
              La postulation a été envoyée avec succès.
            </MuiAlert>
          </Snackbar>
          <Snackbar open={showErrorAlert} autoHideDuration={6000} onClose={handleErrorAlertClose}>
            <MuiAlert onClose={handleErrorAlertClose} severity="error" sx={{ width: '100%' }}>
              Vous avez déjà postulé sur cette offre.
            </MuiAlert>
          </Snackbar>
        </main>
      </Box>
    </div>
  );
}

export default ListeOffres;
