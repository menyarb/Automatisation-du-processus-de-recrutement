import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Paper, TextField, Button} from '@mui/material';
import { Link } from 'react-router-dom';
// Dans votre composant React
const drawerWidth = 240;
const themedStyles = (theme) => {
    return {
        content: {
            padding: 3,
            height: 'calc(100vh - 200px )', overflowY: 'auto',
            marginLeft: drawerWidth + 15,
        }
    }
}
export default function CalendarLink() {

    const [calendarLinks] = useState([
        'https://calendar.google.com/calendar/u/0/r/week/2024/4/18?pli=1',
      
      ]);


    const theme = useTheme();
    return (
        <div sx={{ backgroundColor: '#ced4da', }}>
            <Box p="20px">
                <main style={{ ...themedStyles(theme).content }}>
                    <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px' }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>Etape2: Calendar Participer avec Google Meet </Typography>
                       
    
                        <ul>
        {calendarLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </li>
        ))}
      </ul>
      <TextField
    id="note"
    label="Note"
    multiline
    rows={1}
    variant="outlined"
    fullWidth
    margin="normal"
   // onChange={} // Assurez-vous de définir la fonction setNote pour mettre à jour la valeur de la note
/>
<Button component={Link} to="" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} color="success">
            Valideur
        </Button>
    
                    </Paper>
                </main>
            </Box>
        </div>
    )

}
