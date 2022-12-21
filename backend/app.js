const express = require('express');
const mongoose = require('mongoose');
const Sauce = require('./models/sauce');
const User = require('./models/user');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTIONSTRING,
{useNewUrlParser : true,
useUnifiedTopology: true})
.then(() => console.log('connexion à MongoDB réussie !'))
.catch(() => console.log('connexion à MongoDB échouée !'));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

app.use('/api/auth', authRoutes);

app.use('api/auth', userRoutes);

module.exports = app;