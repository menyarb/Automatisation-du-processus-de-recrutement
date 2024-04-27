import React from 'react';
import { Paper, Box, Typography, Button, Stepper, Step, StepLabel, Grid, Avatar ,useTheme} from '@mui/material';
import { mdiHistory } from '@mdi/js';
import Icon from '@mdi/react';
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';



const drawerWidth = 240;
const themedStyles = (theme) => {
  return {

    content: {
      padding: 3,
      height: 'calc(100vh - 200px)', overflowY: 'auto',
      marginLeft: drawerWidth + 15,
      marginTop:95,
    }
  }
}

function JobApplicationHistory() {
  const theme = useTheme();
  const steps = ['En attente', 'Test', 'Entretien', 'Accepté'];

  return (
    <div>
          <MenuNavbarAddCandidat /> 
 

    <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src="https://rec-inov.com/company/images/6ba80a20-1198-11ee-a8fa-43698a68bcb4.png" alt="Rec-Inov" sx={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="h2">Stage - Automatisation du Processus de Recrutement</Typography>
            <Typography color="textSecondary">postulé le 04/03/2024</Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Stepper alternativeLabel activeStep={3}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel icon={index === 2 ? <Icon path={mdiHistory} size={1} color="green" /> : index + 1}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box mt={2} textAlign="right">
          <Button variant="contained" color="primary">Voir l'offre</Button>
        </Box>
      </Paper>
      </main>
    </Box>
    </div>
    </div>
  );
}

export default JobApplicationHistory;
