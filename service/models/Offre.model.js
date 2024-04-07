const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    competencesRequises: [{
        type: String,
        required: true
    }],
    niveauExperienceRequis: {
        type: String,
        required: true
    },
    salaire: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    typeEmploi: {
        type: String,
        required: true
    },
    dateLimiteCandidature: {
        type: Date,
        required: true
    },
    statutOffre: {
        type: String,
        required: true
    },
    avantages: [{
        type: String
    }]
});

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;
