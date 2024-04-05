import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { useTheme } from "@mui/material";

const CandidatesList = () => {
  const theme = useTheme();

  // Mock data des candidats
  const candidates = [
    { id: 1, name: "John Doe", email: "john@example.com",naissance:"12/06/1999",genre:"femme",salaire:"125",lieux:"nabeul",adresse:'tunis',tele:"2555", Date:"12/1/1999",souhaite:"5ddd",Poste:"eng" },
    { id: 2, name: "John Doe", email: "john@example.com",naissance:"12/06/1999",genre:"femme",salaire:"125",lieux:"nabeul",adresse:'tunis',tele:"2555", Date:"12/1/1999",souhaite:"5ddd",Poste:"eng" },
    { id: 3, name: "John Doe", email: "john@example.com",naissance:"12/06/1999",genre:"femme",salaire:"125",lieux:"nabeul",adresse:'tunis',tele:"2555", Date:"12/1/1999",souhaite:"5ddd",Poste:"eng" },
    { id: 4, name: "John Doe", email: "john@example.com",naissance:"12/06/1999",genre:"femme",salaire:"125",lieux:"nabeul",adresse:'tunis',tele:"2555", Date:"12/1/1999",souhaite:"5ddd",Poste:"eng" },
    // Ajoutez d'autres candidats selon vos besoins
  ];

  // Fonction pour évaluer un candidat
  const evaluateCandidate = (candidateId) => {
    // Mettez en œuvre la logique d'évaluation du candidat ici
    console.log(`Évaluation du candidat avec l'ID ${candidateId}`);
  };
  const drawerWidth = 240;
  const themedStyles = (theme) => {
      return {
     
      
        content: {
          padding: 3, 
          minWidth: 1100,
          height: 'calc(100vh )', overflowY: 'auto',
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
              {candidates.map((candidate) => (
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
