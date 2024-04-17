const Candidat = require('../models/Candidat.model');
//login
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken pour la création de jetons d'authentification
const bcrypt = require('bcrypt');
const loginCandidat = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherchez un candidat avec l'email fourni
        const candidat = await Candidat.findOne({ email });

        // Vérifiez si un candidat avec cet email existe
        if (!candidat) {
            return res.status(401).json({ message: 'Adresse e-mail incorrect' });
        }

        // Vérifiez si le mot de passe fourni correspond au mot de passe haché dans la base de données
        const passwordMatch = await  candidat.password ;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        }

        // Si les identifiants sont valides, générez un jeton d'authentification
        const token = jwt.sign({ id: candidat._id }, 'votre_clé_secrète', { expiresIn: '1h' });

        // Renvoyer le jeton d'authentification dans la réponse
        res.status(200).json({ token, candidatId: candidat._id , candidatName: candidat.name}); // Ajoutez l'ID du candidat à la réponse
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion' });
    }
};
// Inscription d'un nouveau candidat
const registerCandidat = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Vérifiez si un candidat avec cet email existe déjà
        const existingCandidat = await Candidat.findOne({ email });

        if (existingCandidat) {
            return res.status(400).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
        }

        // Hachez le mot de passe avant de le sauvegarder dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10); // Utilisez bcrypt pour hacher le mot de passe

        // Créez un nouveau candidat
        const newCandidat = new Candidat({
            email,
            password: hashedPassword, // Enregistrez le mot de passe haché
            name
        });

        // Sauvegardez le candidat dans la base de données
        await newCandidat.save();

        res.status(201).json(newCandidat);
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription' });
    }
};


// Create
const createCandidat = async (req, res) => {
    try {
        const candidat = new Candidat(req.body);
        await candidat.save();
        res.status(201).send(candidat);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Read all
const getAllCandidats = async (req, res) => {
    try {
        const candidats = await Candidat.find();
        res.send(candidats);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Read by ID
const getCandidatById = async (req, res) => {
    try {
        const candidat = await Candidat.findById(req.params.id);
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update by ID
const updateCandidatById = async (req, res) => {
    try {
        const candidat = await Candidat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete by ID
const deleteCandidatById = async (req, res) => {
    try {
        const candidat = await Candidat.findByIdAndDelete(req.params.id);
        if (!candidat) {
            return res.status(404).send('Candidat non trouvé');
        }
        res.send(candidat);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createCandidat,
    getAllCandidats,
    getCandidatById,
    updateCandidatById,
    deleteCandidatById,
    loginCandidat,
    registerCandidat
};
