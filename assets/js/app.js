// ── Config ─────────────────────────────────────────────────────────────────

// Order of filters matters for details page - First hit is returned
const FILTERS = [
  { id: 'vegan',  label: 'Vegan',  emoji: '🌱', color: '#ccffd3',
    fontColor: '#1A1A2E', tags: ['vegan'] },
  { id: 'vegetarian',  label: 'Veggy',  emoji: '🌻', color: '#127836',
    fontColor: '#fff', tags: ['vegetarian', 'vegetarisch'] },
  { id: 'sweet',  label: 'Sweet',  emoji: '🍰', color: '#ffe096',
    fontColor: '#1A1A2E', tags: ['sweet', 'cookie'] },
  { id: 'dinner', label: 'Dinner', emoji: '🍽️', color: '#FF6B6B',
    fontColor: '#fff', tags: ['dinner'] },
  { id: 'bread',  label: 'Bread',  emoji: '🥖', color: '#F4A261',
    fontColor: '#fff', tags: ['brot', 'brötchen'] },
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
  skippedKeys: new Set(),
  favouriteLists: [],   // [{ id, name, recipeKeys[] }]
  customRecipes: [],    // [{ id, name, custom: true, ...opts }]
  customInMatch: false,
  shoppingCategories: [],     // [{ id, name, order }]
  shoppingOverrides: {},      // { "recipeKey::normIngredient": { checked, deleted, categoryId, order } }
  shoppingCustomItems: [],    // [{ id, text, checked, categoryId, order }]
  shoppingIngredientMap: {},  // { normalizedText: categoryId }
  shoppingHistory: [],        // [string] up to 20 unique items
  recipeEmojis: {},           // { [recipeKey]: emoji }
  recipeNotes: {},            // { [recipeKey]: note }
};

let currentFavView = 'overview'; // 'overview' | 'detail'
let currentFavListId = null;
let pickerRecipe = null;
let editingCustomRecipe = null;
let shoppingPickerItem = null;

// ── Storage ────────────────────────────────────────────────────────────────

function loadStorage() {
  loadLanguages();
  loadCustomRecipes();
  loadCustomInMatch();
  loadShopping();
  loadRecipeAnnotations();

  try {
    const list = JSON.parse(localStorage.getItem('nimmersatt_list') || '[]');
    state.weeklyList = Array.isArray(list) ? list : [];
  } catch (_) { state.weeklyList = []; }

  try {
    const skipped = JSON.parse(localStorage.getItem('nimmersatt_skipped') || '[]');
    state.skippedKeys = new Set(Array.isArray(skipped) ? skipped : []);
  } catch (_) { state.skippedKeys = new Set(); }

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

function saveSkipped() {
  localStorage.setItem('nimmersatt_skipped', JSON.stringify([...state.skippedKeys]));
}

function clearSkipped() {
  state.skippedKeys = new Set();
  localStorage.removeItem('nimmersatt_skipped');
}

function saveFavouriteLists() {
  localStorage.setItem('nimmersatt_favlists', JSON.stringify(state.favouriteLists));
}

function loadCustomRecipes() {
  try {
    const stored = JSON.parse(localStorage.getItem('nimmersatt_custom_recipes') || '[]');
    state.customRecipes = Array.isArray(stored) ? stored.filter(r => r.id && r.name) : [];
  } catch (_) { state.customRecipes = []; }
}

function saveCustomRecipes() {
  localStorage.setItem('nimmersatt_custom_recipes', JSON.stringify(state.customRecipes));
}

function loadCustomInMatch() {
  state.customInMatch = localStorage.getItem('nimmersatt_custom_in_match') === 'true';
}

function saveCustomInMatch() {
  localStorage.setItem('nimmersatt_custom_in_match', String(state.customInMatch));
}

function loadShopping() {
  try { state.shoppingCategories = JSON.parse(localStorage.getItem('nimmersatt_shopping_cats') || '[]'); }
  catch (_) { state.shoppingCategories = []; }
  try { state.shoppingOverrides = JSON.parse(localStorage.getItem('nimmersatt_shopping_overrides') || '{}'); }
  catch (_) { state.shoppingOverrides = {}; }
  try { state.shoppingCustomItems = JSON.parse(localStorage.getItem('nimmersatt_shopping_custom') || '[]'); }
  catch (_) { state.shoppingCustomItems = []; }
  try { state.shoppingIngredientMap = JSON.parse(localStorage.getItem('nimmersatt_shopping_map') || '{}'); }
  catch (_) { state.shoppingIngredientMap = {}; }
  try { state.shoppingHistory = JSON.parse(localStorage.getItem('nimmersatt_shopping_history') || '[]'); }
  catch (_) { state.shoppingHistory = []; }
}

function saveShoppingCategories() {
  localStorage.setItem('nimmersatt_shopping_cats', JSON.stringify(state.shoppingCategories));
}
function saveShoppingOverrides() {
  localStorage.setItem('nimmersatt_shopping_overrides', JSON.stringify(state.shoppingOverrides));
}
function saveShoppingCustom() {
  localStorage.setItem('nimmersatt_shopping_custom', JSON.stringify(state.shoppingCustomItems));
}
function saveShoppingMap() {
  localStorage.setItem('nimmersatt_shopping_map', JSON.stringify(state.shoppingIngredientMap));
}
function saveShoppingHistory() {
  localStorage.setItem('nimmersatt_shopping_history', JSON.stringify(state.shoppingHistory));
}

function loadRecipeAnnotations() {
  try { state.recipeEmojis = JSON.parse(localStorage.getItem('nimmersatt_recipe_emojis') || '{}'); }
  catch (_) { state.recipeEmojis = {}; }
  try { state.recipeNotes = JSON.parse(localStorage.getItem('nimmersatt_recipe_notes') || '{}'); }
  catch (_) { state.recipeNotes = {}; }
}
function saveRecipeEmojis() {
  localStorage.setItem('nimmersatt_recipe_emojis', JSON.stringify(state.recipeEmojis));
}
function saveRecipeNotes() {
  localStorage.setItem('nimmersatt_recipe_notes', JSON.stringify(state.recipeNotes));
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
  const listedKeys = new Set(state.weeklyList.map(r => recipeKey(r)));

  let pool = state.allRecipes.filter(r => state.activeLanguages.has(r.language || 'de'));

  if (state.customInMatch) {
    pool = [...pool, ...state.customRecipes];
  }

  // Apply filter for finding quick recipes, hardcoded to at most 30min
  if (state.activeFilters.has('quick')) {
    pool = pool.filter(r => (r.minutes || 60) <= 30);
  }

  if (state.activeFilters.size > 0) {
    const activeTags = new Set();
    for (const id of state.activeFilters) {
      const f = FILTERS.find(f => f.id === id);
      if (f) f.tags.forEach(t => activeTags.add(t));
    }
    if (!state.activeFilters.has('quick') || state.activeFilters.size > 1) {
      // if only quick filter is active, ignore the active tags
      pool = pool.filter(r => (r.tags || []).some(t => activeTags.has(t.toLowerCase())));
    }  
  }

  pool = pool.filter(r => !listedKeys.has(recipeKey(r)) && !state.skippedKeys.has(recipeKey(r)));

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
  return state.allRecipes.find(r => recipeKey(r) === key)
      || state.customRecipes.find(r => recipeKey(r) === key)
      || null;
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
  if (/kuchen|cake/.test(n)) return '🍰';
  if (/torte|tarte tatin/.test(n)) return '🎂';
  if (/cookie|keks|brownie/.test(n)) return '🍪';
  if (/muffin/.test(n)) return '🧁';
  if (/schokolade|chocolate/.test(n)) return '🍫';
  if (/brötchen|schrippe/.test(n)) return '🥐';
  if (/brot|bread|laib/.test(n)) return '🍞';
  if (/lachs|salmon|fish|fisch/.test(n)) return '🐟';
  if (/hähnchen|chicken|hühnchen/.test(n)) return '🍗';
  if (/risotto|reis|rice/.test(n)) return '🍚';
  if (/pfannkuchen|schmarrn|crêpe|pancake|eierkuchen/.test(n)) return '🥞';
  if (/salat|salad/.test(n)) return '🥗';
  if (/flammkuchen|quiche|pie/.test(n)) return '🥧';
  if (/schnecken|cinnamon roll/.test(n)) return '🌀';
  if (/steak|beef|rind/.test(n)) return '🥩';
  if (/lamm|lamb/.test(n)) return '🍖';
  if (/huhn|hühnchen|chicken/.test(n)) return '🍗';
  const cat = getCategory(recipe);
  if (cat.id === 'sweet') return '🍰';
  if (cat.id === 'bread') return '🥖';
  if (cat.id === 'vegan') return '🌱';
  return '🍽️';
}

function recipeKey(recipe) { return recipe.name; }

function getDisplayEmoji(recipe) {
  return state.recipeEmojis[recipeKey(recipe)] || getEmoji(recipe);
}
function getUserNote(recipe) {
  return state.recipeNotes[recipeKey(recipe)] || '';
}

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
  const key = recipeKey(recipe);
  const customEmoji = state.recipeEmojis[key] || '🫥';
  const userNote = state.recipeNotes[key] || '';
  const hasNote = !!userNote;

  let linksHtml = '';
  if (recipe.link) {
    linksHtml += `<a href="${recipe.link}" target="_blank" rel="noopener noreferrer" class="card-link">🔗 Recipe</a>`;
  }
  if (recipe.video) {
    linksHtml += `<a href="${recipe.video}" target="_blank" rel="noopener noreferrer" class="card-link">▶️ Video</a>`;
  }

  const ingredients = recipe.ingredients
    ? recipe.ingredients.join(', ')
    : '';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-indicator like">❤️ ADD</div>
    <div class="card-indicator skip">✕ SKIP</div>
    <div class="card-hero" style="${recipe.image ? '' : `background:${cat.color}30;`}">${recipe.image ? `<img src="${escHtml(recipe.image)}" alt="" onerror="this.parentElement.style.background='${cat.color}30';this.replaceWith(document.createTextNode('${emoji}'));">` : emoji}</div>
    <div class="card-body">
      <div class="card-body-actions">
        <button class="card-emoji-btn" aria-label="Set emoji">${escHtml(customEmoji)}</button>
        <button class="card-note-btn${hasNote ? ' has-note' : ''}" aria-label="${hasNote ? 'Edit note' : 'Add note'}">Note</button>
      </div>
      <div class="card-category" style="background:${cat.color};color:${cat.fontColor};">
        ${cat.emoji} ${cat.label}
      </div>
      <h2 class="card-name">${escHtml(recipe.name)}</h2>
      ${recipe.subtitle ? `<p class="card-subtitle">${escHtml(recipe.subtitle)}</p>` : ''}
      ${userNote ? `<p class="card-user-note">${escHtml(userNote)}</p>` : ''}
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
  const emojiBtn = card.querySelector('.card-emoji-btn');
  const noteBtn = card.querySelector('.card-note-btn');
  [emojiBtn, noteBtn].forEach(btn => {
    btn.addEventListener('pointerdown', e => e.stopPropagation());
  });
  emojiBtn.addEventListener('click', () => openEmojiModal(recipe));
  noteBtn.addEventListener('click', () => openNoteModal(recipe));
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

  recipes.forEach((recipe, idx) => {
    const card = createCardEl(recipe);
    card.dataset.stack = String(idx);
    card.style.transition = 'none';
    deckEl.appendChild(card);
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
  else { state.skippedKeys.add(recipeKey(recipe)); saveSkipped(); }
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

  const heroEl = document.getElementById('recipe-detail-hero');
  heroEl.style.background = `${cat.color}30`;
  document.getElementById('recipe-detail-emoji').textContent = getDisplayEmoji(recipe);

  const catEl = document.getElementById('recipe-detail-category');
  catEl.textContent = `${cat.emoji} ${cat.label}`;
  catEl.style.background = cat.color;
  catEl.style.color = cat.fontColor;

  document.getElementById('recipe-detail-name').textContent = recipe.name;

  const subtitleEl = document.getElementById('recipe-detail-subtitle');
  if (recipe.subtitle) {
    subtitleEl.textContent = recipe.subtitle;
    subtitleEl.classList.remove('hidden');
  } else {
    subtitleEl.classList.add('hidden');
  }

  const noteEl = document.getElementById('recipe-detail-note');
  const userNote = getUserNote(recipe);
  if (userNote) {
    noteEl.textContent = userNote;
    noteEl.classList.remove('hidden');
  } else {
    noteEl.classList.add('hidden');
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
  clearSkipped();
  buildDeck();
  renderDeck();
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
      <div class="fav-detail-item-emoji" style="background:${cat.color}25;">${getDisplayEmoji(recipe)}</div>
      <div class="fav-detail-item-info">
        <div class="fav-detail-item-name">${escHtml(recipe.name)}</div>
        ${sub ? `<div class="fav-detail-item-sub">${escHtml(sub)}</div>` : ''}
        ${getUserNote(recipe) ? `<div class="fav-detail-item-note">${escHtml(getUserNote(recipe))}</div>` : ''}
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

  const matches = recipe => {
    const name = recipe.name.toLowerCase();
    const ingredients = (recipe.ingredients || []).join(' ').toLowerCase();
    return terms.every(t => name.includes(t) || ingredients.includes(t));
  };

  const builtIn = state.allRecipes.filter(r => {
    if (!state.activeLanguages.has(r.language || 'de')) return false;
    return matches(r);
  });

  const seen = new Set(builtIn.map(r => r.name));
  const custom = state.customRecipes.filter(r => matches(r) && !seen.has(r.name));

  return [...builtIn, ...custom];
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

  const quickChip = makeChip('quick', '⏱️ Quick', '#2e1a22', state.activeFilters.has('quick'));
  quickChip.addEventListener('click', () => {
    if (state.activeFilters.has('quick')) { state.activeFilters.delete('quick'); } else { state.activeFilters.add('quick'); }
    buildDeck(); renderDeck(); updateChips();
  });
  bar.appendChild(quickChip);

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

// ── My Recipes page ────────────────────────────────────────────────────────

function renderMyRecipesPage() {
  const toggle = document.getElementById('my-recipes-match-row');
  toggle.setAttribute('aria-checked', String(state.customInMatch));
  document.getElementById('my-recipes-match-toggle').setAttribute('aria-checked', String(state.customInMatch));

  const listEl = document.getElementById('my-recipes-list');
  const emptyEl = document.getElementById('my-recipes-empty');

  if (state.customRecipes.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  listEl.innerHTML = '';
  state.customRecipes.forEach(recipe => {
    const sub = [recipe.time, ...(recipe.tags || []).slice(0, 2)].filter(Boolean).join(' · ');
    const item = document.createElement('div');
    item.className = 'my-recipe-item';
    item.innerHTML = `
      <div class="my-recipe-emoji">${getEmoji(recipe)}</div>
      <div class="my-recipe-info">
        <div class="my-recipe-name">${escHtml(recipe.name)}</div>
        ${sub ? `<div class="my-recipe-sub">${escHtml(sub)}</div>` : ''}
      </div>
      <div class="my-recipe-actions">
        <button class="my-recipe-edit-btn" aria-label="Edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="my-recipe-delete-btn" aria-label="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>`;

    item.querySelector('.my-recipe-edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const r = state.customRecipes.find(r => r.id === recipe.id);
      if (r) openCustomRecipeModal(r);
    });

    item.querySelector('.my-recipe-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      if (btn.dataset.confirm === '1') {
        deleteCustomRecipe(recipe.id);
      } else {
        btn.dataset.confirm = '1';
        btn.classList.add('danger');
        setTimeout(() => { btn.dataset.confirm = ''; btn.classList.remove('danger'); }, 3000);
      }
    });

    item.addEventListener('click', (e) => {
      if (e.target.closest('.my-recipe-edit-btn, .my-recipe-delete-btn')) return;
      openRecipeDetail(recipe);
    });

    listEl.appendChild(item);
  });
}

function toggleCustomInMatch() {
  state.customInMatch = !state.customInMatch;
  saveCustomInMatch();
  renderMyRecipesPage();
  buildDeck();
  renderDeck();
}

function deleteCustomRecipe(id) {
  state.customRecipes = state.customRecipes.filter(r => r.id !== id);
  saveCustomRecipes();
  buildDeck();
  renderDeck();
  renderMyRecipesPage();
}

// ── Custom recipe modal ────────────────────────────────────────────────────

function openCustomRecipeModal(recipe) {
  editingCustomRecipe = recipe || null;
  document.getElementById('custom-recipe-modal-title').textContent = recipe ? 'Edit Recipe' : 'New Recipe';
  document.getElementById('crm-name').value = recipe ? recipe.name : '';
  document.getElementById('crm-name').classList.remove('error');
  document.getElementById('crm-time').value = recipe ? (recipe.time || '') : '';
  document.getElementById('crm-link').value = recipe ? (recipe.link || '') : '';
  document.getElementById('crm-video').value = recipe ? (recipe.video || '') : '';
  document.getElementById('crm-ingredients').value = recipe ? (recipe.ingredients || []).join('\n') : '';
  renderCrmTags(recipe ? (recipe.tags || []) : []);

  const modal = document.getElementById('custom-recipe-modal');
  const backdrop = document.getElementById('custom-recipe-backdrop');
  modal.classList.remove('hidden');
  backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { modal.classList.add('open'); backdrop.classList.add('open'); });
  setTimeout(() => document.getElementById('crm-name').focus(), 350);
}

function closeCustomRecipeModal() {
  const modal = document.getElementById('custom-recipe-modal');
  const backdrop = document.getElementById('custom-recipe-backdrop');
  modal.classList.remove('open');
  backdrop.classList.remove('open');
  modal.addEventListener('transitionend', () => {
    modal.classList.add('hidden');
    backdrop.classList.add('hidden');
  }, { once: true });
  editingCustomRecipe = null;
}

function renderCrmTags(selectedTags) {
  const container = document.getElementById('crm-tags');
  container.innerHTML = '';
  FILTERS.forEach(f => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'crm-tag-chip';
    chip.dataset.id = f.id;
    chip.dataset.filterTags = JSON.stringify(f.tags);
    chip.style.setProperty('--chip-color', f.color);
    chip.textContent = `${f.emoji} ${f.label}`;
    if (selectedTags.some(t => f.tags.includes(t.toLowerCase()))) chip.classList.add('active');
    chip.addEventListener('click', () => chip.classList.toggle('active'));
    container.appendChild(chip);
  });
}

function saveCustomRecipeFromModal() {
  const nameEl = document.getElementById('crm-name');
  const name = nameEl.value.trim();
  if (!name) { nameEl.classList.add('error'); nameEl.focus(); return; }
  nameEl.classList.remove('error');

  const time = document.getElementById('crm-time').value.trim();
  const link = document.getElementById('crm-link').value.trim();
  const video = document.getElementById('crm-video').value.trim();
  const ingredientsRaw = document.getElementById('crm-ingredients').value;
  const ingredients = ingredientsRaw.split('\n').map(s => s.trim()).filter(Boolean);

  const tags = [];
  document.querySelectorAll('.crm-tag-chip.active').forEach(chip => {
    tags.push(...JSON.parse(chip.dataset.filterTags));
  });

  if (editingCustomRecipe) {
    const idx = state.customRecipes.findIndex(r => r.id === editingCustomRecipe.id);
    if (idx >= 0) {
      const updated = { ...state.customRecipes[idx], name };
      if (time) updated.time = time; else delete updated.time;
      if (link) updated.link = link; else delete updated.link;
      if (video) updated.video = video; else delete updated.video;
      if (ingredients.length) updated.ingredients = ingredients; else delete updated.ingredients;
      if (tags.length) updated.tags = tags; else delete updated.tags;
      state.customRecipes[idx] = updated;
    }
  } else {
    const recipe = { id: 'custom_' + Date.now(), name, custom: true };
    if (time) recipe.time = time;
    if (link) recipe.link = link;
    if (video) recipe.video = video;
    if (ingredients.length) recipe.ingredients = ingredients;
    if (tags.length) recipe.tags = tags;
    state.customRecipes.push(recipe);
  }

  saveCustomRecipes();
  buildDeck();
  renderDeck();
  renderMyRecipesPage();
  closeCustomRecipeModal();
}

// ── Clipboard export / import ──────────────────────────────────────────────

async function exportCustomRecipes() {
  if (state.customRecipes.length === 0) { showToast('No custom recipes to export.'); return; }
  try {
    await navigator.clipboard.writeText(JSON.stringify({ version: '1', customRecipes: state.customRecipes }));
    showToast(`${state.customRecipes.length} recipe${state.customRecipes.length !== 1 ? 's' : ''} copied to clipboard.`);
  } catch (_) {
    showToast('Could not copy — check browser permissions.');
  }
}

async function importCustomRecipes() {
  let text;
  try { text = await navigator.clipboard.readText(); }
  catch (_) { showToast('Could not read clipboard — check browser permissions.'); return; }

  let parsed;
  try { parsed = JSON.parse(text); } catch (_) { showToast('Clipboard does not contain valid recipe data.'); return; }
  if (!parsed || !Array.isArray(parsed.customRecipes)) { showToast('Clipboard does not contain valid recipe data.'); return; }

  const existing = new Set(state.customRecipes.map(r => r.name));
  let added = 0, skipped = 0;

  for (const r of parsed.customRecipes) {
    if (!r.name || typeof r.name !== 'string') continue;
    if (existing.has(r.name)) { skipped++; continue; }
    const recipe = { id: 'custom_' + (Date.now() + added), name: r.name, custom: true };
    if (r.time) recipe.time = r.time;
    if (r.link) recipe.link = r.link;
    if (r.video) recipe.video = r.video;
    if (Array.isArray(r.ingredients) && r.ingredients.length) recipe.ingredients = r.ingredients;
    if (Array.isArray(r.tags) && r.tags.length) recipe.tags = r.tags;
    state.customRecipes.push(recipe);
    existing.add(r.name);
    added++;
  }

  if (added === 0 && skipped === 0) { showToast('No valid recipes found in clipboard.'); return; }
  saveCustomRecipes();
  buildDeck();
  renderDeck();
  renderMyRecipesPage();

  const parts = [];
  if (added) parts.push(`${added} recipe${added !== 1 ? 's' : ''} imported`);
  if (skipped) parts.push(`${skipped} skipped`);
  showToast(parts.join(', ') + '.');
}

// ── Toast ──────────────────────────────────────────────────────────────────

function showToast(message) {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.className = 'app-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2800);
}

// ── Shopping ───────────────────────────────────────────────────────────────

function normIngredient(s) { return String(s).trim().toLowerCase(); }

function overrideKey(rKey, ingredient) { return rKey + '::' + normIngredient(ingredient); }

function buildShoppingList() {
  const items = [];

  for (let rIdx = 0; rIdx < state.weeklyList.length; rIdx++) {
    const recipe = state.weeklyList[rIdx];
    const rKey = recipeKey(recipe);
    const ingredients = recipe.ingredients || [];
    for (let iIdx = 0; iIdx < ingredients.length; iIdx++) {
      const ingredient = ingredients[iIdx];
      const oKey = overrideKey(rKey, ingredient);
      const override = state.shoppingOverrides[oKey] || {};
      if (override.deleted) continue;

      const norm = normIngredient(ingredient);
      const categoryId = override.categoryId !== undefined
        ? override.categoryId
        : (state.shoppingIngredientMap[norm] || null);

      items.push({
        id: oKey,
        text: ingredient,
        recipeSource: recipe.name,
        checked: override.checked || false,
        categoryId,
        isCustom: false,
        order: override.order !== undefined ? override.order : (rIdx * 1000 + iIdx),
      });
    }
  }

  for (const item of state.shoppingCustomItems) {
    items.push({
      id: item.id,
      text: item.text,
      recipeSource: null,
      checked: item.checked || false,
      categoryId: item.categoryId || null,
      isCustom: true,
      order: item.order !== undefined ? item.order : Infinity,
    });
  }

  return items;
}

function groupByCategory(items) {
  const catMap = new Map();
  catMap.set(null, []);
  for (const cat of state.shoppingCategories) catMap.set(cat.id, []);
  for (const item of items) {
    const key = catMap.has(item.categoryId) ? item.categoryId : null;
    catMap.get(key).push(item);
  }
  for (const catItems of catMap.values()) {
    catItems.sort((a, b) => a.order - b.order);
  }
  return catMap;
}

function renderShoppingPage() {
  const content = document.getElementById('shopping-content');
  content.innerHTML = '';

  const allItems = buildShoppingList();
  if (allItems.length === 0 && state.shoppingCategories.length === 0) {
    content.innerHTML = `<div class="shopping-empty"><div class="empty-emoji">🛒</div><p>Add recipes to your weekly list to see their ingredients here.</p></div>`;
    renderShoppingSuggestions('');
    return;
  }

  const grouped = groupByCategory(allItems);
  const sortedCats = [...state.shoppingCategories].sort((a, b) => a.order - b.order);

  sortedCats.forEach((cat, catIdx) => {
    const catItems = grouped.get(cat.id) || [];
    renderShoppingSection(content, cat, catItems, catIdx, sortedCats.length);
  });

  const uncatItems = grouped.get(null) || [];
  renderShoppingSection(content, null, uncatItems, -1, sortedCats.length);

  renderShoppingSuggestions(document.getElementById('shopping-add-input').value);
}

function renderShoppingSection(container, cat, items, catIdx, totalCats) {
  const section = document.createElement('div');
  section.className = 'shopping-section';

  if (cat) {
    const isFirst = catIdx === 0;
    const isLast = catIdx === totalCats - 1;
    section.innerHTML = `
      <div class="shopping-cat-header" data-cat-id="${escHtml(cat.id)}">
        <span class="shopping-cat-name">${escHtml(cat.name)}</span>
        <div class="shopping-cat-actions">
          <button class="shopping-cat-btn shopping-cat-up-btn" ${isFirst ? 'disabled' : ''} aria-label="Move category up">↑</button>
          <button class="shopping-cat-btn shopping-cat-down-btn" ${isLast ? 'disabled' : ''} aria-label="Move category down">↓</button>
          <button class="shopping-cat-btn shopping-cat-rename-btn" aria-label="Rename category">✏️</button>
          <button class="shopping-cat-btn shopping-cat-delete-btn" aria-label="Delete category">🗑</button>
        </div>
      </div>`;

    const header = section.querySelector('.shopping-cat-header');
    header.querySelector('.shopping-cat-up-btn').addEventListener('click', () => moveShoppingCategory(cat.id, 'up'));
    header.querySelector('.shopping-cat-down-btn').addEventListener('click', () => moveShoppingCategory(cat.id, 'down'));
    header.querySelector('.shopping-cat-rename-btn').addEventListener('click', () => renameCategoryInline(cat.id, section));
    header.querySelector('.shopping-cat-delete-btn').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      if (btn.dataset.confirm === '1') {
        deleteShoppingCategory(cat.id);
      } else {
        btn.dataset.confirm = '1';
        btn.classList.add('danger');
        setTimeout(() => { btn.dataset.confirm = ''; btn.classList.remove('danger'); }, 3000);
      }
    });
  } else if (items.length > 0 || totalCats === 0) {
    section.innerHTML = `<div class="shopping-cat-header shopping-cat-header--uncat"><span class="shopping-cat-name">Other</span></div>`;
  }

  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'shopping-items';
  items.forEach((item, idx) => renderShoppingItem(itemsContainer, item, idx, items.length));
  section.appendChild(itemsContainer);

  if (cat || items.length > 0) container.appendChild(section);
}

function renderShoppingItem(container, item, idx, total) {
  const el = document.createElement('div');
  el.className = `shopping-item${item.checked ? ' checked' : ''}`;

  const catName = item.categoryId
    ? (state.shoppingCategories.find(c => c.id === item.categoryId)?.name || '')
    : '';

  el.innerHTML = `
    <button class="shopping-check-btn" aria-label="${item.checked ? 'Uncheck' : 'Check'}">${item.checked ? '✓' : ''}</button>
    <div class="shopping-item-info">
      <span class="shopping-item-text">${escHtml(item.text)}</span>
      ${item.recipeSource ? `<span class="shopping-item-source">${escHtml(item.recipeSource)}</span>` : ''}
    </div>
    <div class="shopping-item-actions">
      <button class="shopping-item-cat-btn" aria-label="Change category" title="${escHtml(catName || 'No category')}">🏷</button>
      <button class="shopping-item-up-btn shopping-order-btn" ${idx === 0 ? 'disabled' : ''} aria-label="Move up">↑</button>
      <button class="shopping-item-down-btn shopping-order-btn" ${idx === total - 1 ? 'disabled' : ''} aria-label="Move down">↓</button>
      ${item.isCustom
        ? `<button class="shopping-item-edit-btn shopping-order-btn" aria-label="Edit">✏️</button>`
        : ''}
      <button class="shopping-item-delete-btn shopping-order-btn" aria-label="Delete">✕</button>
    </div>`;

  el.querySelector('.shopping-check-btn').addEventListener('click', () => toggleShoppingItem(item));
  el.querySelector('.shopping-item-cat-btn').addEventListener('click', () => openShoppingCatPicker(item));
  el.querySelector('.shopping-item-up-btn').addEventListener('click', () => moveShoppingItem(item.id, 'up'));
  el.querySelector('.shopping-item-down-btn').addEventListener('click', () => moveShoppingItem(item.id, 'down'));
  if (item.isCustom) {
    el.querySelector('.shopping-item-edit-btn').addEventListener('click', () => editShoppingCustomItem(item.id, el));
  }
  el.querySelector('.shopping-item-delete-btn').addEventListener('click', () => deleteShoppingItem(item));

  container.appendChild(el);
}

function toggleShoppingItem(item) {
  if (item.isCustom) {
    const ci = state.shoppingCustomItems.find(i => i.id === item.id);
    if (ci) { ci.checked = !ci.checked; saveShoppingCustom(); }
  } else {
    if (!state.shoppingOverrides[item.id]) state.shoppingOverrides[item.id] = {};
    state.shoppingOverrides[item.id].checked = !item.checked;
    saveShoppingOverrides();
  }
  renderShoppingPage();
}

function deleteShoppingItem(item) {
  if (item.isCustom) {
    state.shoppingCustomItems = state.shoppingCustomItems.filter(i => i.id !== item.id);
    saveShoppingCustom();
  } else {
    if (!state.shoppingOverrides[item.id]) state.shoppingOverrides[item.id] = {};
    state.shoppingOverrides[item.id].deleted = true;
    saveShoppingOverrides();
  }
  renderShoppingPage();
}

function editShoppingCustomItem(itemId, el) {
  const ci = state.shoppingCustomItems.find(i => i.id === itemId);
  if (!ci) return;
  const textEl = el.querySelector('.shopping-item-text');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'shopping-item-edit-input';
  input.value = ci.text;
  input.maxLength = 100;
  const finish = () => {
    const newText = input.value.trim();
    if (newText && newText !== ci.text) {
      ci.text = newText;
      saveShoppingCustom();
      const norm = normIngredient(newText);
      state.shoppingHistory = [newText, ...state.shoppingHistory.filter(h => normIngredient(h) !== norm)].slice(0, 20);
      saveShoppingHistory();
    }
    renderShoppingPage();
  };
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } if (e.key === 'Escape') renderShoppingPage(); });
  input.addEventListener('blur', finish);
  textEl.replaceWith(input);
  input.focus(); input.select();
}

function setItemOrder(item, newOrder) {
  if (item.isCustom) {
    const ci = state.shoppingCustomItems.find(i => i.id === item.id);
    if (ci) ci.order = newOrder;
  } else {
    if (!state.shoppingOverrides[item.id]) state.shoppingOverrides[item.id] = {};
    state.shoppingOverrides[item.id].order = newOrder;
  }
}

function moveShoppingItem(itemId, direction) {
  const allItems = buildShoppingList();
  const item = allItems.find(i => i.id === itemId);
  if (!item) return;

  const catItems = allItems.filter(i => i.categoryId === item.categoryId).sort((a, b) => a.order - b.order);
  const idx = catItems.findIndex(i => i.id === itemId);
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= catItems.length) return;

  catItems.forEach((ci, i) => { if (!isFinite(ci.order)) { setItemOrder(ci, i * 100); ci.order = i * 100; } });

  const tempOrder = catItems[idx].order;
  setItemOrder(catItems[idx], catItems[swapIdx].order);
  setItemOrder(catItems[swapIdx], tempOrder);

  saveShoppingOverrides();
  saveShoppingCustom();
  renderShoppingPage();
}

function addShoppingCustomItem(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const norm = normIngredient(trimmed);
  const categoryId = state.shoppingIngredientMap[norm] || null;
  const maxOrder = state.shoppingCustomItems.reduce((m, i) => Math.max(m, i.order || 0), 0);
  state.shoppingCustomItems.push({ id: 'shop_' + Date.now(), text: trimmed, checked: false, categoryId, order: maxOrder + 100 });
  saveShoppingCustom();
  state.shoppingHistory = [trimmed, ...state.shoppingHistory.filter(h => normIngredient(h) !== norm)].slice(0, 20);
  saveShoppingHistory();
  renderShoppingPage();
}

function clearShoppingList() {
  state.shoppingCustomItems = [];
  saveShoppingCustom();
  const newOverrides = {};
  for (const [key, override] of Object.entries(state.shoppingOverrides)) {
    if (override.categoryId !== undefined) newOverrides[key] = { categoryId: override.categoryId };
  }
  state.shoppingOverrides = newOverrides;
  saveShoppingOverrides();
  renderShoppingPage();
}

function addShoppingCategory(name) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const maxOrder = state.shoppingCategories.reduce((m, c) => Math.max(m, c.order || 0), 0);
  state.shoppingCategories.push({ id: 'cat_' + Date.now(), name: trimmed, order: maxOrder + 100 });
  saveShoppingCategories();
  renderShoppingPage();
}

function deleteShoppingCategory(catId) {
  state.shoppingCategories = state.shoppingCategories.filter(c => c.id !== catId);
  for (const override of Object.values(state.shoppingOverrides)) {
    if (override.categoryId === catId) override.categoryId = null;
  }
  state.shoppingCustomItems.forEach(item => { if (item.categoryId === catId) item.categoryId = null; });
  for (const [norm, cId] of Object.entries(state.shoppingIngredientMap)) {
    if (cId === catId) delete state.shoppingIngredientMap[norm];
  }
  saveShoppingCategories();
  saveShoppingOverrides();
  saveShoppingCustom();
  saveShoppingMap();
  renderShoppingPage();
}

function moveShoppingCategory(catId, direction) {
  const sorted = [...state.shoppingCategories].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex(c => c.id === catId);
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= sorted.length) return;

  sorted.forEach((c, i) => {
    const sc = state.shoppingCategories.find(cat => cat.id === c.id);
    if (sc) sc.order = i * 100;
  });

  const cat1 = state.shoppingCategories.find(c => c.id === sorted[idx].id);
  const cat2 = state.shoppingCategories.find(c => c.id === sorted[swapIdx].id);
  if (cat1 && cat2) { const temp = cat1.order; cat1.order = cat2.order; cat2.order = temp; }

  saveShoppingCategories();
  renderShoppingPage();
}

function renameCategoryInline(catId, sectionEl) {
  const cat = state.shoppingCategories.find(c => c.id === catId);
  if (!cat) return;
  const nameEl = sectionEl.querySelector('.shopping-cat-name');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'shopping-cat-rename-input';
  input.value = cat.name;
  input.maxLength = 40;
  const finish = () => {
    const newName = input.value.trim();
    if (newName && newName !== cat.name) { cat.name = newName; saveShoppingCategories(); }
    renderShoppingPage();
  };
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } if (e.key === 'Escape') renderShoppingPage(); });
  input.addEventListener('blur', finish);
  nameEl.replaceWith(input);
  input.focus(); input.select();
}

function renderShoppingSuggestions(filter) {
  const suggestionsEl = document.getElementById('shopping-suggestions');
  const norm = filter.trim().toLowerCase();
  const matches = state.shoppingHistory.filter(h => !norm || normIngredient(h).includes(norm)).slice(0, 8);
  if (matches.length === 0) { suggestionsEl.innerHTML = ''; return; }
  suggestionsEl.innerHTML = matches.map(h => `<button class="shopping-suggestion-chip" type="button">${escHtml(h)}</button>`).join('');
  suggestionsEl.querySelectorAll('.shopping-suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      addShoppingCustomItem(chip.textContent.trim());
      document.getElementById('shopping-add-input').value = '';
      renderShoppingSuggestions('');
    });
  });
}

function openShoppingCatPicker(item) {
  shoppingPickerItem = item;
  const list = document.getElementById('shopping-cat-picker-list');
  const cats = [{ id: null, name: 'No category' }, ...state.shoppingCategories.slice().sort((a, b) => a.order - b.order)];
  list.innerHTML = cats.map(cat => `
    <div class="picker-item shopping-cat-option" data-cat-id="${cat.id || ''}">
      <span class="picker-item-heart">${item.categoryId === cat.id ? '✓' : ' '}</span>
      <span class="picker-item-name">${escHtml(cat.name)}</span>
    </div>`).join('');
  list.querySelectorAll('.shopping-cat-option').forEach(el => {
    el.addEventListener('click', () => {
      const catId = el.dataset.catId || null;
      assignShoppingItemCategory(shoppingPickerItem, catId);
      closeShoppingCatPicker();
    });
  });
  const panel = document.getElementById('shopping-cat-picker');
  const backdrop = document.getElementById('shopping-cat-picker-backdrop');
  panel.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { panel.classList.add('open'); backdrop.classList.add('open'); });
}

function closeShoppingCatPicker() {
  const panel = document.getElementById('shopping-cat-picker');
  const backdrop = document.getElementById('shopping-cat-picker-backdrop');
  panel.classList.remove('open'); backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => { panel.classList.add('hidden'); backdrop.classList.add('hidden'); }, { once: true });
  shoppingPickerItem = null;
}

function assignShoppingItemCategory(item, categoryId) {
  if (item.isCustom) {
    const ci = state.shoppingCustomItems.find(i => i.id === item.id);
    if (ci) { ci.categoryId = categoryId; saveShoppingCustom(); }
  } else {
    if (!state.shoppingOverrides[item.id]) state.shoppingOverrides[item.id] = {};
    state.shoppingOverrides[item.id].categoryId = categoryId;
    saveShoppingOverrides();
  }
  const norm = normIngredient(item.text);
  if (categoryId) { state.shoppingIngredientMap[norm] = categoryId; }
  else { delete state.shoppingIngredientMap[norm]; }
  saveShoppingMap();
  renderShoppingPage();
}

function toggleShoppingAddCatRow() {
  const row = document.getElementById('shopping-add-cat-row');
  const btns = document.getElementById('shopping-toolbar-btns');
  const input = document.getElementById('shopping-cat-input');
  if (row.classList.contains('hidden')) {
    row.classList.remove('hidden'); btns.classList.add('hidden');
    input.value = ''; input.focus();
  } else {
    row.classList.add('hidden'); btns.classList.remove('hidden');
  }
}

function createShoppingCategoryFromInput() {
  const input = document.getElementById('shopping-cat-input');
  addShoppingCategory(input.value);
  document.getElementById('shopping-add-cat-row').classList.add('hidden');
  document.getElementById('shopping-toolbar-btns').classList.remove('hidden');
  input.value = '';
}

// ── Recipe emoji modal ─────────────────────────────────────────────────────

let emojiTargetRecipe = null;

function openEmojiModal(recipe) {
  emojiTargetRecipe = recipe;
  const key = recipeKey(recipe);
  document.getElementById('emoji-modal-name').textContent =
    recipe.name.length > 30 ? recipe.name.slice(0, 28) + '…' : recipe.name;
  const input = document.getElementById('emoji-modal-input');
  input.value = state.recipeEmojis[key] || '';
  const panel = document.getElementById('emoji-modal');
  const backdrop = document.getElementById('emoji-modal-backdrop');
  panel.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { panel.classList.add('open'); backdrop.classList.add('open'); });
  setTimeout(() => input.focus(), 350);
}

function closeEmojiModal() {
  const panel = document.getElementById('emoji-modal');
  const backdrop = document.getElementById('emoji-modal-backdrop');
  panel.classList.remove('open'); backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => {
    panel.classList.add('hidden'); backdrop.classList.add('hidden');
  }, { once: true });
  emojiTargetRecipe = null;
}

function saveEmojiFromModal() {
  if (!emojiTargetRecipe) return;
  const input = document.getElementById('emoji-modal-input');
  const value = input.value.trim();
  const key = recipeKey(emojiTargetRecipe);
  if (value) {
    let emoji = value;
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      emoji = [...new Intl.Segmenter().segment(value)][0]?.segment || value;
    } else {
      emoji = [...value][0] || value;
    }
    state.recipeEmojis[key] = emoji;
  } else {
    delete state.recipeEmojis[key];
  }
  saveRecipeEmojis();
  closeEmojiModal();
  renderDeck();
}

// ── Recipe note modal ──────────────────────────────────────────────────────

let noteTargetRecipe = null;

function openNoteModal(recipe) {
  noteTargetRecipe = recipe;
  const key = recipeKey(recipe);
  document.getElementById('note-modal-name').textContent =
    recipe.name.length > 30 ? recipe.name.slice(0, 28) + '…' : recipe.name;
  document.getElementById('note-modal-textarea').value = state.recipeNotes[key] || '';
  const panel = document.getElementById('note-modal');
  const backdrop = document.getElementById('note-modal-backdrop');
  panel.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(() => { panel.classList.add('open'); backdrop.classList.add('open'); });
  setTimeout(() => document.getElementById('note-modal-textarea').focus(), 350);
}

function closeNoteModal() {
  const panel = document.getElementById('note-modal');
  const backdrop = document.getElementById('note-modal-backdrop');
  panel.classList.remove('open'); backdrop.classList.remove('open');
  panel.addEventListener('transitionend', () => {
    panel.classList.add('hidden'); backdrop.classList.add('hidden');
  }, { once: true });
  noteTargetRecipe = null;
}

function saveNoteFromModal() {
  if (!noteTargetRecipe) return;
  const value = document.getElementById('note-modal-textarea').value.trim();
  const key = recipeKey(noteTargetRecipe);
  if (value) {
    state.recipeNotes[key] = value;
  } else {
    delete state.recipeNotes[key];
  }
  saveRecipeNotes();
  closeNoteModal();
  renderDeck();
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
    const titles = { search: 'Search', favourites: 'Favourites', language: 'Language', about: 'About', 'my-recipes': 'My Recipes', shopping: 'Shopping' };
    pageTitle.textContent = titles[page] || page;
  }

  if (page === 'language') renderLanguagePage();
  if (page === 'my-recipes') renderMyRecipesPage();
  if (page === 'shopping') renderShoppingPage();

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
  document.getElementById('reset-btn').addEventListener('click', () => { clearSkipped(); buildDeck(); renderDeck(); });

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

  // My Recipes page
  document.getElementById('my-recipes-match-row').addEventListener('click', toggleCustomInMatch);
  document.getElementById('my-recipes-add-btn').addEventListener('click', () => openCustomRecipeModal(null));
  document.getElementById('my-recipes-export-btn').addEventListener('click', exportCustomRecipes);
  document.getElementById('my-recipes-import-btn').addEventListener('click', importCustomRecipes);

  // Custom recipe modal
  document.getElementById('custom-recipe-backdrop').addEventListener('click', closeCustomRecipeModal);
  document.getElementById('custom-recipe-modal-close').addEventListener('click', closeCustomRecipeModal);
  document.getElementById('crm-cancel-btn').addEventListener('click', closeCustomRecipeModal);
  document.getElementById('crm-save-btn').addEventListener('click', saveCustomRecipeFromModal);
  document.getElementById('crm-name').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); saveCustomRecipeFromModal(); }
  });

  // Emoji modal
  document.getElementById('emoji-modal-backdrop').addEventListener('click', closeEmojiModal);
  document.getElementById('emoji-modal-close').addEventListener('click', closeEmojiModal);
  document.getElementById('emoji-modal-clear').addEventListener('click', () => {
    document.getElementById('emoji-modal-input').value = '';
  });
  document.getElementById('emoji-modal-save').addEventListener('click', saveEmojiFromModal);
  document.getElementById('emoji-modal-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); saveEmojiFromModal(); }
    if (e.key === 'Escape') closeEmojiModal();
  });

  // Note modal
  document.getElementById('note-modal-backdrop').addEventListener('click', closeNoteModal);
  document.getElementById('note-modal-close').addEventListener('click', closeNoteModal);
  document.getElementById('note-modal-cancel').addEventListener('click', closeNoteModal);
  document.getElementById('note-modal-save').addEventListener('click', saveNoteFromModal);
  document.getElementById('note-modal-textarea').addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNoteModal();
  });

  // Shopping page
  document.getElementById('shopping-add-cat-btn').addEventListener('click', toggleShoppingAddCatRow);
  document.getElementById('shopping-cat-create-btn').addEventListener('click', createShoppingCategoryFromInput);
  document.getElementById('shopping-cat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') createShoppingCategoryFromInput();
    if (e.key === 'Escape') toggleShoppingAddCatRow();
  });
  document.getElementById('shopping-clear-btn').addEventListener('click', clearShoppingList);
  document.getElementById('shopping-add-btn').addEventListener('click', () => {
    const input = document.getElementById('shopping-add-input');
    addShoppingCustomItem(input.value);
    input.value = '';
    renderShoppingSuggestions('');
  });
  document.getElementById('shopping-add-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      addShoppingCustomItem(e.target.value);
      e.target.value = '';
      renderShoppingSuggestions('');
    }
  });
  document.getElementById('shopping-add-input').addEventListener('input', e => renderShoppingSuggestions(e.target.value));
  document.getElementById('shopping-cat-picker-close').addEventListener('click', closeShoppingCatPicker);
  document.getElementById('shopping-cat-picker-backdrop').addEventListener('click', closeShoppingCatPicker);

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
