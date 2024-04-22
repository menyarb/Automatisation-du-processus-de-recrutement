const mongoose = require('mongoose');
const EntrepriseShema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
       
    }
)
const Entreprise=mongoose.model('Entreprise',EntrepriseShema);
module.exports = Entreprise