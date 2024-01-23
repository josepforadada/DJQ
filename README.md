# Spotify Playlist Integration App

## Overview
This Node.js web application integrates with the Spotify API to authenticate users and display a Spotify playlist. It utilizes Express for the server, Passport.js for Spotify OAuth authentication, and provides a simple frontend to display playlist details.

## Prerequisites
- Node.js installed
- A Spotify Developer account and a registered Spotify application
- Your Spotify Client ID, Client Secret, and Callback URL

## Setup
1. **Clone the Repository**
git clone [repository-url]
cd [repository-name]


2. **Install Dependencies**
Navigate to the project directory and run:
npm install


3. **Environment Variables**
Create a `.env` file in the root directory with the following content:
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_CALLBACK_URL=http://localhost:3000/callback
SESSION_SECRET=your_randomly_generated_secret_here
PORT=3000


4. **Starting the Server**
node src/app.js

The server will start on `http://localhost:3000` (or your specified PORT).

## Usage
After starting the server, navigate to `http://localhost:3000` in your web browser. You can authenticate with Spotify and view the specified playlist.

## Project Structure
- `src/` - Backend source files
- `app.js` - Main server file
- `auth.js` - Passport Spotify authentication configuration
- `routes.js` - Express routes
- `public/` - Frontend files
- `index.html` - Main HTML file
- `script.js` - Frontend JavaScript
- `styles.css` - CSS styles
- `.env` - Environment variables
- `.gitignore` - Specifies files to be ignored in version control
- `README.md` - Project documentation (this file)

## Contributing
Contributions to this project are welcome. Please fork the repository and open a pull request with your changes.

## License
[Specify License Here]

## Contact
[Your Contact Information]