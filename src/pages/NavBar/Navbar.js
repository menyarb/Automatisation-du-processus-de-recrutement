import React, { useState, useEffect } from 'react';
import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles";

import RecInovLogo from '../../assets/images/logo.png';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { deepOrange } from '@mui/material/colors';
import { Home, FormatListBulleted, Storage } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const themedStyles = (theme) => ({
  menuButton: {
    marginRight: 2
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(180deg, #1565c0, #fff)',
    height: 80, // Increase the height of the AppBar
  },
  drawer: {
    width: drawerWidth,
    "& .MuiBackdrop-root": {
      display: "none"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'linear-gradient(180deg, #FDFEFF, #fff)'
  },
  content: {
    padding: 3,
    maxWidth: 720,
    minWidth: 375,
    marginLeft: drawerWidth + 8,
  },
  avatar: {
    backgroundColor: deepOrange[500],
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(140)
  },
  userName: {
    flexGrow: 1,
    marginLeft: theme.spacing(150)
  }
});

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
      <AppBar position="fixed" sx={themedStyles(theme).appBar}>
        <Toolbar>
          <Avatar sx={{ m: 1 }} src={RecInovLogo} />
          <Typography variant="h6" >
            Rec_inov 
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar sx={themedStyles(theme).avatar}>
                <AccountCircleIcon />
              </Avatar>
            </Grid>
            <Grid item >
              <Typography component="h3" variant="h5">
                {companyName}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer disableEnforceFocus
        variant="temporary"
        open={true}
        sx={themedStyles(theme).drawer}
        PaperProps={{
          sx: themedStyles(theme).drawerPaper,
          elevation: 9
        }}>
        <List sx={{ mt: "5rem" }}>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItem>
          <ListItem button component={Link} to="/company/ListeOffres" >
            <ListItemIcon>
              <FormatListBulleted />
            </ListItemIcon>
            <ListItemText primary="Liste Offres" />
          </ListItem>
          <ListItem button component={Link} to="/company/AddOffres">
            <ListItemIcon>
              <Storage />
            </ListItemIcon>
            <ListItemText primary="Ajouter Offres" />
          </ListItem>
        </List>
      </Drawer>
      <Toolbar />
    </div>
  )
}
