const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./auth'); // Passport configuration for Spotify

const app = express();

// Static files
app.use(express.static('public'));

// Express session configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Session secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookies in production
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Routes
const routes = require('./routes');
app.use(routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;