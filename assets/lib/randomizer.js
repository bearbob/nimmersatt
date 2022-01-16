function getRandom() {
  var p = document.getElementById("content");

  const random = Math.floor(Math.random() * recipes.length);
  const recipe = recipes[random];
  var content = "";


  content += buildBlock(recipe, {"type": "name"});
  content += buildBlock(recipe, {"type": "subtitle"});
  content += buildBlock(recipe, {"type": "link", "header": true, "f": function(s) { return '<a href="' + s + '" target="_blank" rel="noopener noreferrer">' +  s.substring(0, s.indexOf('/', 8)) + '</a>'; }});
  content += buildBlock(recipe, {"type": "tags", "header": true, "f": function(s) { return s.join(', '); }});

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
      result += f(block);
    } else {
      result += block;
    }
    result += '</div>';
  } else {
    return "";
  }
}