const Tutor = require('../models/tutor');

// Récupérer tous les tuteurs
exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.findAll();
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un tuteur par id
exports.getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un tuteur
exports.createTutor = async (req, res) => {
  try {
    const { fullName, experienceYears, subjects, levels, availability } = req.body;
    const tutor = await Tutor.create({ fullName, experienceYears, subjects, levels, availability });
    res.status(201).json(tutor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un tuteur
exports.updateTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });

    const { fullName, experienceYears, subjects, levels, availability } = req.body;
    await tutor.update({ fullName, experienceYears, subjects, levels, availability });
    res.json(tutor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un tuteur
exports.deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });

    await tutor.destroy();
    res.json({ message: 'Tutor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
