const express = require('express');
const router = express.Router();
const candidatureController = require('../Controllers/candidature.controller');

// Routes CRUD pour les candidatures
router.post('/', candidatureController.createCandidature);
router.get('/', candidatureController.getAllCandidatures);
router.get('/:id', candidatureController.getCandidatureById);
router.get('/byoffreId/:idOffre', candidatureController.getCandidatureByIdOffre);
router.get('/getcandidatsbyoffreId/:idOffre', candidatureController.getCandidatsByIdOffre);
router.patch('/:id', candidatureController.updateCandidatureById);
router.delete('/:id', candidatureController.deleteCandidatureById);
router.post('/postuler', candidatureController.postulerOffre);


module.exports = router;
