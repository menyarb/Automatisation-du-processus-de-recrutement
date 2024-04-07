const Entreprise = require('../models/Entreprise.model');

// Create
const createEntreprise = async (req, res) => {
    try {
        const entreprise = new Entreprise(req.body);
        await entreprise.save();
        res.status(201).send(entreprise);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Read all
const getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await Entreprise.find();
        res.send(entreprises);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Read by ID
const getEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update by ID
const updateEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete by ID
const deleteEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createEntreprise,
    getAllEntreprises,
    getEntrepriseById,
    updateEntrepriseById,
    deleteEntrepriseById
};
