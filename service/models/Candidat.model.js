const mongoose = require('mongoose');

// Schéma du Candidat
const candidatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    salaire: {
        type: Number,
        required: true
    },
    lieux: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    tele: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    souhaite: {
        type: String,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    langues: {
        type: String,
        required: true
    },
    competencesTechniques: {
        type: String,
        required: true
    },
    certificats: {
        type: String,
        required: true
    }
});

// Créer le modèle Candidat à partir du schéma
const Candidat = mongoose.model('Candidat', candidatSchema);

module.exports = Candidat;
