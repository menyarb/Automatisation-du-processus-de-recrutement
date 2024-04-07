const Candidat = require('../models/Candidat.model');

// Create
const createCandidat = async (req, res) => {
    try {
        const candidat = new Candidat(req.body);
        await candidat.save();
        res.status(201).send(candidat);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Read all
const getAllCandidats = async (req, res) => {
    try {
        const candidats = await Candidat.find();
        res.send(candidats);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Read by ID
const getCandidatById = async (req, res) => {
    try {
        const candidat = await Candidat.findById(req.params.id);
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update by ID
const updateCandidatById = async (req, res) => {
    try {
        const candidat = await Candidat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete by ID
const deleteCandidatById = async (req, res) => {
    try {
        const candidat = await Candidat.findByIdAndDelete(req.params.id);
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createCandidat,
    getAllCandidats,
    getCandidatById,
    updateCandidatById,
    deleteCandidatById
};
