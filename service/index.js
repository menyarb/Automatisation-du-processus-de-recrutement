
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001; // ou tout autre port de votre choix

app.use(express.json());

// Connexion à la base de données MongoDB avec Mongoose
mongoose.connect(`mongodb+srv://hnianajla2:qc66WdmWpW8E4IgH@cluster0.g2qvlty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{console.log('connect to db')}).catch((err)=>{
  console.log(err);
   })  ;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
    console.log('Connecté à la base de données MongoDB');
});

// Schéma d'Entreprise
const entrepriseSchema = new mongoose.Schema({
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
    }
});
const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

// Routes CRUD

// Create (POST)
app.post('/entreprise', async (req, res) => {
    try {
        const entreprise = new Entreprise(req.body);
        await entreprise.save();
        res.status(201).send(entreprise);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Read (GET all)
app.get('/entreprise', async (req, res) => {
    try {
        const entreprises = await Entreprise.find();
        res.send(entreprises);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read (GET by ID)
app.get('/entreprise/:id', async (req, res) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update (PATCH)
app.patch('/entreprise/:id', async (req, res) => {
    try {
        const entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete (DELETE)
app.delete('/entreprise/:id', async (req, res) => {
    try {
        const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur Express en écoute sur le port ${port}`);
});
