const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const taskRoutes = require('./routes/task.route');
const sequelize = require('./config/db');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

const PORT = process.env.PORT;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
