const express = require('express');
const router = express.Router();
const { passport, refreshAccessToken, spotifyApi } = require('./auth'); // Import spotifyApi here
const { globalRefreshToken } = require('./auth'); // Import globalRefreshToken
const SpotifyWebApi = require('spotify-web-api-node');

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
  await refreshAccessToken(); // Refresh the token if needed
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