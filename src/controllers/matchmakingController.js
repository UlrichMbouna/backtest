const { Student, Tutor, Availability } = require('../models/associations');
// const Student = require('../models/student');
// const Tutor = require('../models/tutor');
// const Availability = require('../models/availability');






exports.getMatchesForStudent = async (req, res) => {
    try {
      const studentId = req.params.id;
  
      // Récupérer l'étudiant avec ses disponibilités
      const student = await Student.findByPk(studentId, {
        include: [{
          model: Availability,
          as: 'availabilities',
          where: { ownerType: 'STUDENT' },
          required: false
        }]
      });
  
      if (!student) return res.status(404).json({ error: 'Student not found' });
  
      // Récupérer tous les tuteurs avec leurs disponibilités
      const tutors = await Tutor.findAll({
        include: [{
          model: Availability,
          as: 'availabilities',
          where: { ownerType: 'TUTOR' },
          required: false
        }]
      });
  
      // Faire le matchmaking
      const matches = tutors.map(tutor => {
        let score = 0;
  
        // 1️⃣ Matières communes
        const commonSubjects = tutor.subjects.filter(sub => student.subjects.includes(sub));
        if (commonSubjects.length > 0) score += 40;
  
        // 2️⃣ Niveau scolaire
        if (tutor.levels.includes(student.level)) score += 30;
  
        // 3️⃣ Disponibilités communes
        const availableSlots = matchAvailability(student.availabilities, tutor.availabilities);
        if (availableSlots.length > 0) score += 30;
  
        return { tutor, score, availableSlots };
      })
      .filter(m => m.score > 0)          // on ne garde que les correspondances > 0
      .sort((a, b) => b.score - a.score); // tri par score décroissant
  
      res.json(matches);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };





function timeOverlap(aStart, aEnd, bStart, bEnd) {
  return (aStart < bEnd && bStart < aEnd);
}

function matchAvailability(studentAvail, tutorAvail) {
    if (!Array.isArray(studentAvail)) studentAvail = [];
    if (!Array.isArray(tutorAvail)) tutorAvail = [];
  
    let matchedSlots = [];
  
    for (let slot of studentAvail) {
      if (!slot?.start || !slot?.end) continue; // ignorer si start ou end manquant
  
      for (let tutorSlot of tutorAvail) {
        if (!tutorSlot?.start || !tutorSlot?.end) continue; // ignorer si start ou end manquant
  
        if (slot.day === tutorSlot.day) {
          // comparer les heures
          const startStudent = parseInt(slot.start.replace(':',''));
          const endStudent = parseInt(slot.end.replace(':',''));
          const startTutor = parseInt(tutorSlot.start.replace(':',''));
          const endTutor = parseInt(tutorSlot.end.replace(':',''));
  
          if (startStudent < endTutor && endStudent > startTutor) {
            matchedSlots.push({ student: slot, tutor: tutorSlot });
          }
        }
      }
    }
  
    return matchedSlots;
  }
  
  

// exports.getMatchesForStudent = async (req, res) => {
//   const studentId = req.params.id;
//   const student = await Student.findByPk(studentId);
//   if (!student) return res.status(404).json({ error: 'Student not found' });

//   const tutors = await Tutor.findAll();

//   const matches = tutors
//     .map(tutor => {
//       let score = 0;

//       // Matière correspond
//       const commonSubjects = tutor.subjects.filter(sub => student.subjects.includes(sub));
//       if (commonSubjects.length > 0) score += 40;

//       // Niveau correspond
//       if (tutor.levels.includes(student.level)) score += 30;

//       // Disponibilité correspond
//       if (matchAvailability(student.availability, tutor.availability)) score += 30;

//       return { tutor, score };
//     })
//     .filter(m => m.score > 0)
//     .sort((a, b) => b.score - a.score);

//   res.json(matches);
// };
