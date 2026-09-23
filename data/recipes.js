const RECIPES = [
  {
    "name": "Wildreis mit Mangold und Kirschen",
    "icon": "🍚",
    "book": {
      "id": "jamies5zutaten",
      "page": 32,
    },
    "link": "https://www.jamieoliver.com/recipes/rice-recipes/cherry-chard-wild-rice/",
    "image": "https://asset.jamieoliver.com/images/cq7w2e71/production/87ef162391093f37bdd85f20b705b0dbf739f7d3-853x1280.jpg",
    "ingredients": ["wildreis", "mangold", "kirschen", "fetakäse", "walnüsse"],
    "time": "30 min",
    "minutes": 30,
    "tags": ["dinner", "vegetarian"]
  },
  {
    "name": "Geniale Grüne Spaghetti",
    "subtitle": "mit Schwarzkohl und Ricotta",
    "icon": "🥬",
    "book": {
      "id": "jamies5zutaten",
      "page": 50,
    },
    "link": "https://www.elle.de/rezept-gruene-spaghetti-jamie-oliver",
    "image": "https://static.elle.de/0x107:1024x683/1920x1080/images/2021-01/gettyimages-957755816-kopie.jpg",
    "tags": ["dinner", "pasta", "vegetarian"],
    "time": "25min",
    "minutes": 25,
    "ingredients": [
      "150 g Spaghetti",
      "4 Knoblauchzehen",
      "200 g Schwarzkohl",
      "30 g geriebener Parmesan",
      "30 g Ricotta"
    ]
  },
  {
    "name": "Blitzschnelle Bratwurst-Carbonara",
    "book": {
      "id": "jamies5zutaten",
      "page": 52,
    },
    "link": "https://www.tastesheriff.com/blitzschnelle-bratwurst-carbonara-aus-jamies-5-zutaten-kueche/",
    "image": "https://www.tastesheriff.com/wp-content/uploads/2017/12/wuerstchen_carbonara_jamie-8.jpg",
    "ingredients": ["Tagliatelle", "Bratwurst", "glatte petersilie", "ei", "parmesan", "olivenöl", "pfeffer", "salz"],
    "tags": ["dinner", "pasta"]
  },
  {
    "name": "Steinpilz-Pasta",
    "book": {
      "id": "jamies5zutaten",
      "page": 68,
    },
    "link": "https://feiertaeglich.de/15-minuten-spinat-pilz-pasta-rezept/",
    "image": "https://feiertaeglich.de/wp-content/uploads/2022/11/feiertaeglich_PilzSpinatPasta-3-1024x1536.jpg",
    "time": "15min",
    "minutes": 15,
    "tags": ["dinner", "pasta"],
    "ingredients": [
      "250 g Penne",
      "1 EL Butterschmalz oder Pflanzen-Öl",
      "1 Knoblauchzehe",
      "1 kleine Zwiebel",
      "gemahlene Muskatnuss",
      "450 g Blattspinat, gefroren",
      "500 g Champignon",
      "1 TL Weissweinessig",
      "250 ml Hafersahne (oder normale Sahne)",
      "150 g Pecorino",
      "Petersilie (optional)",
      "Meersalz",
      "frisch gemahlener Pfeffer"
    ]
  },
  {
    "name": "Koreanischer Eierreis",
    "book": {
      "id": "jamies5zutaten",
      "page": 80,
    },
    "link": "https://kochkunstgenuss.com/recipes/schnelle-koreanische-eierreis",
    "image": "https://kochkunstgenuss.com/assets/images/1746032276195-qio7d0he.webp",
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Frittata mit Pilzen und Räucherspeck",
    "book": {
      "id": "jamies5zutaten",
      "page": 92,
    },
    "link": "https://gulasch-app.de/kochbuch/cheddar-frittata-mit-pilzen-und-speck/",
    "image": "https://images.gulas.cz/recipes/150-frittata-houbami-hrudnikem.webp",
    "minutes": 26,
    "time": "26min",
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
    "image": "https://www.gourmetguerilla.de/wp-content/uploads/2018/03/Schnelle-Asia-Fischfrikadellen-nach-Jamie-Oliver-GourmetGuerilla.de-9860-2-1250x1200.jpg",
    "link": "https://www.gourmetguerilla.de/meine-date-mit-jamie-oliver-das-rezept-fuer-seine-schnellen-asia-fischfrikadellen-aus-nur-5-zutaten/",
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Erbsen, dicke Bohnen, Chili & Minze",
    "icon": "🫛",
    "book": {
      "id": "jamies5zutaten",
      "page": 176,
    },
    "link": "https://www.jamieoliver.com/recipes/vegetable-recipes/peas-beans-chilli-mint/",
    "image": "https://asset.jamieoliver.com/images/cq7w2e71/production/0965953dfcf460734352829d31230224e4fc9109-958x1280.jpg",
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
    "link": "https://www.gaumenfreundin.de/gebratener-reis-mit-gemuese-und-ei/",
    "image": "https://www.gaumenfreundin.de/wp-content/uploads/2025/05/Gebratener-Reis-mit-Ei-Rezept.jpg",
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
    "icon": "🍚",
    "link": "https://sallys-blog.de/rezepte/milchreis-grundrezept",
    "image": "https://sallyshop.b-cdn.net/media/ed/96/bb/1772190007/sally-milchreis-grundrezept.jpg",
    "tags": ["sweet", "dinner"],
    "time": "30min",
    "minutes": 30,
    "ingredients": ["reis", "milch", "zimt"],
  },
  {
    "name": "Black-eyed bean mole with salsa",
    "link": "https://www.bbcgoodfood.com/recipes/black-eye-bean-mole-salsa",
    "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/black-bean-mole-bae2318.jpg",
    "tags": ["dinner", "herzhaft"],
    "time": "30  min",
    "minutes": 30 ,
    "ingredients": ["zwiebeln", "tomaten", "koriander", "limette", "rapsöl", "knoblauch", "chilipulver", "zimt", "bohnen", "kakoa", "gemüsebrühe", "tomatenmark"]
  },
  {
    "name": "Auberginencurry",
    "link": "https://www.lidl-kochen.de/rezeptwelt/auberginen-curry-268581",
    "image": "https://cdn.recipes.lidl/images-v2/recipes/de-DE/9e38a341-03b3-4a5c-86e0-ffb3c6b22fd2/16x9_768w_auberginen-curry-1774376791.avif",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["auberginen", "salz", "spitzpaprika", "knoblauch", "zwiebeln", "peperoni", "öl", "currypulver", "passierte tomaten", "kokosnussmilch", "basmatireis", "speisestärke", "koriander", "pfeffer" ]
  },
  {
    "name": "Bananenbrot",
    "time": "80  min",
"minutes": 80 ,
    "link": "https://sallys-blog.de/rezepte/bananenbrot-klassisch-banana-bread-basic",
    "image": "https://sallyshop.b-cdn.net/media/53/b1/af/1717687602/1433_22145_bananenbrot_klassisch_1.jpg",
    "tags": ["sweet"],
    "ingredients": ["butter", "puderzucker", "salz", "vanillezucker", "eier", "bananen", "zimt", "weizenmehl 405", "backpulver", "naturjoghurt", "haselnüsse", "sultaninen"],
  },
  {
    "name": "Kung Pao Chicken",
    "link": "https://www.edeka.de/rezepte/rezept/kung-pao-chicken.jsp",
    "video": "https://www.youtube.com/watch?v=nKOpKflSNkc",
    "image": "https://www.edeka.de/uploads/rezepte/rez-edeka-kung-pao-chicken-rezept-i-p.jpg",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["Hähnchenbrustfilet", "Sojasauce", "Reiswein", "Rohrzucker", "Maisstärke", "Karotte", "Mini Pak Choi", "Frühlingszwiebel", "Chilischote", "ingwer", "knoblauch", "szechuanpfeffer", "grobes salz", "erdnussöl", "hühnerbrühe", "honig", "erdnüsse", "sesamöl"]
  },
  {
    "name": "One-Pot-Pasta mit Zitronenkäsesauce",
    "link": "https://www.penny.de/clever-kochen/rezepte-und-ernaehrung/one-pot-pasta-mit-zitronen-kaesesauce",
    "image": "https://cdn.penny.de/dam/jcr:74f18f51-ed84-4a29-a5d3-23f81a34ec45/One%20Pot%20Pasta%20I%20Foto%20Jennifer%20Braun-4105-45.jpeg",
    "tags": ["dinner", "pasta"],
    "time": "30  min",
"minutes": 30 ,
  },
  {
    "name": "Fischstäbchen",
    "subtext": "mit Buttergemüse und Kartoffelbrei oder Erbsen und Reis",
    "link": "https://www.iglo.de/rezepte/rezeptkategorien/fisch-rezepte/buttergemuese-mit-fischstaebchen-und-kartoffelbrei",
    "image": "https://www.iglo.de/_/media/project/bluesteel/iglo-de/rezepte/fisch-rezepte-neu/buttergemuese-mit-fischstaebchen-und-kartoffelbrei-hero_280825.jpg",
    "tags": ["dinner"],
  },
  {
    "name": "Kartoffelsuppe",
    "link": "https://sallys-blog.de/rezepte/kartoffelsuppe",
    "image": "https://sallyshop.b-cdn.net/media/8c/dc/d4/1733313604/sally-kartoffelsuppe-kenwood-rezept.jpg",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Vegane Pizza",
    "subtitle": "Eine perfekte vegane Pizza braucht keinen Steinofen. Sie braucht einen Teig, der Zeit hatte, eine Sauce, die nicht gekocht wird, und einen Backofen auf Anschlag.",
    "link": "https://www.eat-this.org/perfekte-vegane-pizza/",
    "image": "https://www.eat-this.org/wp-content/uploads/2020/06/eat_this_die_perfekte_vegane_pizza-22-1280x854@2x.jpg",
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Pizza Sucuk",
    "subtitle": "Dieser Pizzateig besteht aus nur wenigen Zutaten und ist sehr einfach zu verarbeiten und super knusprig. Die schnelle Pizzasoße passt hervorragend auf Pizzen mit würzigem Belag.",
    "link": "https://sallys-blog.de/rezepte/sallys-beste-pizza-grundrezept-pizzateig-und-schnelle-pizzasosse",
    "image": "https://sallyshop.b-cdn.net/media/a8/78/cb/1717679260/517_18642_pizza4_1.jpg",
    "tags": ["dinner"],
  },
  {
    "name": "Luftiger Grießbrei",
    "subtitle": "mit Mandeln und Erdbeeren",
    "link": "https://www.gutekueche.at/griessbrei-mit-ei-rezept-12333",
    "image": "https://www.gutekueche.at/storage/media/recipe/19495/resp/griessbrei-mit-ei___webp_940_625.webp",
    "tags": ["dinner", "sweet"],
    "ingredients": ["weichweizengrieß", "milch", "zucker", "salz", "eier", "butter", "mandelsplitter", "erdbeeren", "zimt"],
  },
  {
    "name": "Flammkuchen",
    "link": "https://sallys-blog.de/rezepte/flammkuchen-grundrezept",
    "image": "https://sallyshop.b-cdn.net/media/0c/83/a3/1717677957/174_16147_dsc00232gr_1.jpg",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Käsespätzle",
    "link": "https://www.lecker.de/klassische-kaesespaetzle-33039.html",
    "image": "https://images.lecker.de/kaesespaetzle-b,id=f219181c,b=lecker,w=910,rm=sk.webp",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Köttbullar",
    "link": "https://sallys-blog.de/rezepte/koettbullar-selbstgemacht-schwedisches-rezept-ikea-nachgemacht",
    "image": "https://sallyshop.b-cdn.net/media/32/d3/9e/1717685146/1060_15528_dsc01911_1.jpg",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Pulled Beef mit Kartoffelstampf und Krautsalat",
    "link": "https://sallys-blog.de/rezepte/pulled-beef-mit-kartoffelstampf-und-krautsalat-leckeres-menue",
    "image": "https://sallyshop.b-cdn.net/media/87/ba/49/1717686004/1226_9591__dsc6898_1.jpg",
    "tags": ["dinner", "herzhaft"],
    "minutes": 150,
  },
  {
    "name": "Pelmeni",
    "subtext": "russische, gefüllte Teigtaschen",
    "link": "https://sallys-blog.de/rezepte/pelmeni-gefuellte-teigtaschen",
    "image": "https://sallyshop.b-cdn.net/media/3f/08/93/1717681664/948_15806_dsc09132_blog_1.jpg",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Linzertorte",
    "link": "https://sallys-blog.de/rezepte/linzertorte-klassisch-linzer-tarte",
    "image": "https://sallyshop.b-cdn.net/media/58/dd/6f/1717687719/1445_22689_linzer_torte_klassisch_1.jpg",
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
  },
  {
    "name": "Brownie Waffeln",
    "link": "https://sallys-blog.de/rezepte/Brownie-Waffeln",
    "image": "https://sallyshop.b-cdn.net/media/8e/87/28/1717677711/112_13240_680_12017-03-15_sallys_brownie_waffeln_01_1.jpg",
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
  },
  {
    "name": "Zimtschnecken Guglhupf",
    "link": "https://sallys-blog.de/rezepte/zimtschnecken-guglhupf",
    "image": "https://sallyshop.b-cdn.net/media/65/a9/44/1717685766/1190_16458__dsc9398_3.jpg",
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
  },
  {
    "name": "Zimtschnecken aus Finnland",
    "subtitle": "Gebäck mit Zimt und Kardamom – Wenn man da nicht sofort an Skandinavien denkt, dann weiß ich auch nicht.",
    "link": "https://sallys-blog.de/rezepte/zimtschnecken-aus-finnland-korvapuusti-rezept",
    "image": "https://sallyshop.b-cdn.net/media/cd/c7/ea/1717689794/1837_27735_sally-korvapuusti-rezept-1.jpg",
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
    "minutes": 80,
  },
  {
    "name": "Orangen Tiramisu",
    "subtext": "fruchtiges Weihnachtsdessert",
    "link": "https://sallys-blog.de/rezepte/orangen-tiramisu-fruchtiges-weihnachtsdessert",
    "image": "https://sallyshop.b-cdn.net/media/85/17/92/1717680000/610_8680_dsc00695_kl_kl_2.jpg?width=1920",
    "minutes": 300,
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
  },
  {
    "name": "Watruschka",
    "subtext": "russisches Hefeteiggebäck mit Vanille-Quark-Füllung",
    "link": "https://sallys-blog.de/rezepte/Watruschka-russisches-Hefeteiggebaeck-mit-Vanille-Quark-Fuellung",
    "image": "https://sallyshop.b-cdn.net/media/d7/c5/9e/1717682230/1142_15458_watruschki_blog_sb_3_von_12_.jpg",
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
  },
  {
    "name": "Skolebrød",
    "subtext": "norwegische Hefebrötchen",
    "link": "https://sallys-blog.de/rezepte/skolebroed-norwegische-hefebroetchen-vanillegebaeck",
    "image": "https://sallyshop.b-cdn.net/media/88/9b/c3/1717689678/1821_27629_sally-skolebrod-rezept_1.jpg",
    "minutes": 65,
    "tags": ["sweet", "süß", "kuchen", "kaffee"],
  },
  {
    "name": "Pfannkuchen",
    "link": "https://emmikochteinfach.de/pfannkuchen-rezept-einfaches-grundrezept/",
    "image": "https://emmikochteinfach.de/wp-content/uploads/2022/03/Klassische-Pfannkuchen-Rezept-Grundrezept-1.webp",
    "tags": ["dinner", "sweet"],
  },
  {
    "name": "Lasagne nach Sallys Art",
    "link": "https://sallys-blog.de/rezepte/lasagne-nach-sallys-art",
    "image": "https://sallyshop.b-cdn.net/media/7f/b9/7a/1717680041/sally-lasagne-rezept.jpg",
    "minutes": 95,
    "time": "1h 35min",
    "tags": ["dinner"],
  },
  {
    "name": "Süßkartoffel-Lasagne mit Hirtenkäse",
    "link": "https://sallys-blog.de/rezepte/suesskartoffel-lasagne-mit-hirtenkaese-genial-einfach",
    "image": "https://sallyshop.b-cdn.net/media/71/21/39/1717684537/847_10171_dsc07845_blog.jpg",
    "minutes": 60,
    "time": "60min",
    "tags": ["dinner"],
  },
  {
    "name": "Ofengemüse",
    "tags": ["dinner", "herzhaft"]
  },
  {
    "name": "Gerösteter Curry-Blumenkohl",
    "subtitle": "mit frischer Zitronen-Raita",
    "link": "https://www.eat-this.org/curry-blumenkohl-mit-zitronen-raita/",
    "image": "https://www.eat-this.org/wp-content/uploads/2018/02/geroesteter_curry-blumenkohl-1-1280x854@2x.jpg",
    "tags": ["dinner", "herzhaft"],
    "ingredients": ["blumenkohl", "reis"],
  },
  {
    "name": "Cremige Süßkartoffelsuppe",
    "subtitle": "mit rauchigen Rosenkohl-Chips",
    "link": "https://www.eat-this.org/cremige-suesskartoffelsuppe-mit-rauchigen-rosenkohl-chips/",
    "image": "https://www.eat-this.org/wp-content/uploads/2021/11/eat_this_suesskartoffelsuppe_mit_rauchigen_rosenkohl-chips-005-1280x853@2x.jpg",
    "tags": ["dinner", "herzhaft"],
  },
  {
    "name": "Pasta e fagioli",
    "subtitle": "das bohnigste Pastagericht überhaupt",
    "link": "https://www.eat-this.org/vegane-pasta-e-fagioli/",
    "image": "https://www.eat-this.org/wp-content/uploads/2022/01/eat_this_pasta_e_fagioli_%E2%80%93_das_bohnigste_nudelgericht-005-1280x853@2x.jpg",
    "tags": ["pasta", "nudeln", "dinner"],
    "time": "20  min",
"minutes": 20 ,
    "ingredients": ["zwiebeln", "karotten", "stangensellerie", "knoblauch", "olivenöl", "salz", "chiliflocken", "tomatenmark", "weiße bohnen", "aquafaba", "tomaten", "oregano", "thymian", "fenchelsamen", "lorbeer", "dunkle misopaste", "pasta", "endivie"],
  },
  {
    "name": "Pastinakensuppe",
    "link": "https://www.leckerschmecker.me/pastinakensuppe/63743511338719",
    "image": "https://www.leckerschmecker.me/wp-content/uploads/sites/6/2024/02/pastinaken-suppe.jpeg",
    "tags": ["dinner"],
    "ingredients": ["pastinaken", "kartoffeln", "zwiebeln", "butterschmalz", "mehl", "wasser", "milch", "salz", "pfeffer"],
  },
  {
    "name": "One Pot Taco Pasta",
    "subtitle": "würzige, cremige 20 Minuten Nudelpfanne",
    "link": "https://sallys-blog.de/rezepte/one-pot-taco-pasta-wuerzige-cremige-20-minuten-nudelpfanne",
    "image": "https://sallyshop.b-cdn.net/media/77/7e/54/1717688277/1576_24808_one_pot_taco_pasta_1.jpg",
    "ingredients": ["olivenöl", "hackfleisch", "zwiebeln", "knoblauch", "tomatenmark", "gemüsebrühe", "sahne", "salz", "pfeffer", "chiliflocken", "kreuzkümmel", "lorbeer", "oregano", "nudel", "parmesan", "erbsen"],
  },
  {
    "name": "Letscho",
    "subtitle": "das pikante Schmorgericht aus Ungarn",
    "link": "https://eat.de/rezept/original-ungarisches-letscho/",
    "image": "https://eat.de/wp-content/uploads/2022/01/letscho-original-11041-1170x780.jpg",
    "minutes": 25,
    "time": "25min",
    "tags": ["dinner"],
  },
  {
    "name": "Vegane Kürbis-Quiche mit Rosmarin-Crust",
    "link": "https://www.eat-this.org/vegane-kuerbis-quiche-mit-rosmarin-crust/",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/10/eat_this_vegane_kuerbis-quiche_mit_spinat_und_champignons_011-1280x853@2x.jpg",
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Spinat-Feta-Quiche mit Röstiboden",
    "link": "https://sallys-blog.de/rezepte/spinat-feta-quiche-mit-roestiboden-herzhafter-kartoffelkuchen",
    "image": "https://sallyshop.b-cdn.net/media/31/d2/b7/1717683129/97_26405_spinat_feta_quiche_1.jpg",
    "tags": ["dinner", "vegetarian"],
  },
  {
    "name": "Chile relleno",
    "subtitle": "mexikanische gefüllte Paprika",
    "link": "https://www.rewe.de/rezepte/gefuellte-paprika-chile-relleno/",
    "image": "https://c.rewe-static.de/30230226/7/30230226.png",
    "ingredients": ["spitzpaprika", "mozzarella", "tomaten", "zwiebeln", "knoblauch", "gemüsebrühe", "öl", "salz", "pfeffer", "eier", "mehl", "sonnenblumenöl", "petersilie"],
    "tags": ["dinner"],
  },
  {
    "name": "Safran-Risotto mit King Prawns",
    "link": "https://www.rewe.de/rezepte/safran-risotto-king-prawns/",
    "tags": ["dinner"],
  },
  {
    "name": "Chicken & chorizo jambalaya",
    "link": "https://www.bbcgoodfood.com/recipes/chicken-chorizo-jambalaya",
    "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1274503_8-05ae02b.jpg",
    "ingredients": ["öl", "hähnchenbrust", "zwiebeln", "paprika", "knoblauch", "chorizo", "cajungewürz", "reis", "tomaten", "hühnerbrühe"],
    "tags": ["dinner"],
    "language": "en",
  },
  {
    "name": "Wirsingrouladen mit Hackfüllung",
    "link": "https://www.lecker.de/wirsing-rouladen-mit-hackfuellung-31761.html",
    "image": "https://images.lecker.de/wirsingrouladen-neu-b,id=52da96bf,b=lecker,w=910,rm=sk.webp",
    "minutes": 75,
    "time": "1h 15min",
    "tags": ["dinner"],
  },
  {
    "name": "Coconut-Apple-Ginger Dal",
    "link": "https://www.healthline.com/recipes/coconut-apple-ginger-daal",
    "image": "https://media.post.rvohealth.io/wp-content/uploads/2026/08/getty_upload_header_1296x728-3-1.jpg",
    "minutes": 45,
    "time": "45min",
    "language": "en",
    "tags": ["dinner"],
  },
  {
    "name": "Braised Butternut Squash in Spiced Coconut Gravy",
    "link": "https://www.ashlynrecipes.com/braised-butternut-squash-in-spiced-coconut-gravy/",
    "image": "https://www.ashlynrecipes.com/wp-content/uploads/2026/03/gqdu36ya2xbgectjdiwx.webp",
    "minutes": 45,
    "time": "45min",
    "language": "en",
    "tags": ["dinner"],
  },
  {
    "name": "Bierrisotto",
    "subtitle": "mit Pilzen und Chorizo-Chips",
    "link": "https://www.rewe.de/rezepte/bierrisotto-pilze-chorizo-chips/",
    "image": "https://c.rewe-static.de/30230398/8/30230398.png",
    "ingredients": ["champignons", "schalotte", "chorizo", "petersilie", "olivenöl", "risotto-reis", "bier", "gemüsefond", "butter", "salz", "pfeffer", "parmesan"],
    "tags": ["dinner"],
  },
  {
    "name": "Rotkohl-Schupfnudel-Gratin mit Schafskäse",
    "ingredients": ["rotkohl", "rosinen", "orangen", "zwiebeln", "olivenöl", "mandeln", "salz", "pfeffer", "zucker", "obstessig", "schupfnudeln", "schafskäse", "gemahlene muskatblüte"],
    "time": "80 min",
"minutes": 80 ,
    "tags": ["dinner"],
  },
  {
    "name": "Kartoffel-Sellerie-Püree mit grünem Buttergemüse",
    "book": {
      "id": "greenbox",
      "page": 162,
    },
    "time": "45 min",
"minutes": 45 ,
    "ingredients": ["kartoffeln", "sellerie", "salz", "butter", "dicke bohnen", "grüner spargel", "knackerbsen", "erbsen", "knoblauch", "mehl", "gemüsebrühe", "minze", "frühlingszwiebeln", "muskatnuss", "zitronensaft"],
  },
  {
    "name": "Wirsing-Nudel-Strudel",
    "book": {
      "id": "greenbox",
      "page": 253,
    },
    "time": "45  min",
"minutes": 45 ,
    "ingredients": ["wirsing", "mehl", "weichweizengrieß", "eier", "olivenöl", "salz", "öl", "ingwer", "thymian", "gemüsebrühe", "schlagsahne", "zitrone", "zucker", "pfeffer", "butter", "sauerrahm", "schnittlauch"],
  },
  {
    "name": "Protein-Packed Muscle-Building Chili",
    "link": "https://www.proteinprepper.com/high-protein-chili/",
    "image": "https://www.proteinprepper.com/wp-content/uploads/2025/08/high-protein-chili-bowl-ground-beef-beans.jpg",
    "time": "3h 20min",
    "minutes": 200,
    "language": "en",
    "tags": ["dinner"],
    "ingredients": ["chicken breast", "olive oil", "bell pepper", "mushrooms", "onions", "corn", "kidney beans", "pinto beans", "tomato", "ground chili", "garlic", "worcestershire sauce"],
  },
  {
    "name": "Coconut & squash dhansak",
    "link": "https://www.bbcgoodfood.com/recipes/coconut-squash-dhansak",
    "time": "20 min",
"minutes": 20 ,
    "tags": ["dinner"],
    "language": "en",
    "ingredients": ["öl", "butternut squash", "zwiebeln", "korma curry paste", "tomaten", "kokosnussmilch", "linsen", "babyspinat", "kokosnussjoghurt"],
  },
  {
    "name": "Caponata pasta",
    "link": "https://www.bbcgoodfood.com/recipes/caponata-pasta",
    "time": "20 min",
    "minutes": 20 ,
    "tags": ["dinner"],
    "language": "en",
    "ingredients": ["olivenöl", "zwiebeln", "knoblauch", "paprika", "auberginen", "tomaten", "kapern", "rosinen", "nudeln", "basilikum", "parmesan"],
  },
  {
    "name": "Gnocchi cacio e pepe",
    "link": "https://www.bbcgoodfood.com/recipes/gnocchi-cacio-e-pepe",
    "time": "10 min",
    "minutes": 10 ,
    "language": "en",
    "ingredients": ["gnocchi", "butter", "parmesan", "pfeffer"],
  },
  {
    "name": "Shepherd's pie with sweet potato mash",
    "link": "https://www.bbcgoodfood.com/recipes/veggie-shepherds-pie-sweet-potato-mash",
    "time": "1h",
    "minutes": 60,
    "language": "en",
    "ingredients": ["olivenöl", "zwiebeln", "karotten", "thymian", "rotwein", "tomaten", "gemüsebrühe", "grüne linsen", "süßkartoffeln", "butter", "cheddar"],
  },
  {
    "name": "Vegane grüne Enchiladas",
    "subtitle": "mit Tofu und Jalapeño-Apfel-Salsa",
    "link": "https://www.eat-this.org/vegane-gruene-enchiladas/",
    "image": "https://www.eat-this.org/wp-content/uploads/2022/01/eat_this_vegane_gruene_enchiladas_mit_tofu_und_jalapeno-apfel-salsa-009-1280x853@2x.jpg",
    "time": "1 Stunde",
    "minutes": 60,
    "ingredients": ["zwiebeln", "apfel", "paprika", "jalapenos", "knoblauch", "olivenöl", "limette", "koriander", "salz", "paprikapulver", "oregano", "kreuzkümmel", "zwiebelpulver", "tofu", "joghurt", "gouda", "tortillas"],
  },
  {
    "name": "Kitchari",
    "subtitle": "Indiens einfaches, leckeres Reis-Porridge",
    "link": "https://www.eat-this.org/kitchari-indisches-reis-porridge/",
    "image": "https://www.eat-this.org/wp-content/uploads/2022/01/eat_this_kitchari_%E2%80%93_das_einfachste_und_leckerste_indische_reis-porridge-001-1280x853@2x.jpg",
    "time": "1h 30min",
"minutes": 90,
    "ingredients": ["mungbohnen", "basmatireis", "zwiebeln", "kokosöl", "kreuzkümmel", "senfsamen", "karotten", "tomaten", "kurkuma", "ingwerpulver", "salz", "spinat", "koriander"],
  },
  {
    "name": "Geröstete Knoblauch-Shiitake auf Miso-Steckrübenpüree",
    "link": "https://www.eat-this.org/geroestete-shiitake-auf-miso-steckruebenpueree/",
    "image": "https://www.eat-this.org/wp-content/uploads/2020/01/geroestete_knoblauch-shiitake_auf_miso-steckruebenpueree-5-1280x854@2x.jpg",
    "time": "20  min",
"minutes": 20 ,
    "ingredients": ["steckrüben", "kartoffeln", "hafermilch", "olivenöl", "dunkle misopaste", "sesamöl", "salz", "sojasauce", "zitrone", "ahornsirup", "knoblauch", "ingwer", "schwarzer pfeffer", "sesam", "radieschen", "frühlingszwiebeln"],
  },
  {
    "name": "Roasted veggie curry",
    "link": "https://www.jamieoliver.com/recipes/curry-recipes/roasted-veggie-curry/",
    "time": "1 Stunde 10  min",
"minutes": 70,
    "ingredients": ["madras curry paste", "olivenöl", "essig", "karotten", "pastinake", "butternut kürbis", "zucchini", "blumenkohl", "ingwer", "knoblauch", "mango chutney", "tomaten", "kokosnussmilch", "erbsen"]
  },
  {
    "name": "Kaiserschmarrn",
    "subtitle": "Omas Original Rezept für einen vorzüglich feinen Schmarrn",
    "link": "https://emmikochteinfach.de/kaiserschmarrn-ganz-klassisch/",
    "image": "https://emmikochteinfach.de/wp-content/uploads/2022/10/Kaiserschmarrn-ganz-klassisch-einfach-1.jpg",
    "ingredients": ["mehl", "salz", "milch", "ei"],
  },
  {
    "name": "Crispy Greek-style pie",
    "link": "https://www.bbcgoodfood.com/recipes/crispy-greek-style-pie",
    "ingredients": ["spinat", "tomaten", "fetakäse", "eier", "blätterteig"],
    "time": "40 min",
    "minutes": 40
  },
  {
    "name": "Hot-smoked salmon pasta",
    "subtitle": "With asparagus & crème fraîche",
    "link": "https://www.jamieoliver.com/recipes/salmon-recipes/hot-smoked-salmon-pasta/",
    "time": "15  min",
"minutes": 15 ,
    "ingredients": ["spargel", "pasta", "lachs", "zitrone", "creme fraiche"]
  },
  {
    "name": "Bodybuilding Mac & Cheese",
    "link": "https://theproteinchef.co/bodybuilding-mac-cheese-recipe/",
  },
  {
    "name": "Beetroot & red onion tarte tatin",
    "link": "https://www.bbcgoodfood.com/recipes/beetroot-red-onion-tarte-tatin",
    "time": "1 Stunde 30  min",
"minutes": 90,
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
    "time": "40  min",
"minutes": 40 ,
    "ingredients": ["hühnerbrühe", "knoblauch", "sojasauce", "worcestershire sauce", "ingwer", "chilipulver", "zucker", "ramennudeln", "tofu/hähnchen/schweinefilet", "sesamöl", "blattspinat", "zuckermais", "eier", "nori", "frühlingszwiebeln", "sesam"]
  },
  {
    "name": "Arroz de Pato",
    "subtitle": "Entenreis",
    "ingredients": ["ente", "zwiebeln", "lauchstange", "karotte", "knoblauch", "olivenöl", "lorbeerblätter", "glatte petersilie", "chorizo", "serrano schinken", "schwarze pfefferkörner", "orange", "tomatenmark", "wasser", "langkornreis natur", "salz", "iberico käse", "grüne oliven"],
    "time": "3 hours",
    "link": "https://www.foodundco.de/arroz-de-pato-entenreis/",
    "image": "https://www.foodundco.de/wp-content/uploads/2019/03/Arroz-de-Pato-Entenreis-Kitchen-Impossible-1.jpg"
  },
  {
    "name": "Erdäpfelkäs und Buttermilchbrot",
    "link": "https://www.foodundco.de/erdaepfelkaes-und-buttermilchbrot-jause-aus-kitchen-impossible/",
    "image": "https://www.foodundco.de/wp-content/uploads/2026/05/Erdaepfelkaes-Buttermilchbrot-Kitchen-Impossible-5.jpg",
    "tags": ["dinner", "beilage", "vegetarian"],
    "language": "de",
  },
  {
    "name": "Chorizo & mozzarella gnocchi bake",
    "link": "https://www.bbcgoodfood.com/recipes/chorizo-mozzarella-gnocchi-bake",
    "time": "35  min",
"minutes": 35 ,
    "ingredients": ["olivenöl", "zwiebeln", "knoblauch", "chorizo", "gehackte tomaten", "zucker", "gnocchi", "mozzarella", "basilikum"]
  },
  {
    "name": "Griessschnitten",
    "link": "https://aus-omas-kochtopf.de/griess-schnitten/",
    "image": "https://aus-omas-kochtopf.de/wp-content/uploads/2023/04/omas-griessschnitten.jpg",
    "ingredients": ["butter", "milch", "weichweizengrieß", "zucker", "eier", "salz", "vanillezucker", "orange"],
    "tags": ["sweet"],
    "time": "75 min"
  },
  {
    "name": "Königsberger Klopse",
    "link": "https://www.bushcook.de/2015/02/konigsberger-klopse-aus-heimat-von-tim.html",
    "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiucik35SPivd9hXGnodgXCxkit8wang4Nf8jM-CfwHKH2flSrczd6umNaOnHCu9_mVrPcG882vHrxmwjC0wpOl6YluGFd3nvO01OZj1EqZ7FsCywGTOpl1w3JLTalj4hDoUSJKKxD89LSx/s1600/IMG_3125-001.jpg",
    "ingredients": ["toastbrot", "sahne", "getrocknete tomaten", "zwiebeln", "knoblauch", "olivenöl", "trockener weißwein", "pinienkerne", "petersilie", "sardellenfilets in öl", "parmesan", "geschälte tomaten", "butter", "mehl", "kalbshackfleisch", "ei", "salz", "pfeffer", "hühnerbrühe", "cayennpfeffer", "basilikum", "basmatireis", "oliven"],
    "time": "1 Stunde 20 min"
  },
  {
    "name": "Buttermilchwaffeln",
    "icon": "🧇",
    "link": "https://www.oetker.de/rezepte/r/buttermilchwaffeln",
    "image": "https://www.oetker.de/assets/recipes/assets/3c0555dc08b64e158df91c4c25b7be80/1272x764/buttermilchwaffeln-qf-27388.webp",
    "tags": ["sweet"],
    "time": "40  min",
"minutes": 40 ,
    "ingredients": ["zucker", "butter", "vanillezucker", "salz", "eier", "weizenmehl", "buttermilch", "backpulver"]
  },
  {
    "name": "Pockets",
    "subtitle": "gefüllte Teigtaschen",
    "tags": ["dinner"],
    "book": {
      "id": "modernbaking",
      "page": 177
    },
    "ingredients": ["honig", "trockenhefe", "wasser", "Weizenvollkornmehl", "mehl", "salz", "olivenöl", "griechischer joghurt", "pesto", "cheddar/parmesan", "grünkohl", "pflanzenöl", "butter"],
  },
  {
    "name": "Asiatische Steckrübensuppe",
    "link": "https://www.rewe.de/rezepte/asia-steckruebensuppe/",
    "image": "https://c.rewe-static.de/32301301/7/32301301.png",
    "time": "30  min",
"minutes": 30 ,
    "ingredients": ["kartoffeln", "steckrüben", "ingwer", "chili", "rapsöl", "currypulver", "gemüsebrühe", "kokosmilch", "sternanis", "salz", "pfeffer", "lauch", "shiitake", "koriander", "sesam", "tabasco"],
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Spicy root & lentil casserole",
    "link": "https://www.bbcgoodfood.com/recipes/spicy-root-lentil-casserole",
    "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-488691_11-ca2ba1d.jpg?quality=90&webp=true&resize=440,400",
    "ingredients": ["pflanzenöl", "zwiebeln", "Knoblauch", "kartoffeln", "karotte", "pastinake", "currypulver", "gemüsebrühe", "rote linsen", "koriander", "joghurt"],
    "time": "45  min",
"minutes": 45 ,
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Orientalischer Steckrüben-Eintopf mit Kichererbsen",
    "link": "https://www.ndr.de/ratgeber/kochen/rezepte/Orientalischer-Steckrueben-Eintopf-mit-Kichererbsen,rezept3824.html",
    "image": "https://images.ndr.de/image/a4cbebd9-dfaf-4a86-881c-bc9a182af5d7/AAABkXaqgq8/AAABnSSvrFg/16x9-big/steckruebeneintopf154.webp",
    "ingredients": ["steckrüben", "Kichererbsen", "backpulver", "pastinake", "rote zwiebeln", "karotte", "knoblauch", "limette", "orange", "baharat/harissa", "tomatensaft", "sojasauce", "chili-schote", "honig", "sesam", "petersilie", "olivenöl", "salz"],
    "tags": ["dinner"],
  },
  {
    "name": "Glasierter Ofenkürbis mit Tomaten & Spinat",
    "link": "https://www.lecker.de/glasierter-ofenkuerbis-mit-tomaten-spinat-70386.html",
    "image": "https://images.lecker.de/glasierter-ofenkurbis-mit-tomaten-und-spinat,id=c4eb467d,b=lecker,w=910,rm=sk.webp",
    "ingredients": ["hokkaidokürbis", "schalotten", "ahornsirup", "balsamico-essig", "olivenöl", "salz", "cayennpfeffer", "kirschtomaten", "blattspinat"],
    "time": "50  min",
"minutes": 50 ,
    "tags": ["dinner"],
  },
  {
    "name": "Rührei-Burrito",
    "link": "https://www.rewe.de/rezepte/ruehrei-burrito",
    "image": "https://c.rewe-static.de/34138207/2/34138207.png",
    "tags": ["vegetarisch", "dinner"],
    "time": "35  min",
"minutes": 35 ,
    "ingredients": ["tortillla wraps", "paprika", "schnittlauch", "cheddar", "rapsöl", "eier", "milch", "salz", "pfeffer", "paprikapulver edelsüß", "avocado", "kräuterquark"],
  },
  {
    "name": "Zwiebelkuchen",
    "link": "https://www.lecker.de/zwiebelkuchen-26596.html",
    "image": "https://images.lecker.de/zwiebelkuchen-b-f4971001,id=658d97b7,b=lecker,w=910,rm=sk.webp",
    "time": "1 Stunde 10  min",
"minutes": 70,
    "tags": ["dinner"],
    "ingredients": ["mehl", "hefe", "milch", "zucker", "butter", "eier", "salz", "zwiebeln", "öl", "speck", "pfeffer", "saure sahne", "speisestärke", "kümmel"],
  },
  {
    "name": "Pasta mit Erbsen-Joghurt-Soße",
    "link": "https://www.rewe.de/rezepte/pasta-erbsen-joghurt-sosse/",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner"],
    "ingredients": ["erbsen", "orechiette / nudeln", "salz", "zitrone", "pinienkerne", "minze", "knoblauch", "griechischer joghurt", "pfeffer", "fetakäse", "olivenöl"],
  },
  {
    "name": "Auberginen-Reispfanne mit Feta",
    "link": "https://www.rewe.de/rezepte/auberginen-reis-pfanne-feta/",
    "time": "35  min",
"minutes": 35 ,
    "tags": ["dinner", "vegetarisch"],
    "ingredients": ["auberginen", "paprika", "Kichererbsen", "zwiebeln", "knoblauch", "olivenöl", "tomatenmark", "reis", "gemüsebrühe", "thymian", "fetakäse", "salz", "pfeffer"],
  },
  {
    "name": "Geröstete Shiitake auf Miso-Steckrübenpüree",
    "link": "https://www.eat-this.org/geroestete-shiitake-auf-miso-steckruebenpueree/#recipe",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Gelbes Thai Curry",
    "link": "https://www.eat-this.org/veganes-gelbes-thai-curry/#recipe",
    "image": "https://img.eat-this.org/spai/q_glossy+w_875+h_1313+to_auto+ret_img/www.eat-this.org/wp-content/uploads/2021/01/eat_this_veganes_gelbes_thai-curry-008-scaled-960x1440.jpg",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Veganer Mapo Tofu",
    "link": "https://www.eat-this.org/veganer-mapo-tofu/#recipe",
    "image": "https://img.eat-this.org/spai/q_glossy+w_875+h_1313+to_auto+ret_img/www.eat-this.org/wp-content/uploads/2019/10/veganer_mapo-tofu-9-700x1050@2x.jpg",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Gerösteter Blumenkohl mit Zatar & veganer Feta-Creme",
    "link": "https://www.eat-this.org/geroesteter-blumenkohl-mit-zatar-und-veganer-feta-creme/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/03/eat_this_geroesteter_blumenkohl_mit_zatar_und_veganer_feta-creme_006-1280x853@2x.jpg",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Geschmorter Fenchel mit Zitronen-Couscous",
    "link": "https://www.eat-this.org/geschmorter-fenchel-mit-zitronen-couscous/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/02/eat_this_geschmorter_fenchel_mit_zitronen-couscous_002-1280x853@2x.jpg",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Kürbis-Bohnen-Püree mit Currypaste und knusprigen Pilzen",
    "link": "https://www.eat-this.org/kuerbis-bohnen-pueree-mit-currypaste-und-knusprigen-pilzen/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/10/eat_this_kuerbis-bohnen-pueree_mit_currypaste_und_knusprigen_pilzen_004-1280x853@2x.jpg",
    "time": "25  min",
"minutes": 25 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Vegane Teriyaki-Krautwickel",
    "subtitle": "japanisch inspirierte Wirsingrouladen",
    "link": "https://www.eat-this.org/vegane-teriyaki-krautwickel-japanisch-inspirierte-wirsingrouladen/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/01/eat_this_vegane_teriyaki-krautwickel_%E2%80%93_japanisch_inspirierte_wirsingrouladen_010-1280x853@2x.jpg",
    "time": "35  min",
"minutes": 35 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Tagliatelle in samtiger Erbsensauce",
    "link": "https://www.zentrum-der-gesundheit.de/rezepte/hauptgerichte/nudel-rezepte/nudeln-erbsensauce",
    "image": "https://s.zentrum-der-gesundheit.de/img/nudeln-erbsensauce?width=1500&height=843",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Möhren-Tarte",
    "link": "https://filiale.kaufland.de/rezepte/rezeptwelten/detail/rezept.voll-auf-die-moehre-tarte.r_id=Recipe_20890641.html",
    "image": "https://kaufland.media.schwarz/is/image/schwarz/recipe20890641_voll-auf-die-moehre-tarte-1?JGstbGVnYWN5LW9uc2l0ZS00JA==",
    "tags": ["dinner", "vegetarisch"],
  },
  {
    "name": "Cremige Gnocchi-Pfanne mit Blumenkohlsauce, Grünkohl und Veggie-Salami",
    "link": "https://www.eat-this.org/gnocchi-pfanne-mit-cremiger-blumenkohlsauce-und-gruenkohl/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/11/eat_this_gnocchi-mit-blumenkohlsauce-gruenkohl_veggie-salami_007_2-1280x853@2x.jpg",
    "time": "25  min",
"minutes": 25 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Veganer Colcannon",
    "subtitle": "irischer Kartoffelbrei mit Grün- und Spitzkohl",
    "link": "https://www.eat-this.org/veganer-colcannon-irischer-kartoffelbrei/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2023/02/eat_this_veganer_colcannon_irischer_kartoffelbrei_mit_gruenkohl_002-1280x853@2x.jpg",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Einfache Kartoffelfrikadellen mit Buchweizen",
    "link": "https://www.eat-this.org/einfache-kartoffelfrikadellen-mit-buchweizen/#recipe",
    "image": "https://www.eat-this.org/wp-content/uploads/2020/02/einfache_kartoffelfrikadellen_mit_buchweizen_eat_this_vegan_food_blog-3-1280x854@2x.jpg",
    "time": "40  min",
"minutes": 40 ,
    "tags": ["dinner", "vegan", "eaththis"],
  },
  {
    "name": "Sweet Potato Chickpea and Coconut Curry",
    "link": "https://biancazapatka.com/en/sweet-potato-chickpea-coconut-curry/",
    "image": "https://biancazapatka.com/wp-content/uploads/2019/03/coconut-curry-sweet-potato-chickpea-creamy-vegan-recipe-easy-quick-healthy-glutenfree-broccoli-kichererbsen-suesskartoffel-rezept-720x1008.jpg",
    "time": "40  min",
"minutes": 40 ,
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Tofu Stir-Fry with Peanut Sauce",
    "link": "https://themodernproper.com/tofu-stir-fry-with-peanut-sauce",
    "image": "https://images.themodernproper.com/production/posts/2019/tofu-stir-fry-with-broccoli-and-cabbage-12.jpg",
    "time": "40  min",
"minutes": 40 ,
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Spaghetti Aglio Olio",
    "link": "https://slurrp.club/recipe/spaghetti-aglio-olio/",
    "time": "20  min",
"minutes": 20 ,
    "image": "https://slurrp.club/wp-content/uploads/2019/06/DSC_1375.jpg",
    "tags": ["dinner", "vegan"],
  },
  {
    "name": "Black Bean Tacos",
    "link": "https://www.cookingclassy.com/black-bean-tacos-with-avocado-cilantro-lime-crema/",
    "image": "https://www.cookingclassy.com/wp-content/uploads/2017/02/black-bean-tacos-11-768x1152.jpg",
    "time": "30  min",
"minutes": 30 ,
    "tags": ["dinner", "vegan"],
  },
  {
        "name": "Cream of Celery Soup",
        "language": "en",
        "time": "40 min",
"minutes": 40,
        "link": "https://www.tasteofhome.com/recipes/cream-of-celery-soup/",
        "image": "https://www.tasteofhome.com/wp-content/uploads/2018/01/Cream-of-Celery-Soup_EXPS_FT21_28681_F_1105_1.jpg",
        "tags": ["dinner", "vegetarian"]
    }, {
        "name": "Celery Gratin",
        "language": "en",
        "link": "https://www.tasteofhome.com/recipes/celery-gratin/",
        "image": "https://www.tasteofhome.com/wp-content/uploads/2025/08/Celery-Gratin_EXPS_TOHD25_261162_RatulaChakraborti_17.jpg",
        "tags": ["dinner", "vegetarisch"]
    }, {
        "name": "One-Pan-Hähnchen mit Pfirsichen",
        "language": "de",
        "link": "https://www.kitchenstories.com/de/rezepte/one-pan-hahnchen-mit-pfirsichen",
        "image": "https://www.kitchenstories.com/wp-content/uploads/sites/13/2026/09/r3507-final-e1788938200186-d4b894.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Bagel mit Lachsfilet und Erbsen-Hummmus",
        "language": "de",
        "link": "https://www.kitchenstories.com/de/rezepte/bagel-mit-lachsfilet-und-erbsen-hummus",
        "image": "https://www.kitchenstories.com/wp-content/uploads/sites/13/2026/09/r1212-photo-final.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Ofenbohnen mit Tomaten und Toast",
        "language": "de",
        "link": "https://www.kitchenstories.com/de/rezepte/weisse-bohnen-aus-dem-ofen-mit-tomaten-und-toast",
        "image": "https://www.kitchenstories.com/wp-content/uploads/sites/13/2026/09/r2626-photo-final-3.jpg",
        "tags": ["dinner", "vegetarisch"]
    }, {
        "name": "Knusprige vegane Dumplings aus Reispapier",
        "language": "de",
        "time": "40  min",
"minutes": 40 ,
        "link": "https://www.kitchenstories.com/de/rezepte/knusprige-vegane-dumplings-aus-reispapier",
        "ingredients": ["Reispapier", "Tofu Natur", "Karotte", "Champignons", "Ingwer", "Knoblauch", "Sesamöl", "Sojasauce", "Salz", "Pfeffer", "Geröstete Chili in Öl"],
        "tags": ["dinner", "vegetarisch", "vegan"]
    }, {
        "name": "Orecchiette mit Mais, Speck und wachsweichen Eiern",
        "language": "de",
        "time": "35  min",
"minutes": 35 ,
        "link": "https://www.kitchenstories.com/de/rezepte/orecchiette-mit-mais-speck-und-wachsweichen-eiern",
        "image": "https://www.kitchenstories.com/wp-content/uploads/sites/13/2026/09/r2413-photo-final-1.jpg",
        "ingredients": ["Orecchiette", "süße Maiskolben", "Schinkenspeck", "Zwiebel", "Knoblauch", "Frühlingszwiebel", "Chili", "Eier", "Kirschtomaten", "Salz", "Pfeffer"],
        "tags": ["dinner", "herzhaft", "pasta", "nudeln"]
    }, {
        "name": "Grüne-Erbsen-Puffer mit veganem Speck",
        "language": "de",
        "time": "25  min",
"minutes": 25 ,
        "link": "https://www.eat-this.org/gruene-erbsen-puffer-mit-veganem-speck/",
        "image": "https://www.eat-this.org/wp-content/uploads/2026/04/eat_this_gruene-erbsen-puffer_mit_veganem_speck_005-1280x854@2x.jpg",
        "tags": ["dinner", "herzhaft", "vegetarisch", "vegan"]
    }, {
        "name": "Sommerlicher Nudelsalat mit Zucchini",
        "language": "de",
        "time": "30  min",
"minutes": 30 ,
        "link": "https://www.kitchenstories.com/de/rezepte/sommerlicher-nudelsalat-mit-zucchini",
        "image": "https://www.kitchenstories.com/wp-content/uploads/sites/13/2026/09/r2678-photo-final-1.jpg",
        "ingredients": ["Zucchini", "Rigatoni", "rote Zwiebeln", "Zitrone", "Mandeln", "entsteinte grüne Oliven aus dem Glas", "Petersilie", "Minze", "Knoblauch", "Olivenöl", "Salz", "Pfeffer", "Chiliflocken", "Parmesan"],
        "tags": ["dinner", "pasta", "nudeln", "vegetarisch"]
    }, {
        "name": "Cevapcici-Pita",
        "language": "de",
        "time": "50  min",
"minutes": 50 ,
        "link": "https://www.lecker.de/cevapcici-pita-oriental-style-129243.html",
        "image": "https://images.lecker.de/cevapcici-pita-f9699601-lecker-06-2024,id=b9962cec,b=lecker,w=910,ca=13.20,13.60,86.00,86.67,rm=sk.webp",
        "tags": ["dinner", "herzhaft"]
    }, {
        "name": "Japanische kalte Sobandnudeln",
        "language": "de",
        "link": "https://www.lecker.de/japanische-kalte-sobandnudeln-128884.html",
        "image": "https://images.lecker.de/kalte-sobandnudeln-lecker-04-2024,id=615e4ba0,b=lecker,w=910,ca=16.00,21.87,70.00,75.73,rm=sk.webp",
        "tags": ["dinner", "pasta", "nudeln", "vegetarisch"]
    }, {
        "name": "Gemüse-Tacos mit Koriander-Soße",
        "language": "de",
        "time": "45  min",
"minutes": 45 ,
        "link": "https://www.lecker.de/gemuese-tacos-mit-koriander-sosse-127782.html",
        "image": "https://images.lecker.de/uno-dos-tacos-lecker-11-2023,id=63663e2a,b=lecker,w=910,rm=sk.webp",
        "tags": ["dinner", "vegetarisch", "vegan"]
    }, {
        "name": "Eierschwammerl Strudel mit Joghurt-Kräutersauce",
        "language": "de",
        "time": "2h 35 min",
"minutes": 155,
        "link": "https://www.spar.at/mahlzeit/rezepte/beliebte-rezepte/vegetarisch/eierschwammerl-strudel-mit-jogurt-kraeutersauce",
        "image": "https://www.spar.at/content/dam/spardam/at/hz830/spar-mahlzeit/kitchenstory/rezeptfotos/eierschwammerl/kitchenstory-eierschwammerl-sparonline-7.jpg/jcr:content/renditions/responsive.1936.1090.noborder.250a0baf721e1f34.jpg",
        "tags": ["dinner", "herzhaft", "vegetarisch"]
    }, {
        "name": "Gnocchi mit Spinat & Lachs",
        "language": "de",
        "time": "60  min",
"minutes": 60 ,
        "link": "https://www.spar.at/mahlzeit/rezepte/beliebte-rezepte/fisch/schnelle-selbstgemachte-gnocchi-mit-spinat-lachs",
        "image": "https://www.spar.at/content/dam/spardam/at/recipe/mahlzeit-2025/mahlzeit-4-25/meeresfruechte/kitchenstory-spar-mahlzeit-meeresfruechte-12.jpg/jcr:content/renditions/responsive.1936.1090.noborder.250a0baf721e1f34.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Finnischer Pilzkuchen",
        "language": "de",
        "time": "3h 5 min",
"minutes": 185,
        "link": "https://www.spar.at/mahlzeit/rezepte/beliebte-rezepte/vegetarisch/finnischer-pilzkuchen",
        "image": "https://www.spar.at/content/dam/spardam/at/recipe/mahlzeit-2025/mahlzeit-sonderausgabe-veggie/veggie-international/kitchenstory-veggi-sparmahlzeit-5.jpg/jcr:content/renditions/responsive.1936.1090.noborder.250a0baf721e1f34.jpg",
        "tags": ["dinner", "herzhaft", "vegetarisch"]
    }, {
        "name": "Tomaten Quiche",
        "language": "de",
        "time": "2h 20 min",
"minutes": 140,
        "link": "https://www.spar.at/mahlzeit/rezepte/beliebte-rezepte/vegetarisch/tomaten-quiche",
        "image": "https://www.spar.at/content/dam/spardam/at/recipe/mahlzeit-2024/tragetaschen/kitchenstory-tagetaschen-spar-4.jpg/jcr:content/renditions/responsive.1936.1090.noborder.250a0baf721e1f34.jpg",
        "tags": ["dinner", "vegetarisch"]
    }, {
        "name": "Peanut Chicken Bowl",
        "language": "de",
        "time": "25  min",
"minutes": 25 ,
        "link": "https://www.spar.at/mahlzeit/rezepte/beliebte-rezepte/fleisch/peanut-chicken-bowl",
        "image": "https://www.spar.at/content/dam/spardam/at/hz830/spar-mahlzeit/nadja-hudovernik/rezeptfotos/schnell-und-einfach/spar-mahlzeit-alltagsrezepte-c-nadja-hudovernik-4.jpg/jcr:content/renditions/responsive.1936.1090.noborder.250a0baf721e1f34.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Mediterrane Brotsticks mit Rosmarin",
        "language": "de",
        "time": "2h 25 min",
"minutes": 145,
        "link": "https://eat.de/rezept/mediterrane-brotsticks-mit-rosmarin/",
        "image": "https://eat.de/wp-content/uploads/2024/07/mediterrane-brotsticks-mit-rosmarin-9957-1170x780.jpg",
        "tags": ["brot", "brötchen", "vegan"]
    }, {
        "name": "Keto Sausage Cheddar Biscuits",
        "language": "en",
        "link": "https://thebestketorecipes.com/keto-sausage-cheddar-biscuits/",
        "image": "https://thebestketorecipes.com/wp-content/uploads/2021/03/keto-sausage-cheddar-biscuits.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Frittata mit Kartoffeln, Spinat, Zucchini und Erbsen",
        "language": "de",
        "link": "https://www.spar.at/mahlzeit/rezepte/beliebte-rezepte/vegetarisch/Frittata-mit-kartoffeln-spinat-zucchini-und-erbsen?ecid=at_spar_1242",
        "image": "https://www.spar.at/content/dam/sparatwebsite/mahlzeit/rezepte/vegetarisch/kitchenstory-sparpicknickhighres2.jpg/jcr:content/renditions/responsive.1936.1090.noborder.250a0baf721e1f34.jpg",
        "tags": ["dinner", "vegetarisch"]
    }, {
        "name": "Dampfnudeln",
        "language": "de",
        "time": "55  min",
"minutes": 55 ,
        "link": "https://sallys-blog.de/rezepte/dampfnudeln",
        "image": "https://sallyshop.b-cdn.net/media/f2/91/cd/1728038561/sally-dampfnudeln-rezept.jpg",
        "tags": ["dinner", "vegetarisch", "sweet", "süß"]
    }, {
        "name": "Steamed Dumplings with vanilla sauce",
        "language": "en",
        "time": "55  min",
"minutes": 55 ,
        "video": "https://m.youtube.com/watch?v=ENk1I5ueTcg",
        "image": "https://sallyshop.b-cdn.net/media/f2/91/cd/1728038561/sally-dampfnudeln-rezept.jpg",
        "tags": ["dinner", "vegetarisch", "sweet", "süß"]
    }, {
        "name": "Pizzakranz",
        "subtext": "Tortano – italienisches Pizza-Brot",
        "language": "de",
        "time": "1h 5 min",
"minutes": 65,
        "link": "https://sallys-blog.de/rezepte/pizza-kranz-tortano-italienisches-pizza-brot",
        "video": "https://m.youtube.com/watch?v=mQIND17WwQI",
        "image": "https://sallyshop.b-cdn.net/media/54/2e/4d/1717679186/479_13454_dsc03921_blog_1.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Cheesy Bacon Frittata",
        "language": "en",
        "link": "https://www.eatwell101.com/frittata-recipe",
        "image": "https://www.eatwell101.com/wp-content/uploads/2025/07/Cheesy-Bacon-Frittata-recipe-1200x800.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Fruchtiges Chili Gazpacho",
        "language": "de",
        "link": "https://www.eat-this.org/fruchtige-chili-gazpacho/",
        "image": "https://www.eat-this.org/wp-content/uploads/2015/07/chili-gazpacho-1.jpg",
        "tags": ["dinner", "herzhaft", "pasta", "nudeln", "vegetarisch", "vegan"]
    }, {
        "name": "Bohnenpfanne mit Tofu",
        "language": "de",
        "link": "https://www.ndr.de/ratgeber/kochen/rezepte/bohnenpfanne-mit-tofu,bohnenpfanne-100.html",
        "image": "https://images.ndr.de/image/271e096c-ee42-4236-ae73-7c990377d49b/AAABnBpSK7k/AAABnSSvrFg/16x9-big/bohnenpfanne-102.webp?width=1920",
        "tags": ["dinner"]
    }, {
        "name": "Apfel-Schmand-Torte",
        "language": "de",
        "link": "https://www.dm.de/tipps-und-trends/rezepte/apfel-schmand-torte-2652212?wt_mc=print.anzeige.alverde.rezept082025",
        "image": "https://editorial-content.dm-static.com/image/upload/q_auto:eco,f_auto/content/rootpage-dm-shop-de-de/resource/image/2652218/widescreen/1200/500/92c3d260e94c413acf8c821552264a08/DFDF7F26AE848F214CE1F92BFA20B900/apfel-schmand-torte-aufmacher.jpg",
        "tags": ["sweet", "süß", "kuchen", "kaffee", "cookie"]
    }, {
        "name": "Salted Butter and Chocolate Chunk Shortbread",
        "language": "en",
        "link": "https://www.alisoneroman.com/recipes/salted-butter-chocolate-chunk-shortbread/",
        "image": "https://storage.ghost.io/c/aa/c9/aac954d7-13e7-4d9e-8784-fa2d15230fb2/content/images/size/w1200/format/avif/images-squarespace-cdn-com/content/v1/541b1515e4b0a990b33a796e/1631214228844-VON1H8OTXO8DZZC5W801/salted-butter-and-chocolate-chunk-shortbread.jpg",
        "tags": ["sweet", "süß", "kuchen", "kaffee", "cookie"]
    }, {
        "name": "Black Bean Tofu Chow Mein",
        "language": "en",
        "link": "https://www.bbc.co.uk/food/recipes/tofu_mein_41824",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/tofu_mein_41824_16x9.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Jollof Rice",
        "language": "en",
        "time": "45  min",
"minutes": 45 ,
        "link": "https://www.bbc.co.uk/food/recipes/jollof_rice_with_fried_84889",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/jollof_rice_with_fried_84889_16x9.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Spanish-inspired Frittata Wrap",
        "subtitle": "Kickstart your morning with this hearty frittata wrap developed with nutritionist to the Red Roses, Aimee Ellen O'Keeffe. Packed with carbs and a source of protein designed to keep you energised and satisfied.",
        "language": "en",
        "link": "https://www.bbc.co.uk/food/recipes/spanish-inspired_21079",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/spanish-inspired_21079_16x9.jpg",
        "time": "45 min",
"minutes": 45,
        "tags": ["dinner", "vegetarian"]
    }, {
        "name": "Shakshuka",
        "language": "en",
        "link": "https://www.bbc.co.uk/food/recipes/shakshouka_74716",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/shakshouka_74716_16x9.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Mexican Tortilla Bake",
        "language": "en",
        "link": "https://www.bbc.co.uk/food/recipes/mexican_tortilla_bake_28158",
        "image": "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/mexican_tortilla_bake_28158_16x9.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Tunnbrödrulle (Swedish Hot Dogs)",
        "language": "en",
        "link": "https://true-north-kitchen.com/tunnsbrodrulle-swedish-hot-dogs/",
        "image": "https://true-north-kitchen.com/wp-content/uploads/2022/08/tunnsbro%CC%88drulle-1.jpg",
        "tags": ["dinner"]
    }, {
        "name": "Erdbeer-Swirl Cheesecake",
        "language": "de",
        "link": "https://www.kuchentratsch.com/blogs/omas-backrezepte/erdbeer-swirl-cheesecake-rezept",
        "image": "https://www.kuchentratsch.com/cdn/shop/articles/20230705144248-erdbeer-cheesecake-blog-kuchentratsch.webp",
        "tags": ["sweet", "süß", "kuchen", "kaffee", "cookie"]
    }, {
        "name": "Eierlikör-Muffins",
        "language": "de",
        "link": "https://www.brigitte.de/rezepte/eierlikoer-muffins-10553396.html",
        "image": "https://image.brigitte.de/10553394/t/CJ/v7/w960/r1/-/eierlikoer-muffins.jpg",
        "tags": ["sweet", "süß", "kuchen", "kaffee", "cookie"]
    }, {
        "name": "Bohnensalat mit Kichererbsen, Spitzpaprika & Feta",
        "language": "de",
        "link": "https://www.malteskitchen.de/bohnensalat-kichererbsen-spitzpaprika-feta/",
        "image": "https://www.malteskitchen.de/wp-content/uploads/2018/04/bohnen-kichererbsen-salat-04-1200x680.jpg",
        "tags": ["dinner"]
    },
        {
      "language": "de",
      "name": "Aprikosen-Blechkuchen mit Streuseln",
      "custom": true,
      "link": "https://jennyisbaking.com/de/2020/05/15/apricot-sheet-cake-just-like-from-granny/#recipe",
      "image": "https://i0.wp.com/jennyisbaking.com/wp-1c174-content/uploads/2020/04/DSC08703.jpg",
      "tags": [
        "sweet",
        "süß",
        "kuchen",
        "kaffee",
        "cookie"
      ]
    },
];