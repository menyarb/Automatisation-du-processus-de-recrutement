import React from 'react';
import {
  Paper, Box, Typography, Button, Grid, Avatar, Stepper, Step, StepLabel
} from '@mui/material';
import Icon from '@mdi/react';
import { mdiHistory } from '@mdi/js';

function CandidaturesList({ candidatures }) {
  const steps = ['En attente', 'Test', 'Entretien', 'Accepté'];

  return (
    <Box sx={{ padding: 3 }}>
      {candidatures.map((candidature, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={candidature.idOffre.image || "https://via.placeholder.com/150"} sx={{ width: 56, height: 56 }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" component="h2">{candidature.idOffre.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Postulé le: {new Date(candidature.datePostulation).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Salaire: {candidature.idOffre.Salaire || "Non spécifié"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Lieu: {candidature.idOffre.Emplacement}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Type: {candidature.idOffre.jobType}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Stepper activeStep={steps.indexOf(candidature.etatCandidature)} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel icon={label === 'Entretien' ? <Icon path={mdiHistory} size={1} /> : undefined}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box mt={2} textAlign="right">
            <Button variant="contained" color="primary">
              Voir Détails
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default CandidaturesList;
