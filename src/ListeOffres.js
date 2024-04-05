import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

function createData(name, description) {
  return { name, description };
}

const rows = [
  createData('OFFRE1', "Description de l'offre 1"),
  createData('OFFRE2', "Description de l'offre 2"),
  createData('OFFRE3', "Description de l'offre 3"),
];

export default function BasicTable() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Tooltip title="Add" arrow>
          <h1 style={{ textAlign: 'center' }}>Liste des Offres d'Emploi</h1>
        </Tooltip>
        <Tooltip title="Add" placement="left-start">
          <Button variant="contained">Ajouter Offre</Button>
        </Tooltip>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Link to={`/ListeCandidats/${row.name}`}>
                    <Button variant="contained" sx={{ marginLeft: '30px' }}>Candidats</Button>
                  </Link>
                  <Button variant="contained" color="warning"  sx={{ marginLeft: '30px' }}>Modifier</Button>
                  <Button variant="contained" color="error" sx={{ marginLeft: '30px' }}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
