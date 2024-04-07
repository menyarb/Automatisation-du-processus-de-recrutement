const Candidature = require('../models/Candidature.model');

// Créer une nouvelle candidature
const createCandidature = async (req, res) => {
    try {
        const { idCandidat, idOffre, etatCandidature } = req.body;
        const candidature = new Candidature({ idCandidat, idOffre, etatCandidature });
        await candidature.save();
        res.status(201).send(candidature);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Obtenir toutes les candidatures
const getAllCandidatures = async (req, res) => {
    try {
        const candidatures = await Candidature.find();
        res.send(candidatures);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Obtenir une candidature par son ID
const getCandidatureById = async (req, res) => {
    try {
        const candidature = await Candidature.findById(req.params.id);
        if (!candidature) {
            return res.status(404).send('Candidature non trouvée');
        }
        res.send(candidature);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Mettre à jour une candidature par son ID
const updateCandidatureById = async (req, res) => {
    try {
        const candidature = await Candidature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidature) {
            return res.status(404).send('Candidature non trouvée');
        }
        res.send(candidature);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Supprimer une candidature par son ID
const deleteCandidatureById = async (req, res) => {
    try {
        const candidature = await Candidature.findByIdAndDelete(req.params.id);
        if (!candidature) {
            return res.status(404).send('Candidature non trouvée');
        }
        res.send(candidature);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createCandidature,
    getAllCandidatures,
    getCandidatureById,
    updateCandidatureById,
    deleteCandidatureById
};
