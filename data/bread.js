const BREADS = [
  {
    "name": "Bierbrot",
    "link": "https://www.marcelpaa.com/rezepte/bierbrot/",
    "image": "https://www.marcelpaa.com/wp-content/uploads/2020/04/Bierbrot-Rezept-Marcel-Paa-1.jpg",
    "tags": ["brot"],
  },
  {
    "name": "Sonnenblumenbrot",
    "link": "https://www.marcelpaa.com/rezepte/sonnenblumenbrot/",
    "video": "https://www.youtube.com/watch?v=WNZV6t9_FIw",
    "image": "https://www.marcelpaa.com/wp-content/uploads/2020/04/Bierbrot-Rezept-Marcel-Paa-1.jpg",
    "tags": ["brot"],
  },
  {
    "name": "Urdinkel Schlumberger",
    "link": "https://www.marcelpaa.com/rezepte/urdinkel-schlumberger/",
    "video": "https://www.youtube.com/watch?v=zpvk80lLhs8",
    "image": "https://www.marcelpaa.com/wp-content/uploads/2019/12/UrDinkel-Schlumberger-Rezept-Marcel-Paa.jpg",
    "tags": ["brot"],
  },
  {
    "name": "Roggen-Vollkornbrötchen",
    "link": "https://www.marcelpaa.com/rezepte/roggen-vollkornbroetchen/",
    "video": "https://www.youtube.com/watch?v=f2u9ZcHiMYQ",
    "image": "https://www.marcelpaa.com/wp-content/uploads/2018/01/Roggen-Vollkorn-Broetchen-Rezept-Marcel-Paa-835x675.jpg",
    "tags": ["brot"],
  },
  {
    "name": "Kartoffelkiste",
    "link": "https://www.marcelpaa.com/rezepte/kartoffelkiste/",
    "video": "https://www.youtube.com/watch?v=GyUhTJhI45c",
    "image": "https://www.marcelpaa.com/wp-content/uploads/2021/12/Kartoffelkiste-835x675.jpg",
    "tags": ["brot"],
  },
  {
    "name": "Rustikales Mischbrot",
    "link": "https://www.ploetzblog.de/2021/02/20/rustikales-mischbrot/",
    "image": "https://xahmz0tc.cloudimg.io/_we2p_/2/ploetzblog/entity/gallery/61b7540028ae7154616abb78/Rustikales_Mischbrot_20190922.jpg",
    "tags": ["brot"],
  },
  {
    "name": "Dinkelvollkornmischbrot mit 25% Gerstenkörnern",
    "link": "https://www.ploetzblog.de/2022/01/01/dinkelvollkornmischbrot-mit-25-gerstenkoernern/",
    "image": "https://xahmz0tc.cloudimg.io/_we2p_/2/ploetzblog/entity/gallery/62c54b584291ac60084a86a9/IMG_1015_bearbeitet.jpg",
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
    "image": "https://www.tasteoftravel.at/wp-content/uploads/Weiche-Burger-Br%C3%B6tchen-Rezept.jpg",
    "ingredients": ["wasser", "milch", "hefe", "butter", "kristallzucker", "salz", "weizenmehl 550", "öl", "eigelb"],
    "tags": ["brot"],
  },
  {
    "name": "Bao Burger Buns",
    "link": "https://caroskueche.de/bao-burger-buns/",
    "image": "https://caroskueche.de/wp-content/uploads/2020/06/Bao-Burger-Buns-1024x488.jpg",
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
    "link": "https://brokenovenbaking.com/best-blueberry-banana-muffins/",
    "image": "https://brokenovenbaking.com/wp-content/uploads/2023/03/blueberry-banana-muffins-8.jpg",
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
    "link": "https://www.leckerschmecker.me/misokaramell-sosse/63743511476910",
    "image": "https://www.leckerschmecker.me/wp-content/uploads/sites/6/2025/01/misokaramell.png",
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
    "link": "https://www.tasteofhome.com/recipes/carrot-cookies/",
    "image": "https://www.tasteofhome.com/wp-content/uploads/2024/08/Artichoke-Chicken_EXPS_TOHD_24_19743_ChristineMa_7.jpg",
    "language": "en",
    "ingredients": ["mehl", "polenta", "salz", "backpulver", "natron", "muskatnuss", "orangenschale", "zitronenschale", "orangensaft", "karotte", "olivenöl", "rohrohrzucker", "ei", "puderzucker"],
  },
  {
    "name": "Banana Whoopie Pies",
    "tags": ["sweet", "kuchen", "cookie", "vegan"],
    "book": {
      "id": "modernbaking",
      "page": 135
    },
    "link": "https://www.kingarthurbaking.com/recipes/banana-whoopie-pies-recipe",
    "image": "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image_sm_2x/public/2020-02/banana-whoopie-pies.jpg",
    "ingredients": ["gemahlene leinsamen", "wasser", "bananen", "zitronensaft", "mehl", "Weizenvollkornmehl", "backpulver", "natron", "zimt", "muskatnuss", "salz", "pflanzenöl", "rohrohrzucker", "vanilleextrakt", "erdnussbutter", "magarine", "puderzucker"],
  },
  {
    "name": "Sweet Potato Buns",
    "subtitle": "Pekannuss-Schnecken mit Süßkartoffelteig",
    "tags": ["sweet", "kuchen"],
    "book": {
      "id": "modernbaking",
      "page": 178
    },
    "ingredients": ["süßkartoffeln", "butter", "ei", "buttermilch", "mehl", "Weizenvollkornmehl", "muscovado-zucker", "trockenhefe", "salz", "natron", "milch", "ahornsirup", "pekannüsse", "zimt"],
  },
];
