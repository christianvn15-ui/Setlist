const songForm = document.getElementById('songForm');
const songInput = document.getElementById('songInput');
const songList = document.getElementById('songList');

// Load saved songs
window.addEventListener('DOMContentLoaded', () => {
  const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
  savedSongs.forEach(title => addSong(title));
});

// Add song to list
songForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = songInput.value.trim();
  if (title) {
    addSong(title);
    saveSongs();
    songInput.value = '';
  }
});

function addSong(title) {
  const li = document.createElement('li');
  li.textContent = title;
  li.setAttribute('draggable', 'true');
  songList.appendChild(li);
}

// Drag-and-drop logic
let draggedItem = null;

songList.addEventListener('dragstart', (e) => {
  draggedItem = e.target;
  e.target.style.opacity = '0.5';
});

songList.addEventListener('dragend', (e) => {
  e.target.style.opacity = '1';
  saveSongs(); // Save after drag ends
});

songList.addEventListener('dragover', (e) => {
  e.preventDefault();
});

songList.addEventListener('drop', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'LI' && e.target !== draggedItem) {
    const allItems = [...songList.children];
    const draggedIndex = allItems.indexOf(draggedItem);
    const targetIndex = allItems.indexOf(e.target);

    if (draggedIndex < targetIndex) {
      songList.insertBefore(draggedItem, e.target.nextSibling);
    } else {
      songList.insertBefore(draggedItem, e.target);
    }
  }
});

// Save current list to localStorage
function saveSongs() {
  const titles = [...songList.children].map(li => li.textContent);
  localStorage.setItem('songs', JSON.stringify(titles));
}
