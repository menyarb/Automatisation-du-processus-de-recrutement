const express = require('express');
const router = express.Router();
const processCandidatController = require('../Controllers/processCandidat.controller');

router.post('/', processCandidatController.createProcessCandidat);

router.get('/', processCandidatController.getAllProcessCandidats);

router.get('/:id', processCandidatController.getProcessCandidatById);

router.put('/:id', processCandidatController.updateProcessCandidatById);

router.delete('/:id', processCandidatController.deleteProcessCandidatById);

router.get('/:id/non-null-etapes', processCandidatController.getNonNullEtapesById);

router.get('/:idOffre/:idCandidat', processCandidatController.getProcessByOfferAndCandidateIds);

module.exports = router;
