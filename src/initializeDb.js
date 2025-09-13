const sequelize = require('./config/db');
const Student = require('./models/student');
const Tutor = require('./models/tutor');
const Level = require('./models/enums/level');
const Subject = require('./models/enums/subject');
const Availability = require('./models/availability');




async function initializeDb() {
  try {
    // Synchroniser la DB (crée les tables si elles n'existent pas)
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // ---- Création des étudiants ----
    const student1 = await Student.create({
      fullName: "Ali",
      level: "LYCEE",
      subjects: ["MATHEMATIQUES"]
    });

    const student2 = await Student.create({
      fullName: "Yasmine",
      level: "COLLEGE",
      subjects: ["PHYSIQUE"]
    });

    // ---- Création des tuteurs ----
    const tutor1 = await Tutor.create({
      fullName: "Ahmed",
      experienceYears: 3,
      subjects: ["MATHEMATIQUES"],
      levels: ["LYCEE"]
    });

    const tutor2 = await Tutor.create({
      fullName: "Sarah",
      experienceYears: 5,
      subjects: ["PHYSIQUE"],
      levels: ["COLLEGE","LYCEE"]
    });

    const tutor3 = await Tutor.create({
      fullName: "Karim",
      experienceYears: 2,
      subjects: ["FRANCAIS"],
      levels: ["TERMINALE"]
    });

    // ---- Création des disponibilités ----

    // Etudiants
    await Availability.bulkCreate([
      {
        dayOfWeek: "LUNDI",
        startTime: "18:00",
        endTime: "20:00",
        ownerType: "STUDENT",
        ownerId: student1.id
      },
      {
        dayOfWeek: "MERCREDI",
        startTime: "14:00",
        endTime: "16:00",
        ownerType: "STUDENT",
        ownerId: student2.id
      }
    ]);

    // Tuteurs
    await Availability.bulkCreate([
      {
        dayOfWeek: "LUNDI",
        startTime: "18:00",
        endTime: "20:00",
        ownerType: "TUTOR",
        ownerId: tutor1.id
      },
      {
        dayOfWeek: "MERCREDI",
        startTime: "14:00",
        endTime: "16:00",
        ownerType: "TUTOR",
        ownerId: tutor2.id
      },
      {
        dayOfWeek: "SAMEDI",
        startTime: "10:00",
        endTime: "19:00",
        ownerType: "TUTOR",
        ownerId: tutor1.id
      },
      {
        dayOfWeek: "LUNDI",
        startTime: "18:00",
        endTime: "20:00",
        ownerType: "TUTOR",
        ownerId: tutor3.id
      }
    ]);

    console.log('Database initialized with students, tutors, and availabilities');
    process.exit();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDb();