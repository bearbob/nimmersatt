// ── Config ─────────────────────────────────────────────────────────────────

const FILTERS = [
  { id: 'dinner', label: 'Dinner', emoji: '🍽️', color: '#FF6B6B',
    tags: ['dinner', 'herzhaft', 'pasta', 'nudeln', 'vegetarisch'] },
  { id: 'sweet',  label: 'Sweet',  emoji: '🍰', color: '#FFD166',
    tags: ['sweet', 'süß', 'kuchen', 'kaffee', 'cookie'] },
  { id: 'bread',  label: 'Bread',  emoji: '🥖', color: '#F4A261',
    tags: ['brot', 'brötchen'] },
  { id: 'vegan',  label: 'Vegan',  emoji: '🌱', color: '#4CC9A0',
    tags: ['vegan'] },
];

const SWIPE_THRESHOLD = 80;

// ── State ──────────────────────────────────────────────────────────────────

const state = {
  allRecipes: [],
  deck: [],
  currentIndex: 0,
  activeFilters: new Set(),
  weeklyList: [],
  favorites: new Set(),
};

// ── Storage ────────────────────────────────────────────────────────────────

function loadStorage() {
  try {
    const list = JSON.parse(localStorage.getItem('nimmersatt_list') || '[]');
    const favs = JSON.parse(localStorage.getItem('nimmersatt_favs') || '[]');
    state.weeklyList = Array.isArray(list) ? list : [];
    state.favorites = new Set(Array.isArray(favs) ? favs : []);
  } catch (_) {
    state.weeklyList = [];
    state.favorites = new Set();
  }
}

function saveList() {
  localStorage.setItem('nimmersatt_list', JSON.stringify(state.weeklyList));
}

function saveFavorites() {
  localStorage.setItem('nimmersatt_favs', JSON.stringify([...state.favorites]));
}

// ── Data helpers ───────────────────────────────────────────────────────────

function initData() {
  state.allRecipes = [...RECIPES, ...BREADS];
  buildDeck();
}

function buildDeck() {
  let pool;
  if (state.activeFilters.size === 0) {
    pool = [...state.allRecipes];
  } else {
    const activeTags = new Set();
    for (const id of state.activeFilters) {
      const f = FILTERS.find(f => f.id === id);
      if (f) f.tags.forEach(t => activeTags.add(t));
    }
    pool = state.allRecipes.filter(r =>
      (r.tags || []).some(t => activeTags.has(t.toLowerCase()))
    );
  }
  state.deck = shuffle(pool);
  state.currentIndex = 0;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Card helpers ───────────────────────────────────────────────────────────

function getCategory(recipe) {
  const tags = (recipe.tags || []).map(t => t.toLowerCase());
  for (const f of FILTERS) {
    if (f.tags.some(t => tags.includes(t))) return f;
  }
  return FILTERS[0];
}

function getEmoji(recipe) {
  const n = recipe.name.toLowerCase();
  if (/pasta|spaghetti|tagliatelle|gnocchi|carbonara|linguine|penne|maccheroni/.test(n)) return '🍝';
  if (/curry|dal|dhansak|jambalaya/.test(n)) return '🍛';
  if (/suppe|soup|eintopf|casserole|brühe/.test(n)) return '🍲';
  if (/ramen|pho|noodle/.test(n)) return '🍜';
  if (/pizza/.test(n)) return '🍕';
  if (/burger|patty/.test(n)) return '🍔';
  if (/taco|burrito|enchilada/.test(n)) return '🌮';
  if (/waffel|waffle/.test(n)) return '🧇';
  if (/kuchen|cake|torte|tarte tatin/.test(n)) return '🎂';
  if (/cookie|keks|brownie/.test(n)) return '🍪';
  if (/muffin/.test(n)) return '🧁';
  if (/schokolade|chocolate/.test(n)) return '🍫';
  if (/brötchen|schrippe/.test(n)) return '🥐';
  if (/brot|bread|laib/.test(n)) return '🍞';
  if (/lachs|salmon/.test(n)) return '🐟';
  if (/hähnchen|chicken|hühnchen/.test(n)) return '🍗';
  if (/risotto|reis|rice/.test(n)) return '🍚';
  if (/pfannkuchen|schmarrn|crêpe/.test(n)) return '🥞';
  if (/salat|salad/.test(n)) return '🥗';
  if (/flammkuchen|quiche|pie/.test(n)) return '🥧';
  if (/schnecken|cinnamon roll/.test(n)) return '🌀';
  if (/steak|beef|rind/.test(n)) return '🥩';
  if (/lamm|lamb/.test(n)) return '🍖';
  const cat = getCategory(recipe);
  if (cat.id === 'sweet') return '🍰';
  if (cat.id === 'bread') return '🥖';
  if (cat.id === 'vegan') return '🌱';
  return '🍽️';
}

function recipeKey(recipe) { return recipe.name; }

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Card creation ──────────────────────────────────────────────────────────

function createCardEl(recipe) {
  const cat = getCategory(recipe);
  const emoji = getEmoji(recipe);

  let linksHtml = '';
  if (recipe.link) {
    linksHtml += `<a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="card-link">🔗 Recipe</a>`;
  }
  if (recipe.video) {
    linksHtml += `<a href="${recipe.video}" target="_blank" rel="noopener noreferrer" class="card-link">▶️ Video</a>`;
  }
  if (!recipe.link && !recipe.video && recipe.book && BOOKS[recipe.book.id]) {
    const book = BOOKS[recipe.book.id];
    linksHtml = `<span class="card-book">📚 ${escHtml(book.name)}, p.&nbsp;${recipe.book.page}</span>`;
  }

  const ingredients = recipe.ingredients
    ? recipe.ingredients.slice(0, 5).join(', ') + (recipe.ingredients.length > 5 ? '…' : '')
    : '';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-indicator like">❤️ ADD</div>
    <div class="card-indicator skip">✕ SKIP</div>
    <div class="card-hero" style="background:${cat.color}30;">${emoji}</div>
    <div class="card-body">
      <div class="card-category" style="background:${cat.color};color:${cat.id === 'sweet' ? '#1A1A2E' : '#fff'};">
        ${cat.emoji} ${cat.label}
      </div>
      <h2 class="card-name">${escHtml(recipe.name)}</h2>
      ${recipe.subtitle ? `<p class="card-subtitle">${escHtml(recipe.subtitle)}</p>` : ''}
      <div class="card-meta">
        ${recipe.time ? `<span class="card-time">⏱ ${escHtml(recipe.time)}</span>` : ''}
        ${ingredients ? `<span class="card-ingredients">🛒 ${escHtml(ingredients)}</span>` : ''}
      </div>
      ${linksHtml ? `<div class="card-links">${linksHtml}</div>` : ''}
    </div>
  `;
  return card;
}

// ── Deck rendering ─────────────────────────────────────────────────────────

function renderDeck() {
  const deckEl = document.getElementById('deck');
  const emptyEl = document.getElementById('empty-state');
  deckEl.innerHTML = '';
  emptyEl.classList.add('hidden');

  const recipes = state.deck.slice(state.currentIndex, state.currentIndex + 3);
  if (recipes.length === 0) {
    emptyEl.classList.remove('hidden');
    return;
  }

  [...recipes].reverse().forEach((recipe, reverseIdx) => {
    const card = createCardEl(recipe);
    card.dataset.stack = String(reverseIdx);
    card.style.transition = 'none';
    deckEl.prepend(card);
  });

  requestAnimationFrame(() => {
    deckEl.querySelectorAll('.card').forEach(c => { c.style.transition = ''; });
  });

  const topCard = deckEl.querySelector('.card[data-stack="0"]');
  if (topCard) initSwipe(topCard, state.deck[state.currentIndex]);
}

function advanceDeck(leavingCard) {
  const deckEl = document.getElementById('deck');
  const emptyEl = document.getElementById('empty-state');

  const nextBackIdx = state.currentIndex + 3;
  if (nextBackIdx < state.deck.length) {
    const newCard = createCardEl(state.deck[nextBackIdx]);
    newCard.dataset.stack = '99';
    newCard.style.transition = 'none';
    newCard.style.transform = 'scale(0.88) translateY(42px)';
    newCard.style.zIndex = '5';
    newCard.style.pointerEvents = 'none';
    deckEl.prepend(newCard);
  }

  const activeCards = [...deckEl.querySelectorAll('.card:not(.leaving)')];
  activeCards.forEach((card, i) => {
    card.dataset.stack = String(i);
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = '';
    card.style.zIndex = '';
    card.style.pointerEvents = i === 0 ? '' : 'none';
  });

  const newTop = deckEl.querySelector('.card[data-stack="0"]');
  if (newTop) initSwipe(newTop, state.deck[state.currentIndex]);

  leavingCard.addEventListener('transitionend', () => {
    leavingCard.remove();
    if (state.currentIndex >= state.deck.length) {
      emptyEl.classList.remove('hidden');
    }
    updateListBadge();
  }, { once: true });
}

// ── Swipe logic ────────────────────────────────────────────────────────────

function initSwipe(cardEl, recipe) {
  let startX = 0, startY = 0, hasDragged = false;
  const likeEl = cardEl.querySelector('.card-indicator.like');
  const skipEl = cardEl.querySelector('.card-indicator.skip');

  function onDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    hasDragged = false;
    cardEl.setPointerCapture(e.pointerId);
    cardEl.style.transition = 'none';
  }

  function onMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!hasDragged && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    hasDragged = true;

    const rotate = dx * 0.07;
    cardEl.style.transform = `translateX(${dx}px) translateY(${Math.min(Math.abs(dx) * 0.03, 8)}px) rotate(${rotate}deg)`;

    const progress = Math.min(1, Math.abs(dx) / SWIPE_THRESHOLD);
    if (dx > 4) {
      likeEl.style.opacity = String(progress);
      skipEl.style.opacity = '0';
    } else if (dx < -4) {
      skipEl.style.opacity = String(progress);
      likeEl.style.opacity = '0';
    } else {
      likeEl.style.opacity = '0';
      skipEl.style.opacity = '0';
    }
  }

  function onUp(e) {
    if (!hasDragged) return;
    const dx = e.clientX - startX;
    likeEl.style.opacity = '0';
    skipEl.style.opacity = '0';

    if (dx > SWIPE_THRESHOLD) {
      triggerSwipe(cardEl, recipe, 'right');
    } else if (dx < -SWIPE_THRESHOLD) {
      triggerSwipe(cardEl, recipe, 'left');
    } else {
      snapBack(cardEl);
    }
  }

  cardEl.addEventListener('click', (e) => {
    if (hasDragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  cardEl.addEventListener('pointerdown', onDown);
  cardEl.addEventListener('pointermove', onMove);
  cardEl.addEventListener('pointerup', onUp);
  cardEl.addEventListener('pointercancel', () => {
    likeEl.style.opacity = '0';
    skipEl.style.opacity = '0';
    snapBack(cardEl);
  });
}

function snapBack(cardEl) {
  cardEl.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  cardEl.style.transform = '';
}

function triggerSwipe(cardEl, recipe, direction) {
  const dx = direction === 'right' ? window.innerWidth * 1.6 : -window.innerWidth * 1.6;
  const rotate = direction === 'right' ? 28 : -28;

  cardEl.classList.add('leaving');
  cardEl.style.transition = 'transform 0.38s ease, opacity 0.38s ease';
  cardEl.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
  cardEl.style.opacity = '0';

  if (direction === 'right') addToList(recipe);
  state.currentIndex++;
  advanceDeck(cardEl);
}

function buttonSwipe(direction) {
  const topCard = document.querySelector('.card[data-stack="0"]');
  if (!topCard) return;
  const recipe = state.deck[state.currentIndex];
  if (!recipe) return;
  triggerSwipe(topCard, recipe, direction);
}

// ── Weekly list ────────────────────────────────────────────────────────────

function addToList(recipe) {
  const key = recipeKey(recipe);
  if (state.weeklyList.some(r => recipeKey(r) === key)) return;
  state.weeklyList.push(recipe);
  saveList();
  updateListBadge();
  renderListPanel();
}

function clearList() {
  state.weeklyList = [];
  saveList();
  updateListBadge();
  renderListPanel();
}

function updateListBadge() {
  const badge = document.getElementById('list-badge');
  const n = state.weeklyList.length;
  badge.textContent = String(n);
  badge.classList.toggle('hidden', n === 0);
}

function renderListPanel() {
  const itemsEl = document.getElementById('list-items');
  const emptyEl = document.getElementById('list-empty');

  if (state.weeklyList.length === 0) {
    itemsEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  const sorted = [...state.weeklyList].sort((a, b) => {
    return (state.favorites.has(recipeKey(a)) ? 0 : 1) - (state.favorites.has(recipeKey(b)) ? 0 : 1);
  });

  itemsEl.innerHTML = sorted.map(recipe => {
    const key = recipeKey(recipe);
    const isFav = state.favorites.has(key);
    const sub = recipe.subtitle || recipe.time || (recipe.tags || []).slice(0, 2).join(', ') || '';
    return `
      <div class="list-item">
        <div class="list-item-emoji">${getEmoji(recipe)}</div>
        <div class="list-item-info">
          <div class="list-item-name">${escHtml(recipe.name)}</div>
          ${sub ? `<div class="list-item-sub">${escHtml(sub)}</div>` : ''}
        </div>
        <button class="star-btn" data-key="${escHtml(key)}" aria-label="${isFav ? 'Unfavourite' : 'Favourite'}">${isFav ? '⭐' : '☆'}</button>
      </div>`;
  }).join('');

  itemsEl.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (state.favorites.has(key)) { state.favorites.delete(key); } else { state.favorites.add(key); }
      saveFavorites();
      renderListPanel();
      if (document.getElementById('page-favourites').classList.contains('hidden') === false) {
        renderFavouritesPage();
      }
    });
  });
}

function openList() {
  renderListPanel();
  const panel = document.getElementById('list-panel');
  const backdrop = document.getElementById('list-backdrop');
  panel.classList.remove('hidden');
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { panel.classList.add('open'); backdrop.classList.add('open'); });
}

function closeList() {
  const panel = document.getElementById('list-panel');
  const backdrop = document.getElementById('list-backdrop');
  panel.classList.remove('open');
  backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => {
    panel.classList.add('hidden');
    backdrop.classList.add('hidden');
  }, { once: true });
}

// ── Filter chips ───────────────────────────────────────────────────────────

function renderFilterBar() {
  const bar = document.getElementById('filter-chips');

  const allChip = makeChip('all', '✨ All', '#1A1A2E', state.activeFilters.size === 0);
  allChip.addEventListener('click', () => {
    state.activeFilters.clear();
    buildDeck();
    renderDeck();
    updateChips();
  });
  bar.appendChild(allChip);

  FILTERS.forEach(f => {
    const chip = makeChip(f.id, `${f.emoji} ${f.label}`, f.color, state.activeFilters.has(f.id));
    chip.addEventListener('click', () => {
      if (state.activeFilters.has(f.id)) { state.activeFilters.delete(f.id); } else { state.activeFilters.add(f.id); }
      buildDeck();
      renderDeck();
      updateChips();
    });
    bar.appendChild(chip);
  });
}

function makeChip(id, label, color, active) {
  const chip = document.createElement('button');
  chip.className = 'chip';
  chip.dataset.id = id;
  chip.style.setProperty('--chip-color', color);
  chip.dataset.active = String(active);
  chip.textContent = label;
  return chip;
}

function updateChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    const id = chip.dataset.id;
    chip.dataset.active = String(id === 'all' ? state.activeFilters.size === 0 : state.activeFilters.has(id));
  });
}

// ── Navigation ─────────────────────────────────────────────────────────────

function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(`page-${page}`).classList.remove('hidden');

  const filterChips = document.getElementById('filter-chips');
  const pageTitle = document.getElementById('page-title');
  if (page === 'match') {
    filterChips.classList.remove('hidden');
    pageTitle.classList.add('hidden');
  } else {
    filterChips.classList.add('hidden');
    pageTitle.classList.remove('hidden');
    pageTitle.textContent = page === 'favourites' ? 'Favourites' : 'About';
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  if (page === 'favourites') renderFavouritesPage();
}

function openDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  drawer.classList.remove('hidden');
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('open'); });
}

function closeDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
  drawer.addEventListener('transitionend', () => {
    drawer.classList.add('hidden');
    backdrop.classList.add('hidden');
  }, { once: true });
}

// ── Favourites page ────────────────────────────────────────────────────────

function renderFavouritesPage() {
  const container = document.getElementById('fav-items');
  const emptyEl = document.getElementById('fav-empty');

  const favRecipes = state.allRecipes.filter(r => state.favorites.has(recipeKey(r)));

  if (favRecipes.length === 0) {
    container.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  const cat = r => getCategory(r);

  container.innerHTML = favRecipes.map(recipe => {
    const key = recipeKey(recipe);
    const c = cat(recipe);
    const emoji = getEmoji(recipe);
    const sub = recipe.subtitle || recipe.time || '';
    const hasLink = !!recipe.link;
    const hasVideo = !!recipe.video;
    const hasBook = !recipe.link && !recipe.video && recipe.book && BOOKS[recipe.book.id];

    let linkHtml = '';
    if (hasLink) linkHtml = `<a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="fav-item-link">🔗 View Recipe</a>`;
    else if (hasVideo) linkHtml = `<a href="${recipe.video}" target="_blank" rel="noopener noreferrer" class="fav-item-link">▶️ Video</a>`;
    else if (hasBook) linkHtml = `<span class="fav-item-link">📚 ${escHtml(BOOKS[recipe.book.id].name)}, p.&nbsp;${recipe.book.page}</span>`;

    return `
      <div class="fav-item">
        <div class="fav-item-emoji" style="background:${c.color}25;">${emoji}</div>
        <div class="fav-item-info">
          <div class="fav-item-name">${escHtml(recipe.name)}</div>
          ${sub ? `<div class="fav-item-sub">${escHtml(sub)}</div>` : ''}
          ${linkHtml}
        </div>
        <button class="star-btn" data-key="${escHtml(key)}" aria-label="Remove from favourites">⭐</button>
      </div>`;
  }).join('');

  container.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.favorites.delete(btn.dataset.key);
      saveFavorites();
      renderFavouritesPage();
      renderListPanel();
    });
  });
}

// ── Service worker + update toast ──────────────────────────────────────────

async function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register('sw.js');

    const watchInstalling = (sw) => {
      sw.addEventListener('statechange', () => {
        if (sw.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateToast(reg);
        }
      });
    };

    if (reg.installing) watchInstalling(reg.installing);
    reg.addEventListener('updatefound', () => watchInstalling(reg.installing));

    // Already waiting from a previous install
    if (reg.waiting && navigator.serviceWorker.controller) showUpdateToast(reg);
  } catch (_) {}
}

function showUpdateToast(reg) {
  const toast = document.getElementById('update-toast');
  toast.classList.remove('hidden');
  requestAnimationFrame(() => toast.classList.add('show'));

  document.getElementById('update-reload-btn').addEventListener('click', () => {
    reg.waiting.postMessage('SKIP_WAITING');
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true });
  }, { once: true });
}

// ── Init ───────────────────────────────────────────────────────────────────

function init() {
  loadStorage();
  initData();
  renderFilterBar();
  renderDeck();
  updateListBadge();

  // Version display
  if (typeof APP_VERSION !== 'undefined') {
    document.getElementById('version-display').textContent = APP_VERSION;
  }

  // Match page buttons
  document.getElementById('like-btn').addEventListener('click', () => buttonSwipe('right'));
  document.getElementById('skip-btn').addEventListener('click', () => buttonSwipe('left'));
  document.getElementById('list-toggle-btn').addEventListener('click', openList);
  document.getElementById('close-list-btn').addEventListener('click', closeList);
  document.getElementById('list-backdrop').addEventListener('click', closeList);
  document.getElementById('clear-list-btn').addEventListener('click', clearList);
  document.getElementById('reset-btn').addEventListener('click', () => { buildDeck(); renderDeck(); });

  // Navigation
  document.getElementById('burger-btn').addEventListener('click', openDrawer);
  document.getElementById('nav-backdrop').addEventListener('click', closeDrawer);
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
      closeDrawer();
    });
  });

  // Set initial active nav item
  document.querySelector('.nav-item[data-page="match"]').classList.add('active');

  registerSW();
}

document.addEventListener('DOMContentLoaded', init);
