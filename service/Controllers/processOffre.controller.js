const ProcessOffre = require('../models/ProcessOffre.model');

// Créer un processus pour une offre
exports.createProcess = async (req, res) => {
    try {
        const processOffre = new ProcessOffre(req.body);
        await processOffre.save();
        res.status(201).send(processOffre);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Récupérer tous les processus liés à une offre par son ID
exports.getAllProcessByOffreId = async (req, res) => {
    try {
        const process = await ProcessOffre.findOne({ idOffre: req.params.idOffre });
        res.send(process);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.deleteProcessById = async (req, res) => {
    try {
        const processOffre = await ProcessOffre.findByIdAndDelete(req.params.id);
        if (!processOffre) {
            return res.status(404).send('Processus non trouvé');
        }
        res.send(processOffre);
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.modifyProcessById = async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;

    try {
        const updatedProcess = await ProcessOffre.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedProcess) {
            return res.status(404).send('Processus non trouvé');
        }
        res.status(200).send(updatedProcess);
    } catch (err) {
        res.status(400).send(err);
    }
};
exports.getAllProcesses = async (req, res) => {
    try {
        const processes = await ProcessOffre.find();
        res.send(processes);
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.deleteAllProcesses = async (req, res) => {
    try {
        const result = await ProcessOffre.deleteMany({});
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.getProcessById = async (req, res) => {
    try {
        const processOffre = await ProcessOffre.findById(req.params.id);
        if (!processOffre) {
            return res.status(404).send('Processus non trouvé');
        }
        res.send(processOffre);
    } catch (err) {
        res.status(500).send(err);
    }
};
