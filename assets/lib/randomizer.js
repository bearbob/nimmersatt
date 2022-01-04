function getRandom() {
  var p = document.getElementById("content");

  const random = Math.floor(Math.random() * raw_data.length);
  console.log("Random entry: " + random);
  p.innerHTML = raw_data[random].name;
};