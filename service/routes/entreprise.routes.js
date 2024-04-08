const express = require('express');
const router = express.Router();
const entrepriseController = require('../Controllers/entreprise.controller');

// Routes CRUD pour les entreprises
router.post('/', entrepriseController.createEntreprise);
router.get('/', entrepriseController.getAllEntreprises);
router.get('/:id', entrepriseController.getEntrepriseById);
router.patch('/:id', entrepriseController.updateEntrepriseById);
router.delete('/:id', entrepriseController.deleteEntrepriseById);

module.exports = router;
