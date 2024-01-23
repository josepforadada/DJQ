const express = require('express');
const router = express.Router();
const passport = require('passport');
const { globalRefreshToken } = require('./auth'); // Import globalRefreshToken
const SpotifyWebApi = require('spotify-web-api-node');

// Configure Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_CALLBACK_URL
});

// Assuming you have an access token (you need to implement the logic to retrieve this)
const accessToken = 'your_spotify_access_token_here';
spotifyApi.setAccessToken(accessToken);


// Function to refresh the access token
async function refreshAccessToken() {
  try {
      const data = await spotifyApi.refreshAccessToken(globalRefreshToken);
      spotifyApi.setAccessToken(data.body['access_token']);
  } catch (error) {
      console.error('Error refreshing access token', error);
  }
}

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the Spotify Integration Example');
});

// Spotify authentication route
router.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private'],
  showDialog: true
}));

// Callback route for Spotify to redirect to
router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Route to fetch and return a Spotify playlist
router.get('/playlist', async (req, res) => {
  try {
    const playlistId = '1y8uGgL1AdkVdZ7jYiNl6W'; // Replace with your playlist ID
    const data = await spotifyApi.getPlaylist(playlistId);
    res.json(data.body);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).send('Error retrieving playlist');
  }
});

module.exports = router;