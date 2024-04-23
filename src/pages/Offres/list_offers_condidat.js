import React , { useState,useEffect }  from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,Button,Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import axios from 'axios';
import Image from '../../assets/images/mpbs.png';
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
      content: {
        padding: 3,
           height: 'calc(100vh - 200px)', overflowY: 'auto',
          marginLeft: drawerWidth + 15,
      }
    }
  }




export default function ListeOffres() {
  const [offers, setOffers] = useState([]);
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
        idOffre:offerId,
        etatCandidature: 'EN_ATTENTE'
    })
        .then(response => {
            console.log('Candidature envoyée avec succès :', response.data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la candidature :', error);
        });
};
    const theme = useTheme();
    return (
      <div sx={{backgroundColor: '#ced4da', }}>
           <MenuNavbarAddCandidat />
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
                            <Button sx={{ borderRadius: '16px', margin:'10px' }} variant="contained" color="primary" component={Link} to={`/candidate/DetailOffres/${offer._id}`}>
                                    Details 
                                </Button>
                                <br></br>
                                <Button sx={{ borderRadius: '16px', margin:'10px' }} variant="contained" color="success"  onClick={() => postulerOffre(offer._id)}>
                                Postuler
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