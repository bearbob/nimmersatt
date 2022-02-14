function getRandom(count = 1) {
  let size = RECIPES.length;
  let result = '';
  for(let i=1; i<(count+1); i++) {
    // We count from 1 to get even and odd right
    let random = Math.floor(Math.random() * size);
    result += '<div class="';
    if (i%2 == 0) {
      result += 'even';
    } else {
      result += 'odd';
    }
    result += '">' + getContent(RECIPES[random]) + '</div>';
  }
  setContent(result);
};

function getBread() {
  let random = Math.floor(Math.random() * BREADS.length);
  let recipe = BREADS[random];
  let result = '<div class="odd">' + getContent(recipe) + '</div>';
  setContent(result);
};

function getFiltered() {
  let input = document.getElementById('search').value;
  let words = input.split(' ');
  // search over all recipes, including breads
  let filtered = RECIPES.concat(BREADS);
  for (let i of words) {
    // define a comparison function that is case insensitive and checks if the search word
    // is a substring
    let searchTerm = i.trim().toLowerCase();
    if (searchTerm.length < 1) continue;
    const isSubstring = function(element) {
      return element.toLowerCase().indexOf(searchTerm) != -1
    }
    filtered = filtered.filter( r =>
      (r.ingredients && r.ingredients.some(isSubstring)) ||
      (r.tags && r.tags.some(isSubstring)) ||
      isSubstring(r.name)
    );
  }
  // select randomly
  let size = filtered.length;
  let result = '';
  if (size == 0) {
    result = '<div class="odd"">Kein passendes Ergebnis gefunden</div>';
  } else {
    let random = Math.floor(Math.random() * size);
    result = '<div class="odd"">' + getContent(filtered[random]) + '</div>';
  }
  setContent(result);
};

function getContent(recipe) {
  let content = "";
  content += buildBlock(recipe, {"type": "name"});
  content += buildBlock(recipe, {"type": "subtitle"});
  content += buildBlock(recipe, {
    "type": "link",
    "header": "Link",
    "f": function(s) { return '<a href="' + s + '" target="_blank" rel="noopener noreferrer">' + s.substring(0, s.indexOf('/', 8)) + '</a>'; }
  });
  content += buildBlock(recipe, {
    "type": "video",
    "header": "Video",
    "f": function(s) { return '<a href="' + s + '" target="_blank" rel="noopener noreferrer">' + s.substring(0, s.indexOf('/', 8)) + '</a>'; }
  });
  content += buildBlock(recipe, {
    "type": "book",
    "header": "Buch",
    "f": function(s) { return '"' + BOOKS[s.id].name + '", Seite ' + s.page; }
  });
  content += buildBlock(recipe, {
    "type": "tags",
    "header": "Tags",
    "f": function(s) { return s.join(', '); }
  });
  content += buildBlock(recipe, {
    "type": "ingredients",
    "header": "Zutaten",
    "f": function(s) { return s.join(', '); }
  });
  content += buildBlock(recipe, {
    "type": "time",
    "header": "Zeit"
  });

  return content;
};

function setContent(content) {
  let p = document.getElementById("content");
  p.innerHTML = content;
};

/**
 * @param container Object
 * @param params.type String
 * @param params.header String
 * @param params.f Function
 */
function buildBlock(container, params) {
  if (container[params.type]) {
    let type = params.type;
    let block = container[type];
    let result = '<div class="'+type+'">';
    if (params.header) {
      result += '<b>' + params.header + ':</b> ';
    }
    if (params.f) {
      result += params.f.apply(this, [block]);
    } else {
      result += block;
    }
    result += '</div>';
    return result;
  } else {
    return "";
  }
};
