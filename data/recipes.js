const RECIPES = [
  {
    "name": "Wildreis mit Mangold und Kirschen",
    "book": {
      "id": "jamies5zutaten",
      "page": 32,
    },
  },
  {
    "name": "Geniale Grüne Spaghetti",
    "subtitle": "mit Schwarzkohl und Ricotta",
    "book": {
      "id": "jamies5zutaten",
      "page": 50,
    },
  },
  {
    "name": "Blitzschnelle Bratwurst-Carbonara",
    "book": {
      "id": "jamies5zutaten",
      "page": 52,
    },
  },
  {
    "name": "Pasta mit Hackfleisch und Steinpilzen",
    "book": {
      "id": "jamies5zutaten",
      "page": 68,
    },
  },
  {
    "name": "Koreanischer Eierreis",
    "book": {
      "id": "jamies5zutaten",
      "page": 80,
    },
  },
  {
    "name": "Frittata mit Pilzen und Räucherspeck",
    "book": {
      "id": "jamies5zutaten",
      "page": 92,
    },
  },
  {
    "name": "Knuspriges Knoblauchhähnchen",
    "book": {
      "id": "jamies5zutaten",
      "page": 108,
    },
  },
  {
    "name": "Schnelle Asia-Frikadellen",
    "book": {
      "id": "jamies5zutaten",
      "page": 130,
    },
  },
  {
    "name": "Erbsen, dicke Bohnen, Chili & Minze",
    "book": {
      "id": "jamies5zutaten",
      "page": 176,
    },
    "link": "https://www.jamieoliver.com/recipes/vegetable-recipes/peas-beans-chilli-mint/",
  },
  {
    "name": "Irre guter Schweinefleisch-Burger",
    "book": {
      "id": "jamies5zutaten",
      "page": 208,
    },
  },
  {
    "name": "Pfannengerührtes Schweinefleisch",
    "book": {
      "id": "jamies5zutaten",
      "page": 220,
    },
  },
  {
    "name": "Aromatisches Lammcurry",
    "book": {
      "id": "jamies5zutaten",
      "page": 232,
    },
  },
  {
    "name": "Bratreis mit Ei",
    "book": {
      "id": "jamies5zutaten",
      "page": 244,
    },
  },
  {
    "name": "Nudeln mit schwarzem Sesam",
    "book": {
      "id": "jamies5zutaten",
      "page": 250,
    },
  },
  {
    "name": "Würzige Linsen & Reis",
    "book": {
      "id": "jamies5zutaten",
      "page": 252,
    },
  },
  {
    "name": "Milchreis",
    "tags": ["rice", "sweet", "milk", "reis"],
  },
  {
    "name": "Black-eyed bean mole with salsa",
    "tags": ["rice", "sweet", "milk", "beans", "salsa"],
    "link": "https://www.bbcgoodfood.com/recipes/black-eye-bean-mole-salsa",
  },
  {
    "name": "Auberginencurry",
    "link": "https://www.lidl-kochen.de/rezeptwelt/auberginen-curry-268581",
  },
  {
    "name": "Bananenbrot",
  },
  {
    "name": "Kung Pao Chicken",
    "link": "https://www.edeka.de/rezepte/rezept/kung-pao-chicken.jsp",
    "video": "https://www.youtube.com/watch?v=nKOpKflSNkc",
  },
  {
    "name": "Eierreis",
  },
  {
    "name": "One-Pot-Paste mit Zitronenkäsesauce",
    "link": "https://www.penny.de/erleben/rezepte-und-ernaehrung/one-pot-pasta-mit-zitronen-kaeseso%C3%9Fe",
  },
  {
    "name": "Fischstäbchen",
    "subtext": "mit Buttergemüse und Kartoffelbrei oder Erbsen und Reis",
  },
  {
    "name": "Kartoffelsuppe",
  },
  {
    "name": "Sheperds Pie",
    "link": "https://www.jamieoliver.com/recipes/lamb-recipes/super-shepherd-s-pie/",
  },
  {
    "name": "Pizza",
  },
  {
    "name": "Grießbrei",
  },
  {
    "name": "Flammkuchen",
  },
  {
    "name": "Käsespätzle",
  },
  {
    "name": "Quarkeierkuchen",
  },
  {
    "name": "Ofengemüse",
  },
  {
    "name": "Gerösteter Curry-Blumenkohl",
    "subtitle": "mit frischer Zitronen-Raita",
    "link": "https://www.eat-this.org/curry-blumenkohl-mit-zitronen-raita/",
    "tags": ["curry", "blumenkohl", "reis"],
  },
  {
    "name": "Cremige Süßkartoffelsuppe",
    "subtitle": "mit rauchigen Rosenkohl-Chips",
    "link": "https://www.eat-this.org/cremige-suesskartoffelsuppe-mit-rauchigen-rosenkohl-chips/",
  },
  {
    "name": "Pasta e fagioli",
    "subtitle": "das bohnigste Pastagericht überhaupt",
    "link": "https://www.eat-this.org/vegane-pasta-e-fagioli/",
    "tags": ["pasta", "nudeln"],
  },
  {
    "name": "Pastinakensuppe",
    "link": "https://sallys-blog.de/blog/detail/sCategory/218/blogArticle/1815",
    "tags": ["suppe"],
    "ingredients": ["pastinaken", "kartoffeln", "zwiebel", "butterschmalz", "mehl", "wasser", "milch", "salz", "pfeffer"],
  },
  {
    "name": "One Pot Taco Pasta",
    "subtitle": "würzige, cremige 20 Minuten Nudelpfanne",
    "link": "https://sallys-blog.de/one-pot-taco-pasta-wurzige-cremige-20-minuten-nudelpfanne",
    "tags": ["pasta"],
    "ingredients": ["olivenöl", "hackfleisch", "zwiebel", "knoblauch", "tomatenmark", "gemüsebrühe", "sahne", "salz", "pfeffer", "chiliflocken", "kreuzkümmel", "lorbeer", "oregano", "nudel", "parmesan", "erbsen"],
  },
  {
    "name": "Letscho",
  },
  {
    "name": "Chile relleno",
    "subtitle": "mexikanische gefüllte Paprika",
    "link": "https://www.rewe.de/rezepte/gefuellte-paprika-chile-relleno/",
    "ingredients": ["spitzpaprika", "mozzarella", "tomaten", "zwiebeln", "knoblauch", "gemüsebrühe", "öl", "salz", "pfeffer", "eier", "mehl", "sonnenblumenöl", "petersilie"],
  },
  {
    "name": "Safran-Risotto mit King Prawns",
    "link": "https://www.rewe.de/rezepte/safran-risotto-king-prawns/",
  },
  {
    "name": "Chicken & chorizo jambalaya",
    "link": "https://www.bbcgoodfood.com/recipes/chicken-chorizo-jambalaya",
    "ingredients": ["öl", "hähnchenbrust", "zwiebel", "paprika", "knoblauch", "chorizo", "cajungewürz", "reis", "tomaten", "hühnerbrühe"],
  },
  {
    "name": "Wirsingrouladen",
  },
  {
    "name": "Coconut-Apple-Ginger Dal",
    "link": "https://www.epicurious.com/recipes/food/views/coconut-apple-ginger-dal",
  },
  {
    "name": "Braised Butternut Squash in Spiced Coconut Gravy",
    "link": "https://www.epicurious.com/recipes/food/views/braised-butternut-squash-in-spiced-coconut-gravy",
  },
  {
    "name": "Bierrisotto",
    "subtitle": "mit Pilzen und Chorizo-Chips",
    "link": "https://www.rewe.de/rezepte/bierrisotto-pilze-chorizo-chips/",
    "ingredients": ["champignons", "schalotte", "chroizo", "petersilie", "olivenöl", "risotto-reis", "bier", "gemüsefond", "butter", "salz", "pfeffer", "parmesan"],
  },
  {
    "name": "Rotkohl-Schupfnudel-Gratin mit Schafskäse",
    "ingredients": ["rotkohl", "rosinen", "orangen", "zwiebeln", "olivenöl", "mandeln", "salz", "pfeffer", "zucker", "obstessig", "schupfnudeln", "schafskäse", "gemahlene muskatblüte"],
    "time": "ca 80min",
  },
  {
    "name": "Kartoffel-Sellerie-Püree mit grünem Buttergemüse",
    "book": {
      "id": "greenbox",
      "page": 162,
    },
    "time": "45 min",
    "ingredients": ["kartoffeln", "sellerie", "salz", "butter", "dicke bohnen", "grüner spargel", "knackerbsen", "erbsen", "knoblauch", "mehl", "gemüsebrühe", "minze", "frühlingszwiebeln", "muskatnuss", "zitronensaft"],
  },
  {
    "name": "Wirsing-Nudel-Strudel",
    "book": {
      "id": "greenbox",
      "page": 253,
    },
    "time": "45 min",
    "ingredients": ["wirsing", "mehl", "weichweizengrieß", "eier", "olivenöl", "salz", "öl", "ingwer", "thymian", "gemüsebrühe", "schlagsahne", "zitrone", "zucker", "pfeffer", "butter", "sauerrahm", "schnittlauch"],
  },
  {
    "name": "Protein-Packed Muscle-Building Chili",
    "link": "https://www.bodybuilding.com/recipes/protein-packed-muscle-building-chili",
    "time": "35 min",
    "ingredients": ["hähnchenbrust", "olivenöl", "paprika", "pilze", "zwiebeln", "mais", "kidneybohnen", "pintobohnen", "tomaten", "chilipulver", "knoblauch", "petersilie", "kreuzkümmel", "worcestershire sauce"],
  },
  {
    "name": "Coconut & squash dhansak",
    "link": "https://www.bbcgoodfood.com/recipes/coconut-squash-dhansak",
    "time": "20 min",
    "ingredients": ["öl", "butternut squash", "zwiebeln", "korma curry paste", "tomaten", "kokosnussmilch", "linsen", "babyspinat", "kokosnussjoghurt"],
  },
  {
    "name": "Caponata pasta",
    "link": "https://www.bbcgoodfood.com/recipes/caponata-pasta",
    "time": "20 min",
    "ingredients": ["olivenöl", "zwiebeln", "knoblauch", "paprika", "auberginen", "tomaten", "kapern", "rosinen", "nudeln", "basilikum", "parmesan"],
  },
  {
    "name": "Gnocchi cacio e pepe",
    "link": "https://www.bbcgoodfood.com/recipes/gnocchi-cacio-e-pepe",
    "time": "10 min",
    "ingredients": ["gnocchi", "butter", "parmesan", "pfeffer"],
  },
  {
    "name": "Shepherd's pie with sweet potato mash",
    "link": "https://www.bbcgoodfood.com/recipes/veggie-shepherds-pie-sweet-potato-mash",
    "time": "1 Stunde",
    "ingredients": ["olivenöl", "zwiebeln", "karotten", "thymian", "rotwein", "tomaten", "gemüsebrühe", "grüne linsen", "süßkartoffeln", "butter", "cheddar"],
  }
];
