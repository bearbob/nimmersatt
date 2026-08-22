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

const LANGUAGES = [
  { code: 'de', flag: '🇩🇪', name: 'Deutsch', sub: 'German' },
  { code: 'en', flag: '🇬🇧', name: 'English', sub: 'English' },
];

const SWIPE_THRESHOLD = 80;

// ── State ──────────────────────────────────────────────────────────────────

const state = {
  allRecipes: [],
  deck: [],
  currentIndex: 0,
  activeFilters: new Set(),
  activeLanguages: new Set(),  // e.g. Set(['de', 'en'])
  weeklyList: [],
  favouriteLists: [],   // [{ id, name, recipeKeys[] }]
};

let currentFavView = 'overview'; // 'overview' | 'detail'
let currentFavListId = null;
let pickerRecipe = null;

// ── Storage ────────────────────────────────────────────────────────────────

function loadStorage() {
  loadLanguages();

  try {
    const list = JSON.parse(localStorage.getItem('nimmersatt_list') || '[]');
    state.weeklyList = Array.isArray(list) ? list : [];
  } catch (_) { state.weeklyList = []; }

  try {
    const stored = JSON.parse(localStorage.getItem('nimmersatt_favlists') || 'null');
    if (stored && Array.isArray(stored) && stored.length > 0) {
      state.favouriteLists = stored;
    } else {
      // First launch or migration from old star-based system
      const oldFavs = JSON.parse(localStorage.getItem('nimmersatt_favs') || '[]');
      state.favouriteLists = [{
        id: 'list-default',
        name: 'Favourites',
        recipeKeys: Array.isArray(oldFavs) ? oldFavs : [],
      }];
      saveFavouriteLists();
    }
  } catch (_) {
    state.favouriteLists = [{ id: 'list-default', name: 'Favourites', recipeKeys: [] }];
    saveFavouriteLists();
  }
}

function loadLanguages() {
  try {
    const stored = JSON.parse(localStorage.getItem('nimmersatt_langs') || 'null');
    if (Array.isArray(stored) && stored.length > 0) {
      state.activeLanguages = new Set(stored.filter(c => LANGUAGES.some(l => l.code === c)));
      if (state.activeLanguages.size > 0) return;
    }
  } catch (_) {}
  // First launch: detect browser language
  const browserLang = (navigator.language || 'en').toLowerCase().slice(0, 2);
  const known = LANGUAGES.find(l => l.code === browserLang);
  state.activeLanguages = new Set([known ? browserLang : 'en']);
}

function saveLanguages() {
  localStorage.setItem('nimmersatt_langs', JSON.stringify([...state.activeLanguages]));
}

function saveList() {
  localStorage.setItem('nimmersatt_list', JSON.stringify(state.weeklyList));
}

function saveFavouriteLists() {
  localStorage.setItem('nimmersatt_favlists', JSON.stringify(state.favouriteLists));
}

// ── Favourite list CRUD ────────────────────────────────────────────────────

function createFavList(name) {
  const trimmed = name.trim();
  if (!trimmed) return null;
  const list = { id: 'list-' + Date.now(), name: trimmed, recipeKeys: [] };
  state.favouriteLists.push(list);
  saveFavouriteLists();
  return list;
}

function deleteFavList(listId) {
  state.favouriteLists = state.favouriteLists.filter(l => l.id !== listId);
  saveFavouriteLists();
}

function renameFavList(listId, newName) {
  const trimmed = newName.trim();
  if (!trimmed) return;
  const list = state.favouriteLists.find(l => l.id === listId);
  if (list) { list.name = trimmed; saveFavouriteLists(); }
}

function toggleFavListMembership(listId, recipeKey) {
  const list = state.favouriteLists.find(l => l.id === listId);
  if (!list) return;
  const idx = list.recipeKeys.indexOf(recipeKey);
  if (idx >= 0) { list.recipeKeys.splice(idx, 1); } else { list.recipeKeys.push(recipeKey); }
  saveFavouriteLists();
}

function removeFromFavList(listId, recipeKey) {
  const list = state.favouriteLists.find(l => l.id === listId);
  if (list) { list.recipeKeys = list.recipeKeys.filter(k => k !== recipeKey); saveFavouriteLists(); }
}

function isInAnyList(recipeKey) {
  return state.favouriteLists.some(l => l.recipeKeys.includes(recipeKey));
}

// ── Data helpers ───────────────────────────────────────────────────────────

function initData() {
  // Normalize: all existing recipes without an explicit language are German
  const normalize = r => r.language ? r : { ...r, language: 'de' };
  state.allRecipes = [...RECIPES.map(normalize), ...BREADS.map(normalize), ...RECIPES_EN];
  buildDeck();
}

function buildDeck() {
  let pool = state.allRecipes.filter(r => state.activeLanguages.has(r.language || 'de'));

  if (state.activeFilters.size > 0) {
    const activeTags = new Set();
    for (const id of state.activeFilters) {
      const f = FILTERS.find(f => f.id === id);
      if (f) f.tags.forEach(t => activeTags.add(t));
    }
    pool = pool.filter(r => (r.tags || []).some(t => activeTags.has(t.toLowerCase())));
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

function getRecipeByKey(key) {
  return state.allRecipes.find(r => recipeKey(r) === key) || null;
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
    <div class="card-hero" style="${recipe.image ? '' : `background:${cat.color}30;`}">${recipe.image ? `<img src="${escHtml(recipe.image)}" alt="" onerror="this.parentElement.style.background='${cat.color}30';this.replaceWith(document.createTextNode('${emoji}'));">` : emoji}</div>
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
  // Links stop pointerdown propagation so the card never captures the pointer
  // for a link tap — the link receives its own pointerup and fires a click normally.
  card.querySelectorAll('a').forEach(a => {
    a.addEventListener('pointerdown', e => e.stopPropagation());
  });
  return card;
}

// ── Deck rendering ─────────────────────────────────────────────────────────

function renderDeck() {
  const deckEl = document.getElementById('deck');
  const emptyEl = document.getElementById('empty-state');
  deckEl.innerHTML = '';
  emptyEl.classList.add('hidden');

  const recipes = state.deck.slice(state.currentIndex, state.currentIndex + 3);
  if (recipes.length === 0) { emptyEl.classList.remove('hidden'); return; }

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

  const nextBackIdx = state.currentIndex + 2;
  if (nextBackIdx < state.deck.length) {
    const newCard = createCardEl(state.deck[nextBackIdx]);
    newCard.dataset.stack = '99';
    newCard.style.transition = 'none';
    newCard.style.transform = 'scale(0.88) translateY(42px)';
    newCard.style.zIndex = '5';
    newCard.style.pointerEvents = 'none';
    deckEl.appendChild(newCard);
  }

  const activeCards = [...deckEl.querySelectorAll('.card:not(.leaving)')];
  activeCards.forEach((card, i) => {
    card.dataset.stack = String(i);
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = '';
    card.style.zIndex = '';
    card.style.pointerEvents = i === 0 ? '' : 'none';
  });

  const newTop = activeCards[0];
  if (newTop) initSwipe(newTop, state.deck[state.currentIndex]);

  leavingCard.addEventListener('transitionend', () => {
    leavingCard.remove();
    if (state.currentIndex >= state.deck.length) emptyEl.classList.remove('hidden');
    updateListBadge();
  }, { once: true });
}

// ── Swipe logic ────────────────────────────────────────────────────────────

function initSwipe(cardEl, recipe) {
  let startX = 0, startY = 0, isDown = false, hasDragged = false;
  const likeEl = cardEl.querySelector('.card-indicator.like');
  const skipEl = cardEl.querySelector('.card-indicator.skip');

  function onDown(e) {
    isDown = true;
    startX = e.clientX; startY = e.clientY; hasDragged = false;
    cardEl.setPointerCapture(e.pointerId); // capture immediately so pointerup always reaches the card
    cardEl.style.transition = 'none';
  }
  function onMove(e) {
    if (!isDown) return; // ignore hover
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!hasDragged && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    hasDragged = true;
    const rotate = dx * 0.07;
    cardEl.style.transform = `translateX(${dx}px) translateY(${Math.min(Math.abs(dx) * 0.03, 8)}px) rotate(${rotate}deg)`;
    const progress = Math.min(1, Math.abs(dx) / SWIPE_THRESHOLD);
    if (dx > 4) { likeEl.style.opacity = String(progress); skipEl.style.opacity = '0'; }
    else if (dx < -4) { skipEl.style.opacity = String(progress); likeEl.style.opacity = '0'; }
    else { likeEl.style.opacity = '0'; skipEl.style.opacity = '0'; }
  }
  function onUp(e) {
    if (!isDown) return;
    isDown = false;
    if (!hasDragged) return;
    const dx = e.clientX - startX;
    likeEl.style.opacity = '0'; skipEl.style.opacity = '0';
    if (dx > SWIPE_THRESHOLD) triggerSwipe(cardEl, recipe, 'right');
    else if (dx < -SWIPE_THRESHOLD) triggerSwipe(cardEl, recipe, 'left');
    else snapBack(cardEl);
  }
  cardEl.addEventListener('click', (e) => { if (hasDragged) { e.preventDefault(); e.stopPropagation(); } }, true);
  cardEl.addEventListener('pointerdown', onDown);
  cardEl.addEventListener('pointermove', onMove);
  cardEl.addEventListener('pointerup', onUp);
  cardEl.addEventListener('pointercancel', () => {
    isDown = false;
    likeEl.style.opacity = '0'; skipEl.style.opacity = '0'; snapBack(cardEl);
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
  const topCard = document.querySelector('.card:not(.leaving)[data-stack="0"]');
  if (!topCard) return;
  const recipe = state.deck[state.currentIndex];
  if (!recipe) return;
  triggerSwipe(topCard, recipe, direction);
}

// ── Swipe-to-delete (for fav detail items) ────────────────────────────────

function initSwipeToDelete(itemEl, onDelete, onTap) {
  let startX, startY, dx = 0, swiping = false, decided = false;

  itemEl.addEventListener('pointerdown', (e) => {
    startX = e.clientX; startY = e.clientY;
    dx = 0; swiping = false; decided = false;
  });

  itemEl.addEventListener('pointermove', (e) => {
    if (startX === undefined) return;
    const curDx = e.clientX - startX;
    const curDy = e.clientY - startY;

    if (!decided && (Math.abs(curDx) > 6 || Math.abs(curDy) > 6)) {
      decided = true;
      if (Math.abs(curDx) > Math.abs(curDy) && curDx < 0) {
        swiping = true;
        itemEl.setPointerCapture(e.pointerId);
        itemEl.style.transition = 'none';
      }
    }

    if (!swiping) return;
    dx = Math.min(0, curDx);
    itemEl.style.transform = `translateX(${dx}px)`;
    itemEl.style.opacity = String(Math.max(0, 1 + dx / 180));
  });

  const end = () => {
    if (!swiping) {
      // Clean tap (no significant movement) → open detail
      if (!decided && onTap) onTap();
      decided = false; startX = undefined; return;
    }
    swiping = false; decided = false; startX = undefined;

    if (dx < -90) {
      itemEl.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
      itemEl.style.transform = `translateX(-${window.innerWidth}px)`;
      itemEl.style.opacity = '0';
      itemEl.addEventListener('transitionend', onDelete, { once: true });
    } else {
      itemEl.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
      itemEl.style.transform = 'translateX(0)';
      itemEl.style.opacity = '1';
    }
  };
  const cancel = () => {
    swiping = false; decided = false; startX = undefined;
    itemEl.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    itemEl.style.transform = 'translateX(0)';
    itemEl.style.opacity = '1';
  };

  itemEl.addEventListener('pointerup', end);
  itemEl.addEventListener('pointercancel', cancel);
}

// ── Recipe detail sheet ────────────────────────────────────────────────────

function openRecipeDetail(recipe) {
  const cat = getCategory(recipe);
  const emoji = getEmoji(recipe);

  const heroEl = document.getElementById('recipe-detail-hero');
  heroEl.style.background = `${cat.color}30`;
  document.getElementById('recipe-detail-emoji').textContent = emoji;

  const catEl = document.getElementById('recipe-detail-category');
  catEl.textContent = `${cat.emoji} ${cat.label}`;
  catEl.style.background = cat.color;
  catEl.style.color = cat.id === 'sweet' ? '#1A1A2E' : '#fff';

  document.getElementById('recipe-detail-name').textContent = recipe.name;

  const subtitleEl = document.getElementById('recipe-detail-subtitle');
  if (recipe.subtitle) {
    subtitleEl.textContent = recipe.subtitle;
    subtitleEl.classList.remove('hidden');
  } else {
    subtitleEl.classList.add('hidden');
  }

  const timeEl = document.getElementById('recipe-detail-time');
  if (recipe.time) {
    timeEl.textContent = `⏱ ${recipe.time}`;
    timeEl.classList.remove('hidden');
  } else {
    timeEl.classList.add('hidden');
  }

  const ingEl = document.getElementById('recipe-detail-ingredients');
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    const shown = recipe.ingredients.slice(0, 5);
    const more = recipe.ingredients.length > 5 ? '…' : '';
    ingEl.textContent = `🛒 ${shown.join(', ')}${more}`;
    ingEl.classList.remove('hidden');
  } else {
    ingEl.classList.add('hidden');
  }

  const linksEl = document.getElementById('recipe-detail-links');
  linksEl.innerHTML = '';
  if (recipe.link) {
    linksEl.innerHTML += `<a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="card-link">🔗 Recipe</a>`;
  }
  if (recipe.video) {
    linksEl.innerHTML += `<a href="${recipe.video}" target="_blank" rel="noopener noreferrer" class="card-link">▶️ Video</a>`;
  }
  if (!recipe.link && !recipe.video && recipe.book && BOOKS[recipe.book.id]) {
    const book = BOOKS[recipe.book.id];
    linksEl.innerHTML = `<span class="card-book">📚 ${escHtml(book.name)}, p.&nbsp;${recipe.book.page}</span>`;
  }

  const panel = document.getElementById('recipe-detail');
  const backdrop = document.getElementById('recipe-detail-backdrop');
  panel.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { panel.classList.add('open'); backdrop.classList.add('open'); });
}

function closeRecipeDetail() {
  const panel = document.getElementById('recipe-detail');
  const backdrop = document.getElementById('recipe-detail-backdrop');
  panel.classList.remove('open'); backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => {
    panel.classList.add('hidden'); backdrop.classList.add('hidden');
  }, { once: true });
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
    const aIn = isInAnyList(recipeKey(a)) ? 0 : 1;
    const bIn = isInAnyList(recipeKey(b)) ? 0 : 1;
    return aIn - bIn;
  });

  itemsEl.innerHTML = sorted.map(recipe => {
    const key = recipeKey(recipe);
    const inAny = isInAnyList(key);
    const sub = recipe.subtitle || recipe.time || (recipe.tags || []).slice(0, 2).join(', ') || '';
    return `
      <div class="list-item">
        <div class="list-item-emoji">${getEmoji(recipe)}</div>
        <div class="list-item-info">
          <div class="list-item-name">${escHtml(recipe.name)}</div>
          ${sub ? `<div class="list-item-sub">${escHtml(sub)}</div>` : ''}
        </div>
        <button class="heart-btn" data-key="${escHtml(key)}" aria-label="${inAny ? 'Edit favourites' : 'Save to favourites'}">${inAny ? '❤️' : '♡'}</button>
      </div>`;
  }).join('');

  itemsEl.querySelectorAll('.list-item').forEach(item => {
    const key = item.querySelector('.heart-btn').dataset.key;
    const recipe = state.weeklyList.find(r => recipeKey(r) === key);
    item.addEventListener('click', (e) => {
      if (e.target.closest('.heart-btn')) return;
      if (recipe) openRecipeDetail(recipe);
    });
  });

  itemsEl.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.key;
      const recipe = state.weeklyList.find(r => recipeKey(r) === key);
      if (recipe) openListPicker(recipe);
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
  panel.classList.remove('open'); backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => {
    panel.classList.add('hidden'); backdrop.classList.add('hidden');
  }, { once: true });
}

// ── List picker ────────────────────────────────────────────────────────────

function openListPicker(recipe) {
  pickerRecipe = recipe;
  renderListPicker();
  const panel = document.getElementById('list-picker');
  const backdrop = document.getElementById('list-picker-backdrop');
  panel.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { panel.classList.add('open'); backdrop.classList.add('open'); });
}

function closeListPicker() {
  const panel = document.getElementById('list-picker');
  const backdrop = document.getElementById('list-picker-backdrop');
  panel.classList.remove('open'); backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => {
    panel.classList.add('hidden'); backdrop.classList.add('hidden');
    hidePickerNewRow();
    refreshSearchHearts();
  }, { once: true });
  pickerRecipe = null;
}

function renderListPicker() {
  if (!pickerRecipe) return;
  const key = recipeKey(pickerRecipe);
  const listsEl = document.getElementById('list-picker-lists');

  document.getElementById('list-picker-title').textContent = pickerRecipe.name.length > 30
    ? pickerRecipe.name.slice(0, 28) + '…' : pickerRecipe.name;

  listsEl.innerHTML = state.favouriteLists.map(list => {
    const inList = list.recipeKeys.includes(key);
    return `
      <div class="picker-item" data-list-id="${escHtml(list.id)}">
        <span class="picker-item-heart">${inList ? '❤️' : '♡'}</span>
        <span class="picker-item-name">${escHtml(list.name)}</span>
        <span class="picker-item-count">${list.recipeKeys.length} recipes</span>
      </div>`;
  }).join('');

  listsEl.querySelectorAll('.picker-item').forEach(item => {
    item.addEventListener('click', () => {
      const listId = item.dataset.listId;
      toggleFavListMembership(listId, key);
      renderListPicker();
      renderListPanel(); // update heart in weekly list
      if (currentFavView === 'detail' && currentFavListId === listId) renderFavDetail();
      renderFavOverview(); // update counts
    });
  });
}

function showPickerNewRow() {
  const row = document.getElementById('list-picker-new-row');
  const input = document.getElementById('list-picker-new-input');
  row.classList.remove('hidden');
  document.getElementById('list-picker-new-btn').classList.add('hidden');
  input.value = '';
  input.focus();
}

function hidePickerNewRow() {
  document.getElementById('list-picker-new-row').classList.add('hidden');
  document.getElementById('list-picker-new-btn').classList.remove('hidden');
}

function addPickerNewList() {
  const input = document.getElementById('list-picker-new-input');
  const name = input.value.trim();
  if (!name) return;
  createFavList(name);
  hidePickerNewRow();
  renderListPicker();
  renderFavOverview();
}

// ── Favourites navigation ──────────────────────────────────────────────────

function renderFavouritesPage() {
  if (currentFavView === 'detail' && currentFavListId) {
    renderFavDetail();
  } else {
    currentFavView = 'overview';
    renderFavOverview();
  }
}

function renderFavOverview() {
  const rowsEl = document.getElementById('fav-list-rows');
  const emptyEl = document.getElementById('fav-overview-empty');

  if (state.favouriteLists.length === 0) {
    rowsEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  rowsEl.innerHTML = state.favouriteLists.map(list => `
    <div class="fav-list-card" data-list-id="${escHtml(list.id)}">
      <span class="fav-list-card-icon">❤️</span>
      <span class="fav-list-card-name">${escHtml(list.name)}</span>
      <span class="fav-list-card-count">${list.recipeKeys.length}</span>
      <span class="fav-list-card-arrow">›</span>
    </div>`).join('');

  rowsEl.querySelectorAll('.fav-list-card').forEach(card => {
    card.addEventListener('click', () => openFavDetail(card.dataset.listId));
  });
}

function openFavDetail(listId) {
  currentFavView = 'detail';
  currentFavListId = listId;
  document.getElementById('fav-overview').classList.add('hidden');
  document.getElementById('fav-detail').classList.remove('hidden');
  renderFavDetail();
}

function closeFavDetail() {
  currentFavView = 'overview';
  currentFavListId = null;
  document.getElementById('fav-detail').classList.add('hidden');
  document.getElementById('fav-overview').classList.remove('hidden');
  renderFavOverview();
}

function renderFavDetail() {
  const list = state.favouriteLists.find(l => l.id === currentFavListId);
  const titleEl = document.getElementById('fav-detail-title');
  const itemsEl = document.getElementById('fav-detail-items');
  const emptyEl = document.getElementById('fav-detail-empty');

  if (!list) { closeFavDetail(); return; }

  // Restore title element if it was replaced by input
  if (titleEl.tagName !== 'H3') {
    const h3 = document.createElement('h3');
    h3.id = 'fav-detail-title';
    titleEl.replaceWith(h3);
  }
  document.getElementById('fav-detail-title').textContent = list.name;

  const recipes = list.recipeKeys.map(key => getRecipeByKey(key)).filter(Boolean);

  if (recipes.length === 0) {
    itemsEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  itemsEl.innerHTML = '';
  recipes.forEach(recipe => {
    const key = recipeKey(recipe);
    const cat = getCategory(recipe);
    const sub = recipe.subtitle || recipe.time || '';
    let linkHtml = '';
    if (recipe.link) linkHtml = `<a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="fav-detail-item-link">🔗 View Recipe</a>`;
    else if (recipe.video) linkHtml = `<a href="${recipe.video}" target="_blank" rel="noopener noreferrer" class="fav-detail-item-link">▶️ Video</a>`;
    else if (recipe.book && BOOKS[recipe.book.id]) linkHtml = `<span class="fav-detail-item-link">📚 ${escHtml(BOOKS[recipe.book.id].name)}, p.&nbsp;${recipe.book.page}</span>`;

    const item = document.createElement('div');
    item.className = 'fav-detail-item';
    item.innerHTML = `
      <div class="fav-detail-item-emoji" style="background:${cat.color}25;">${getEmoji(recipe)}</div>
      <div class="fav-detail-item-info">
        <div class="fav-detail-item-name">${escHtml(recipe.name)}</div>
        ${sub ? `<div class="fav-detail-item-sub">${escHtml(sub)}</div>` : ''}
        ${linkHtml}
      </div>
      <span class="fav-delete-hint">← Swipe to delete</span>`;

    initSwipeToDelete(
      item,
      () => { removeFromFavList(currentFavListId, key); renderFavDetail(); renderFavOverview(); renderListPanel(); },
      () => openRecipeDetail(recipe)
    );

    itemsEl.appendChild(item);
  });
}

// ── Delete / rename list ───────────────────────────────────────────────────

function tryDeleteList() {
  const btn = document.getElementById('fav-delete-btn');
  if (btn.dataset.confirm === '1') {
    deleteFavList(currentFavListId);
    closeFavDetail();
    btn.dataset.confirm = '';
  } else {
    btn.dataset.confirm = '1';
    btn.classList.add('danger');
    btn.title = 'Tap again to confirm';
    setTimeout(() => {
      btn.dataset.confirm = '';
      btn.classList.remove('danger');
      btn.title = '';
    }, 3000);
  }
}

function startRename() {
  const list = state.favouriteLists.find(l => l.id === currentFavListId);
  if (!list) return;
  const titleEl = document.getElementById('fav-detail-title');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'fav-rename-input';
  input.value = list.name;
  input.maxLength = 40;
  const finish = () => {
    const newName = input.value.trim();
    if (newName && newName !== list.name) {
      list.name = newName;
      saveFavouriteLists();
      renderFavOverview();
    }
    renderFavDetail();
  };
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } });
  input.addEventListener('blur', finish);
  titleEl.replaceWith(input);
  input.focus();
  input.select();
}

// ── Fav new list (overview) ───────────────────────────────────────────────

function toggleFavNewInputRow() {
  const row = document.getElementById('fav-new-input-row');
  const input = document.getElementById('fav-new-input');
  const btn = document.getElementById('fav-new-list-btn');
  if (row.classList.contains('hidden')) {
    row.classList.remove('hidden');
    btn.classList.add('hidden');
    input.value = '';
    input.focus();
  } else {
    row.classList.add('hidden');
    btn.classList.remove('hidden');
  }
}

function createListFromOverview() {
  const input = document.getElementById('fav-new-input');
  const name = input.value.trim();
  if (!name) return;
  const list = createFavList(name);
  document.getElementById('fav-new-input-row').classList.add('hidden');
  document.getElementById('fav-new-list-btn').classList.remove('hidden');
  renderFavOverview();
  openFavDetail(list.id);
}

// ── Search ─────────────────────────────────────────────────────────────────

function performSearch(query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(t => t.length > 0);
  if (terms.length === 0) return null; // null = show initial state

  return state.allRecipes.filter(recipe => {
    if (!state.activeLanguages.has(recipe.language || 'de')) return false;
    const name = recipe.name.toLowerCase();
    const ingredients = (recipe.ingredients || []).join(' ').toLowerCase();
    return terms.every(term => name.includes(term) || ingredients.includes(term));
  });
}

function renderSearchResults(results) {
  const resultsEl = document.getElementById('search-results');
  const initialEl = document.getElementById('search-initial');
  const noResultsEl = document.getElementById('search-no-results');

  if (results === null) {
    resultsEl.classList.add('hidden');
    noResultsEl.classList.add('hidden');
    initialEl.classList.remove('hidden');
    return;
  }

  initialEl.classList.add('hidden');

  if (results.length === 0) {
    resultsEl.classList.add('hidden');
    noResultsEl.classList.remove('hidden');
    return;
  }

  noResultsEl.classList.add('hidden');
  resultsEl.classList.remove('hidden');

  const countEl = document.createElement('div');
  countEl.className = 'search-result-count';
  countEl.textContent = `${results.length} recipe${results.length !== 1 ? 's' : ''}`;

  resultsEl.innerHTML = '';
  resultsEl.appendChild(countEl);

  results.forEach(recipe => {
    const key = recipeKey(recipe);
    const inAny = isInAnyList(key);
    const sub = recipe.subtitle || recipe.time || (recipe.tags || []).slice(0, 2).join(', ') || '';

    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <div class="list-item-emoji">${getEmoji(recipe)}</div>
      <div class="list-item-info">
        <div class="list-item-name">${escHtml(recipe.name)}</div>
        ${sub ? `<div class="list-item-sub">${escHtml(sub)}</div>` : ''}
      </div>
      <button class="heart-btn" data-key="${escHtml(key)}" aria-label="${inAny ? 'Edit favourites' : 'Save to favourites'}">${inAny ? '❤️' : '♡'}</button>`;

    item.querySelector('.heart-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openListPicker(recipe);
    });

    item.addEventListener('click', (e) => {
      if (e.target.closest('.heart-btn')) return;
      openRecipeDetail(recipe);
    });

    resultsEl.appendChild(item);
  });
}

function onSearchInput() {
  const query = document.getElementById('search-input').value;
  const nonWhitespace = query.replace(/\s/g, '');
  renderSearchResults(nonWhitespace.length >= 3 ? performSearch(query) : null);
}

// Re-render search results after list picker changes so hearts stay in sync
function refreshSearchHearts() {
  const resultsEl = document.getElementById('search-results');
  if (resultsEl.classList.contains('hidden')) return;
  resultsEl.querySelectorAll('.heart-btn').forEach(btn => {
    const inAny = isInAnyList(btn.dataset.key);
    btn.textContent = inAny ? '❤️' : '♡';
    btn.setAttribute('aria-label', inAny ? 'Edit favourites' : 'Save to favourites');
  });
}

// ── Language page ──────────────────────────────────────────────────────────

function renderLanguagePage() {
  const container = document.getElementById('language-cards');
  const onlyActive = state.activeLanguages.size === 1;

  container.innerHTML = '';
  LANGUAGES.forEach(lang => {
    const active = state.activeLanguages.has(lang.code);
    const isOnly = active && onlyActive;

    const card = document.createElement('div');
    card.className = `lang-card${active ? ' active' : ''}${isOnly ? ' only-active' : ''}`;
    card.dataset.code = lang.code;
    card.setAttribute('role', 'switch');
    card.setAttribute('aria-checked', String(active));
    card.innerHTML = `
      <span class="lang-card-flag">${lang.flag}</span>
      <div class="lang-card-info">
        <div class="lang-card-name">${lang.name}</div>
        <div class="lang-card-sub">${lang.sub}</div>
      </div>
      <div class="lang-toggle" aria-hidden="true"></div>`;

    card.addEventListener('click', () => toggleLanguage(lang.code));
    container.appendChild(card);
  });
}

function toggleLanguage(code) {
  if (state.activeLanguages.has(code) && state.activeLanguages.size === 1) return; // last active — prevent

  if (state.activeLanguages.has(code)) {
    state.activeLanguages.delete(code);
  } else {
    state.activeLanguages.add(code);
  }

  saveLanguages();
  renderLanguagePage();
  buildDeck();
  renderDeck();
  onSearchInput(); // re-run search with new language filter
}

// ── Filter chips ───────────────────────────────────────────────────────────

function renderFilterBar() {
  const bar = document.getElementById('filter-chips');

  const allChip = makeChip('all', '✨ All', '#1A1A2E', state.activeFilters.size === 0);
  allChip.addEventListener('click', () => {
    state.activeFilters.clear(); buildDeck(); renderDeck(); updateChips();
  });
  bar.appendChild(allChip);

  FILTERS.forEach(f => {
    const chip = makeChip(f.id, `${f.emoji} ${f.label}`, f.color, state.activeFilters.has(f.id));
    chip.addEventListener('click', () => {
      if (state.activeFilters.has(f.id)) { state.activeFilters.delete(f.id); } else { state.activeFilters.add(f.id); }
      buildDeck(); renderDeck(); updateChips();
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
    const titles = { search: 'Search', favourites: 'Favourites', language: 'Language', about: 'About' };
    pageTitle.textContent = titles[page] || page;
  }

  if (page === 'language') renderLanguagePage();

  if (page === 'search') {
    requestAnimationFrame(() => document.getElementById('search-input').focus());
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  if (page === 'favourites') renderFavouritesPage();
}

function openDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  drawer.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('open'); });
}

function closeDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  drawer.classList.remove('open'); backdrop.classList.remove('open');
  drawer.addEventListener('transitionend', () => {
    drawer.classList.add('hidden'); backdrop.classList.add('hidden');
  }, { once: true });
}

// ── Service worker + update toast ──────────────────────────────────────────

async function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register('sw.js');
    const watch = (sw) => {
      sw.addEventListener('statechange', () => {
        if (sw.state === 'installed' && navigator.serviceWorker.controller) showUpdateToast(reg);
      });
    };
    if (reg.installing) watch(reg.installing);
    reg.addEventListener('updatefound', () => watch(reg.installing));
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

  if (typeof APP_VERSION !== 'undefined') {
    document.getElementById('version-display').textContent = APP_VERSION;
  }

  // Match page
  document.getElementById('like-btn').addEventListener('click', () => buttonSwipe('right'));
  document.getElementById('skip-btn').addEventListener('click', () => buttonSwipe('left'));
  document.getElementById('list-toggle-btn').addEventListener('click', openList);
  document.getElementById('close-list-btn').addEventListener('click', closeList);
  document.getElementById('list-backdrop').addEventListener('click', closeList);
  document.getElementById('clear-list-btn').addEventListener('click', clearList);
  document.getElementById('reset-btn').addEventListener('click', () => { buildDeck(); renderDeck(); });

  // Search
  document.getElementById('search-input').addEventListener('input', onSearchInput);

  // Recipe detail sheet
  document.getElementById('recipe-detail-backdrop').addEventListener('click', closeRecipeDetail);
  document.getElementById('recipe-detail-close').addEventListener('click', closeRecipeDetail);

  // List picker
  document.getElementById('list-picker-backdrop').addEventListener('click', closeListPicker);
  document.getElementById('list-picker-close-btn').addEventListener('click', closeListPicker);
  document.getElementById('list-picker-new-btn').addEventListener('click', showPickerNewRow);
  document.getElementById('list-picker-new-add-btn').addEventListener('click', addPickerNewList);
  document.getElementById('list-picker-new-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addPickerNewList();
    if (e.key === 'Escape') hidePickerNewRow();
  });

  // Favourites page
  document.getElementById('fav-back-btn').addEventListener('click', closeFavDetail);
  document.getElementById('fav-rename-btn').addEventListener('click', startRename);
  document.getElementById('fav-delete-btn').addEventListener('click', tryDeleteList);
  document.getElementById('fav-new-list-btn').addEventListener('click', toggleFavNewInputRow);
  document.getElementById('fav-new-create-btn').addEventListener('click', createListFromOverview);
  document.getElementById('fav-new-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') createListFromOverview();
    if (e.key === 'Escape') toggleFavNewInputRow();
  });

  // Navigation
  document.getElementById('burger-btn').addEventListener('click', openDrawer);
  document.getElementById('nav-backdrop').addEventListener('click', closeDrawer);
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => { navigateTo(item.dataset.page); closeDrawer(); });
  });
  document.querySelector('.nav-item[data-page="match"]').classList.add('active');

  registerSW();
}

document.addEventListener('DOMContentLoaded', init);
