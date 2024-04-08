const express = require('express');
const mongoose = require('mongoose');
const candidatRoutes = require('./routes/candidat.routes');
const entrepriseRoutes = require('./routes/entreprise.routes');
const offreRoutes = require('./routes/offre.routes');
const candidatureRoutes = require('./routes/candidature.routes');

const cors = require('cors');
const app = express();

// Autoriser les requêtes depuis tous les domaines
app.use(cors());
const port = 3001;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://hnianajla2:qc66WdmWpW8E4IgH@cluster0.g2qvlty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
    console.log('Connecté à la base de données MongoDB');
});

// Utiliser les routes pour les candidats
app.use('/candidats', candidatRoutes);
app.use('/entreprises', entrepriseRoutes);
app.use('/offres', offreRoutes);
app.use('/candidatures', candidatureRoutes);


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur Express en écoute sur le port ${port}`);
});
