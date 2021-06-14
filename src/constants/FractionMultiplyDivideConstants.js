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
    "這個乘法步驟，應只得到一個分數。未計算的分數則保持不變。",
    "这个乘法步骤，应只得到一个分数。未计算的分数则保持不变。",
    "In this multiplication step, only one fraction should be obtained. Uncalculated fractions should remain unchanged.",
    "Dans cette étape de multiplication, une seule fraction doit être obtenue. Les fractions non calculées doivent rester inchangées."
  ],

  incorrectWhole: [
    "整數不正確，這應是分子除以分母得到的整數商。若果這數原是一個整數或帶分數，則保持不變。",
    "整数不正确，这应是分子除以分母得到的整数商。若果这数原是一个整数或带分数，则保持不变。",
    "The whole number is incorrect. This should be the integer quotient obtained by dividing the numerator by the denominator. If the number was originally an integer or a mixed number, there is no need to change it.",
    "Le nombre entier est incorrect. Cela devrait être le quotient entier obtenu en divisant le numérateur par le dénominateur. Si le nombre était à l'origine un nombre entier ou un nombre mixte, il n'est pas nécessaire de le modifier."
  ],

  wholeNoFraction: [
    "這計算步驟得到一個整數，所以這數並沒有分數部份。",
    "这计算步骤得到一个整数，所以这数并没有分数部份。",
    "This calculation step results in an integer, so this number does not have a fractional part.",
    "Cette étape de calcul donne un nombre entier, ce nombre n'a donc pas de partie fractionnaire."
  ],

  sameDenominator: [
    "在這步計算中，分母應保持不變。",
    "在这步计算中，分母应保持不变。",
    "In this step of calculation, the denominator should remain unchanged.",
    "Dans cette étape de calcul, le dénominateur doit rester inchangé."
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

  sameNumberOfFractions: [
    "這算式應與上一行算式有相同數量的分數。",
    "这算式应与上一行算式有相同数量的分数。",
    "This calculation should have the same number of fractions as the previous calculation.",
    "Ce calcul doit avoir le même nombre de fractions que le calcul précédent."
  ],

  sameOperators: [
    "在這步計算中，運算符號需保持不變。",
    "在这步计算中，运算符号需保持不变。",
    "In this step of calculation, the operators should remain unchanged.",
    "Dans cette étape de calcul, les opérateurs doivent rester inchangés."
  ],

  wholeToNumerator: [
    "在計算下一步前，要先把整數轉為假分數，即是分子=整數，分母=1。",
    "在计算下一步前，要先把整数转为假分数，即是分子=整数，分母=1。",
    "Before calculating the next step, you must first convert the whole number to an improper fraction, that is, the numerator=integer and the denominator=1.",
    "Avant de calculer l'étape suivante, vous devez d'abord convertir le nombre entier en une fraction impropre, c'est-à-dire le numérateur=entier et le dénominateur=1."
  ],

  mixedToNumerator: [
    "若是帶分數，化成假數後的分子應是 ( 整數×分母 + 分子 )。若是真分數，則保持不變。",
    "若是带分数，化成假数后的分子应是 ( 整数×分母 + 分子 )。若是真分数，则保持不变。",
    "If it is a mixed fraction, the numerator of the improper fraction should be (integer × denominator + numerator). If it is a proper fraction, it remains unchanged.",
    "S'il s'agit d'une fraction mixte, le numérateur de la fraction impropre doit être (entier × dénominateur + numérateur). Si c'est une fraction propre, elle reste inchangée."
  ],

  noDivision: [
    "在計算分數乘除的部份前，要先把所有除法轉為乘法。",
    "在计算分数乘除的部份前，要先把所有除法转为乘法。",
    "Before calculating the fraction multiplication and division, all divisions must be converted to multiplications.",
    "Avant de calculer la multiplication et la division des fractions, toutes les divisions doivent être converties en multiplications."
  ],

  sameMultipliers: [
    "在分數乘除的部份中，第一個分數和乘數需保持不變，只有除數需要改變。",
    "在分数乘除的部份中，第一个分数和乘数需保持不变，只有除数需要改变。",
    "In the part of fraction multiplication and division, the first fraction and multipliers need to remain unchanged, only the divisors needs to be changed.",
    "Dans la partie de la multiplication et de la division des fractions, la première fraction et les multiplicateurs doivent rester inchangés, seuls les diviseurs doivent être modifiés."
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
    "在這計算步驟中，整數部份應保持不變。",
    "在这计算步骤中，整数部份应保持不变。",
    "In this calculation step, the integer part should remain unchanged.",
    "Dans cette étape de calcul, la partie entière doit rester inchangée."
  ],

  newDenominatorBeCM: [
    "這計算步驟需通分母，即分母是上一步分數的分母的最小公倍數。",
    "这计算步骤需通分母，即分母是上一步分数的分母的最小公倍数。",
    "This calculation step needs to have a common denominator, that is, the denominator is the least common multiple of the denominators of the previous step.",
    "Cette étape de calcul doit avoir un dénominateur commun, c'est-à-dire que le dénominateur est le plus petit commun multiple des dénominateurs de l'étape précédente."
  ],

  sameDenominatorHint: [
    "在分數加減前，相關的分數需有相同的分母。",
    "在分数加减前，相关的分数需有相同的分母。",
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
    "這步計算應得到一個整數，並没有分數部份。",
    "这步计算应得到一个整数，并没有分数部份。",
    "This step of calculation should get an integer, and there is no fractional part.",
    "Cette étape de calcul doit obtenir un nombre entier et il n'y a pas de partie fractionnaire."
  ],

  numeratorAvoidNegative: [
    "重新排列分子的計算，以避免在計算過程中得到負數。",
    "重新排列分子的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of the numerators to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul des numérateurs pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ],

  incorrectNumerator: [
    "這步計算得到的分子不正確，請按照運算符來計算分子。",
    "这步计算得到的分子不正确，请按照运算符来计算分子。",
    "The numerator calculated in this step is incorrect. Please calculate the numerator according to the operator(s).",
    "Le numérateur calculé à cette étape est incorrect. Veuillez calculer le numérateur en fonction du ou des opérateurs."
  ],

  wholeAvoidNegative: [
    "重新排列整數的計算，以避免在計算過程中得到負數。",
    "重新排列整数的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of the whole numbers to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul des nombres entiers pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ],

  incorrectCalculatedWhole: [
    "這步計算得到的整數不正確，請按照運算符來計算新整數。",
    "这步计算得到的整数不正确，请按照运算符来计算新整数。",
    "The integer calculated in this step is incorrect. Please calculate the new integer according to the operator(s).",
    "L'entier calculé à cette étape est incorrect. Veuillez calculer le nouvel entier en fonction du ou des opérateurs."
  ],

};

export default constants;
