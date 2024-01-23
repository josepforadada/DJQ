const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

// Passport configuration for Spotify OAuth
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    // Here, you will typically find or create a user in your database
    // For now, we'll just pass the profile which contains user info
    globalRefreshToken = refreshToken; // Save the refresh token
    done(null, profile);
  }
));

// Serialize user information into the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserialize user information from the session
passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;