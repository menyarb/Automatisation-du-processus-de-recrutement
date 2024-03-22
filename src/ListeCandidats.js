import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

function createData(name, description) {
  return { name, description };
}

const rows = [
  createData('CANDIDAT1', 'Description du candidat 1'),
  createData('CANDIDAT2', 'Description du candidat 2'),
  createData('CANDIDAT3', 'Description du candidat 3'),
];

export default function BasicTable() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Tooltip title="Add" arrow>
          <h1 style={{ textAlign: 'center' }}>Liste des candidats: offre1</h1>
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
                  <Button variant="contained">Evaluate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
