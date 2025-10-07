require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(express.json());
app.use('/api', todoRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server listening on port ${process.env.PORT || 3000}`)
    );
  })
  .catch(err => console.error('DB sync error:', err));
