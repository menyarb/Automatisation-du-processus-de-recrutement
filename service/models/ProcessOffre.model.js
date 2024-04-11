const mongoose = require('mongoose');

const ProcessShema = new mongoose.Schema({
    idOffre: {
        type: String,
    },
    etape1: {
        type: String,
    },
    
    etape2: {
        type: String,
    },
    
    etape3: {
        type: String,
    },
   
    etape4: {
        type: String,
    },
    
    etape5: {
        type: String,
    },
   
    etape6: {
        type: String,
    },
    
    etape7: {
        type: String,
    },
    
    etape8: {
        type: String,
    },
    etape9: {
        type: String,
    },
    
    etape10: {
        type: String,
    },
    
});

const ProcessOffre = mongoose.model('ProcessOffre', ProcessShema);

module.exports = ProcessOffre;