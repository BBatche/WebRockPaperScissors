// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


// Routes
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
// Add protected route
app.use('/api', require('./routes/protectedRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
