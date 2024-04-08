const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
    idCandidat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat',
        required: true
    },
    idOffre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offre',
        required: true
    },
    datePostulation: {
        type: Date,
        default: Date.now
    },
    etatCandidature: {
        type: String,
        enum: ['EN_ATTENTE', 'ACCEPTEE', 'REFUSEE'],
        default: 'EN_ATTENTE'
    }
});

const Candidature = mongoose.model('Candidature', candidatureSchema);

module.exports = Candidature;
