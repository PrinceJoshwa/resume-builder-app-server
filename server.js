// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const resumeRoutes = require('./routes/resume');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/resume', resumeRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const resumeRoutes = require('./routes/resume');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'https://resume-builder-app-client.vercel.app',
//   credentials: true,
// }));
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/resume', resumeRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

dotenv.config();

const app = express();

// Middleware for CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'https://resume-builder-app-client.vercel.app',
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests globally
app.options('*', cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
