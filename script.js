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

  // Add drag events
  li.addEventListener('dragstart', handleDragStart);
  li.addEventListener('dragover', handleDragOver);
  li.addEventListener('drop', handleDrop);
  li.addEventListener('dragend', handleDragEnd);
}

// Drag-and-drop logic
let draggedItem = null;

function handleDragStart(e) {
  draggedItem = this;
  this.style.opacity = '0.5';
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  saveSongs(); // Save after drag ends
}

function handleDragOver(e) {
  e.preventDefault();
  const bounding = this.getBoundingClientRect();
  const offset = e.clientY - bounding.top;
  const half = bounding.height / 2;

  if (offset > half) {
    this.style.borderBottom = '2px solid #0078d4';
    this.style.borderTop = '';
  } else {
    this.style.borderTop = '2px solid #0078d4';
    this.style.borderBottom = '';
  }
}

function handleDrop(e) {
  e.preventDefault();
  this.style.borderTop = '';
  this.style.borderBottom = '';

  if (draggedItem !== this) {
    const bounding = this.getBoundingClientRect();
    const offset = e.clientY - bounding.top;
    const half = bounding.height / 2;

    if (offset > half) {
      songList.insertBefore(draggedItem, this.nextSibling);
    } else {
      songList.insertBefore(draggedItem, this);
    }
    saveSongs(); // Save after reordering
  }
}

// Save current list to localStorage
function saveSongs() {
  const titles = [...songList.children].map(li => li.textContent);
  localStorage.setItem('songs', JSON.stringify(titles));
}