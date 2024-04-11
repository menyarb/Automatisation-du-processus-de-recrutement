const ProcessCandidat = require('../models/processCandidat.model');

// Créer un nouveau processus candidat
exports.createProcessCandidat = async (req, res) => {
    try {
        const processCandidat = new ProcessCandidat(req.body);
        await processCandidat.save();
        res.status(201).send(processCandidat);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Récupérer tous les processus candidats
exports.getAllProcessCandidats = async (req, res) => {
    try {
        const processCandidats = await ProcessCandidat.find();
        res.send(processCandidats);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Récupérer un processus candidat par son ID
exports.getProcessCandidatById = async (req, res) => {
    try {
        const processCandidat = await ProcessCandidat.findById(req.params.id);
        if (!processCandidat) {
            return res.status(404).send('Processus candidat non trouvé');
        }
        res.send(processCandidat);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Mettre à jour un processus candidat par son ID
exports.updateProcessCandidatById = async (req, res) => {
    try {
        const processCandidat = await ProcessCandidat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!processCandidat) {
            return res.status(404).send('Processus candidat non trouvé');
        }
        res.send(processCandidat);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Supprimer un processus candidat par son ID
exports.deleteProcessCandidatById = async (req, res) => {
    try {
        const processCandidat = await ProcessCandidat.findByIdAndDelete(req.params.id);
        if (!processCandidat) {
            return res.status(404).send('Processus candidat non trouvé');
        }
        res.send(processCandidat);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Récupérer les étapes non nulles d'un processus candidat par son ID
exports.getNonNullEtapesById = async (req, res) => {
    try {
        const processCandidat = await ProcessCandidat.findById(req.params.id);
        if (!processCandidat) {
            return res.status(404).send('Processus candidat non trouvé');
        }
        const nonNullEtapes = {};
        for (let i = 1; i <= 10; i++) {
            const etapeKey = `etape${i}`;
            const etatKey = `etat${i}`;
            if (processCandidat[etapeKey] !== null) {
                nonNullEtapes[etapeKey] = processCandidat[etapeKey];
                nonNullEtapes[etatKey] = processCandidat[etatKey];
            } else {
                delete processCandidat[etatKey];
            }
        }
        // Enregistrer les modifications dans la base de données
        await processCandidat.save();
        res.send(nonNullEtapes);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getProcessByOfferAndCandidateIds = async (req, res) => {
    const { idOffre, idCandidat } = req.params;

    try {
        const process = await ProcessCandidat.findOne({ idOffre, idCandidat });
        if (!process) {
            return res.status(404).send('Processus non trouvé');
        }
        res.status(200).send(process);
    } catch (err) {
        res.status(500).send(err);
    }
};
