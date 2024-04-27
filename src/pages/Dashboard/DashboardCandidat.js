import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuNavbarAddCandidat from '../NavBar/NavbarCondidat';
const Dashboard = () => {
    const theme = useTheme();
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
    const navigate = useNavigate();
    const candidatId = sessionStorage.getItem('candidatId');
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        genre: '',
        salaire: '',
        lieux: '',
        adresse: '',
        tele: '',
        date: '',
        souhaite: '',
        poste: '',
        experience: '',
        education: '',
        langues: '',
        competencesTechniques: '',
        certificats: '',
    });
    const [error, setError] = useState('');
    const [offerCount, setOfferCount] = useState(0);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        if (!candidatId) {
            navigate("/signin/candidate");
            return;
        }

        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:3001/candidats/${candidatId}`);
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile');
            }
        }

        fetchProfile();
    }, [candidatId, navigate]);


    const jobStats = [
        { icon: <AccountCircleIcon />, number: offerCount, label: "Offres d'emploi publiés" },
        { icon: <AccessTimeIcon />, number: 3, label: "Offres d'emploi postulés" }
    ];
    useEffect(() => {
        fetchOffersCount();
    }, []);

    const fetchOffersCount = async () => {
        try {
            const response = await axios.get('http://localhost:3001/offres/count');  // Adjust the URL as needed
            setOfferCount(response.data.count);  // Assuming the response has a count property
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch offers count:', err);
            setError('Failed to load data');
            setLoading(false);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;


    return (
        <div>
        <MenuNavbarAddCandidat /> 
        <div sx={{backgroundColor: '#ced4da', }}>
    <Box p="20px">
      <main style={{ ...themedStyles(theme).content }}>
      <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
                <Grid container spacing={2}>
                    {/* Profile Section */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                            <Avatar src="https://rec-inov.com/candidate/images/a9ea2d50-da41-11ee-83c7-bd93893faec7.png" sx={{ width: 60, height: 60, margin: 'auto' }} />
                                <Typography variant="h5" align="center">{profile.name}</Typography>
                                <Typography variant="body1" align="center" fontWeight="bold">{profile.poste || 'No position'}</Typography>
                                <Button variant="contained" startIcon={<EditIcon />} sx={{ margin: 'auto', marginTop: 2 }}  component={Link} to="/candidate/AddCondidat">Edit Profile</Button>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                        <Typography variant="body2"><b>Contact</b></Typography>
                            <Button size="small"><EditIcon /></Button>
                        </div>
                               
                                <Typography><EmailIcon /> {profile.email}</Typography>
                                <Typography><PhoneIcon /> {profile.tele}</Typography>
                                <Typography><HomeIcon /> {profile.adresse}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
  {/* Job Applications Table */}
 
      
                    {/* Job Stats Section */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            {jobStats.map(stat => (
                                <Grid item xs={12} sm={7} md={4} key={stat.label}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            {stat.icon}
                                            <Typography variant="h6">{stat.number}</Typography>
                                            <Typography variant="body2">{stat.label}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Offre</TableCell>
                                <TableCell>Entreprise</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Date postulation</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Data rows would be mapped here based on the data fetched */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
                </Grid>
            </Paper>
            </main>
        </Box>
        </div>
        </div>
    );
}

export default Dashboard;
