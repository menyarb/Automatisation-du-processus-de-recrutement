const express = require('express');
const router = express.Router();
const processOffreController = require('../Controllers/processOffre.controller');

router.post('/', processOffreController.createProcess);

router.get('/:idProcess', processOffreController.getAllProcessByOffreId);

router.delete('/:id', processOffreController.deleteProcessById);

router.put('/:id', processOffreController.modifyProcessById);
router.get('/', processOffreController.getAllProcesses);

router.delete('/', processOffreController.deleteAllProcesses);
router.get('/id/:id', processOffreController.getProcessById);

module.exports = router;
