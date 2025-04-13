document.addEventListener('DOMContentLoaded', function() {
  // Define an array of mock lyric objects
  const mockLyrics = [
    {
      title: "Naruto - Opening 2",
      excerpt: "A new song lyric is available here. Experience the energy and emotion that captures the spirit of the anime.",
      link: "#"
    },
    {
      title: "One Piece - New Theme",
      excerpt: "The latest addition to our collection. Sail away with the dynamic waves of adventure and melody.",
      link: "#"
    },
    {
      title: "Attack on Titan - Anthem",
      excerpt: "Discover the power and intensity of this theme that encapsulates the struggle for freedom.",
      link: "#"
    },
    {
      title: "My Hero Academia - Rising Dawn",
      excerpt: "Feel the surge of bravery with this inspiring new lyric that brings heroes to life.",
      link: "#"
    }
  ];

  // Locate elements on the page
  const container = document.getElementById('new-lyrics-container');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Function to render lyrics based on a provided array
  function renderLyrics(lyricsArray) {
    let html = '';
    lyricsArray.forEach(item => {
      html += `
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.excerpt}</p>
          <a href="${item.link}" class="btn btn-primary">Read Full Lyrics</a>
        </div>
      </div>
      `;
    });
    container.innerHTML = html;
  }

  // Initially, render all lyrics
  renderLyrics(mockLyrics);

  // Function to perform a search on the song titles
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderLyrics(mockLyrics);
      return;
    }
    const filteredLyrics = mockLyrics.filter(item => item.title.toLowerCase().includes(query));
    renderLyrics(filteredLyrics);
  }

  // Attach event handlers for search
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', performSearch);
});
