// script.js

// Initialize an empty songs variable
let songs = [];

// Fetch song data from the JSON file
fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    songs = data;
    // Render all songs once the data is loaded
    renderSongs(songs);
  })
  .catch(error => console.error('Error fetching songs data:', error));

// Function to render the songs into the DOM
function renderSongs(songList) {
  const container = document.getElementById('lyricsContainer');
  container.innerHTML = ''; // Clear previous content

  if (songList.length === 0) {
    container.innerHTML = '<p>No songs match your search.</p>';
    return;
  }

  songList.forEach(song => {
    // Construct a formatted title using the separate fields
    let formattedTitle = song.animeTitle;
    if (song.songType) {
      formattedTitle += ` - ${song.songType}`;
      if (song.number) {
        formattedTitle += ` ${song.number}`;
      }
    }
    formattedTitle += `: ${song.songName}`;

    // Create the card element using Bootstrap classes
    const card = document.createElement('div');
    card.className = 'card my-3';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${formattedTitle}</h5>
        <p class="card-text">
          <strong>Artist:</strong> ${song.artist}<br>
          ${song.excerpt}
        </p>
        <a href="${song.link}" class="btn btn-primary">Read Full Lyrics</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Function to filter songs based on the search query
function filterSongs(query) {
  return songs.filter(song => 
    song.animeTitle.toLowerCase().includes(query.toLowerCase()) ||
    song.songName.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );
}

// Set up search functionality
document.getElementById('searchInput').addEventListener('keyup', function () {
  const query = this.value;
  const filteredSongs = filterSongs(query);
  renderSongs(filteredSongs);
});
document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value;
  const filteredSongs = filterSongs(query);
  renderSongs(filteredSongs);
});
