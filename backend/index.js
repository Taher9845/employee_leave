require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leaves');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
