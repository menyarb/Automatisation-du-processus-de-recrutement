
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { useTheme } from "@mui/material";
import axios from 'axios';
import React, { useState,useEffect } from 'react';
const CandidatesList = () => {
  const theme = useTheme();

  const [candidats, setcandidats] = useState([]);

const AddCandidate = () => {
  axios.get('http://localhost:3001/candidats', candidats)
      .then(response => {
          console.log('candidat ajoutée avec succès :', response.data);
          setcandidats(response.data);
      })
      .catch(error => {
          console.error('Erreur lors de l\'ajout de l\'candidat :', error);
      });

};
useEffect(() => {
  AddCandidate();
});

  // Fonction pour évaluer un candidat
  const evaluateCandidate = (candidateId) => {
    // Mettez en œuvre la logique d'évaluation du candidat ici
    console.log(`Évaluation du candidat avec l'ID ${candidateId}`);
  };

  // Fonction pour télécharger le CV du candidat
  const downloadCV = (cvUrl) => {
    // Redirigez l'utilisateur vers l'URL du CV à télécharger
    window.open(cvUrl, '_blank');
  };

  const drawerWidth = 240;
  const themedStyles = (theme) => {
      return {
     
      
        content: {
          padding: 3, 
          minWidth: 1100,
          height: 'calc(100vh - 200px )', overflowY: 'auto',
         marginLeft: drawerWidth + 15,
        }
      }
    }
  return (
    <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Liste des Candidats</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom et prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date de naissance</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Salaire mensuel désiré</TableCell>
                <TableCell>Lieux de travail</TableCell>
                <TableCell>Adresse </TableCell>
                <TableCell>Téléphone </TableCell>
                <TableCell>Date de disponibilité </TableCell>
                <TableCell>Contrat souhaité </TableCell>
                <TableCell>Poste désiré  </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidats.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.id}</TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.naissance}</TableCell>
                  <TableCell>{candidate.genre}</TableCell>
                  <TableCell>{candidate.salaire}</TableCell>
                  <TableCell>{candidate.lieux}</TableCell>
                  <TableCell>{candidate.adresse}</TableCell>
                  <TableCell>{candidate.tele}</TableCell>
                  <TableCell>{candidate.Date}</TableCell>
                  <TableCell>{candidate.souhaite}</TableCell>
                  <TableCell>{candidate.Poste}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => evaluateCandidate(candidate.id)}>
                      Évaluer
                    </Button>
                    <Button sx={{marginTop:"12px"}} variant="outlined" color="success" onClick={() => downloadCV(candidate.cv)} >
                      Télécharger CV
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </main>
    </Box>
    </div>
  );
};

export default CandidatesList;
