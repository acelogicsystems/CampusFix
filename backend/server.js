const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


console.log(typeof healthRoutes);
require('dotenv').config();



const app = express();
// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to CampusFix API')
})
//Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

// Error handling 
app.use(notFound);
app.use(errorHandler);


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`CampusFix server running on port ${PORT}`);
});