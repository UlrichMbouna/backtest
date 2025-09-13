const express = require('express');
const sequelize = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const tutorsRoutes = require('./routes/tutorRoutes');
const matchmakingRoutes = require('./routes/matchmakingRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const cors = require('cors'); 

const app = express();
app.use(cors()); // autorise toutes les origines

app.use(express.json());
app.use('/availabilities', availabilityRoutes);
app.use('/students', studentRoutes);
app.use('/tutors', tutorsRoutes);
app.use('/match', matchmakingRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
