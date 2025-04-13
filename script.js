// script.js

// Updated songs data with separate fields
const songs = [
  {
    animeTitle: "Apothecary Diaries Season 2",
    songType: "Opening",
    number: 1,
    songName: "Hyakka Ryouran",
    artist: "Unknown Artist", // Update as needed
    excerpt: "Feel the surge of bravery with this inspiring new lyric that brings heroes to life.",
    link: "lyric-pages/hyakka-ryouran.html" // Adjust file link
  },
];

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

// Function to filter songs based on the search query (searching within animeTitle, songName, or artist)
function filterSongs(query) {
  return songs.filter(song => 
    song.animeTitle.toLowerCase().includes(query.toLowerCase()) ||
    song.songName.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );
}

// Initial rendering of all songs
renderSongs(songs);

// Set up event listeners for search functionality
document.getElementById('searchInput').addEventListener('keyup', function () {
  const query = this.value;
  const filteredSongs = filterSongs(query);
  renderSongs(filteredSongs);
});

// Optional: Click handler for the search button (filters on click as well)
document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value;
  const filteredSongs = filterSongs(query);
  renderSongs(filteredSongs);
});
