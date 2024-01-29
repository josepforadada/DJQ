const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyWebApi = require('spotify-web-api-node');

// Initialize SpotifyWebApi with credentials
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_CALLBACK_URL
});

// Passport strategy configuration for Spotify
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
        // Store access and refresh tokens using SpotifyWebApi
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        done(null, profile);  // Proceed with the user profile
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

// Function to refresh the access token
async function refreshAccessToken() {
    try {
        const data = await spotifyApi.refreshAccessToken();
        const newAccessToken = data.body['access_token'];
        spotifyApi.setAccessToken(newAccessToken);
    } catch (error) {
        console.error('Error refreshing access token', error);
    }
}

// Exporting required modules and functions
module.exports = { passport, refreshAccessToken, spotifyApi };
