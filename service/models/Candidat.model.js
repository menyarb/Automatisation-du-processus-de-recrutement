const mongoose = require('mongoose');

// Schéma du Candidat
const candidatSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    diplome: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Créer le modèle Candidat à partir du schéma
const Candidat = mongoose.model('Candidat', candidatSchema);

module.exports = Candidat;
