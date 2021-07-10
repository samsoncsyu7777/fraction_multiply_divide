const constants = {
  stageText: ["階段", "阶段", "Stage", "Étape"],//a
  manual: ["自擬題目", "自拟题目", "Personal Task", "Tâche personnelle"],
  exam: ["應用題及模擬試卷", "应用题及模拟试卷", "Text Questions and Mock Exam", "Questions textuelles et examen simulé"],
  leaderboard: ["龍虎榜", "龙虎榜", "Leaderboard", "Classement"],
  topics: [
    "",
    "",
    "",
    ""
  ],

  wellDone: [//a
    "你做得到﹗你完成了這題分數計算﹗",
    "你做得到﹗你完成了这题分数计算﹗",
    "You can do it! You have completed this fraction calculation!",
    "Tu peux le faire! Vous avez terminé ce calcul de fraction!"
  ],

  totalScoreForUnit: [//a
    "單元總分", "单元总分", "Unit total score", "Score total de l'unité"
  ],
  uploadTotalScore: [//a
    "遞交單元總分", "递交单元总分", "Submit unit total score", "Soumettre le score total de l'unité"
  ],
  unitTitle: [//a
    ["分數乘法和除法", "分数乘法和除法", "Fraction Multiplication and Division", "Multiplication et Division de Fractions"],
    ["分數加法和減法", "分数加法和减法", "Fraction Addition and Subtraction", "Addition et Soustraction de Fractions"],
    ["分數四則混合計算", "分数四则混合计算", "Four Mixed Calculations for Fractions", "Quatre Calculs Mixtes pour les Fractions"],
    ["整數四則混合計算", "整数四则混合计算", "Four Mixed Calculations for Integers", "Quatre Calculs Mixtes pour les Nombres Entiers"]
  ],
  logoutText: ["登出", "登出", "Logout", "Logout"],//a
  sureText: ["確定?", "确定?", "Sure?", "Sûre?"],//a
  timeDelay: 200,
  typeHint: {
    MC: ["請按「A」、「B」、「C」或「D」。", "请按「A」、「B」、「C」或「D」。", 'Please press "A", "B", "C" or "D".', 'Veuillez appuyer sur "A", "B", "C" ou "D".'],
    fractionFormula: [
      "*計算法則是有括號的範圍比沒有括號的範圍先計算，然後先計算乘除法，再計算加減法。\n*計算分數乘除時，需把帶分數化為假分數，把除數化為乘數，並把各分子和各分母進行約簡。\n*計算分數加減時，需進行通分母，如果分子在減法中得到負數，需從整數進行退位。\n*如果計算結果得到一個假分數，把它化為帶分數。"
    ],
  }

};

export default constants;
