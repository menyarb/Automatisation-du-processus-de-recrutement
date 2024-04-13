const express = require('express');
const router = express.Router();
const candidatController = require(`../Controllers/candidat.controller`);

// Routes CRUD pour les candidats
router.post('/', candidatController.createCandidat);
router.get('/', candidatController.getAllCandidats);
router.get('/:id', candidatController.getCandidatById);
router.patch('/:id', candidatController.updateCandidatById);
router.delete('/:id', candidatController.deleteCandidatById);
router.post('/login',candidatController.loginCandidat);
module.exports = router;
