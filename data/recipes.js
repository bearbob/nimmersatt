const books = {
  "jamies5zutaten": {
    "name": "Jamies 5-Zutaten-Küche",
    "ISBN": "978-3-8310-3422-5",
  }
};
const recipes = [
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
    "name": "Bierbrot",
    "tags": ["brot", "bread", "baking", "beer"],
    "link": "https://www.marcelpaa.com/rezepte/bierbrot/",
  },
  {
    "name": "Sonnenblumenbrot",
    "tags": ["brot", "bread", "baking"],
    "link": "https://www.marcelpaa.com/rezepte/sonnenblumenbrot/",
    "video": "https://www.youtube.com/watch?v=WNZV6t9_FIw",
  },
  {
    "name": "Urdinkel Schlumberger",
    "tags": ["brot", "bread", "baking"],
    "link": "https://www.marcelpaa.com/rezepte/urdinkel-schlumberger/",
    "video": "https://www.youtube.com/watch?v=zpvk80lLhs8",
  },
  {
    "name": "Roggen-Vollkornbrötchen",
    "tags": ["brot", "bread", "baking"],
    "link": "https://www.marcelpaa.com/rezepte/roggen-vollkornbroetchen/",
    "video": "https://www.youtube.com/watch?v=f2u9ZcHiMYQ",
  },
  {
    "name": "Kartoffelkiste",
    "tags": ["brot", "bread", "baking"],
    "link": "https://www.marcelpaa.com/rezepte/kartoffelkiste/",
    "video": "https://www.youtube.com/watch?v=GyUhTJhI45c",
  },
  {
    "name": "Rustikales Mischbrot",
    "link": "https://www.ploetzblog.de/2021/02/20/rustikales-mischbrot/",
    "tags": ["brot", "bread", "baking"],
  },
  {
    "name": "Dinkelvollkornmischbrot mit 25% Gerstenkörnern",
    "link": "https://www.ploetzblog.de/2022/01/01/dinkelvollkornmischbrot-mit-25-gerstenkoernern/",
    "tags": ["brot", "bread", "baking"],
  },
  {
    "name": "Rustikales Gewürz-Vollkornbrot",
    "subtitle": "perfekt für die Sauerteig-Resteverwertung",
    "link": "https://madamroteruebe.de/2022/01/gewuerz-vollkornbrot-perfekt-fuer-die-sauerteig-resteverwertung/",
    "tags": ["brot", "bread", "baking"],
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
];
