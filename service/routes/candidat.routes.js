const express = require('express');
const router = express.Router();
const candidatController = require(`../Controllers/candidat.controller`);
const authenticate = require('../middleware/auth');
// Routes CRUD pour les candidats

router.post('/',authenticate,  candidatController.createCandidat);
router.get('/', candidatController.getAllCandidats);
router.get('/:id', candidatController.getCandidatById);
router.patch('/:id', candidatController.updateCandidatById);
router.delete('/:id', candidatController.deleteCandidatById);
router.post('/login',candidatController.loginCandidat);
router.post('/register',candidatController.registerCandidat);
router.post('/logout', candidatController.logoutCandidat);
module.exports = router;
