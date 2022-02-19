const BREADS = [
  {
    "name": "Bierbrot",
    "link": "https://www.marcelpaa.com/rezepte/bierbrot/",
    "tags": ["brot"],
  },
  {
    "name": "Sonnenblumenbrot",
    "link": "https://www.marcelpaa.com/rezepte/sonnenblumenbrot/",
    "video": "https://www.youtube.com/watch?v=WNZV6t9_FIw",
    "tags": ["brot"],
  },
  {
    "name": "Urdinkel Schlumberger",
    "link": "https://www.marcelpaa.com/rezepte/urdinkel-schlumberger/",
    "video": "https://www.youtube.com/watch?v=zpvk80lLhs8",
    "tags": ["brot"],
  },
  {
    "name": "Roggen-Vollkornbrötchen",
    "link": "https://www.marcelpaa.com/rezepte/roggen-vollkornbroetchen/",
    "video": "https://www.youtube.com/watch?v=f2u9ZcHiMYQ",
    "tags": ["brot"],
  },
  {
    "name": "Kartoffelkiste",
    "link": "https://www.marcelpaa.com/rezepte/kartoffelkiste/",
    "video": "https://www.youtube.com/watch?v=GyUhTJhI45c",
    "tags": ["brot"],
  },
  {
    "name": "Rustikales Mischbrot",
    "link": "https://www.ploetzblog.de/2021/02/20/rustikales-mischbrot/",
    "tags": ["brot"],
  },
  {
    "name": "Dinkelvollkornmischbrot mit 25% Gerstenkörnern",
    "link": "https://www.ploetzblog.de/2022/01/01/dinkelvollkornmischbrot-mit-25-gerstenkoernern/",
    "tags": ["brot"],
  },
  {
    "name": "Rustikales Gewürz-Vollkornbrot",
    "subtitle": "perfekt für die Sauerteig-Resteverwertung",
    "link": "https://madamroteruebe.de/2022/01/gewuerz-vollkornbrot-perfekt-fuer-die-sauerteig-resteverwertung/",
    "tags": ["brot"],
  },
  {
    "name": "Ballaststoffreiches Vital-Vollkornbrot",
    "link": "https://madamroteruebe.de/2021/01/ballaststoffreiches-vital-vollkornbrot-mit-hafer/ ",
    "ingredients": ["Dinkelvollkornmehl", "Roggenvollkornmehl", "Weizenvollkornmehl", "Haferflocken", "Haferkleie", "Sonnenblumenkerne", "Frischhefe", "Meersalz"],
    "tags": ["brot"],
  },
  {
    "name": "Bäckerlaib",
    "subtitle": "mit 48 Stunden Teigreifung",
    "link": "https://www.marcelpaa.com/rezepte/baecker-laib/",
    "video": "https://www.youtube.com/watch?v=l8hhraD-gaE",
    "ingredients": ["weizenmehl 812", "roggenmehl 610/815", "dinkelmehl 630", "Vollkornmehl", "frischhefe", "salz"],
    "tags": ["brot"],
  },
  {
    "name": "Banater Weißbrot",
    "link": "https://www.ploetzblog.de/2020/12/12/banater-weissbrot/",
    "time": "10 Stunden",
    "tags": ["brot"],
  },
  {
    "name": "Hartweizen Krusties",
    "link": "https://www.marcelpaa.com/rezepte/hartweizen-krusties/",
    "video": "https://www.youtube.com/watch?v=FzIEl71-4G4",
    "time": "3 bis 17 Stunden",
    "tags": ["brot"],
  },
  {
    "name": "Schrippen",
    "book": {
      "id": "brotrezeptefuerjedentag",
      "page": 35
    },
    "time": "11 bis 13 Stunden",
    "ingredients": ["weizenmehl 550", "milch", "roggenmehl 1150", "honig", "salz", "butter", "frischhefe"],
    "tags": ["brötchen", "brot"],
  },
  {
    "name": "Weiche Burgerbuns mit Tangzhong",
    "link": "https://www.tasteoftravel.at/weiche-burger-buns/",
    "ingredients": ["wasser", "milch", "hefe", "butter", "kristallzucker", "salz", "weizenmehl 550", "öl", "eigelb"],
    "tags": ["brot"],
  },
  {
    "name": "Bao Burger Buns",
    "link": "https://caroskueche.de/bao-burger-buns/",
    "time": "1 Stunde 15 min",
    "ingredients": ["weizenmehl", "trockenhefe", "zucker", "salz", "backpulver", "wasser"],
    "tags": ["brötchen"],
  },
  {
    "name": "Blueberry Banana Muffins",
    "book": {
      "id": "modernbaking",
      "page": 48
    },
    "tags": ["sweet", "kuchen"],
    "ingredients": ["mehl", "backpulver", "natron", "salz", "muskatnuss", "heidelbeeren", "butter", "zucker", "banane", "saure Sahne/Joghurt", "milch", "vanilleextrakt", "zitronenschale", "cornflakes", "rohrohrzucker"],
  },
  {
    "name": "Chocolate Sheet Cake",
    "book": {
      "id": "modernbaking",
      "page": 73
    },
    "tags": ["sweet", "kuchen"],
    "ingredients": ["zartbitterschokolade", "wasser/kaffee", "ungesüßtes kakaopulver", "mehl", "natron", "backpulver", "salz", "zucker", "brauner zucker", "olivenöl", "essig", "magarine", "tahin", "puderzucker", "espressopulver"],
  },
  {
    "name": "Semi-naked Chocolate Cake",
    "tags": ["sweet", "kuchen"],
    "book": {
      "id": "modernbaking",
      "page": 82
    },
    "ingredients": ["nussmilch", "essig","apfelmus", "pflanzenöl", "wasser", "vanilleextrakt", "Rohrzucker", "mehl", "ungesüßtes kakaopulver", "natron", "backpulver", "salz"]
  },
  {
    "name": "Miso-Karamell",
    "subtitle": "mit Salz",
    "book": {
      "id": "modernbaking",
      "page": 101
    },
    "tags": ["sweet", "vegan"],
    "ingredients": ["zucker", "wasser","kokosmilch", "miso", "vanilleextrakt", "salz"],
  },
  {
    "name": "Carrot Cookies",
    "tags": ["sweet", "kuchen"],
    "book": {
      "id": "modernbaking",
      "page": 118
    },
    "ingredients": ["mehl", "polenta", "salz", "backpulver", "natron", "muskatnuss", "orangenschale", "zitronenschale", "orangensaft", "karotte", "olivenöl", "rohrohrzucker", "ei", "puderzucker"],
  },
  {
    "name": "Banana Whoopie Pies",
    "tags": ["sweet", "kuchen", "cookie", "vegan"],
    "book": {
      "id": "modernbaking",
      "page": 135
    },
    "ingredients": ["gemahlene leinsamen", "wasser", "bananen", "zitronensaft", "mehl", "Weizenvollkornmehl", "backpulver", "natron", "zimt", "muskatnuss", "salz", "pflanzenöl", "rohrohrzucker", "vanilleextrakt", "erdnussbutter", "magarine", "puderzucker"],
  },
  {
    "name": "Sweet Potato Buns",
    "subtitle": "Pekannuss-Schnecken mit Süßkartoffelteig"
    "tags": ["sweet", "kuchen"],
    "book": {
      "id": "modernbaking",
      "page": 178
    },
    "ingredients": ["süßkartoffeln", "butter", "ei", "buttermilch", "mehl", "Weizenvollkornmehl", "muscovado-zucker", "trockenhefe", "salz", "natron", "milch", "ahornsirup", "pekannüsse", "zimt"],
  },
];
