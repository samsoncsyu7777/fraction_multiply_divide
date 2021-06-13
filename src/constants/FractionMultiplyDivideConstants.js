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

  atLeastOneFraction: [
    "這兒需有最少一個分數。",
    "这儿需有最少一个分数。",
    "At least one fraction is required here.",
    "Au moins une fraction est requise ici."
  ],

  negativeResult: [
    "這算式的答案是負數。",
    "这算式的答案是负数。",
    "The answer to this formula is negative.",
    "La réponse à cette formule est négative."
  ],

  sameWholeNumbers: [
    "這兒整數部份應保持不變。",
    "这儿整数部份应保持不变。",
    "The integer part should remain unchanged here.",
    "La partie entière doit rester inchangée ici."
  ],

  newDenominatorBeCM: [
    "新分母應是上一行分母的公倍數。",
    "新分母应是上一行分母的公倍数。",
    "The new denominators should be the common multiple of the denominators of previous line.",
    "Les nouveaux dénominateurs devraient être le multiple commun des dénominateurs de la ligne précédente."
  ],

  sameDenominatorHint: [
    "這兒所有分數需有相同的分母。",
    "这儿所有分数需有相同的分母。",
    "All the fractions here should have the same denominators.",
    "Toutes les fractions ici devraient avoir les mêmes dénominateurs."
  ],

  multiplyWithSameInteger: [
    "擴分時，分子和分母應乘以相同的整數。",
    "扩分时，分子和分母应乘以相同的整数。",
    "When expanding, the numerator and denominator should be multiplied by the same integer.",
    "Lors de l'expansion, le numérateur et le dénominateur doivent être multipliés par le même entier."
  ],

  CMToLCMHint: [
    "這個新分母是上一行分母的公倍數，但這不是最小公倍數。",
    "这个新分母是上一行分母的公倍数，但这不是最小公倍数。",
    "This new denominator is the common multiple of the denominators of the previous line, but not the Least Common Multiple.",
    "Ce nouveau dénominateur est le multiple commun des dénominateurs de la ligne précédente, mais pas le multiple le moins commun."
  ],

  denominatorInvolvedBeLCM: [
    "從整數退位的數的分母應是所有分母的L.C.M.。",
    "从整数退位的数的分母应是所有分母的L.C.M.。",
    "The denominator of the number abdicated from an integer should be the L.C.M. of all denominators.",
    "Le dénominateur du nombre abdiqué d'un entier doit être le L.C.M. de tous les dénominateurs."
  ],

  wholeNotInvolvedKeepSame: [
    "不進行退位的整數應保持不變。",
    "不进行退位的整数应保持不变。",
    "The integer without abdication should remain unchanged.",
    "L'entier sans abdication doit rester inchangé."
  ],

  fractionNotInvolvedKeepSame: [
    "不進行退位的分數應保持不變。",
    "不进行退位的分数应保持不变。",
    "The fraction without abdication should remain unchanged.",
    "La fraction sans abdication devrait rester inchangée."
  ],

  abdicatedNumerator: [
    "新分子應是  原來分子+(整數退位×分母)。",
    "新分子应是原来分子+（整体退位×分母）。",
    "The new numerator should be the original numerator + (whole number abdicated × denominator).",
    "Le nouveau numérateur doit être le numérateur d'origine + (nombre entier abdiqué × dénominateur)."
  ],

  abdicateTooMuch: [
    "不需要從整數退位這麼多。",
    "不需要从整数退位这么多。",
    "There is no need to abdicate so much from the integer.",
    "Il n'est pas nécessaire d'abdiquer autant de l'entier."
  ],

  abdicateTooLittle: [
    "這兒需要從整數退位更多。",
    "这儿需要从整数退位更多。",
    "There needs to be more abdicated from the whole number.",
    "Il doit y avoir plus d'abdication du nombre entier."
  ],

  wholeWithoutFraction: [
    "這計算結果是一個整數，没有小數部份。",
    "这计算结果是一个整数，没有小数部份。",
    "This result is a whole number without a fraction part.",
    "Ce résultat est un nombre entier sans partie fractionnaire."
  ],

  numeratorAvoidNegative: [
    "重新排列分子的計算，以避免在計算過程中得到負數。",
    "重新排列分子的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of the numerators to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul des numérateurs pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ],

  incorrectNumerator: [
    "分子不正確，請按照運算符來計算新分子。",
    "分子不正确，请按照运算符来计算新分子。",
    "Incorrect numerator. Please follow the operators to calculate the new numerator.",
    "Numérateur incorrect. Veuillez suivre les opérateurs pour calculer le nouveau numérateur."
  ],

  wholeAvoidNegative: [
    "重新排列整數的計算，以避免在計算過程中得到負數。",
    "重新排列整数的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of the whole numbers to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul des nombres entiers pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ],

  incorrectCalculatedWhole: [
    "整數不正確，請按照運算符來計算新整數。",
    "整数不正确，请按照运算符来计算新整数。",
    "Incorrect whole number. Please follow the operators to calculate the new whole number.",
    "Nombre entier incorrect. Veuillez suivre les opérateurs pour calculer le nouveau nombre entier."
  ],

};

export default constants;
