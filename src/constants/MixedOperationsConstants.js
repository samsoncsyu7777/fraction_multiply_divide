const constants = {
  stageText: ["階段", "阶段", "Stage", "Étape"],
  manual: ["自擬題目", "自拟题目", "Personal Task", "Tâche personnelle"],
  formaulaPlaceholder: [
    "輸入算式",
    "输入算式",
    "Enter formula",
    "Entrez la formule",
  ],
  topics: [
    "四則混合計算",
    "四则混合计算",
    "Four Mixed Operations",
    "Quatre Opérations Mixtes",
  ],
  resultBeValidHint: [
    "這計算結果不是一個正整數。",
    "这计算结果不是一个正整数。",
    "The result of this calculation is not a positive integer.",
    "Le résultat de ce calcul n'est pas un entier positif.",
    "這計算結果是一個循環小數或負數。",
    "这计算结果是一个循环小数或负数。",
    "The result of this calculation is a circulating decimal or a negative number.",
    "Le résultat de ce calcul est un nombre décimal en circulation ou un nombre négatif.",
  ],
  wellDone: [
    "你做得到﹗你完成了這題混合計算﹗",
    "你做得到﹗你完成了这题混合计算﹗",
    "You can do it! You have completed this mixed calculation!",
    "Vous pouvez le faire! Vous avez terminé ce calcul mixte!",
  ],
  numberOfOperatorsHintLeft: [
    "最少一步計算，最多",
    "最少一步计算，最多",
    "Minimum 1 operator, maximum ",
    "Minimum 1 opérateur, maximum ",
  ],
  numberOfOperatorsHintRight: [
    "步計算。",
    "步计算。",
    " operators.",
    " opérateurs.",
  ],
  multiplyDivideFirstHintLeft: [
    "首先計算",
    "首先计算",
    "Calculate ",
    "Calculez ",
  ],
  multiplyDivideFirstHintRight: [
    "，因為乘法或除法應在加法或減法之前計算。",
    "，因为乘法或除法应在加法或减法之前计算。",
    " first because multiplication or division should be calculated before addition or subtraction.",
    " d'abord parce que la multiplication ou la division doit être calculée avant l'addition ou la soustraction.",
  ],
  exchangeToAvoidNegativeHint: [
    "避免那減法得到一個負數。",
    "避免那减法得到一个负数。",
    " to avoid the subtraction getting a negative number.",
    " pour éviter que la soustraction n'obtienne un nombre négatif.",
  ],
  exchangeToAvoidDecimalHint: [
    "避免那除法得到一個小數。",
    "避免那除法得到一个小数。",
    " to avoid the division getting a decimal number.",
    " pour éviter que la division n'obtienne un nombre décimal.",
    "避免那除法得到一個循環小數。",
    "避免那除法得到一个循环小数。",
    " to avoid the division getting a circulating decimal.",
    " pour éviter que la division ne reçoive une décimale en circulation.",
  ],
  orText: ["或", "或", " or ", " ou "],
  calculateFirstHintLeft: [
    "首先計算",
    "首先计算",
    "Calculate ",
    "Calculez d'abord ",
  ],
  calculateFirstHintRight: ["。", "。", " first.", "."],
  subtractGetTensHint: [
    "因為這減法可以得到整十或整百，這使下一步計算變得更容易。",
    "因为这减法可以得到整十或整百，这使下一步计算变得更容易。",
    " because this subtraction can get the whole tens or the whole hundreds, it makes the next calculation easier.",
    " parce que cette soustraction peut obtenir les dizaines entières ou les centaines entières, elle facilite le calcul suivant.",
  ],
  divideGetSmallerHint: [
    "因為這除法可以得到一個較小的數，這使下一步計算變得更容易。",
    "因为这除法可以得到一个较小的数，这使下一步计算变得更容易。",
    " because this division can get a smaller number, which makes the next calculation easier.",
    " parce que cette division peut obtenir un nombre plus petit, ce qui facilite le prochain calcul.",
  ],
  rearrangeHintLeft: [
    "重新排列算式以便先計算",
    "重新排列算式以便先计算",
    "Rearrange the formula to calculate ",
    "Réorganiser la formule pour calculer d'abord ",
  ],
  rearrangeHintRight: ["，", "，", " first ", " "],
  firstCalculate: [
    "先計算", "先计算", "First, calculate ", "Tout d'abord, calculez "
  ],
  fractionText: [
    "分數", "分数", "the fraction ", "la fraction "
  ],
  numerPart: [
    " 的分子部份。", " 的分子部份。", " numerator part. ", " partie numérateur. "
  ],
  denomPart: [
    " 的分母部份。", " 的分母部份。", " denominator part. ", "partie du dénominateur. "
  ],
  firstConvert: [
    "先把", "先把", "First, convert ", "Tout d'abord, convertissez "
  ],
  toDecimal: [
    "化為小數。", "化为小数", " to a decimal. ", " en un nombre décimal. "
  ],    
  parenthesesBeforePercent: [
    "百分號前的括號部份 ", "百分号前的括号部份 ", "the parentheses part before the percent sign ", "les parenthèses se trouvent avant le signe de pourcentage "
  ],
  percentText: [
    "百分數", "百分数", "the percentage ", "le pourcentage "
  ],  
  innerParenthesesFirst1: [
    "最內層的括號部份 ", "最内层的括号部份 ", "The innermost parentheses part ", "La partie entre parenthèses la plus à l'intérieur "
  ],
  innerParenthesesFirst2: [
    " 需最先計算。", " 需最先计算。", " need to be calculated first. ", " doivent être calculés en premier. "
  ],
  fullStop: [
    "。", "。", ". ", ". "
  ],
  negativeInParentheses: [
    "括號內的負數 ", "括号内的负数 ", "the negative number in parentheses ", "le nombre négatif entre parenthèses "
  ],
  toPositiveNumber: [
    " 簡化為一個正數或負數。" ," 简化为一个正数或负数", " simplify to a positive or negative number. ", " simplifier en un nombre positif ou négatif. "
  ],
  beforeAddSubtractPercent: [
    "在計算百分數加減前，", "在计算百分数加减前，", "Before calculating the percentage addition and subtraction, ", "Avant de calculer le pourcentage d'addition et de soustraction, "
  ],
  firstConvert2: [
    "先把 ", "先把 ", "first, convert ", "tout d'abord, convertissez "
  ],
  toPercent: [
    " 化為百分數。", " 化为百分数。", " to a percentage. ", " en pourcentage. "
  ],
  beforeDecimalDivision1: [
    "在計算小數除法前，先把被除數和除數同時擴大10倍、100倍、1000倍、⋯⋯，直至除數 ",
    "在计算小数除法前，先把被除数和除数同时扩大10倍、100倍、1000倍、⋯⋯，直至除数 ",
    "Before calculating the decimal division, first, expand the dividend and the divisor by 10 times, 100 times, 1000 times, ... until the divisor ",
    "Avant de calculer la division décimale, commencez par augmenter le dividende et le diviseur de 10 fois, 100 fois, 1000 fois, ... jusqu'à ce que le diviseur "
  ],
  beforeDecimalDivision2: [
    " 化為一個整數。",
    " 化为一个整数。",
    " is converted to an integer. ",
    " soit converti en un entier. "
  ],
  operationWithPercent: [
    "在進行百分數計算後，需保留百分號。",
    "在进行百分数计算后，需保留百分号。",
    "After proceeding with the percentage calculation, the percentage sign should be kept. ",
    "Après avoir procédé au calcul du pourcentage, le signe de pourcentage doit être conservé. "
  ],
};

export default constants;
