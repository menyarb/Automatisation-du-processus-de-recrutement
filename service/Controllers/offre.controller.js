const Offre = require('../models/Offre.model');

// Créer une nouvelle offre
exports.createOffre = async (req, res) => {
    try {
        const offre = new Offre(req.body);
        await offre.save();
        res.status(201).send(offre);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Récupérer toutes les offres
exports.getAllOffres = async (req, res) => {
    try {
        const offres = await Offre.find();
        res.send(offres);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Récupérer une offre par son ID
exports.getOffreById = async (req, res) => {
    try {
        const offre = await Offre.findById(req.params.id);
        if (!offre) {
            return res.status(404).send('Offre non trouvée');
        }
        res.send(offre);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Mettre à jour une offre par son ID
exports.updateOffreById = async (req, res) => {
    try {
        const offre = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offre) {
            return res.status(404).send('Offre non trouvée');
        }
        res.send(offre);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Supprimer une offre par son ID
exports.deleteOffreById = async (req, res) => {
    try {
        const offre = await Offre.findByIdAndDelete(req.params.id);
        if (!offre) {
            return res.status(404).send('Offre non trouvée');
        }
        res.send(offre);
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.deleteAllOffres = async (req, res) => {
    try {
        const result = await Offre.deleteMany();
        res.send({ deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).send(err);
    }
};