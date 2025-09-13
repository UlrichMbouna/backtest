const Availability = require('../models/availability');
const Student = require('../models/student');
const Tutor = require('../models/tutor');

// Créer une disponibilité
async function createAvailability(req, res) {
  try {
    const { dayOfWeek, startTime, endTime, ownerType, ownerId } = req.body;

    // Vérifier que l'owner existe
    if (ownerType === 'STUDENT') {
      const student = await Student.findByPk(ownerId);
      if (!student) return res.status(400).json({ error: "Student not found" });
    } else if (ownerType === 'TUTOR') {
      const tutor = await Tutor.findByPk(ownerId);
      if (!tutor) return res.status(400).json({ error: "Tutor not found" });
    } else {
      return res.status(400).json({ error: "ownerType must be STUDENT or TUTOR" });
    }

    const availability = await Availability.create({
      dayOfWeek,
      startTime,
      endTime,
      ownerType,
      ownerId
    });

    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer toutes les disponibilités
async function getAllAvailabilities(req, res) {
  try {
    const availabilities = await Availability.findAll();
    res.json(availabilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer une disponibilité par ID
async function getAvailabilitiesByOwner(req, res) {
    try {
      const { ownerType, ownerId } = req.params; // on récupère les deux paramètres
  
      if (!ownerType || !ownerId) {
        return res.status(400).json({ error: "ownerType et ownerId sont requis" });
      }
  
      const availabilities = await Availability.findAll({
        where: {
          ownerType: ownerType.toUpperCase(), // "STUDENT" ou "TUTOR"
          ownerId: parseInt(ownerId)
        }
      });
  
      if (!availabilities || availabilities.length === 0) {
        return res.status(404).json({ error: "Aucune disponibilité trouvée pour cet owner" });
      }
  
      res.json(availabilities);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// Mettre à jour une disponibilité
async function updateAvailability(req, res) {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const availability = await Availability.findByPk(req.params.id);
    if (!availability) return res.status(404).json({ error: "Availability not found" });

    availability.dayOfWeek = dayOfWeek || availability.dayOfWeek;
    availability.startTime = startTime || availability.startTime;
    availability.endTime = endTime || availability.endTime;

    await availability.save();
    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer une disponibilité
async function deleteAvailability(req, res) {
  try {
    const availability = await Availability.findByPk(req.params.id);
    if (!availability) return res.status(404).json({ error: "Availability not found" });

    await availability.destroy();
    res.json({ message: "Availability deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAvailability,
  getAllAvailabilities,
  updateAvailability,
  deleteAvailability,
  getAvailabilitiesByOwner
};
