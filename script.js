const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const searchInput = document.getElementById('searchInput');
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const courseCards = [...document.querySelectorAll('.course-card')];
const emptyState = document.getElementById('emptyState');
let activeFilter = 'all';

function filterCourses() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  courseCards.forEach(card => {
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesTerm = !term || (card.dataset.search + ' ' + card.innerText).toLowerCase().includes(term);
    const show = matchesCategory && matchesTerm;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  filterCourses();
}));
searchInput.addEventListener('input', filterCourses);
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

const plannerForm = document.getElementById('plannerForm');
const planResult = document.getElementById('planResult');
plannerForm.addEventListener('submit', event => {
  event.preventDefault();
  const subject = document.getElementById('subject').value.trim();
  const goal = document.getElementById('goal').value.trim() || 'Review the key ideas and write down one question.';
  const minutes = Number(new FormData(plannerForm).get('minutes') || 25);
  const learn = Math.max(5, Math.round(minutes * 0.6));
  const practice = Math.max(3, Math.round(minutes * 0.28));
  const recap = Math.max(2, minutes - learn - practice);
  planResult.innerHTML = `<strong>Your ${minutes}-minute plan for ${escapeHTML(subject)}</strong><ol><li>${learn} min — Learn: focus on “${escapeHTML(goal)}”</li><li>${practice} min — Practice: solve a problem or explain the idea in your own words.</li><li>${recap} min — Recap: note what you understood and what to revisit.</li></ol>`;
  planResult.hidden = false;
});
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
document.getElementById('year').textContent = new Date().getFullYear();
