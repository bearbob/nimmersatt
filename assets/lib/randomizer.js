function getRandom() {
  var p = document.getElementById("content");

  const random = Math.floor(Math.random() * raw_data.length);
  const recipe = raw_data[random];
  var content = "";

  if (recipe.link) {
      content += '<a href="' + recipe.link + '">';
  }
  content += recipe.name;
  if (recipe.link) {
      content += '</a>';
  }

  p.innerHTML = content;
};