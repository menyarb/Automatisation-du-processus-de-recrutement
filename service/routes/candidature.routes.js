const express = require('express');
const router = express.Router();
const candidatureController = require('../Controllers/candidature.controller');

// Routes CRUD pour les candidatures
router.post('/', candidatureController.createCandidature);
router.get('/', candidatureController.getAllCandidatures);
router.get('/:id', candidatureController.getCandidatureById);
router.patch('/:id', candidatureController.updateCandidatureById);
router.delete('/:id', candidatureController.deleteCandidatureById);

module.exports = router;
