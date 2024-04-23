const express = require('express');
const router = express.Router();
const offreController = require('../Controllers/offre.controller');

// Routes CRUD pour les offres
router.post('/', offreController.createOffre);
router.get('/', offreController.getAllOffres);
router.get('/:id', offreController.getOffreById);
router.patch('/:id', offreController.updateOffreById);
router.delete('/:id', offreController.deleteOffreById);
router.delete('/', offreController.deleteAllOffres); 
router.get('/byentrepriseid/:entrepriseId', offreController.getOffresByEntrepriseId);

module.exports = router;
