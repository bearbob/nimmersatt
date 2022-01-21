function getRandom() {
  let size = RECIPES.length;
  let random = Math.floor(Math.random() * size);
  let result = '<div class="odd">' + getContent(RECIPES[random]) + '</div>';
  let r = Math.floor(Math.random() * size);
  random = (r == random)? (r+1)%size : r;
  result += '<div class="even">' + getContent(RECIPES[random]) + '</div>';
  setContent(result);
};

function getBread() {
  let random = Math.floor(Math.random() * BREADS.length);
  let recipe = BREADS[random];
  let result = '<div class="odd">' + getContent(recipe) + '</div>';
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
