const constants = {
   languages: ["繁體中文", "简体中文", "English", "Française"],
   bibleVersions: ["天主教", "基督教", "天主教", "基督教", "Catholic", "Christian", "Catholique", "Chrétienne"],
   bibleVersionsQuestion: ["經文版本", "经文版本", "Scripture version", "Version biblique"],
   topics: [
     [
    "分數乘法", "分數除法", "分數乘除混合",
    "分数乘法", "分数除法", "分数乘除混合",
    "Fractional Multiplication", "Fractional Division", "Fractional Multiplication and Division Mixed",
    "Multiplication fractionnaire", "Division fractionnaire", "Multiplication fractionnaire et division mixte"
     ],
     [
      "分數加法", "分數減法", "分數加減混合",
      "分数加法", "分数减法", "分数加减混合",
      "Addition of Fractions", "Subtraction of Fractions", "Mixed Addition and Subtraction of Fractions",
      "Addition de fractions", "Soustraction de fractions", "Addition et soustraction mixtes de fractions"
    ],
    [
      "分數四則混合計算", "帶括號的分數四則號混合計算",
      "分数四则混合计算", "带括号的分数四则号混合计算",
      "Four mixed calculations for fractions", "Four mixed calculations for fractions with parentheses",
      "Quatre calculs mixtes pour les fractions", "Quatre calculs mixtes pour les fractions avec parenthèses"
    ]
  ],
  topicsQuestion: ["主題", "主题", "Topic", "Sujet"],
  learningTools: [
    "真分數計算", "帶分數計算", "真分數計算", "帶分數計算", "真分數計算", "帶分數計算",    
    "真分数计算", "带分数计算", "真分数计算", "带分数计算", "真分数计算", "带分数计算",
    "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", 
    "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction"
  ],
  learningToolsQuestion: [
    "分數類型", "分数类型", "Fraction Type", "Type de Fraction"
  ],
  scriptureVerses: [//Genesis28:21-22, Leviticus27:30, Luke10:27, (next:Gen 41:34), 
    //traditional chinese
    "「上主實在當是我的天主。我立作石柱的這塊石頭，必要成為天主的住所；凡你賜與我的，我必給你奉獻十分之一。」創28:21-22",
    "凡土地的出產，或是田地的穀物，或是樹木的果實，十分之一應歸於上主，是獻於上主的聖物。肋27:30",
    "他答說：「你應當全心、全靈、全力、全意愛上主，你的天主；並愛近人如你自己。」路10:27",
    "「我就必以耶和華為我的神。我所立為柱子的這塊石頭必作神的殿；凡你所賜給我的，我必將十分之一獻給你。」創28:21-22",
    "地上所有的，無論是地上的種子，是樹上的果子，十分之一是耶和華的，是歸耶和華為聖的。利27:30",
    "他回答說：「你要盡心、盡性、盡力、盡意愛主—你的神，又要愛鄰如己。」路10:27",
    //simplified chinese
    "「上主实在当是我的天主。我立作石柱的这块石头，必要成为天主的住所；凡你赐与我的，我必给你奉献十分之一。」创28:21-22 ",
    "凡土地的出产，或是田地的谷物，或是树木的果实，十分之一应归于上主，是献于上主的圣物。肋27:30",
    "他答说：「你应当全心、全灵、全力、全意爱上主，你的天主；并爱近人如你自己。」路10:27",
    "「我就必以耶和华为我的神。我所立为柱子的这块石头必作神的殿；凡你所赐给我的，我必将十分之一献给你。」创28: 21-22",
    "地上所有的，无论是地上的种子，是树上的果子，十分之一是耶和华的，是归耶和华为圣的。利27:30",
    "他回答说：「你要尽心、尽性、尽力、尽意爱主—你的神，又要爱邻如己。」路10:27",
    //english
    "'Yahweh shall be my God. This stone I have set up as a pillar is to be a house of God, and I shall faithfully pay you a tenth part of everything you give me.'Genesis28:21-22",
    "All tithes on land, levied on the produce of the soil or on the fruit of trees, belong to Yahweh; they are consecrated to Yahweh.Leviticus27:30",
    "He replied, 'You must love the Lord your God with all your heart, with all your soul, with all your strength, and with all your mind, and your neighbour as yourself.'Luke10:27",
    "I will take the Lord to be my God, And this stone which I have put up for a pillar will be God's house: and of all you give me, I will give a tenth part to you.Genesis28:21-22",
    "And every tenth part of the land, of the seed planted, or of the fruit of trees, is holy to the Lord.Leviticus27:30",
    "And he, answering, said, Have love for the Lord your God with all your heart and with all your soul and with all your strength and with all your mind; and for your neighbour as for yourself.Luke10:27",
    //french
    "'Yahweh sera mon Dieu; cette pierre que j'ai dressée pour monument sera une maison de Dieu, et je vous paierai la dîme de tout ce que vous me donnerez.'Genèse28:21-22",
    "Toute dime de la terre, prélevée soit sur les semences de la terre, soit sur les fruits des arbres, appartient à Yahweh c'est une chose consacrée à Yahweh.Lévitique27:30",
    "Il répondit: 'Tu aimeras le Seigneur ton Dieu de tout coeur, de toute ton âme, de toute ta force et de tout ton esprit, et ton proche comme toi-même.'Luc10:27",
    "« Alors l'Eternel sera mon Dieu. Cette pierre dont j’ai fait un monument sera la maison de Dieu et je te donnerai la dîme de tout ce que tu me donneras. »Genèse28:21-22",
    "Toute dîme de la terre, soit des récoltes de la terre, soit du fruit des arbres, appartient à l'Eternel ; c'est une chose consacrée à l'Eternel.Lévitique27:30",
    "Il répondit : « Tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, de toute ta force et de toute ta pensée, et ton prochain comme toi-même. »Luc10:27"
  ],
  prayers: [
    "主耶穌，求祢給我一顆願意奉獻的心，讓我更能全心、全意愛天上的父親！",
    "主耶稣，求祢给我一颗愿意奉献的心，让我更能全心、全意爱天上的父亲！",
    "Lord Jesus, please give me a heart that is willing to give, so that I can love my Father in heaven with all my heart and with all my soul!",
    "Seigneur Jésus, s'il te plaît, donne-moi un cœur prêt à donner, afin que je puisse aimer mon Père céleste de tout mon cœur et de toute mon âme!"
  ],
   noticificationText: [
    "開啟通知，計算過程會顯示提示。",
    "开启通知，计算过程会显示提示。",
    "Turn on the notification, prompts will be displayed during the calculation.",
    "Activez la notification, des invites seront affichées pendant le calcul."
  ],
   applicationHint: [
    "使用方法：先按空格，再輸入數字或運算符號。",
    "使用方法：先按空格，再输入数字或运算符号。",
    "How to use: Press the space first, then enter a number or an operator.",
    "Comment utiliser: appuyez d'abord sur l'espace, puis entrez un nombre ou un opérateur."
  ],
};

export default constants;
