async function loadPlaylist() {
    try {
        const response = await fetch('/playlist');
        const data = await response.json();
        document.getElementById('playlist-details').innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error loading playlist:', error);
        document.getElementById('playlist-details').textContent = 'Failed to load playlist';
    }
}

loadPlaylist();