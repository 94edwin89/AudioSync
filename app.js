const express = require('express');
const app = express();
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Configuring .env
dotenv.config({ path: 'config.env' });

app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: false }));

// Initialize express-session middleware
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

function checkSession(req, res, next) {
  if (req.session.user) {
    // session exists, redirect to the home page
    return res.render('index');
  }
  // session doesn't exist, proceed with the request
  next();
}

// Default route
app.get('/', checkSession, (req, res) => {
  res.render('user/partials/login', {
    documentTitle: 'User Login | AudioSync',
    session: null,
  });
});

// Signup route
app.get('/signup', (req, res) => {
  res.render('user/partials/signup', {
    documentTitle: 'User SignUp | AudioSync',
    session: null,
  });
});





const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error starting Error' + err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
