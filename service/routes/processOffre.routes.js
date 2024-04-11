const express = require('express');
const router = express.Router();
const processOffreController = require('../Controllers/processOffre.controller');

router.post('/', processOffreController.createProcess);

router.get('/:idOffre', processOffreController.getAllProcessByOffreId);

router.delete('/:id', processOffreController.deleteProcessById);

router.put('/:id', processOffreController.modifyProcessById);

module.exports = router;
