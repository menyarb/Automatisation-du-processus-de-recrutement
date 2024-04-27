const Candidature = require('../models/Candidature.model');
const Candidats = require('../models/Candidat.model');
const ProcessOffre = require('../models/ProcessOffre.model');
const ProcessCandidat = require('../models/processCandidat.model');

// Fonction pour traiter la demande de candidature
const postulerOffre = async (req, res) => {
    try {
        // Récupérer l'ID du candidat à partir des informations d'authentification (par exemple, JWT)
        const candidatId = req.user.id; // Supposons que l'ID du candidat est stocké dans le champ user de la requête

        // Récupérer l'ID de l'offre à laquelle le candidat postule à partir du corps de la requête
        const { idOffre } = req.body;

        // Vérifier si l'ID de l'offre est fourni dans la requête
        if (!idOffre) {
            return res.status(400).json({ message: "Veuillez fournir l'ID de l'offre à laquelle vous postulez." });
        }

        // Créer une nouvelle instance de Candidature avec les données fournies
        const candidature = new Candidature({
            idCandidat: candidatId,
            idOffre: idOffre
        });

        // Enregistrer la candidature dans la base de données
        await candidature.save();

        // Répondre avec un message de succès
        return res.status(200).json({ message: "Votre candidature a été soumise avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la soumission de la candidature :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la soumission de votre candidature." });
    }
};




// Créer une nouvelle candidature
const createCandidature = async (req, res) => {
    try {
        const { idCandidat, idOffre, etatCandidature } = req.body;

        // Vérifier si une candidature avec les mêmes idCandidat et idOffre existe déjà
        const existingCandidature = await Candidature.findOne({ idCandidat, idOffre });

        if (existingCandidature) {
            return res.status(400).send({ error: 'Cette candidature existe déjà.' });
        }

        const candidature = new Candidature({ idCandidat, idOffre, etatCandidature });
        const processOffre = await ProcessOffre.findOne({ idOffre: idOffre }); // Utiliser findOne() pour récupérer un seul document
        const processCandidat = new ProcessCandidat({
            idCandidat: idCandidat,
            idOffre: idOffre,
            idProcessOffre: processOffre._id,
            etape1:processOffre.etape1, 
            etape2:processOffre.etape2,
            etape3:processOffre.etape3,
            etape4:processOffre.etape4,
            etape5:processOffre.etape5,
            etape6:processOffre.etape6,
            etape7:processOffre.etape7,
            etape8:processOffre.etape8,
            etape9:processOffre.etape9,
            etape10:processOffre.etape10,
});
        await candidature.save();
        await processCandidat.save();
        res.status(201).send(processCandidat);
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
const getCandidatureByIdOffre = async (req, res) => {
    try {
        const { idOffre } = req.params;

        const candidatures = await Candidature.find({ idOffre });

        if (!candidatures || candidatures.length === 0) {
            return res.status(404).send('Aucune candidature trouvée pour cette offre');
        }
        res.send(candidatures);
    } catch (err) {
        res.status(500).send(err);
    }
};
const getCandidatsByIdOffre = async (req, res) => {
    try {
        const candidatures = await Candidature.find({ idOffre: req.params.idOffre });

        if (!candidatures || candidatures.length === 0) {
            return res.status(404).send('Aucune candidature trouvée pour cette offre');
        }

        const candidatIds = candidatures.map(candidature => candidature.idCandidat);
        const candidats = await Candidats.find({ _id: { $in: candidatIds } });
        res.send(candidats);
    } catch (err) {
        res.status(500).send(err);
    }
};
const deleteAllCandidatures = async (req, res) => {
    try {
        const result = await Candidature.deleteMany();
        res.send({ deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).send(err);
    }
};




module.exports = {
    createCandidature,
    getAllCandidatures,
    getCandidatureById,
    updateCandidatureById,
    deleteCandidatureById,
    postulerOffre,
    getCandidatureByIdOffre,
    getCandidatsByIdOffre,
    deleteAllCandidatures
};