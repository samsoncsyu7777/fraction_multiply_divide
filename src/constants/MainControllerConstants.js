const keepPercentHint = [
  "*這題目的答案是百分數，如果以1代表全部，請把1化為100%。",
  "*这题目的答案是百分数，如果以1代表全部，请把1化为100%。",
  "*The answer to this question is a percentage. If 1 represents all, please turn 1 into 100%.",
  "*La réponse à cette question est un pourcentage. Si 1 représente tout, veuillez transformer 1 en 100%."
];
const percentToDecimalHint = [
  "*先把所有百分數化為小數，即把百分數的數字乘以0.01。",
  "*先把所有百分数化为小数，即把百分数的数字乘以0.01。",
  "*First convert all percentages to decimals, that is, multiply the numbers of percentages by 0.01.",
  "*Convertissez d'abord tous les pourcentages en nombres décimaux, c'est-à-dire multipliez le nombre de pourcentages par 0,01."
];
const fractionToDecimalHint = [
  "*先把分數逐一化成小數。",
  "*先把分数逐一化成小数。",
  "*First convert the fractions to decimals one by one.",
  "*Convertissez d'abord les fractions en décimales une par une."
];
const decimalCalculationPrinciple = [
  "*計算小數加減法時，直式需對齊小數點。\n*計算小數乘法時，乘積的小數位是被乘數和乘數的小數位的總和。\n*計算小數除法時，需把被除數和除數同時擴大，直至除數是一個整數。",
  "*计算小数加减法时，直式需对齐小数点。\n*计算小数乘法时，乘积的小数位是被乘数和乘数的小数位的总和。\n*计算小数除法时，需把被除数和除数同时扩大，直至除数是一个整数。",
  "*When calculating decimal addition and subtraction, the vertical form needs to be aligned with the decimal point. \n*When calculating decimal multiplication, the decimal place of the product is the sum of the decimal places of the multiplicand and the multiplier. \n*When calculating the decimal division, the dividend and the divisor need to be expanded at the same time until the divisor is an integer.",
  "*Lors du calcul de l'addition et de la soustraction décimales, la forme verticale doit être alignée avec la virgule décimale. \n*Lors du calcul de la multiplication décimale, la décimale du produit est la somme des décimales du multiplicande et du multiplicateur. \n*Lors du calcul de la division décimale, le dividende et le diviseur doivent être développés en même temps jusqu'à ce que le diviseur soit un entier."
];
const decimalToFractionHint=[
  "*先把所有小數化為分數，並進行約簡。",
  "*先把所有小数化为分数，并进行约简。",
  "*First convert all decimals to fractions and reduce them.",
  "*Convertissez d'abord toutes les décimales en fractions et réduisez-les."
];
const textQuestionHint = [
  "列式應用題：先閱讀題目情境，然後填上列式，並計算答案。",
  "列式应用题：先阅读题目情境，然后填上列式，并计算答案。",
  "Word problems: read the scenario of the question, then fill in the formula and calculate the answer.",
  "Problèmes de mots : lisez le scénario de la question, puis remplissez la formule et calculez la réponse."
];
const fractionCalculationPrinciple = [
  "*計算分數乘除時，需把帶分數化為假分數，把除數化為乘數，並把各分子和各分母進行約簡。\n*計算分數加減時，需進行通分母，如果分子在減法中得到負數，需從整數進行退位。\n*如果計算結果得到一個假分數，把它化為帶分數。",
  "*计算分数乘除时，需把带分数化为假分数，把除数化为乘数，并把各分子和各分母进行约简。\n*计算分数加减时，需进行通分母，如果分子在减法中得到负数，需从整数进行退位。\n*如果计算结果得到一个假分数，把它化为带分数。",
  "*When calculating multiplication and division of fractions, it is necessary to convert mixed fractions into improper fractions, divisors into multipliers, and reduce each numerator with each denominator. \n*When calculating the addition and subtraction of fractions, it is necessary to expand the fractions to a common denominator. If the numerator is a negative number in the subtraction, it needs to be abdicated from the whole number. \n*If the result of the calculation is an improper fraction, turn it into a mixed fraction.",
  "*Lors du calcul de la multiplication et de la division de fractions, il est nécessaire de convertir les fractions mixtes en fractions impropres, les diviseurs en multiplicateurs et de réduire chaque numérateur avec chaque dénominateur. \n*Lors du calcul de l'addition et de la soustraction de fractions, il est nécessaire d'étendre les fractions à un dénominateur commun. Si le numérateur est un nombre négatif dans la soustraction, il doit être supprimé du nombre entier. \n*Si le résultat du calcul est une fraction impropre, transformez-la en fraction mixte."
];
const fractionApplicationHint = [
  "使用方法：先按空格，再輸入數字或運算符號，按長空格可輸入或清除括號。",
  "使用方法：先按空格，再输入数字或运算符号，按长空格可输入或清除括号。",
  "How to use: Press the space first, then enter a number or an operator. Press the long space to enter or clear the parentheses.",
  "Comment utiliser: appuyez d'abord sur l'espace, puis entrez un nombre ou un opérateur. Appuyez sur l'espace long pour entrer ou effacer les parenthèses."
];
const mixedCalculationPrinciple = [
  "*計算法則是有括號的範圍比沒有括號的範圍先計算，然後先計算乘除法，再計算加減法。",
  "*计算法则是有括号的范围比没有括号的范围先计算，然后先计算乘除法，再计算加减法。",
  "*The calculation rule is that the range with parentheses is calculated prior to the range without parentheses, and then the multiplication and division are calculated first before the addition and subtraction. ",//So now it is calculating the fraction ",
  "*La règle de calcul est que la plage avec parenthèses est calculée avant la plage sans parenthèses, puis la multiplication et la division sont calculées d'abord avant l'addition et la soustraction. "//Alors maintenant, il calcule la fraction "
];

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
    /*0*/["分數乘法和除法", "分数乘法和除法", "Fraction Multiplication and Division", "Multiplication et Division de Fractions"],
    /*1*/["分數加法和減法", "分数加法和减法", "Fraction Addition and Subtraction", "Addition et Soustraction de Fractions"],
    /*2*/["分數四則混合計算", "分数四则混合计算", "Four Mixed Calculations for Fractions", "Quatre Calculs Mixtes pour les Fractions"],
    /*3*/["整數加法和減法", "整数加法和减法", "Integer Addition and Subtraction", "Addition et Soustraction d'Entiers"],
    /*4*/["整數乘法和除法", "整数乘法和除法", "Integer Multiplication and Division", "Multiplication et Division d'Entiers"],
    /*5*/["整數四則混合計算", "整数四则混合计算", "Four Mixed Calculations for Integers", "Quatre Calculs Mixtes pour les Nombres Entiers"],
    /*6*/["小數加法和減法", "小数加法和减法", "Decimal Addition and Subtraction", "Addition et Soustraction Décimales"],
    /*7*/["小數乘法和除法", "小数乘法和除法", "Decimal Multiplication and Division", "Multiplication et Division Décimales"],
    /*8*/["小數四則混合計算", "小数四则混合计算", "Four Mixed Calculations for Decimals", "Quatre Calculs Mixtes pour les Décimales"],
    /*9*/["負數加法和減法", "负数加法和减法", "Negative Number Addition and Subtraction", "Addition et Soustraction de Nombres Négatifs"],
    /*10*/["負數乘法和除法", "负数乘法和除法", "Negative Number Multiplication and Division", "Multiplication et Division de Nombres Négatifs"],
    /*11*/["負數四則混合計算", "负数四则混合计算", "Four Mixed Calculations for Negative Numbers", "Quatre Calculs Mixtes pour les Nombres Négatifs"],
    /*12*/["分數和小數混合計算", "分数和小数混合计算", "Mixed Calculation of Fractions and Decimals", "Calcul Mixte de Fractions et de Décimales"],
    /*13*/["百分數和折扣", "百分数和折扣", "Percentages and Discounts", "Pourcentages et Remises"],

  ],
  logoutText: ["登出", "登出", "Logout", "Logout"],//a
  sureText: ["確定?", "确定?", "Sure?", "Sûre?"],//a
  timeDelay: 200,  
  typeHint: {
    MC: ["請按「A」、「B」、「C」或「D」。", "请按「A」、「B」、「C」或「D」。", 'Please press "A", "B", "C" or "D".', 'Veuillez appuyer sur "A", "B", "C" ou "D".'],
    fractionFormula: [
      fractionApplicationHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + fractionCalculationPrinciple[0],
      fractionApplicationHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + fractionCalculationPrinciple[1],
      fractionApplicationHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + fractionCalculationPrinciple[2],
      fractionApplicationHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + fractionCalculationPrinciple[3]
    ],
    fractionText: [
      textQuestionHint[0] + "\n" + fractionApplicationHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + fractionCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + fractionApplicationHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + fractionCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + fractionApplicationHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + fractionCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + fractionApplicationHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + fractionCalculationPrinciple[3]
    ],
    fractionDecimalFormula:[
      fractionApplicationHint[0] + "\n" + decimalToFractionHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + fractionCalculationPrinciple[0],
      fractionApplicationHint[1] + "\n" + decimalToFractionHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + fractionCalculationPrinciple[1],
      fractionApplicationHint[2] + "\n" + decimalToFractionHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + fractionCalculationPrinciple[2],
      fractionApplicationHint[3] + "\n" + decimalToFractionHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + fractionCalculationPrinciple[3]
    ],
    fractionDecimalText:[
      textQuestionHint[0] + "\n" + fractionApplicationHint[0] + "\n" + decimalToFractionHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + fractionCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + fractionApplicationHint[1] + "\n" + decimalToFractionHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + fractionCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + fractionApplicationHint[2] + "\n" + decimalToFractionHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + fractionCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + fractionApplicationHint[3] + "\n" + decimalToFractionHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + fractionCalculationPrinciple[3]
    ],
    integerText: [
      textQuestionHint[0] + "\n" + mixedCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + mixedCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + mixedCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + mixedCalculationPrinciple[3]
    ],
    integerFormula: [
      mixedCalculationPrinciple[0],
      mixedCalculationPrinciple[1],
      mixedCalculationPrinciple[2],
      mixedCalculationPrinciple[3]
    ],
    decimalText: [
      textQuestionHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    decimalFormula: [
      mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    decimalFractionText: [
      textQuestionHint[0] + "\n" + fractionToDecimalHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + fractionToDecimalHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + fractionToDecimalHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + fractionToDecimalHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    decimalFractionFormula: [
      fractionToDecimalHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      fractionToDecimalHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      fractionToDecimalHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      fractionToDecimalHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimal%.Text": [
      textQuestionHint[0] + "\n" + percentToDecimalHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + percentToDecimalHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + percentToDecimalHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + percentToDecimalHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimal%.Formula": [
      percentToDecimalHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      percentToDecimalHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      percentToDecimalHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      percentToDecimalHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimalFraction%.Text": [
      textQuestionHint[0] + "\n" + fractionToDecimalHint[0] + "\n" + percentToDecimalHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + fractionToDecimalHint[1] + "\n" + percentToDecimalHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + fractionToDecimalHint[2] + "\n" + percentToDecimalHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + fractionToDecimalHint[3] + "\n" + percentToDecimalHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimalFraction%.Formula": [
      fractionToDecimalHint[0] + "\n" + percentToDecimalHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      fractionToDecimalHint[1] + "\n" + percentToDecimalHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      fractionToDecimalHint[2] + "\n" + percentToDecimalHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      fractionToDecimalHint[3] + "\n" + percentToDecimalHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimal%%Text": [
      textQuestionHint[0] + "\n" + keepPercentHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + keepPercentHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + keepPercentHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + keepPercentHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimal%%Formula": [
      keepPercentHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      keepPercentHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      keepPercentHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      keepPercentHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimalFraction%%Text": [
      textQuestionHint[0] + "\n" + fractionToDecimalHint[0] + "\n" + keepPercentHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      textQuestionHint[1] + "\n" + fractionToDecimalHint[1] + "\n" + keepPercentHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      textQuestionHint[2] + "\n" + fractionToDecimalHint[2] + "\n" + keepPercentHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      textQuestionHint[3] + "\n" + fractionToDecimalHint[3] + "\n" + keepPercentHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "decimalFraction%%Formula": [
      fractionToDecimalHint[0] + "\n" + keepPercentHint[0] + "\n" + mixedCalculationPrinciple[0] + "\n" + decimalCalculationPrinciple[0],
      fractionToDecimalHint[1] + "\n" + keepPercentHint[1] + "\n" + mixedCalculationPrinciple[1] + "\n" + decimalCalculationPrinciple[1],
      fractionToDecimalHint[2] + "\n" + keepPercentHint[2] + "\n" + mixedCalculationPrinciple[2] + "\n" + decimalCalculationPrinciple[2],
      fractionToDecimalHint[3] + "\n" + keepPercentHint[3] + "\n" + mixedCalculationPrinciple[3] + "\n" + decimalCalculationPrinciple[3]
    ],
    "integerNegativeText": [
      "",
      "",
      "",
      ""
    ],
    "integerNegativeFormula": [
      "",
      "",
      "",
      ""
    ],
    "decimalNegativeText": [
      "",
      "",
      "",
      ""
    ],
    "decimalNegativeFormula": [
      "",
      "",
      "",
      ""
    ],
    "decimalFractionNegativeFormula": [
      "",
      "",
      "",
      ""
    ],
    "decimalFractionNegativeText": [
      "",
      "",
      "",
      ""
    ],
    "decimalShortText": [
      "",
      "",
      "",
      ""
    ],

  }

};
export default constants;

