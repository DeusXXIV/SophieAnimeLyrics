// browse.js

// Sample songs array – add your actual song data here. Extend this list as needed.
const songs = [
    {
      animeTitle: "Apothecary Diaries Season 2",
      songType: "Opening",
      number: 1,
      songName: "Hyakka Ryouran",
      artist: "Unknown Artist",
      excerpt: "Feel the surge of bravery with this inspiring new lyric...",
      link: "lyric-pages/hyakka-ryouran.html"
    },
    {
      animeTitle: "Attack on Titan",
      songType: "Anthem",
      number: null,
      songName: "Anthem",
      artist: "Unknown Artist",
      excerpt: "Discover the power and intensity in the struggle for freedom.",
      link: "lyric-pages/attack-on-titan-anthem.html"
    },
    {
      animeTitle: "Naruto",
      songType: "Opening",
      number: 2,
      songName: "Naruto Opening 2",
      artist: "Unknown Artist",
      excerpt: "Experience the energy and emotion that captures the spirit of the anime.",
      link: "lyric-pages/naruto-opening2.html"
    },
    // Add more song objects as needed...
  ];
  
  // Group songs by animeTitle, including both the count and the list of songs.
  function groupSongsByAnime(songsArray) {
    const groups = {};
    songsArray.forEach(song => {
      const title = song.animeTitle;
      if (!groups[title]) {
        groups[title] = { animeTitle: title, count: 0, songs: [] };
      }
      groups[title].count++;
      groups[title].songs.push(song);
    });
    return groups;
  }
  
  // Render the anime list for a given letter (or "special").
  // Each anime title becomes clickable and toggles a nested list of songs.
  function renderAnimeList(letter) {
    const groups = groupSongsByAnime(songs);
    const container = document.getElementById('animeListContainer');
    container.innerHTML = ""; // Clear any existing content
  
    // Convert groups into an array for easier processing
    const animeArray = Object.values(groups);
  
    // Filter based on the selected letter. For "special", show titles not starting with A-Z.
    const filteredAnime = animeArray.filter(anime => {
      const firstChar = anime.animeTitle.charAt(0).toUpperCase();
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
  
    // Create a Bootstrap list group to display anime names.
    const ul = document.createElement('ul');
    ul.className = "list-group";
  
    filteredAnime.forEach(anime => {
      // Create a list item for each anime title.
      const li = document.createElement('li');
      li.className = "list-group-item";
      li.style.cursor = "pointer"; // Indicate it's clickable
  
      // Build the inner HTML with a toggle icon and badge count.
      li.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <span>${anime.animeTitle} <span class="badge bg-primary rounded-pill">${anime.count}</span></span>
          <span class="toggle-icon">+</span>
        </div>
      `;
  
      // Create a hidden nested unordered list for the songs.
      const songUl = document.createElement('ul');
      songUl.className = "list-group mt-2";
      songUl.style.display = "none"; // Hide by default
  
      // For each song in this anime group, add a clickable list item.
      anime.songs.forEach(song => {
        const songLi = document.createElement('li');
        songLi.className = "list-group-item";
        // Each song title becomes a clickable link directing to its song page.
        songLi.innerHTML = `<a href="${song.link}">${song.songName}</a>`;
        songUl.appendChild(songLi);
      });
  
      li.appendChild(songUl);
  
      // Toggle the nested song list when the anime title is clicked.
      li.addEventListener('click', function(e) {
        // Avoid toggling when clicking on the nested link
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
  
  // Set up event listeners for each letter button.
  document.querySelectorAll('.letter-btn').forEach(button => {
    button.addEventListener('click', function() {
      const letter = this.getAttribute('data-letter');
      renderAnimeList(letter);
    });
  });
  
  // Enable search functionality (by anime name) on the browse page.
  function renderAnimeListForSearch(query) {
    const groups = groupSongsByAnime(songs);
    const container = document.getElementById('animeListContainer');
    container.innerHTML = ""; // Clear existing list
  
    const animeArray = Object.values(groups);
    const filtered = animeArray.filter(anime =>
      anime.animeTitle.toLowerCase().includes(query)
    );
  
    if (filtered.length === 0) {
      container.innerHTML = "<p>No anime match your search.</p>";
      return;
    }
  
    // Create a list group for search results.
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
  
  document.getElementById('browseSearchInput').addEventListener('keyup', function() {
    const query = this.value.toLowerCase();
    renderAnimeListForSearch(query);
  });
  
  // Optional: also set up the search button click for the browse page.
  document.getElementById('browseSearchButton').addEventListener('click', function() {
    const query = document.getElementById('browseSearchInput').value.toLowerCase();
    renderAnimeListForSearch(query);
  });
  