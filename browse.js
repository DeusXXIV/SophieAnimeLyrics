// browse.js

// Global songs variable
let songs = [];

// Fetch song data from the JSON file
fetch('songs.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    console.log('Songs loaded:', data);
    songs = data;
    // On initial load, render all anime with pagination
    renderAllAnimeList();
  })
  .catch(error => console.error('Error fetching songs data:', error));

// Group songs by animeTitle, including both the count and the list of songs.
function groupSongsByAnime(songsArray) {
  const groups = {};
  songsArray.forEach(song => {
    const title = song.animeTitle.trim();
    if (!groups[title]) {
      groups[title] = { animeTitle: title, count: 0, songs: [] };
    }
    groups[title].count++;
    groups[title].songs.push(song);
  });
  return groups;
}

// ===========================
// Default view: All anime with pagination
// ===========================

function renderAllAnimeList() {
  const groups = groupSongsByAnime(songs);
  let animeArray = Object.values(groups);
  // Sort alphabetically by animeTitle.
  animeArray.sort((a, b) => a.animeTitle.localeCompare(b.animeTitle));

  const container = document.getElementById('animeListContainer');
  container.innerHTML = ""; // Clear previous content

  const pageSize = 10;
  let currentPage = 1;

  function renderPage(page) {
    container.innerHTML = "";
    const itemsToShow = animeArray.slice(0, page * pageSize);
    // Create a Bootstrap list group
    const ul = document.createElement('ul');
    ul.className = "list-group";

    itemsToShow.forEach(anime => {
      // Create list item for each anime.
      const li = document.createElement('li');
      li.className = "list-group-item";
      li.style.cursor = "pointer";
      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <span>${anime.animeTitle} <span class="badge bg-primary rounded-pill">${anime.count}</span></span>
          <span class="toggle-icon">+</span>
        </div>
      `;
      // Nested UL for songs (hidden by default)
      const songUl = document.createElement('ul');
      songUl.className = "list-group mt-2";
      songUl.style.display = "none";

      anime.songs.forEach(song => {
        const songLi = document.createElement('li');
        songLi.className = "list-group-item";
        // Make song name clickable
        songLi.innerHTML = `<a href="${song.link}">${song.songName}</a>`;
        songUl.appendChild(songLi);
      });
      li.appendChild(songUl);
      li.addEventListener('click', function(e) {
        // Avoid toggling if clicking on a link.
        if (e.target.tagName.toLowerCase() === "a") return;
        if (songUl.style.display === "none") {
          songUl.style.display = "block";
          li.querySelector(".toggle-icon").textContent = "-";
        } else {
          songUl.style.display = "none";
          li.querySelector(".toggle-icon").textContent = "+";
        }
      });
      ul.appendChild(li);
    });
    container.appendChild(ul);

    // If there are more items to show, add a "Show More" button
    if (itemsToShow.length < animeArray.length) {
      const btn = document.createElement('button');
      btn.className = "btn btn-secondary mt-3";
      btn.textContent = "Show More";
      btn.addEventListener('click', () => {
        currentPage++;
        renderPage(currentPage);
      });
      container.appendChild(btn);
    }
  }

  renderPage(currentPage);
}

// ===========================
// Existing letter filter and search functionalities remain below.
// ===========================

// Render the anime list for a given letter (or "special").
function renderAnimeList(letter) {
  const groups = groupSongsByAnime(songs);
  const container = document.getElementById('animeListContainer');
  container.innerHTML = ""; // Clear any existing content

  const animeArray = Object.values(groups);
  // Filter based on the selected letter.
  const filteredAnime = animeArray.filter(anime => {
    const firstChar = anime.animeTitle.trim().charAt(0).toUpperCase();
    if (letter === "special") {
      return !/^[A-Z]$/.test(firstChar);
    } else {
      return firstChar === letter;
    }
  });

  if (filteredAnime.length === 0) {
    container.innerHTML = "<p>No anime found for this letter.</p>";
    return;
  }

  const ul = document.createElement('ul');
  ul.className = "list-group";

  filteredAnime.forEach(anime => {
    const li = document.createElement('li');
    li.className = "list-group-item";
    li.style.cursor = "pointer";
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <span>${anime.animeTitle} <span class="badge bg-primary rounded-pill">${anime.count}</span></span>
        <span class="toggle-icon">+</span>
      </div>
    `;
    const songUl = document.createElement('ul');
    songUl.className = "list-group mt-2";
    songUl.style.display = "none";

    anime.songs.forEach(song => {
      const songLi = document.createElement('li');
      songLi.className = "list-group-item";
      songLi.innerHTML = `<a href="${song.link}">${song.songName}</a>`;
      songUl.appendChild(songLi);
    });
    li.appendChild(songUl);
    li.addEventListener('click', function(e) {
      if (e.target.tagName.toLowerCase() === "a") return;
      if (songUl.style.display === "none") {
        songUl.style.display = "block";
        li.querySelector(".toggle-icon").textContent = "-";
      } else {
        songUl.style.display = "none";
        li.querySelector(".toggle-icon").textContent = "+";
      }
    });
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// Render anime list based on a search query.
function renderAnimeListForSearch(query) {
  const groups = groupSongsByAnime(songs);
  const container = document.getElementById('animeListContainer');
  container.innerHTML = "";

  const animeArray = Object.values(groups);
  const filtered = animeArray.filter(anime =>
    anime.animeTitle.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    container.innerHTML = "<p>No anime match your search.</p>";
    return;
  }

  const ul = document.createElement('ul');
  ul.className = "list-group";

  filtered.forEach(anime => {
    const li = document.createElement('li');
    li.className = "list-group-item";
    li.style.cursor = "pointer";
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <span>${anime.animeTitle} <span class="badge bg-primary rounded-pill">${anime.count}</span></span>
        <span class="toggle-icon">+</span>
      </div>
    `;
    const songUl = document.createElement('ul');
    songUl.className = "list-group mt-2";
    songUl.style.display = "none";

    anime.songs.forEach(song => {
      const songLi = document.createElement('li');
      songLi.className = "list-group-item";
      songLi.innerHTML = `<a href="${song.link}">${song.songName}</a>`;
      songUl.appendChild(songLi);
    });
    li.appendChild(songUl);
    li.addEventListener('click', function(e) {
      if (e.target.tagName.toLowerCase() === "a") return;
      if (songUl.style.display === "none") {
        songUl.style.display = "block";
        li.querySelector(".toggle-icon").textContent = "-";
      } else {
        songUl.style.display = "none";
        li.querySelector(".toggle-icon").textContent = "+";
      }
    });
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

// Event listeners for letter buttons
document.querySelectorAll('.letter-btn').forEach(button => {
  button.addEventListener('click', function() {
    const letter = this.getAttribute('data-letter');
    // When a letter button is clicked, override the default display.
    renderAnimeList(letter);
  });
});

// Event listeners for the search bar
document.getElementById('browseSearchInput').addEventListener('keyup', function() {
  const query = this.value.toLowerCase();
  renderAnimeListForSearch(query);
});
document.getElementById('browseSearchButton').addEventListener('click', function() {
  const query = document.getElementById('browseSearchInput').value.toLowerCase();
  renderAnimeListForSearch(query);
});
