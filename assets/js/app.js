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
  if (recipe.icon) return recipe.icon;
  // try to guess a good emoji
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
  if (/brötchen|bun|schrippe/.test(n)) return '🥐';
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
  if (/ofen|roasted|geröst/.test(n)) return '♨️';
  const cat = getCategory(recipe);
  if (cat.id === 'sweet') return '🍰';
  if (cat.id === 'bread') return '🥖';
  if (cat.id === 'vegan') return '🌱';
  return '🍽️';
}

function recipeKey(recipe) {
  return recipe.name;
}

function createCardEl(recipe) {
  const cat = getCategory(recipe);
  const emoji = getEmoji(recipe);

  const card = document.createElement('div');
  card.className = 'card';

  let linksHtml = '';
  if (recipe.link) {
    linksHtml += `<a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="card-link">🔗 Recipe</a>`;
  }
  if (recipe.video) {
    linksHtml += `<a href="${recipe.video}" target="_blank" rel="noopener noreferrer" class="card-link">▶️ Video</a>`;
  }
  if (!recipe.link && !recipe.video && recipe.book && BOOKS[recipe.book.id]) {
    const book = BOOKS[recipe.book.id];
    linksHtml = `<span class="card-book">📚 ${book.name}, p.&nbsp;${recipe.book.page}</span>`;
  }

  const ingredients = recipe.ingredients ? recipe.ingredients.slice(0, 5).join(', ') + (recipe.ingredients.length > 5 ? '…' : '') : '';

  card.innerHTML = `
    <div class="card-indicator like">❤️ ADD</div>
    <div class="card-indicator skip">✕ SKIP</div>
    <div class="card-hero" style="background: ${cat.color}30; border-bottom-color: inherit;">
      ${emoji}
    </div>
    <div class="card-body">
      <div class="card-category" style="background: ${cat.color}; color: ${cat.id === 'sweet' ? '#1A1A2E' : '#fff'};">
        ${cat.emoji} ${cat.label}
      </div>
      <h2 class="card-name">${recipe.name}</h2>
      ${recipe.subtitle ? `<p class="card-subtitle">${recipe.subtitle}</p>` : ''}
      <div class="card-meta">
        ${recipe.time ? `<span class="card-time">⏱ ${recipe.time}</span>` : ''}
        ${ingredients ? `<span class="card-ingredients">🛒 ${ingredients}</span>` : ''}
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

  // Render back to front so last child = top card
  [...recipes].reverse().forEach((recipe, reverseIdx) => {
    const stackPos = reverseIdx; // reverseIdx 0 = front (top), higher = back
    const card = createCardEl(recipe);
    card.dataset.stack = String(stackPos);
    // Remove transition for initial render
    card.style.transition = 'none';
    deckEl.prepend(card);
  });

  // Re-enable transitions on next frame
  requestAnimationFrame(() => {
    deckEl.querySelectorAll('.card').forEach(c => c.style.transition = '');
  });

  const topCard = deckEl.querySelector('.card[data-stack="0"]');
  if (topCard) initSwipe(topCard, state.deck[state.currentIndex]);
}

function advanceDeck(leavingCard) {
  const deckEl = document.getElementById('deck');
  const emptyEl = document.getElementById('empty-state');

  // Preload the next back card
  const nextBackIdx = state.currentIndex + 3;
  if (nextBackIdx < state.deck.length) {
    const newCard = createCardEl(state.deck[nextBackIdx]);
    newCard.dataset.stack = '99'; // temporarily off-screen
    newCard.style.transition = 'none';
    newCard.style.transform = 'scale(0.88) translateY(42px)';
    newCard.style.zIndex = '5';
    newCard.style.pointerEvents = 'none';
    deckEl.prepend(newCard);
  }

  // Restack remaining non-leaving cards
  const activeCards = [...deckEl.querySelectorAll('.card:not(.leaving)')];
  activeCards.forEach((card, i) => {
    const newStack = i; // first in DOM = back
    card.dataset.stack = String(newStack);
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = '';
    card.style.zIndex = '';
    card.style.pointerEvents = newStack === 0 ? '' : 'none';
  });

  // Init swipe on new top card
  const newTop = deckEl.querySelector('.card[data-stack="0"]');
  if (newTop) {
    initSwipe(newTop, state.deck[state.currentIndex]);
  }

  // Clean up after fly-off animation
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

  function onCancel() {
    likeEl.style.opacity = '0';
    skipEl.style.opacity = '0';
    snapBack(cardEl);
  }

  // Prevent link clicks when user dragged the card
  cardEl.addEventListener('click', (e) => {
    if (hasDragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  cardEl.addEventListener('pointerdown', onDown);
  cardEl.addEventListener('pointermove', onMove);
  cardEl.addEventListener('pointerup', onUp);
  cardEl.addEventListener('pointercancel', onCancel);
}

function snapBack(cardEl) {
  cardEl.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  cardEl.style.transform = '';
}

function triggerSwipe(cardEl, recipe, direction) {
  const vw = window.innerWidth;
  const dx = direction === 'right' ? vw * 1.6 : -vw * 1.6;
  const rotate = direction === 'right' ? 28 : -28;

  cardEl.classList.add('leaving');
  cardEl.style.transition = 'transform 0.38s ease, opacity 0.38s ease';
  cardEl.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
  cardEl.style.opacity = '0';

  if (direction === 'right') addToList(recipe);
  state.currentIndex++;

  advanceDeck(cardEl);
}

// ── Button swipes ──────────────────────────────────────────────────────────

function buttonSwipe(direction) {
  const topCard = document.querySelector('.card[data-stack="0"]');
  if (!topCard) return;
  const recipe = state.deck[state.currentIndex];
  if (!recipe) return;
  triggerSwipe(topCard, recipe, direction);
}

// ── List management ────────────────────────────────────────────────────────

function addToList(recipe) {
  const key = recipeKey(recipe);
  if (state.weeklyList.some(r => recipeKey(r) === key)) return;
  state.weeklyList.push(recipe);
  saveList();
  updateListBadge();
  renderListPanel();
}

function removeFromList(recipe) {
  const key = recipeKey(recipe);
  state.weeklyList = state.weeklyList.filter(r => recipeKey(r) !== key);
  saveList();
  updateListBadge();
  renderListPanel();
}

function toggleFavorite(recipe) {
  const key = recipeKey(recipe);
  if (state.favorites.has(key)) {
    state.favorites.delete(key);
  } else {
    state.favorites.add(key);
  }
  saveFavorites();
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
  const count = state.weeklyList.length;
  badge.textContent = String(count);
  badge.classList.toggle('hidden', count === 0);
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

  // Favorites first
  const sorted = [...state.weeklyList].sort((a, b) => {
    const aFav = state.favorites.has(recipeKey(a)) ? 0 : 1;
    const bFav = state.favorites.has(recipeKey(b)) ? 0 : 1;
    return aFav - bFav;
  });

  itemsEl.innerHTML = sorted.map(recipe => {
    const key = recipeKey(recipe);
    const isFav = state.favorites.has(key);
    const cat = getCategory(recipe);
    const emoji = getEmoji(recipe);
    const subtitle = recipe.subtitle || recipe.time || (recipe.tags || []).slice(0, 2).join(', ') || '';

    return `
      <div class="list-item" data-key="${escHtml(key)}">
        <div class="list-item-emoji">${emoji}</div>
        <div class="list-item-info">
          <div class="list-item-name">${escHtml(recipe.name)}</div>
          ${subtitle ? `<div class="list-item-sub">${escHtml(subtitle)}</div>` : ''}
        </div>
        <button class="star-btn" data-key="${escHtml(key)}" aria-label="${isFav ? 'Unfavourite' : 'Favourite'}">${isFav ? '⭐' : '☆'}</button>
      </div>
    `;
  }).join('');

  itemsEl.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const recipe = state.weeklyList.find(r => recipeKey(r) === key);
      if (recipe) toggleFavorite(recipe);
    });
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── List panel open/close ──────────────────────────────────────────────────

function openList() {
  const panel = document.getElementById('list-panel');
  const backdrop = document.getElementById('list-backdrop');
  renderListPanel();
  panel.classList.remove('hidden');
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => {
    panel.classList.add('open');
    backdrop.classList.add('open');
  });
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

  const allChip = document.createElement('button');
  allChip.className = 'chip';
  allChip.dataset.id = 'all';
  allChip.style.setProperty('--chip-color', '#1A1A2E');
  allChip.dataset.active = String(state.activeFilters.size === 0);
  allChip.textContent = '✨ All';
  allChip.addEventListener('click', () => {
    state.activeFilters.clear();
    buildDeck();
    renderDeck();
    updateChips();
  });
  bar.appendChild(allChip);

  FILTERS.forEach(f => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.dataset.id = f.id;
    chip.style.setProperty('--chip-color', f.color);
    chip.dataset.active = String(state.activeFilters.has(f.id));
    chip.textContent = `${f.emoji} ${f.label}`;
    chip.addEventListener('click', () => {
      if (state.activeFilters.has(f.id)) {
        state.activeFilters.delete(f.id);
      } else {
        state.activeFilters.add(f.id);
      }
      buildDeck();
      renderDeck();
      updateChips();
    });
    bar.appendChild(chip);
  });
}

function updateChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    const id = chip.dataset.id;
    if (id === 'all') {
      chip.dataset.active = String(state.activeFilters.size === 0);
    } else {
      chip.dataset.active = String(state.activeFilters.has(id));
    }
  });
}

// ── Init ───────────────────────────────────────────────────────────────────

function init() {
  loadStorage();
  initData();
  renderFilterBar();
  renderDeck();
  updateListBadge();

  document.getElementById('like-btn').addEventListener('click', () => buttonSwipe('right'));
  document.getElementById('skip-btn').addEventListener('click', () => buttonSwipe('left'));
  document.getElementById('list-toggle-btn').addEventListener('click', openList);
  document.getElementById('close-list-btn').addEventListener('click', closeList);
  document.getElementById('list-backdrop').addEventListener('click', closeList);
  document.getElementById('clear-list-btn').addEventListener('click', () => {
    if (state.weeklyList.length === 0) return;
    clearList();
  });
  document.getElementById('reset-btn').addEventListener('click', () => {
    buildDeck();
    renderDeck();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', init);
