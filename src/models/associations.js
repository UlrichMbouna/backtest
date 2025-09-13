// src/models/associations.js
const Student = require('./student');
const Tutor = require('./tutor');
const Availability = require('./availability');

// ------------------ STUDENT ------------------
Student.hasMany(Availability, { 
  foreignKey: 'ownerId', 
  constraints: false, 
  scope: { ownerType: 'STUDENT' },
  as: 'availabilities'  // <-- alias explicite
});
Availability.belongsTo(Student, { foreignKey: 'ownerId', constraints: false });

// ------------------ TUTOR ------------------
Tutor.hasMany(Availability, { 
  foreignKey: 'ownerId', 
  constraints: false, 
  scope: { ownerType: 'TUTOR' },
  as: 'availabilities'  // <-- alias explicite
});
Availability.belongsTo(Tutor, { foreignKey: 'ownerId', constraints: false });

module.exports = {
  Student,
  Tutor,
  Availability
};
