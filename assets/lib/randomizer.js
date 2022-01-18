function getRandom() {
  let random = Math.floor(Math.random() * recipes.length);
  let result = '<div class="odd">' + getContent(recipes[random]) + '</div>';
  random = Math.floor(Math.random() * recipes.length);
  result += '<div class="even">' + getContent(recipes[random]) + '</div>';
  setContent(result);
};

function getBread() {
  let breads = recipes.filter(r => r.tags && r.tags.includes("bread") );
  let random = Math.floor(Math.random() * breads.length);
  let recipe = breads[random];
  let result = getContent(recipe);
  setContent(result);
};

function getContent(recipe) {
  let content = "";
  content += buildBlock(recipe, {"type": "name"});
  content += buildBlock(recipe, {"type": "subtitle"});
  content += buildBlock(recipe, {
    "type": "link",
    "header": true,
    "f": function(s) { return '<a href="' + s + '" target="_blank" rel="noopener noreferrer">' +  s.substring(0, s.indexOf('/', 8)) + '</a>'; }
  });
  content += buildBlock(recipe, {
    "type": "video",
    "header": true,
    "f": function(s) { return '<a href="' + s + '" target="_blank" rel="noopener noreferrer">' +  s + '</a>'; }
  });
  content += buildBlock(recipe, {
    "type": "book",
    "header": true,
    "f": function(s) { return '"' + books[s.id].name + '", Seite ' + s.page; }
  });
  content += buildBlock(recipe, {
    "type": "tags",
    "header": true,
    "f": function(s) { return s.join(', '); }
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
 * @param params.header Boolean
 * @param params.f Function
 */
function buildBlock(container, params) {
  if (container[params.type]) {
    let type = params.type;
    let block = container[type];
    let result = '<div class="'+type+'">';
    if (params.header) {
      result += type.charAt(0).toUpperCase() + type.slice(1) + ': ';
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