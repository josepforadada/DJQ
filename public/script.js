document.addEventListener('DOMContentLoaded', function() {
    // Check user's login status and load playlist if logged in
    checkLoginStatus();

    // Function to check if user is logged in
    function checkLoginStatus() {
        // Placeholder: Your implementation may vary
        fetch('/api/check-login')
            .then(response => response.json())
            .then(data => {
                updatePageContent(data.loggedIn);
                if (data.loggedIn) {
                    loadPlaylist();
                }
            });
    }

    // Function to update page content based on login status
    function updatePageContent(isLoggedIn) {
        const userContentDiv = document.getElementById('userContent');

        if (isLoggedIn) {
            userContentDiv.innerHTML = '<p>Welcome back! Here is your Spotify data...</p>';
        } else {
            userContentDiv.innerHTML = '<p>Please log in to view your Spotify data.</p>';
        }
    }

    // Function to load and display Spotify playlist
    function loadPlaylist() {
        fetch('/loadplaylist')
            .then(response => response.json())
            .then(playlistData => {
                displayPlaylist(playlistData);
            })
            .catch(error => console.error('Error loading playlist:', error));
    }

    // Function to display Spotify playlist data
    function displayPlaylist(playlistData) {
        const playlistContainer = document.getElementById('playlistContainer');
        playlistContainer.innerHTML = ''; // Clear existing content

        // Display each playlist
        playlistData.items.forEach(playlist => {
            const playlistElement = document.createElement('div');
            playlistElement.innerHTML = `<h3>${playlist.name}</h3>`;
            playlistContainer.appendChild(playlistElement);
        });
    }
});