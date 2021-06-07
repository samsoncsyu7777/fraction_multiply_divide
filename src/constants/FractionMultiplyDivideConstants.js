const constants = {
  stageText: ["階段", "阶段", "Stage", "Étape"],
  manual: ["自擬題目", "自拟题目", "Personal Task", "Tâche personnelle"],
  exam: ["應用題及模擬試卷", "应用题及模拟试卷", "Text Questions and Mock Exam", "Questions textuelles et examen simulé"],
  okButtonText: [
    "輸入", "約簡", "完成",
    "输入", "约简", "完成",
    "Enter", "Reduce?", "Completed",
    "Entrer", "Réduire?", "Terminé"
  ],

  topics: [
    "",
    "",
    "",
    ""
  ],

  wellDone: [
    "你做得到﹗你完成了這題分數計算﹗",
    "你做得到﹗你完成了这题分数计算﹗",
    "You can do it! You have completed this fraction calculation!",
    "Tu peux le faire! Vous avez terminé ce calcul de fraction!"
  ],

  noOperator: [
    "這兒少了運算符號。",
    "这儿少了运算符号。",
    "Operators are missing here.",
    "Les opérateurs manquent ici."
  ],

  noNumber: [
    "運算符號的前後需輸入分數或整數。",
    "运算符号的前后需输入分数或整数。",
    "There should be a whole number or an integer before and after an operator.",
    "Il doit y avoir un nombre entier ou un entier avant et après un opérateur."
  ],

  fractionHasBoth: [
    "一個分數需同時有分子和分母。",
    "一个分数需同时有分子和分母。",
    "A fraction should both a numerator and a denominator.",
    "Une fraction doit à la fois un numérateur et un dénominateur."
  ],

  noImproper: [
    "這兒有假分數，請輸入帶分數。",
    "这儿有假分数，请输入带分数。",
    "There are improper fractions, please enter a mixed number instead.",
    "Il y a des fractions incorrectes, veuillez saisir un nombre mixte à la place."
  ],

  oneFractionOnly: [
    "相乘後，應只得一個分數。",
    "相乘后，应只得一个分数。",
    "You should only get one fraction after multiplication.",
    "Vous ne devriez obtenir qu'une fraction après la multiplication."
  ],

  incorrectWhole: [
    "整數不正確，這應是分子除以分母得到的整數商。",
    "整数不正确，这应是分子除以分母得到的整数商。",
    "The whole number is incorrect. This should be the integer quotient obtained by dividing the numerator by the denominator.",
    "Le nombre entier est incorrect. Cela devrait être le quotient entier obtenu en divisant le numérateur par le dénominateur."
  ],

  wholeNoFraction: [
    "這是整數，沒有分數部份。",
    "这是整数，没有分数部份。",
    "This is a whole number, it has no fractional part.",
    "C'est un nombre entier, il n'a pas de partie fractionnaire."
  ],

  sameDenominator: [
    "分母應保持不變。",
    "分母应保持不变。",
    "The denominator should remain unchanged.",
    "Le dénominateur doit rester inchangé."
  ],

  numeratorFromImproper: [
    "分子不正確，這應是分子除以分母得到的餘數。",
    "分子不正确，这应是分子除以分母得到的余数。",
    "The numerator is incorrect. This should be the remainder obtained by dividing the numerator by the denominator.",
    "Le numérateur est incorrect. Il doit s'agir du reste obtenu en divisant le numérateur par le dénominateur."
  ],

  noMixed: [
    "在計算乘法或除法前，先將所有帶分數轉為假分數。",
    "在计算乘法或除法前，先将所有带分数转为假分数。",
    "All mixed fractions should be changed to improper fractions before multiplication or division.",
    "Toutes les fractions mélangées doivent être changées en fractions impropres avant la multiplication ou la division."
  ],

  sameNumberOfFractions: [
    "這算式應與上一行算式有相同數量的分數。",
    "这算式应与上一行算式有相同数量的分数。",
    "This calculation should have the same number of fractions as the previous calculation.",
    "Ce calcul doit avoir le même nombre de fractions que le calcul précédent."
  ],

  sameOperators: [
    "運算符號需保持不變。",
    "运算符号需保持不变。",
    "All operators should remain unchanged here.",
    "Tous les opérateurs devraient rester inchangés ici."
  ],

  wholeToNumerator: [
    "整數部份應轉為 分子=整數，分母=1。",
    "整数部份应转为 分子=整数，分母=1。",
    "A whole number should be changed to a fraction with numerator=whole number and denominator=1.",
    "Un nombre entier doit être changé en une fraction avec numérateur=nombre entier et dénominateur=1."
  ],

  mixedToNumerator: [
    "新分子應是 ( 整數×分母 + 分子 )。",
    "新分子应是 ( 整数×分母 + 分子 )。",
    "A new numerator should be ( whole number×denominator + numerator ).",
    "Un nouveau numérateur doit être (nombre entier × dénominateur + numérateur)."
  ],

  noDivision: [
    "所有除法需轉為乘法。",
    "所有除法需转为乘法。",
    "All divisions should be changed to multiplications.",
    "Toutes les divisions devraient être changées en multiplications."
  ],

  sameMultipliers: [
    "乘數和第一個分數需保持不變。",
    "乘数和第一个分数需保持不变。",
    "The multipliers and the first fraction should remain unchanged.",
    "Les multiplicateurs et la première fraction devraient rester inchangés."
  ],

  divisorsUpDown: [
    "需把所有除數上下倒轉。",
    "需把所有除数上下倒转。",
    "All divisors should be turned upside down.",
    "Tous les diviseurs doivent être inversés."
  ],

  simplifyIt: [
    "這不是最簡分數，請把它約簡。",
    "这不是最简分数，请把它约简。",
    "It is not an irreducible fraction. Please reduce it.",
    "Ce n'est pas une fraction irréductible. Veuillez la réduire."
  ],

  productOfFractions: [
    "這分子應是上一行分子相乘的積，而分母也是上一行分母相乘的積。",
    "这分子应是上一行分子相乘的积，而分母也是上一行分母相乘的积。",
    "This numerator should be the product of the above numerators and this denominator should be the product of the above denominators too.",
    "Ce numérateur doit être le produit des numérateurs ci-dessus et ce dénominateur doit également être le produit des dénominateurs ci-dessus."
  ],

  beAFactorOfNumerator: [
    "在約簡的過程中，新分子應是原本分子的因數。",
    "在约简的过程中，新分子应是原本分子的因数。",
    "The new numerator should be a factor of the original numerator in the process of reduction.",
    "Le nouveau numérateur doit être un facteur du numérateur d'origine dans le processus de réduction."
  ],

  beAFactorOfDenominator: [
    "在約簡的過程中，新分母應是原本分母的因數。",
    "在约简的过程中，新分母应是原本分母的因数。",
    "The new denominator should be a factor of the original denominator in the process of reduction.",
    "Le nouveau dénominateur devrait être un facteur du dénominateur d'origine dans le processus de réduction."
  ],

  sameFactorInReduction: [
    "約簡不正確，分子和分母需以相同的因數進行約簡。",
    "约简不正确，分子和分母需以相同的因数进行约简。",
    "The reduction is incorrect. The numerator and denominator must be reduced by the same factor.",
    "La réduction est incorrecte. Le numérateur et le dénominateur doivent être réduits du même facteur."
  ],

  furtherReduceFactorLeft: [
    "這算式還能以",
    "这算式还能以",
    "This calculation can be further reduced by ",
    "Ce calcul peut être encore réduit par "
  ],

  furtherReduceFactorRight: [
    "進行約簡",
    "进行约简",
    ".",
    "."
  ],

  noMixedBeforeReduction: [
    "在進行約簡前，先把所有帶分數轉為假分數。",
    "在进行约简前，先把所有带分数转为假分数。",
    "All mixed fractions should be changed to improper fractions before reduction.",
    "Toutes les fractions mélangées doivent être remplacées par des fractions impropres avant réduction."
  ],

  noDivisionBeforeReduction: [
    "在進行約簡前，先把所有除法轉為乘法。",
    "在进行约简前，先把所有除法转为乘法。",
    "All divisions should be changed to multiplications before reduction.",
    "Toutes les divisions devraient être changées en multiplications avant réduction."
  ],
};

export default constants;
