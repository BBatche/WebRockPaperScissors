// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.get('/', (req, res) => {
  console.log('GET /');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/game', (req, res) => {
	if (req.session.user) {
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
  } else {
    res.status(401).send('Unauthorized');
  }
});
  
app.get('/api/auth/logout', (req, res) => {
  // Clear token from session (if any)
  // Optionally, you can also invalidate the token from the client-side
  res.clearCookie('token'); // Clear token from cookies (if using cookies for session management)
  res.status(200).json({ message: 'Logged out successfully' });
});
// Routes
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
// Add protected route
app.use('/api', require('./routes/protectedRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
