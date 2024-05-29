const mongoose = require('mongoose');

const ProcessShema = new mongoose.Schema({
    idOffre: {
        type: String,
    },
    idCandidat: {
        type: String,
    },
    etape1: {
        type: String,
    },
    etat1: {
        type: Number,
        default: 0, 
    },
    etape2: {
        type: String,
    },
    etat2: {
        type: Number,
        default: 0, 
    },
    etape3: {
        type: String,
    },
    etat3: {
        type: Number,
        default: 0, 
    },
    etape4: {
        type: String,
    },
    etat4: {
        type: Number,
        default: 0, 
    },
    etape5: {
        type: String,
    },
    etat5: {
        type: Number,
        default: 0, 
    },
    etape6: {
        type: String,
    },
    etat6: {
        type: Number,
        default: 0, 
    },
    etape7: {
        type: String,
    },
    etat7: {
        type: Number,
        default: 0, 
    },
    etape8: {
        type: String,
    },
    etat8: {
        type: Number,
        default: 0, 
    },etape9: {
        type: String,
    },
    etat9: {
        type: Number,
        default: 0, 
    },etape10: {
        type: String,
    },
    etat10: {
        type: Number,
        default: 0, 
    }
});
const ProcessCandidat = mongoose.model('ProcessCandidat', ProcessShema);

module.exports = ProcessCandidat;