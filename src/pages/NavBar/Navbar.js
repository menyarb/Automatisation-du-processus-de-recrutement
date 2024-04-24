import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Avatar, Grid, Drawer, List,
  ListItem, ListItemIcon, ListItemText, CssBaseline
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import RecInovLogo from '../../assets/images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Home, FormatListBulleted, Storage } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const handleLogout = () => {
  sessionStorage.clear();
  window.location.href = '/signin/company';
};

export default function CustomZIndexAppBar() {
  const theme = useTheme();
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const companyNameFromStorage = sessionStorage.getItem('entrepriseName');
    if (companyNameFromStorage) {
      setCompanyName(companyNameFromStorage);
    }
  }, []);

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, background: 'linear-gradient(180deg, #1565c0, #fff)', height: 80 }}>
        <Toolbar>
          <Avatar sx={{ mr: 2 }} src={RecInovLogo} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rec_inov
          </Typography>
          <Grid container justifyContent="flex-end" alignItems="center">
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="div" variant="h6" sx={{ marginRight: 2 }}>
              {companyName}
            </Typography>
            
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ marginLeft: 1 }}>
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{ width: 240, '& .MuiBackdrop-root': { display: 'none' }, '& .MuiDrawer-paper': { width: 240, backgroundColor: 'linear-gradient(180deg, #FDFEFF, #fff)' }}}
      >
        <div sx={{ ...theme.mixins.toolbar }} />
        <List sx={{ mt: "5rem" }}>
          <ListItem button component={Link} to="/company/dashboard">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItem>
          <ListItem button component={Link} to="/company/ListeOffres">
            <ListItemIcon><FormatListBulleted /></ListItemIcon>
            <ListItemText primary="Liste Offres" />
          </ListItem>
          <ListItem button component={Link} to="/company/AddOffres">
            <ListItemIcon><Storage /></ListItemIcon>
            <ListItemText primary="Ajouter Offres" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
