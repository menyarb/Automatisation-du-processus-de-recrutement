const Entreprise = require('../models/Entreprise.model');
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken pour la création de jetons d'authentification

//login
const loginEntreprise = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherchez une entreprise avec l'email fourni
        const entreprise = await Entreprise.findOne({ email });

        // Vérifiez si une entreprise avec cet email existe
        if (!entreprise) {
            return res.status(401).json({ message: 'Adresse e-mail incorrecte' });
        }

        // Vérifiez si le mot de passe fourni correspond au mot de passe haché dans la base de données
        const passwordMatch = await entreprise.password;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        }

        // Si les identifiants sont valides, générez un jeton d'authentification
        const token = jwt.sign({ id: entreprise._id }, 'votre_clé_secrète', { expiresIn: '1h' });

        // Renvoyer le jeton d'authentification dans la réponse
        res.status(200).json({ token, entrepriseId: entreprise._id , entrepriseName: entreprise.nom}); // Ajoutez l'ID de l'entreprise à la réponse
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion' });
    }
};

// Create
const createEntreprise = async (req, res) => {
    try {
        const entreprise = new Entreprise(req.body);
        await entreprise.save();
        res.status(201).send(entreprise);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Read all
const getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await Entreprise.find();
        res.send(entreprises);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Read by ID
const getEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update by ID
const updateEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete by ID
const deleteEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
        if (!entreprise) {
            return res.status(404).send('Entreprise non trouvée');
        }
        res.send(entreprise);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createEntreprise,
    getAllEntreprises,
    getEntrepriseById,
    updateEntrepriseById,
    deleteEntrepriseById,
    loginEntreprise
};
