import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,Button,Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Image from '../../assets/images/mpbs.png';


const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
      content: {
        padding: 3,
           height: 'calc(100vh - 64px)', overflowY: 'auto',
          marginLeft: drawerWidth + 15,
      }
    }
  }
// Sample data
const offers = [
  {
    image: require('../../assets/images/logoo.png').default,
    title: 'Title 1',
    mission: '-Fixer les objectifs et les axes prioritaires des ventes à SFAX.',
    responsibilities: [
      '- être attentif aux évolutions du marché et aux offres de la concurrence afin dadapter en performance les offres de lentreprise.',
      '- Reporter au Responsable Commercial.',
      ' - Fidéliser et entretenir des bonnes relations avec les clients.',
      '- Développer la zone commerciale avec lacquisition de nouveaux clients.',
      '- Construction du plan d\'action commercial.',
      '- Saisir le bon de livraison et les bon de commande.',
      '- Définir les besoins techniques demander par les clients.',
      'Assurer le développement du chiffre d\'affaires sur les régions dont vous êtes responsable.'
    ],
    profile: 'Profile 1',
    technicalSkills: 'Technical Skills 1',
    interpersonalSkills: 'Interpersonal Skills 1',
    languages: 'Languages 1'
  },
  {
    image: require('../../assets/images/logoo.png').default,
    title: 'Title 2',
    mission: '-Fixer les objectifs et les axes prioritaires des ventes à SFAX.',
    responsibilities: [
      '- être attentif aux évolutions du marché et aux offres de la concurrence afin dadapter en performance les offres de lentreprise.',
      '- Reporter au Responsable Commercial.',
      ' - Fidéliser et entretenir des bonnes relations avec les clients.',
      '- Développer la zone commerciale avec lacquisition de nouveaux clients.',
      '- Construction du plan d\'action commercial.',
      '- Saisir le bon de livraison et les bon de commande.',
      '- Définir les besoins techniques demander par les clients.',
      'Assurer le développement du chiffre d\'affaires sur les régions dont vous êtes responsable.'
    ],
    profile: 'Profile 2',
    technicalSkills: 'Technical Skills 2',
    interpersonalSkills: 'Interpersonal Skills 2',
    languages: 'Languages 2'
  },
  // Ajoutez d'autres offres si nécessaire
];



export default function ListeOffres() {
   
    const theme = useTheme();
    return (
      <div sx={{backgroundColor: '#ced4da', }}>
      <Box p="20px">
        <main style={{ ...themedStyles(theme).content }}>
        <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
          <Typography variant="h5" gutterBottom>Liste des Offres</Typography>
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
                    {offers.map((offer, index) => (
                        <TableRow key={index}>
                            <TableCell> <img src={Image} alt="Demo PC"style={{ width: '50px', height: '50px', borderRadius: '8px' }}/></TableCell>
                            <TableCell>{offer.title}</TableCell>
                            <TableCell>{offer.mission}</TableCell>
                            <TableCell>{offer.profile}</TableCell>
                            <TableCell>{offer.technicalSkills}</TableCell>
                            <TableCell>{offer.interpersonalSkills}</TableCell>
                            <TableCell>{offer.languages}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" href="/company/DetailOffres">
                                    Details 
                                </Button>
                                <br></br>
                                <Button style={{ marginTop:'10px'}} variant="contained" color="primary" href="/company/ListeCondidat"> 
                                     liste de conditions
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
}