const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    mission: {
        type: String,
    },
    profile: {
        type: String,
    },
    technicalSkills: {
        type: String,
    },
    interpersonalSkills: {
        type: String,
    },
    languages: {
        type: String,
    },
    Experience: {
        type: String,
    },
    jobType: {
        type: String,
    },
    Salaire: {
        type: String,
    },
    Emplacement: {
        type: String,
    },
    Qualification: {
        type: String,
    },
    Contrat: {
        type: String,
    },
    type: {
        type: String,
    },
   
});

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;
