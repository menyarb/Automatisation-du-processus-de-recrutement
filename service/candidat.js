const express = require('express');
const router = express.Router();
const Candidat = require('./Candidat.model');

// Create (POST)
router.post('/candidat', async (req, res) => {
    try {
        const candidat = new Candidat(req.body);
        await candidat.save();
        res.status(201).send(candidat);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Read all (GET)
router.get('/candidat', async (req, res) => {
    try {
        const candidats = await Candidat.find();
        res.send(candidats);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read by ID (GET)
router.get('/candidat:id', async (req, res) => {
    try {
        const candidat = await Candidat.findById(req.params.id);
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update by ID (PATCH)
router.patch('/candidat:id', async (req, res) => {
    try {
        const candidat = await Candidat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete by ID (DELETE)
router.delete('/candidat:id', async (req, res) => {
    try {
        const candidat = await Candidat.findByIdAndDelete(req.params.id);
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
