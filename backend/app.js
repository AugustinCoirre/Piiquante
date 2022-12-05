const express = require('express');
const mongoose = require('mongoose');
const Sauce = require('./models/sauce');
const User = require('./models/user');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGODB_CONNECTIONSTRING,
{useNewUrlParser : true,
useUnifiedTopology: true})
.then(() => console.log('connexion à MongoDB réussie !'))
.catch(() => console.log('connexion à MongoDB échouée !'));

app.use((req, res, next) => {
   console.log('coucou');
   next();
});

app.use((req, res, next) => {
   res.status(201);
   next();
});

app.use((req, res, next) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
   next();
});

app.use((req, res) => {
   console.log('reponse envoyer !!');
});

module.exports = app;