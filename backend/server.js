const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const issueRoutes = require('./routes/issueRoutes');
const connectDB = require('./config/db');

console.log(typeof healthRoutes);
require('dotenv').config();



const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to CampusFix API')
})

app.use('/api', healthRoutes);
app.use('/api/issues', issueRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`CampusFix server running on port ${PORT}`);
});