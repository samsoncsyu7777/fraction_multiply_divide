const constants = {
  stageText: ["階段", "阶段", "Stage", "Étape"],
  manual: ["自擬題目", "自拟题目", "Personal Task", "Tâche personnelle"],
  exam: ["應用題及模擬試卷", "应用题及模拟试卷", "Text Questions and Mock Exam", "Questions textuelles et examen simulé"],
  leaderboard: ["龍虎榜", "龙虎榜", "Leaderboard", "Classement"],
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
    "除第一個數外，在分數或整數前都需有運算符號。",
    "除第一个数外，在分数或整数前都需有运算符号。",
    "Except for the first number, there must be an operator before each fraction and integer.",
    "À l'exception du premier nombre, il doit y avoir un opérateur avant chaque fraction et nombre entier."
  ],

  singleNumber: [
    "算式不完整，需要最少2個數和1個運算符號。",
    "算式不完整，需要最少2个数和1个运算符号。",
    "The calculation is incomplete, and requires at least 2 numbers and 1 operator.",
    "Le calcul est incomplet et nécessite au moins 2 nombres et 1 opérateur."
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
    "不要在題目中輸入假分數，這兒請輸入帶分數。",
    "不要在题目中输入假分数，这儿请输入带分数。",
    "Do not enter improper fractions in the question, please enter mixed fractions instead.",
    "N'entrez pas de fractions impropres dans la question, veuillez plutôt saisir des fractions mixtes."
  ],

  noImproperAfterA_S: [
    "計算上一步得到的是一個假分數，請把它化成帶分數。",
    "计算上一步得到的是一个假分数，请把它化成带分数。",
    "The calculation obtained in the previous step is an improper fraction, please turn it into a mixed fraction.",
    "Le calcul obtenu à l'étape précédente est une fraction impropre, veuillez le transformer en fraction mixte."
  ],

  improperToMix: [
    "化假分數為帶分數或整數",
    "化假分数为带分数或整数",
    "the conversion of the improper fraction to a mixed fraction or an integer ",
    "la conversion de la fraction impropre en une fraction mixte ou un entier"
  ],

  oneFractionOnly: [
    "這個乘法步驟，應只得到一個分數。未計算的分數則保持不變。如果這是最後一個計算步驟，則只得這個分數。",
    "这个乘法步骤，应只得到一个分数。未计算的分数则保持不变。如果这是最后一个计算步骤，则只得这个分数。",
    "In this multiplication step, only one fraction should be obtained. Uncalculated fractions should remain unchanged. If this is the last calculation step, there is only one fraction.",
    "Dans cette étape de multiplication, une seule fraction doit être obtenue. Les fractions non calculées doivent rester inchangées. S'il s'agit de la dernière étape de calcul, il n'y a qu'une fraction."
  ],

  incorrectWhole: [
    "整數不正確，這應是分子除以分母得到的整數商+原有整數(如果有)。若果這數原是一個整數或帶分數，則保持不變。",
    "整数不正确，这应是分子除以分母得到的整数商+原有整数(如果有)。若果这数原是一个整数或带分数，则保持不变。",
    "The whole number is incorrect. This should be the integer quotient obtained by dividing the numerator by the denominator + the original whole number (if any). If the number was originally an integer or a mixed fraction, there is no need to change it.",
    "Le nombre entier est incorrect. Cela devrait être le quotient entier obtenu en divisant le numérateur par le dénominateur + le nombre entier d'origine (le cas échéant). Si le nombre était à l'origine un nombre entier ou une fraction mixte, il n'est pas nécessaire de le modifier."
  ],

  wholeNoFraction: [
    "應從上一步的假分數中，以分子除以分母，並以商作為整數部份，當除法沒有餘數時，這一步的結果就沒有分數部份。",
    "应从上一步的假分数中，以分子除以分母，并以商作为整数部份，当除法没有余数时，这一步的结果就没有分数部份。",
    "From the improper fraction in the previous step, divide the numerator by the denominator, and use the quotient as the whole number part. When the division has no remainder, the result of this step has no fractional part.",
    "À partir de la fraction impropre de l'étape précédente, divisez le numérateur par le dénominateur et utilisez le quotient comme partie entière. Lorsque la division n'a pas de reste, le résultat de cette étape n'a pas de partie fractionnaire."
  ],

  sameDenominator: [
    "在這步計算中，分母應保持不變。",
    "在这步计算中，分母应保持不变。",
    "In this step of calculation, the denominator should remain unchanged.",
    "Dans cette étape de calcul, le dénominateur doit rester inchangé."
  ],

  sameDenominatorInNoMixFract: [
    "把帶分數化成假分數時，分母應保持不變。",
    "把带分数化成假分数时，分母应保持不变。",
    "When turning mixed fractions into improper fractions, the denominator should remain unchanged.",
    "Lors de la transformation de fractions mixtes en fractions impropres, le dénominateur doit rester inchangé."
  ],

  noMixedIssue: [
    "化帶分數或整數為假分數",
    "化带分数或整数为假分数",
    "the conversion of mixed fractions or integers into improper fractions ",
    "la conversion de fractions mixtes ou d'entiers en fractions impropres "
  ],

  sameDenominatorInNoImproper: [
    "把假分數化為帶分數時，分母應保持不變。",
    "把假分数化为带分数时，分母应保持不变。",
    "When turning an improper fraction into a mixed fraction, the denominator should remain unchanged.",
    "Lors de la transformation d'une fraction impropre en fraction mixte, le dénominateur doit rester inchangé."
  ],

  sameDenominatorInAddToOne: [
    "在計算同分母分數加減中，分母應保持不變。",
    "在计算同分母分数加减中，分母应保持不变。",
    "In calculating the addition and subtraction of fractions with the same denominator, the denominator should remain unchanged.",
    "En calculant l'addition et la soustraction de fractions ayant le même dénominateur, le dénominateur doit rester inchangé."
  ],

  addToOne: [
    "同分母分數加減",
    "同分母分数加减",
    "the addition and subtraction of fractions with the same denominator ",
    "l'addition et la soustraction de fractions ayant le même dénominateur "
  ],

  numeratorFromImproper: [
    "這步計算的分子不正確，若是假分數，這分子應是原來分子除以分母得到的餘數。若原是真分數，則應保持不變。",
    "这步计算的分子不正确，若是假分数，这分子应是原来分子除以分母得到的余数。若原是真分数，则应保持不变。",
    "The numerator calculated in this step is incorrect. If it was an improper fraction, this numerator should be the remainder obtained by dividing the original numerator by the denominator. If the original one is a proper fraction, it should remain unchanged.",
    "Le numérateur calculé à cette étape est incorrect. S'il s'agissait d'une fraction impropre, ce numérateur devrait être le reste obtenu en divisant le numérateur original par le dénominateur. Si l'original est une fraction appropriée, il devrait rester inchangé."
  ],

  noMixed: [
    "在計算乘法或除法前，先將所有帶分數轉為假分數。",
    "在计算乘法或除法前，先将所有带分数转为假分数。",
    "All mixed fractions should be changed to improper fractions before multiplication or division.",
    "Toutes les fractions mélangées doivent être changées en fractions impropres avant la multiplication ou la division."
  ],

  sameNumberOfFractions1: [
    "現正在分數", "现正在分数", "For fraction ", "Pour la fraction "
  ],

  sameNumberOfFractions2: [
    "至分數", "至分数", " to fraction ", " à la fraction "
  ],

  sameNumberOfFractions3: [
    "進行", "进行", ", ", ", "
  ],

  sameNumberOfFractions4: [
    "，", "，", "is in progress. ", "sont en cours. "
  ],

  sameNumberOfFractions5: [
    "其他分數和運算符號需保持不變，",//所以這算式應與上一行算式有相同數量的分數。如果這是最後一個計算步驟，則沒有其他分數。",
    "其他分数和运算符号需保持不变，",//所以这算式应与上一行算式有相同数量的分数。如果这是最后一个计算步骤，则没有其他分数。",
    "Other fractions and operators need to remain unchanged, ",//so this calculation should have the same number of fractions as the previous calculation. If this is the last calculation step, there is no other fraction.",
    "Les autres fractions et opérateurs doivent rester inchangés, ",//donc ce calcul doit avoir le même nombre de fractions que le calcul précédent. S'il s'agit de la dernière étape de calcul, il n'y a pas d'autre fraction."
  ],

  sameNumberOfFractions6Left: [
    "所以左方的分數和運算符號需保持不變。",
    "所以左方的分数和运算符号需保持不变。",
    "so the fractions and operators on the left should remain unchanged. ",
    "donc les fractions et les opérateurs sur la gauche doivent rester inchangés. "
  ],

  sameNumberOfFractions6Right: [
    "所以右方的分數和運算符號需保持不變。",
    "所以右方的分数和运算符号需保持不变。",
    "so the fractions and operators on the right should remain unchanged. ",
    "donc les fractions et les opérateurs à droite doivent rester inchangés. "
  ],

  sameNumberOfFractions6LeftRight: [
    "所以左右兩邊的分數和運算符號需保持不變。",
    "所以左右两边的分数和运算符号需保持不变。",
    "so the fractions and operators on the left and right should remain unchanged. ",
    "donc les fractions et les opérateurs à gauche et à droite doivent rester inchangés. "
  ],

  sameNumberOfFractions6None: [
    "而上一步並沒有其他分數或運算符號。",
    "而上一步并没有其他分数或运算符号。",
    "however, there are no other fractions or operators in the previous step. ",
    "cependant, il n'y a pas d'autres fractions ou opérateurs dans l'étape précédente. "
  ],

  sameOperators: [
    "在這步計算中，運算符號需保持不變。",
    "在这步计算中，运算符号需保持不变。",
    "In this step of calculation, the operators should remain unchanged.",
    "Dans cette étape de calcul, les opérateurs doivent rester inchangés."
  ],

  sameOperatorsInNoMixFract: [
    "把帶分數化為假分數時，運算符號需保持不變。",
    "把带分数化为假分数时，运算符号需保持不变。",
    "When turning mixed fractions into improper fractions, the operators should remain unchanged.",
    "Lors de la transformation de fractions mixtes en fractions impropres, les opérateurs doivent rester inchangés."
  ],

  sameOperatorsInNoVarDenom: [
    "在這通分母的步驟中，運算符號需保持不變。",
    "在这通分母的步骤中，运算符号需保持不变。",
    "In the step of expansion of fractions to a common denominator, the operators should remain unchanged.",
    "Dans l'étape d'expansion des fractions à un dénominateur commun, les opérateurs doivent rester inchangés."
  ],

  noVarDenom: [
    "通分母",
    "通分母",
    "the expansion of fractions to a common denominator ",
    "l'expansion des fractions à un dénominateur commun "
  ],
  
  sameOperatorsInNoNegNum: [
    "在這退位的步驟中，運算符號需保持不變。",
    "在这退位的步骤中，运算符号需保持不变。",
    "In the step of abdication, the operators should remain unchanged.",
    "Dans la démarche d'abdication, les opérateurs devraient rester inchangés."
  ],

  noNegNum: [
    "從整數退位至分數",
    "从整数退位至分数",
    "the abdication from whole number to fraction ",
    "l'abdication du nombre entier à la fraction "
  ],

  wholeToNumerator: [
    "在計算分數乘除前，要先把整數轉為假分數，即是分子=整數，分母=1。",
    "在计算分数乘除前，要先把整数转为假分数，即是分子=整数，分母=1。",
    "Before calculating the multiplication and division of  fractions, you must first convert the whole number to an improper fraction, that is, the numerator=integer and the denominator=1.",
    "Avant de calculer la multiplication et la division de fractions, vous devez d'abord convertir le nombre entier en une fraction impropre, c'est-à-dire le numérateur=entier et le dénominateur=1."
  ],

  mixedToNumerator: [
    "若是帶分數，化成假數後的分子應是 ( 整數×分母 + 分子 )。若是真分數，則保持不變。",
    "若是带分数，化成假数后的分子应是 ( 整数×分母 + 分子 )。若是真分数，则保持不变。",
    "If it is a mixed fraction, the numerator of the improper fraction should be (integer × denominator + numerator). If it is a proper fraction, it remains unchanged.",
    "S'il s'agit d'une fraction mixte, le numérateur de la fraction impropre doit être (entier × dénominateur + numérateur). Si c'est une fraction propre, elle reste inchangée."
  ],

  noDivision: [
    "在計算分數乘除的部份前，要先把所有相關的除法轉為乘法。",
    "在计算分数乘除的部份前，要先把所有相关的除法转为乘法。",
    "Before calculating the fraction multiplication and division, all relevant divisions must be converted to multiplications.",
    "Avant de calculer la multiplication et la division des fractions, toutes les divisions pertinentes doivent être converties en multiplications."
  ],

  noDivisionIssue: [
    "把除法轉為乘法",
    "把除法转为乘法",
    "the conversion of division to multiplication ",
    "la conversion de la division en multiplication "
  ],

  noMultipleIssue: [
    "分數乘法",
    "分数乘法",
    "the multiplication of fractions ",
    "la multiplication des fractions "
  ],

  sameMultipliers: [
    "在分數乘除的部份中，第一個分數和乘數需保持不變，只有除數需上下倒轉。",
    "在分数乘除的部份中，第一个分数和乘数需保持不变，只有除数需上下倒转。",
    "In the part of fraction multiplication and division, the first fraction and the multipliers must remain unchanged, and only the divisors must be turned upside down.",
    "Dans la partie multiplication et division des fractions, la première fraction et les multiplicateurs doivent rester inchangés, et seuls les diviseurs doivent être inversés."
  ],

  divisorsUpDown: [
    "在分數乘除的部份中，需把所有除數，即÷後的分數上下倒轉。",
    "在分数乘除的部份中，需把所有除数，即÷后的分数上下倒转。",
    "In the fraction multiplication and division part, all divisors, that are, the fractions after ÷, must be reversed up and down.",
    "Dans la partie multiplication et division des fractions, tous les diviseurs, c'est-à-dire les fractions après , doivent être inversés de haut en bas."
  ],

  simplifyIt: [
    "這步計算得到的分數，當中的分子和分母有相同的因數，請把它們約簡。",
    "这步计算得到的分数，当中的分子和分母有相同的因数，请把它们约简。",
    "In the fraction(s) calculated in this step, the numerator(s) and denominator(s) have the same factor(s). Please reduce them.",
    "Dans la ou les fractions calculées à cette étape, le(s) numérateur(s) et dénominateur(s) ont le(s) même(s) facteur(s). Merci de les réduire."
  ],

  productOfFractions: [
    "這步分數乘法所得到的分數，分子應是上一步分子相乘的積，而分母則是上一步分母相乘的積。",
    "这步分数乘法所得到的分数，分子应是上一步分子相乘的积，而分母则是上一步分母相乘的积。",
    "The numerator of the fraction obtained by this step of fraction multiplication should be the product of the previous step's numerators, and the denominator should be the product of the previous step's denominators.",
    "Le numérateur de la fraction obtenue par cette étape de multiplication fractionnaire doit être le produit des numérateurs de l'étape précédente et le dénominateur doit être le produit des dénominateurs de l'étape précédente."
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
    "這步計算還能以",
    "这步计算还能以",
    "This step of calculation can also be reduced by ",
    "Ce pas de calcul peut également être réduit de "
  ],

  furtherReduceFactorRight: [
    "進行約簡",
    "进行约简",
    ".",
    "."
  ],

  noMixedBeforeReduction: [
    "在進行約簡前，先把這計算步驟的帶分數轉為假分數。",
    "在进行约简前，先把这计算步骤的带分数转为假分数。",
    "Before performing the reduction, first convert the mixed fractions of this calculation step into an improper fractions.",
    "Avant d'effectuer la réduction, convertissez d'abord les fractions mixtes de cette étape de calcul en fractions impropres."
  ],

  noDivisionBeforeReduction: [
    "在進行約簡前，先把這計算步驟中的除法轉為乘法。",
    "在进行约简前，先把这计算步骤中的除法转为乘法。",
    "Before performing reduction, first convert the division in this calculation step to multiplication.",
    "Avant d'effectuer la réduction, convertissez d'abord la division de cette étape de calcul en multiplication."
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

  sameWholeNumbersInNoVarDenom: [
    "在這通分母的步驟中，整數部份應保持不變。",
    "在这通分母的步骤中，整数部份应保持不变。",
    "In the step of expansion of fractions to a common denominator, the integer part should remain unchanged.",
    "Dans l'étape d'expansion des fractions à un dénominateur commun, la partie entière doit rester inchangée."
  ],

  onlyWholeNumbers: [
    "需在通分母後才可進行退位，即由整數部份退至分數部份，所以現在上一步的整數需保持不變。",
    "需在通分母后才可进行退位，即由整数部份退至分数部份，所以现在上一步的整数需保持不变。",
    "The abdication from whole number to fraction can only be performed after expansion of fractions to a common denominator, so the integer in the previous step must remain unchanged.",
    "L'abdication du nombre entier à la fraction ne peut être effectuée qu'après expansion des fractions vers un dénominateur commun, de sorte que l'entier de l'étape précédente doit rester inchangé."
  ],

  newDenominatorBeCM: [
    "這計算步驟需通分母，即分母是上一步相關分數的分母的最小公倍數。",
    "这计算步骤需通分母，即分母是上一步相关分数的分母的最小公倍数。",
    "This calculation step needs to have a common denominator, that is, the denominator is the least common multiple of the related denominators of the previous step.",
    "Cette étape de calcul doit avoir un dénominateur commun, c'est-à-dire que le dénominateur est le plus petit multiple commun des dénominateurs associés de l'étape précédente."
  ],

  sameDenominatorHint: [
    "在進行分數加減前，相關的分數需有相同的分母。",
    "在进行分数加减前，相关的分数需有相同的分母。",
    "Before adding or subtracting fractions, related fractions must have a common denominator.",
    "Avant d'ajouter ou de soustraire des fractions, les fractions apparentées doivent avoir un dénominateur commun."
  ],

  multiplyWithSameInteger: [
    "擴分時，分子和分母應乘以相同的整數。",
    "扩分时，分子和分母应乘以相同的整数。",
    "When expanding, the numerator and denominator should be multiplied by the same integer.",
    "Lors de l'expansion, le numérateur et le dénominateur doivent être multipliés par le même entier."
  ],

  CMToLCMHint: [
    "欣賞你能在這步計算中求得上一步分母的公倍數作為分母，但這不是最小公倍數，試找一個更小的公倍數。",
    "欣赏你能在这步计算中求得上一步分母的公倍数作为分母，但这不是最小公倍数，试找一个更小的公倍数。",
    "Appreciate that you can find the common multiple of the previous denominators as the denominator in this step, but this is not the least common multiple. Try to find a smaller common multiple.",
    "Sachez que vous pouvez trouver le multiple commun des dénominateurs précédents comme dénominateur dans cette étape, mais ce n'est pas le plus petit multiple commun. Essayez de trouver un multiple commun plus petit."
  ],

  denominatorInvolvedBeLCM: [
    "這步計算需從整數退位做出一個分子較大的假分數，而其分母應是相關分數的分母的L.C.M.。",
    "这步计算需从整数退位做出一个分子较大的假分数，而其分母应是相关分数的分母的L.C.M.。",
    "In this step of calculation, an improper fraction with a larger numerator must be abdicated from the whole number, and its denominator should be the L.C.M. of the denominators of the relevant fractions.",
    "Dans cette étape de calcul, une fraction impropre avec un numérateur plus grand doit être abdiqué du nombre entier, et son dénominateur doit être le L.C.M. des dénominateurs des fractions concernées."
  ],

  wholeNotInvolvedKeepSame: [
    "不需進行退位的整數應保持不變。",
    "不需进行退位的整数应保持不变。",
    "Integers that do not need to be abdicated should remain unchanged.",
    "Les nombres entiers qui n'ont pas besoin d'être abdiqués doivent rester inchangés."
  ],

  fractionNotInvolvedKeepSame: [
    "不進行退位的分數應保持不變。",
    "不进行退位的分数应保持不变。",
    "The fraction without abdication should remain unchanged.",
    "La fraction sans abdication devrait rester inchangée."
  ],

  abdicatedNumerator: [
    "新分子應是  原來分子+(整數退位×分母)。",
    "新分子应是  原来分子+(整体退位×分母)。",
    "The new numerator should be   the original numerator + (whole number abdicated × denominator).",
    "Le nouveau numérateur doit être le numérateur d'origine + (nombre entier abdiqué × dénominateur)."
  ],

  abdicateTooMuch: [
    "這兒分數加減得到的分子大於分母，所以不需要從整數退位這麼多。",
    "这儿分数加减得到的分子大于分母，所以不需要从整数退位这么多。",
    "The numerator obtained by adding and subtracting fractions is greater than the denominator, so there is no need to abdicate so much from the whole number.",
    "Le numérateur obtenu en additionnant et en soustrayant des fractions est supérieur au dénominateur, il n'est donc pas nécessaire d'abdiquer autant du nombre entier."
  ],

  abdicateTooLittle: [
    "這兒分數加減得到的分子小於0，所以這兒需要從整數退位更多。",
    "这儿分数加减得到的分子小于0，所以这儿需要从整数退位更多。",
    "The numerator obtained by adding and subtracting fractions is less than 0, so here the fraction needs to abdicate more from the whole number.",
    "Le numérateur obtenu en ajoutant et en soustrayant des fractions est inférieur à 0, donc ici la fraction doit abdiquer davantage du nombre entier."
  ],

  wholeWithoutFraction: [
    "這步分數加減的計算應得到一個整數，並没有分數部份。",
    "这步分数加减的计算应得到一个整数，并没有分数部份。",
    "The calculation of the addition and subtraction of this step should get an integer, and there is no fractional part.",
    "Le calcul de l'addition et de la soustraction de cette étape doit obtenir un nombre entier, et il n'y a pas de partie fractionnaire."
  ],

  numeratorAvoidNegative: [
    "重新排列分子加減的計算，以避免在計算過程中得到負數。",
    "重新排列分子加减的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of addition and subtraction of numerators to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul de l'addition et de la soustraction de numérateurs pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ],

  incorrectNumerator: [
    "這步計算得到的分子不正確，請按照運算符來計算分子。",
    "这步计算得到的分子不正确，请按照运算符来计算分子。",
    "The numerator calculated in this step is incorrect. Please calculate the numerator according to the operator(s).",
    "Le numérateur calculé à cette étape est incorrect. Veuillez calculer le numérateur en fonction du ou des opérateurs."
  ],

  wholeAvoidNegative: [
    "重新排列整數加減的計算，以避免在計算過程中得到負數。",
    "重新排列整数加减的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of addition and subtraction of the whole numbers to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul de l'addition et de la soustraction des nombres entiers pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ],

  incorrectCalculatedWhole: [
    "這步計算得到的整數不正確，請按照運算符來計算新整數。",
    "这步计算得到的整数不正确，请按照运算符来计算新整数。",
    "The integer calculated in this step is incorrect. Please calculate the new integer according to the operator(s).",
    "L'entier calculé à cette étape est incorrect. Veuillez calculer le nouvel entier en fonction du ou des opérateurs."
  ],
  parentheses: [
    /*"小心括號的數量和位置。*/"括號使用法則：當第一組括號的計算得到一個數時，這組括號即被移除，而其他括號則保持不變。",
    /*"小心括号的数量和位置。*/"括号使用法则：当第一组括号的计算得到一个数时，这组括号即被移除，而其他括号则保持不变。",
    /*"Be careful with the number and position of parentheses. */"Parentheses usage rule: when the first group of parentheses are calculated to get a number, this group of parentheses are removed, and the other parentheses remain unchanged.",
    /*"Attention au nombre et à la position des parenthèses. */"Règle d'utilisation des parenthèses : lorsque le premier groupe de parenthèses est calculé pour obtenir un nombre, ce groupe de parenthèses est supprimé et les autres parenthèses restent inchangées."
  ],
  parenthesesExtra: [
    "有多餘括號。",
    "有多余括号。",
    "There are extra parentheses. ",
    "Il y a des parenthèses supplémentaires. "
  ],
  parenthesesLack: [
    "有括號欠缺。",
    "有括号欠缺。",
    "There are missing parentheses. ",
    "Il manque des parenthèses. "
  ],
  parenthesesPosition: [
    "有括號位置不正確。",
    "有括号位置不正确。",
    "There are incorrect positions in parentheses. ",
    "Il y a des positions incorrectes entre parenthèses. "
  ],
  decreaseMessage: [
    "這個步驟應算出一個分數。",//"上一步的計算得到一個分數。這一步計算範圍的左方和右方的所有分數和運算符號都需保持不變。如果這是最後一個計算步驟，則只得這個分數。",
    "这个步骤应算出一个分数。",//"上一步的计算得到一个分数。这一步计算范围的左方和右方的所有分数和运算符号都需保持不变。如果这是最后一个计算步骤，则只得这个分数。",
    "This calculation step should obtain a fraction. ",//, and all the fractions and operators on the left and right sides of the calculation area in this step must remain unchanged. If this is the last calculation step, there is only one fraction.",
    "Cette étape de calcul doit obtenir une fraction. "//, et toutes les fractions et opérateurs sur les côtés gauche et droit de la zone de calcul dans cette étape doivent rester inchangés. S'il s'agit de la dernière étape de calcul, il n'y a qu'une fraction."
  ],
  operatorBeforeStep: [
    "這一步計算範圍的左方有一個運算符號，並不包含在這步計算中，所以需保持不變。",
    "这一步计算范围的左方有一个运算符号，并不包含在这步计算中，所以需保持不变。",
    "There is an operator on the left side of the calculation area of this step, which is not included in the calculation of this step, so it needs to remain unchanged.",
    "Il y a un opérateur sur le côté gauche de la zone de calcul de cette étape, qui n'est pas inclus dans le calcul de cette étape, il doit donc rester inchangé."
  ],
  keepOthers1: [
    "計算法則是有括號的範圍比沒有括號的範圍先計算，然後先計算乘除法，再計算加減法。",//，所以現在正計算分數",
    "计算法则是有括号的范围比没有括号的范围先计算，然后先计算乘除法，再计算加减法。",//，所以现在正计算分数",
    "The calculation rule is that the range with parentheses is calculated prior to the range without parentheses, and then the multiplication and division are calculated first before the addition and subtraction. ",//So now it is calculating the fraction ",
    "La règle de calcul est que la plage avec parenthèses est calculée avant la plage sans parenthèses, puis la multiplication et la division sont calculées d'abord avant l'addition et la soustraction. "//Alors maintenant, il calcule la fraction "
  ],
  keepOthers2: [
    "至分數",
    "至分数",
    " to the fraction ",
    " à la fraction "
  ],
  keepOthers3: [
    "。這一步計算範圍的左方和右方的所有分數和運算符號都需保持不變。如果這是最後一個計算步驟，則沒有其他分數。",
    "。这一步计算范围的左方和右方的所有分数和运算符号都需保持不变。如果这是最后一个计算步骤，则没有其他分数。",
    ". In this step, all the fractions and operators on the left and right of the calculation area must remain unchanged. If this is the last calculation step, there is no other fraction.",
    ". Dans cette étape, toutes les fractions et opérateurs à gauche et à droite de la zone de calcul doivent rester inchangés. S'il s'agit de la dernière étape de calcul, il n'y a pas d'autre fraction."
  ],
  noIntegerAfterMulti: [
    "這一步要得到分數相乘的結果，即分子是上一步相關分子相乘的積，分母也是上一步相關分母相乘的積，所以這個分數沒有整數部份。",
    "这一步要得到分数相乘的结果，即分子是上一步相关分子相乘的积，分母也是上一步相关分母相乘的积，所以这个分数没有整数部份。",
    "In this step, the result of the multiplication of the fractions is obtained, that is, the numerator is the product of the related numerators of the previous step, and the denominator is also the product of the related denominators of the previous step. So, this fraction has no whole number.",
    "Dans cette étape, le résultat de la multiplication des fractions est obtenu, c'est-à-dire que le numérateur est le produit des numérateurs liés de l'étape précédente, et le dénominateur est également le produit des dénominateurs liés de l'étape précédente. Donc, cette fraction n'a pas de nombre entier."
  ],
  oddBrackets: [
    "當算式有左括號時，也要有右括號。",
    "当算式有左括号时，也要有右括号。",
    "When the formula has a left parenthesis, there must also be a right parenthesis.",
    "Lorsque la formule a une parenthèse gauche, il doit également y avoir une parenthèse droite."
  ],
  totalScoreForUnit: [
    "單元總分", "单元总分", "Unit total score", "Score total de l'unité"
  ],
  uploadTotalScore: [
    "遞交單元總分", "递交单元总分", "Submit unit total score", "Soumettre le score total de l'unité"
  ]
};

export default constants;
