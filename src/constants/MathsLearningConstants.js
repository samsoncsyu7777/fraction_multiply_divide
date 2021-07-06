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
    [//unit 0
      "真分數計算", "帶分數計算", "真分數計算", "帶分數計算", "真分數計算", "帶分數計算",
      "真分数计算", "带分数计算", "真分数计算", "带分数计算", "真分数计算", "带分数计算",
      "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction",
      "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction"
    ],
    [//unit 1
      "真分數計算", "帶分數計算", "真分數計算", "帶分數計算", "真分數計算", "帶分數計算",
      "真分数计算", "带分数计算", "真分数计算", "带分数计算", "真分数计算", "带分数计算",
      "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction",
      "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction"
    ],
    [//unit 2
      "真分數計算", "帶分數計算", "真分數計算", "帶分數計算",
      "真分数计算", "带分数计算", "真分数计算", "带分数计算",
      "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction",
      "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction"
    ],
  ],
  learningToolsQuestion: [
    "分數類型", "分数类型", "Fraction Type", "Type de Fraction"
  ],
  scriptureVerses: [//Genesis28:21-22, Leviticus27:30, Luke10:27, (next:Gen 41:34), 
    //traditional chinese
    "「上主實在當是我的天主。我立作石柱的這塊石頭，必要成為天主的住所；凡你賜與我的，我必給你奉獻十分之一。」創28:21-22",
    "凡土地的出產，或是田地的穀物，或是樹木的果實，十分之一應歸於上主，是獻於上主的聖物。肋27:30",
    "他答說：「你應當全心、全靈、全力、全意愛上主，你的天主；並愛近人如你自己。」路10:27",
    "「陛下應設法在地方上派定督辦，在七個豐年內，徵收埃及國所出產的五分之一；」創41:34",
    "他還說話的時候，有人從會堂長家裡來，說：「你的女兒死了，你還來煩勞師傅做什麼？」耶穌聽見所說的話，就給會堂長說：「不要怕，祇管信。」谷5:35-36",
    "但是，你們當愛你們的仇人，善待他們；借出，不要再有所希望：如此，你們的賞報必定豐厚，且要成為至高者的子女，因為他對待忘恩的和惡人，是仁慈的。路6:35",

    "「我就必以耶和華為我的神。我所立為柱子的這塊石頭必作神的殿；凡你所賜給我的，我必將十分之一獻給你。」創28:21-22",
    "地上所有的，無論是地上的種子，是樹上的果子，十分之一是耶和華的，是歸耶和華為聖的。利27:30",
    "他回答說：「你要盡心、盡性、盡力、盡意愛主—你的神，又要愛鄰如己。」路10:27",
    "「請法老這樣做，委派官員治理這地，在七個豐年的期間，徵收埃及地出產的五分之一。」創41:34",
    "耶穌還在說話的時候，有人從會堂主管的家裏來，說：「你的女兒死了，何必還勞駕老師呢？」耶穌不理會他們所說的話，就對會堂主管說：「不要怕，只要信！」可5:35-36",
    "你們倒要愛仇敵，要善待他們，並要借給人不指望償還，你們的賞賜就很多了，你們必作至高者的兒子，因為他恩待那忘恩的和作惡的。路6:35",

    //simplified chinese
    "「上主实在当是我的天主。我立作石柱的这块石头，必要成为天主的住所；凡你赐与我的，我必给你奉献十分之一。」创28:21-22 ",
    "凡土地的出产，或是田地的谷物，或是树木的果实，十分之一应归于上主，是献于上主的圣物。肋27:30",
    "他答说：「你应当全心、全灵、全力、全意爱上主，你的天主；并爱近人如你自己。」路10:27",
    "「陛下应设法在地方上派定督办，在七个丰年内，征收埃及国所出产的五分之一；」创41:34",
    "他还说话的时候，有人从会堂长家里来，说：「你的女儿死了，你还来烦劳师傅做什么？」耶稣听见所说的话，就给会堂长说：「不要怕，只管信。」谷5:35-36",
    "但是，你们当爱你们的仇人，善待他们；借出，不要再有所希望：如此，你们的赏报必定丰厚，且要成为至高者的子女，因为他对待忘恩的和恶人，是仁慈的。路6:35",

    "「我就必以耶和华为我的神。我所立为柱子的这块石头必作神的殿；凡你所赐给我的，我必将十分之一献给你。」创28: 21-22",
    "地上所有的，无论是地上的种子，是树上的果子，十分之一是耶和华的，是归耶和华为圣的。利27:30",
    "他回答说：「你要尽心、尽性、尽力、尽意爱主—你的神，又要爱邻如己。」路10:27",
    "「请法老这样做，委派官员治理这地，在七个丰年的期间，征收埃及地出产的五分之一。」创41:34",
    "耶稣还在说话的时候，有人从会堂主管的家里来，说：「你的女儿死了，何必还劳驾老师呢？」耶稣不理会他们所说的话，就对会堂主管说：「不要怕，只要信！」可5:35-36",
    "你们倒要爱仇敌，要善待他们，并要借给人不指望偿还，你们的赏赐就很多了，你们必作至高者的儿子，因为他恩待那忘恩的和作恶的。路6:35 ",

    //english
    "'Yahweh shall be my God. This stone I have set up as a pillar is to be a house of God, and I shall faithfully pay you a tenth part of everything you give me.'Genesis28:21-22",
    "All tithes on land, levied on the produce of the soil or on the fruit of trees, belong to Yahweh; they are consecrated to Yahweh.Leviticus27:30",
    "He replied, 'You must love the Lord your God with all your heart, with all your soul, with all your strength, and with all your mind, and your neighbour as yourself.'Luke10:27",
    "'Pharaoh should take action and appoint supervisors for the country, and impose a tax of one-fifth on Egypt during the seven years of plenty.'Genesis41:34",
    "While he was still speaking some people arrived from the house of the president of the synagogue to say, 'Your daughter is dead; why put the Master to any further trouble?' But Jesus overheard what they said and he said to the president of the synagogue, 'Do not be afraid; only have faith.'Mark5:35-36",
    "Instead, love your enemies and do good to them, and lend without any hope of return. You will have a great reward, and you will be children of the Most High, for he himself is kind to the ungrateful and the wicked.Luke6:35",

    "I will take the Lord to be my God, And this stone which I have put up for a pillar will be God's house: and of all you give me, I will give a tenth part to you.Genesis28:21-22",
    "And every tenth part of the land, of the seed planted, or of the fruit of trees, is holy to the Lord.Leviticus27:30",
    "And he, answering, said, Have love for the Lord your God with all your heart and with all your soul and with all your strength and with all your mind; and for your neighbour as for yourself.Luke10:27",
    "'Let Pharaoh do this, and let him put overseers over the land of Egypt to put in store a fifth part of the produce of the land in the good years.'Genesis41:34",
    "And while he was still talking, they came from the ruler of the Synagogue's house, saying, Your daughter is dead: why are you still troubling the Master? But Jesus, giving no attention to their words, said to the ruler of the Synagogue, Have no fear, only have faith.Mark5:35-36",
    "But be loving to those who are against you and do them good, and give them your money, not giving up hope, and your reward will be great and you will be the sons of the Most High: for he is kind to evil men, and to those who have hard hearts.Luke6:35",

    //french
    "'Yahweh sera mon Dieu; cette pierre que j'ai dressée pour monument sera une maison de Dieu, et je vous paierai la dîme de tout ce que vous me donnerez.'Genèse28:21-22",
    "Toute dime de la terre, prélevée soit sur les semences de la terre, soit sur les fruits des arbres, appartient à Yahweh c'est une chose consacrée à Yahweh.Lévitique27:30",
    "Il répondit: 'Tu aimeras le Seigneur ton Dieu de tout coeur, de toute ton âme, de toute ta force et de tout ton esprit, et ton proche comme toi-même.'Luc10:27",
    "'Que Pharaon établisse en outre des intendants sur le pays, pour lever un cinquième des récoltes du pays d'Égypte pendant les sept années d'abondance.'Genèse41:34",
    "Il parlait encore, lorsqu'on vient de la maison du chef de synagogue dire : ' Ta fille est morte, pourquoi importuner davantage le Maître? ' Mais Jésus, ayant surpris la parole qui venait d'être prononcée, dit au chef de synagogue : ' Ne crains pas, crois seulement. 'Marc5:35-36",
    "Mais aimez vos ennemis, faites du bien et prêtez sans rien espérer en retour; et votre récompense sera grande, et vous serez les fils du Très-Haut, lui qui est bon pour les ingrats et les méchants.Luc6:35",

    "« Alors l'Eternel sera mon Dieu. Cette pierre dont j’ai fait un monument sera la maison de Dieu et je te donnerai la dîme de tout ce que tu me donneras. »Genèse28:21-22",
    "Toute dîme de la terre, soit des récoltes de la terre, soit du fruit des arbres, appartient à l'Eternel ; c'est une chose consacrée à l'Eternel.Lévitique27:30",
    "Il répondit : « Tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, de toute ta force et de toute ta pensée, et ton prochain comme toi-même. »Luc10:27",
    "« Que le pharaon établisse des commissaires sur le pays pour prélever un cinquième des récoltes de l'Egypte pendant les sept années d'abondance. »Genèse41:34",
    "Il parlait encore quand des gens arrivèrent de chez le chef de la synagogue et lui dirent : « Ta fille est morte. Pourquoi déranger encore le maître ? » Dès qu’il entendit cette parole, Jésus dit au chef de la synagogue : « N’aie pas peur, crois seulement. »Marc5:35-36",
    "Mais aimez vos ennemis, faites du bien et prêtez sans rien espérer en retour. Votre récompense sera grande et vous serez fils du Très-Haut, car il est bon pour les ingrats et pour les méchants.Luc6:35"
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
    [
      "使用方法：先按空格，再輸入數字或運算符號，按長空格可輸入或清除括號。",
      "使用方法：先按空格，再输入数字或运算符号，按长空格可输入或清除括号。",
      "How to use: Press the space first, then enter a number or an operator. Press the long space to enter or clear the parentheses.",
      "Comment utiliser: appuyez d'abord sur l'espace, puis entrez un nombre ou un opérateur. Appuyez sur l'espace long pour entrer ou effacer les parenthèses."
    ]
  ],
  applicationHintIndex: [0, 0, 0],
  topicIntroduction: [
    "請選擇不同的主題和類型，各主題和類型皆有不同的階段練習。",
    "请选择不同的主题和类型，各主题和类型皆有不同的阶段练习。",
    "Please choose different topics and types, each topic and type have different stages of practice.",
    "Veuillez choisir différents sujets et types, chaque sujet et type ont différentes étapes de pratique."
  ]

};

export default constants;
