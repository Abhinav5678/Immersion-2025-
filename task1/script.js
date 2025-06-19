const notesContainer = document.getElementById('notes-container');
const LOCAL_STORAGE_KEY = 'simple_notes';

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
}

function saveNotes(notes) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function createNoteElement(note, idx) {
  const div = document.createElement('div');
  div.className = 'note';
  div.contentEditable = true;
  div.spellcheck = false;
  div.innerText = note || 'Empty Note';
  div.setAttribute('data-idx', idx);
  div.addEventListener('input', () => {
    const notes = getNotes();
    notes[idx] = div.innerText.trim() || 'Empty Note';
    saveNotes(notes);
  });
  div.addEventListener('dblclick', () => {
    if (confirm('Delete this note?')) {
      const notes = getNotes();
      notes.splice(idx, 1);
      saveNotes(notes);
      renderNotes();
    }
  });
  div.addEventListener('focus', () => {
    if (div.innerText === 'Empty Note') div.innerText = '';
  });
  div.addEventListener('blur', () => {
    if (div.innerText.trim() === '') div.innerText = 'Empty Note';
  });
  return div;
}

function createAddNoteButton() {
  const btn = document.createElement('div');
  btn.className = 'add-note';
  btn.innerHTML = '+';
  btn.title = 'Add Note';
  btn.addEventListener('click', () => {
    const notes = getNotes();
    notes.push('');
    saveNotes(notes);
    renderNotes();
  });
  return btn;
}

function renderNotes() {
  notesContainer.innerHTML = '';
  const notes = getNotes();
  notes.forEach((note, idx) => {
    notesContainer.appendChild(createNoteElement(note, idx));
  });
  notesContainer.appendChild(createAddNoteButton());
}

renderNotes();
