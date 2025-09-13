const Student = require('../models/student');

// Récupérer tous les étudiants
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un étudiant par id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un étudiant
exports.createStudent = async (req, res) => {
  try {
    const { fullName, level, subjects, availability } = req.body;
    const student = await Student.create({ fullName, level, subjects, availability });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un étudiant
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const { fullName, level, subjects, availability } = req.body;
    await student.update({ fullName, level, subjects, availability });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un étudiant
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
