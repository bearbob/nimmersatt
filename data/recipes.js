const RECIPES = [
  {
    "name": "Wildreis mit Mangold und Kirschen",
    "book": {
      "id": "jamies5zutaten",
      "page": 32,
    },
    "link": "https://www.jamieoliver.com/recipes/rice-recipes/cherry-chard-wild-rice/",
    "ingredients": ["wildreis", "mangold", "kirschen", "fetakäse", "walnüsse"],
    "time": "30 min",
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Geniale Grüne Spaghetti",
    "subtitle": "mit Schwarzkohl und Ricotta",
    "book": {
      "id": "jamies5zutaten",
      "page": 50,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Blitzschnelle Bratwurst-Carbonara",
    "book": {
      "id": "jamies5zutaten",
      "page": 52,
    },
    "link": "https://www.tastesheriff.com/blitzschnelle-bratwurst-carbonara-aus-jamies-5-zutaten-kueche/",
    "ingredients": ["Tagliatelle", "Bratwurst", "glatte petersilie", "ei", "parmesan", "olivenöl", "pfeffer", "salz"],
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Pasta mit Hackfleisch und Steinpilzen",
    "book": {
      "id": "jamies5zutaten",
      "page": 68,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Koreanischer Eierreis",
    "book": {
      "id": "jamies5zutaten",
      "page": 80,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Frittata mit Pilzen und Räucherspeck",
    "book": {
      "id": "jamies5zutaten",
      "page": 92,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Knuspriges Knoblauchhähnchen",
    "book": {
      "id": "jamies5zutaten",
      "page": 108,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Schnelle Asia-Frikadellen",
    "book": {
      "id": "jamies5zutaten",
      "page": 130,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Erbsen, dicke Bohnen, Chili & Minze",
    "book": {
      "id": "jamies5zutaten",
      "page": 176,
    },
    "link": "https://www.jamieoliver.com/recipes/vegetable-recipes/peas-beans-chilli-mint/",
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Irre guter Schweinefleisch-Burger",
    "book": {
      "id": "jamies5zutaten",
      "page": 208,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Pfannengerührtes Schweinefleisch",
    "book": {
      "id": "jamies5zutaten",
      "page": 220,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Aromatisches Lammcurry",
    "book": {
      "id": "jamies5zutaten",
      "page": 232,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Bratreis mit Ei",
    "book": {
      "id": "jamies5zutaten",
      "page": 244,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Nudeln mit schwarzem Sesam",
    "book": {
      "id": "jamies5zutaten",
      "page": 250,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Würzige Linsen & Reis",
    "book": {
      "id": "jamies5zutaten",
      "page": 252,
    },
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Milchreis",
    "tags": ["sweet", "dinner"],
    "ingredients": ["reis", "milch", "zimt"],
  },
  {
    "name": "Black-eyed bean mole with salsa",
    "link": "https://www.bbcgoodfood.com/recipes/black-eye-bean-mole-salsa",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["zwiebeln", "tomaten", "koriander", "limette", "rapsöl", "knoblauch", "chilipulver", "zimt", "bohnen", "kakoa", "gemüsebrühe", "tomatenmark"]
  },
  {
    "name": "Auberginencurry",
    "link": "https://www.lidl-kochen.de/rezeptwelt/auberginen-curry-268581",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["auberginen", "salz", "spitzpaprika", "knoblauch", "zwiebeln", "peperoni", "öl", "currypulver", "passierte tomaten", "kokosnussmilch", "basmatireis", "speisestärke", "koriander", "pfeffer" ]
  },
  {
    "name": "Bananenbrot",
    "time": "80 Minuten",
    "tags": ["sweet"],
    "ingredients": ["butter", "puderzucker", "salz", "vanillezucker", "eier", "bananen", "zimt", "weizenmehl 405", "backpulver", "naturjoghurt", "haselnüsse", "sultaninen"],
  },
  {
    "name": "Kung Pao Chicken",
    "link": "https://www.edeka.de/rezepte/rezept/kung-pao-chicken.jsp",
    "video": "https://www.youtube.com/watch?v=nKOpKflSNkc",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["Hähnchenbrustfilet", "Sojasauce", "Reiswein", "Rohrzucker", "Maisstärke", "Karotte", "Mini Pak Choi", "Frühlingszwiebel", "Chilischote", "ingwer", "knoblauch", "szechuanpfeffer", "grobes salz", "erdnussöl", "hühnerbrühe", "honig", "erdnüsse", "sesamöl"]
  },
  {
    "name": "Eierreis",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "One-Pot-Paste mit Zitronenkäsesauce",
    "link": "https://www.penny.de/erleben/rezepte-und-ernaehrung/one-pot-pasta-mit-zitronen-kaeseso%C3%9Fe",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Fischstäbchen",
    "subtext": "mit Buttergemüse und Kartoffelbrei oder Erbsen und Reis",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Kartoffelsuppe",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Sheperds Pie",
    "link": "https://www.jamieoliver.com/recipes/lamb-recipes/super-shepherd-s-pie/",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Pizza",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Grießbrei",
    "subtitle": "mit Mandeln und Erdbeeren",
    "tags": ["dinner", "sweet"],
    "ingredients": ["weichweizengrieß", "milch", "zucker", "salz", "eier", "butter", "mandelsplitter", "erdbeeren", "zimt"],
  },
  {
    "name": "Flammkuchen",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Käsespätzle",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Quarkeierkuchen",
    "tags": ["dinner", "sweet"],
  },
  {
    "name": "Ofengemüse",
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Gerösteter Curry-Blumenkohl",
    "subtitle": "mit frischer Zitronen-Raita",
    "link": "https://www.eat-this.org/curry-blumenkohl-mit-zitronen-raita/",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["blumenkohl", "reis"],
  },
  {
    "name": "Cremige Süßkartoffelsuppe",
    "subtitle": "mit rauchigen Rosenkohl-Chips",
    "link": "https://www.eat-this.org/cremige-suesskartoffelsuppe-mit-rauchigen-rosenkohl-chips/",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Pasta e fagioli",
    "subtitle": "das bohnigste Pastagericht überhaupt",
    "link": "https://www.eat-this.org/vegane-pasta-e-fagioli/",
    "tags": ["pasta", "nudeln", "dinner"],
    "time": "20 min",
    "ingredients": ["zwiebeln", "karotten", "stangensellerie", "knoblauch", "olivenöl", "salz", "chiliflocken", "tomatenmark", "weiße bohnen", "aquafaba", "tomaten", "oregano", "thymian", "fenchelsamen", "lorbeer", "dunkle misopaste", "pasta", "endivie"],
  },
  {
    "name": "Pastinakensuppe",
    "link": "https://sallys-blog.de/blog/detail/sCategory/218/blogArticle/1815",
    "tags": ["dinner"],
    "ingredients": ["pastinaken", "kartoffeln", "zwiebeln", "butterschmalz", "mehl", "wasser", "milch", "salz", "pfeffer"],
  },
  {
    "name": "One Pot Taco Pasta",
    "subtitle": "würzige, cremige 20 Minuten Nudelpfanne",
    "link": "https://sallys-blog.de/one-pot-taco-pasta-wurzige-cremige-20-minuten-nudelpfanne",
    "ingredients": ["olivenöl", "hackfleisch", "zwiebeln", "knoblauch", "tomatenmark", "gemüsebrühe", "sahne", "salz", "pfeffer", "chiliflocken", "kreuzkümmel", "lorbeer", "oregano", "nudel", "parmesan", "erbsen"],
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
    "ingredients": ["öl", "hähnchenbrust", "zwiebeln", "paprika", "knoblauch", "chorizo", "cajungewürz", "reis", "tomaten", "hühnerbrühe"],
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
  },
  {
    "name": "Vegane grüne Enchiladas",
    "subtitle": "mit Tofu und Jalapeño-Apfel-Salsa",
    "link": "https://www.eat-this.org/vegane-gruene-enchiladas/",
    "time": "1 Stunde",
    "ingredients": ["zwiebeln", "apfel", "paprika", "jalapenos", "knoblauch", "olivenöl", "limette", "koriander", "salz", "paprikapulver", "oregano", "kreuzkümmel", "zwiebelpulver", "tofu", "joghurt", "gouda", "tortillas"],
  },
  {
    "name": "Kitchari",
    "subtitle": "Indiens einfaches, leckeres Reis-Porridge",
    "link": "https://www.eat-this.org/kitchari-indisches-reis-porridge/",
    "time": "1 Stunde 30 min",
    "ingredients": ["mungbohnen", "basmatireis", "zwiebeln", "kokosöl", "kreuzkümmel", "senfsamen", "karotten", "tomaten", "kurkuma", "ingwerpulver", "salz", "spinat", "koriander"],
  },
  {
    "name": "Geröstete Knoblauch-Shiitake auf Miso-Steckrübenpüree",
    "link": "https://www.eat-this.org/geroestete-shiitake-auf-miso-steckruebenpueree/",
    "time": "20 min",
    "ingredients": ["steckrüben", "kartoffeln", "hafermilch", "olivenöl", "dunkle misopaste", "sesamöl", "salz", "sojasauce", "zitrone", "ahornsirup", "knoblauch", "ingwer", "schwarzer pfeffer", "sesam", "radieschen", "frühlingszwiebeln"],
  },
  {
    "name": "Roasted veggie curry",
    "link": "https://www.jamieoliver.com/recipes/curry-recipes/roasted-veggie-curry/",
    "time": "1 Stunde 10 min",
    "ingredients": ["madras curry paste", "olivenöl", "essig", "karotten", "pastinake", "butternut kürbis", "zucchini", "blumenkohl", "ingwer", "knoblauch", "mango chutney", "tomaten", "kokosnussmilch", "erbsen"]
  },
  {
    "name": "Kaiserschmarrn",
    "subtitle": "Omas Original Rezept für einen vorzüglich feinen Schmarrn",
    "link": "https://emmikochteinfach.de/kaiserschmarrn-ganz-klassisch/",
    "ingredients": ["mehl", "salz", "milch", "ei"],
  },
  {
    "name": "Crispy Greek-style pie",
    "link": "https://www.bbcgoodfood.com/recipes/crispy-greek-style-pie",
    "ingredients": ["spinat", "tomaten", "fetakäse", "eier", "blätterteig"],
    "time": "40 min"
  },
  {
    "name": "Hot-smoked salmon pasta",
    "subtitle": "With asparagus & crème fraîche",
    "link": "https://www.jamieoliver.com/recipes/salmon-recipes/hot-smoked-salmon-pasta/",
    "time": "15 min",
    "ingredients": ["spargel", "pasta", "lachs", "zitrone", "creme fraiche"]
  },
  {
    "name": "Bodybuilding Mac & Cheese",
    "link": "https://theproteinchef.co/bodybuilding-mac-cheese-recipe/",
  },
  {
    "name": "Beetroot & red onion tarte tatin",
    "link": "https://www.bbcgoodfood.com/recipes/beetroot-red-onion-tarte-tatin",
    "time": "1 Stunde 30 min",
    "ingredients": ["rote beete", "zwiebeln", "olivenöl", "reisweinessig", "brauner zucker", "sternanis", "mehl", "blätterteig", "orange"]
  },
  {
    "name": "Cheesy celeriac, leek & rosemary gratin",
    "link": "https://www.bbcgoodfood.com/recipes/cheesy-celeriac-leek-rosemary-gratin",
    "time": "2 Stunden",
    "ingredients": ["butter", "poree/lauch", "rosmarin", "milch", "mascarpone", "lorbeer", "knollensellerie", "cheddar"]
  },
  {
    "name": "Japanese ramen noodle soup",
    "link": "https://www.bbcgoodfood.com/recipes/japanese-ramen-noodle-soup",
    "time": "40 min",
    "ingredients": ["hühnerbrühe", "knoblauch", "sojasauce", "worcestershire sauce", "ingwer", "chilipulver", "zucker", "ramennudeln", "tofu/hähnchen/schweinefilet", "sesamöl", "blattspinat", "zuckermais", "eier", "nori", "frühlingszwiebeln", "sesam"]
  },
  {
    "name": "Arroz de Pato",
    "subtitle": "Entenreis",
    "ingredients": ["ente", "zwiebeln", "lauchstange", "karotte", "knoblauch", "olivenöl", "lorbeerblätter", "glatte petersilie", "chorizo", "serrano schinken", "schwarze pfefferkörner", "orange", "tomatenmark", "wasser", "langkornreis natur", "salz", "iberico käse", "grüne oliven"],
    "time": "3 Stunden",
    "link": "https://www.foodundco.de/arroz-de-pato-entenreis/"
  },
  {
    "name": "Chorizo & mozzarella gnocchi bake",
    "link": "https://www.bbcgoodfood.com/recipes/chorizo-mozzarella-gnocchi-bake",
    "time": "35 min",
    "ingredients": ["olivenöl", "zwiebeln", "knoblauch", "chorizo", "gehackte tomaten", "zucker", "gnocchi", "mozzarella", "basilikum"]
  },
  {
    "name": "Griessschnitten",
    "link": "https://www.tim-maelzer-shop.de/blogs/rezepte/griessschnitten",
    "ingredients": ["butter", "milch", "weichweizengrieß", "zucker", "eier", "salz", "vanillezucker", "orange"],
    "tags": ["sweet"],
    "time": "75 min"
  },
  {
    "name": "Königsberger Klopse",
    "link": "https://www.tim-maelzer-shop.de/blogs/rezepte/konigsberger-klopse",
    "ingredients": ["toastbrot", "sahne", "getrocknete tomaten", "zwiebeln", "knoblauch", "olivenöl", "trockener weißwein", "pinienkerne", "petersilie", "sardellenfilets in öl", "parmesan", "geschälte tomaten", "butter", "mehl", "kalbshackfleisch", "ei", "salz", "pfeffer", "hühnerbrühe", "cayennpfeffer", "basilikum", "basmatireis", "oliven"],
    "time": "1 Stunde 20 min"
  },
  {
    "name": "Buttermilchwaffeln",
    "tags": ["sweet"],
    "time": "40 min",
    "ingredients": ["zucker", "butter", "vanillezucker", "salz", "eier", "weizenmehl", "buttermilch", "backpulver"]
  },
  {
    "name": "Pcokets",
    "subtitle": "gefüllte Teigtaschen",
    "tags": ["dinner"],
    "book": {
      "id": "modernbaking",
      "page": 177
    },
    "ingredients": ["honig", "trockenhefe", "wasser", "Weizenvollkornmehl", "mehl", "salz", "olivenöl", "griechischer joghurt", "pesto", "cheddar/parmesan", "grünkohl", "pflanzenöl", "butter"],
  },
];
