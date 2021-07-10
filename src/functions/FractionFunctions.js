import constants from "../constants/FractionConstants";
import { includes } from "./CommonFunctions";

const {
  noOperator,
  singleNumber,
  noNumber,
  fractionHasBoth,
  noImproper,
  noImproperAfterA_S,
  oneFractionOnly,
  incorrectWhole,
  wholeNoFraction,
  sameDenominator,
  sameDenominatorInNoMixFract,
  sameDenominatorInNoImproper,
  sameDenominatorInAddToOne,
  numeratorFromImproper,
  noMixed,
  sameNumberOfFractions1,
  sameNumberOfFractions2,
  sameNumberOfFractions3,
  sameNumberOfFractions4,
  sameNumberOfFractions5,
  sameNumberOfFractions6Left,
  sameNumberOfFractions6Right,
  sameNumberOfFractions6LeftRight,
  sameNumberOfFractions6None,
  sameOperators,
  sameOperatorsInNoMixFract,
  sameOperatorsInNoVarDenom,
  sameOperatorsInNoNegNum,
  wholeToNumerator,
  mixedToNumerator,
  noDivision,
  sameMultipliers,
  divisorsUpDown,
  simplifyIt,
  productOfFractions,
  beAFactorOfNumerator,
  beAFactorOfDenominator,
  sameFactorInReduction,
  furtherReduceFactorLeft,
  furtherReduceFactorRight,
  //a&s
  atLeastOneFraction,
  negativeResult,
  sameWholeNumbers,
  sameWholeNumbersInNoVarDenom,
  onlyWholeNumbers,
  newDenominatorBeCM,
  sameDenominatorHint,
  multiplyWithSameInteger,
  CMToLCMHint,
  denominatorInvolvedBeLCM,
  wholeNotInvolvedKeepSame,
  fractionNotInvolvedKeepSame,
  abdicatedNumerator,
  abdicateTooMuch,
  abdicateTooLittle,
  wholeWithoutFraction,
  numeratorAvoidNegative,
  incorrectNumerator,
  wholeAvoidNegative,
  incorrectCalculatedWhole,
  parentheses,
  parenthesesExtra,
  parenthesesLack,
  parenthesesPosition,
  operatorBeforeStep,
  decreaseMessage,
  keepOthers1,
  keepOthers2,
  keepOthers3,
  noIntegerAfterMulti,
  oddBrackets,
  noVarDenom,
  noNegNum,
  addToOne,
  improperToMix,
  noMixedIssue,
  noDivisionIssue,
  noMultipleIssue,
} = constants;

export const timeDelay = 200;

//A&S only. Need both A&S and mixed versions -> This version can serve both
export function positiveResultCheck2(index, startIndex, endIndex, bracketArray, fractionLinesArray, handleSetError, languageIndex) {
  /*console.log("positiveResultCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);*/
  var result = 0.0;
  var sumOfDenominators = 0;
  let expression = "";
  var i;
  for (i = startIndex; i < endIndex + 1; i++) {
    //for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
    if (i > startIndex) {
      //add operator "×", "÷"
      let operator = fractionLinesArray[index][i][0];
      if (operator === "×") {
        operator = "*";
      } else if (operator === "÷") {
        operator = "/";
      }
      expression += operator;
    }
    if (bracketArray[index].indexOf(i) % 2 === 0) {
      expression += "(";
    }
    let fraction = fractionLinesArray[index][i][1];
    if (fractionLinesArray[index][i][4] > 0) {
      fraction +=
        fractionLinesArray[index][i][3] / fractionLinesArray[index][i][4];
    }
    expression += fraction;
    if (bracketArray[index].indexOf(i) % 2 === 1) {
      expression += ")";
    }

    //use upper revised version instead of the following
    /*result +=
      (fractionLinesArray[index][i][1] +
        fractionLinesArray[index][i][3] / fractionLinesArray[index][i][4]) *
      (fractionLinesArray[index][i][0] == "-" ? -1 : 1);*/

    sumOfDenominators += fractionLinesArray[index][i][4];

    //check no improper
    if (
      fractionLinesArray[index][i][3] >= fractionLinesArray[index][i][4] &&
      fractionLinesArray[index][i][4] > 0
    ) {
      handleSetError(noImproper[languageIndex]);
      return false;
    }
  }
  console.log("expression:" + expression);
  try {
    result = eval(expression);
  } catch (err) {
    result = 0;
  }
  console.log("result:" + result);

  //check at least one fraction
  if (sumOfDenominators === 0) {
    handleSetError(atLeastOneFraction[languageIndex]);
    return false;
  }
  //check result is negative
  if (result < 0) {
    handleSetError(negativeResult[languageIndex]);
    return false;
  } else {
    return true;
  }
}

export const parenthesesMessage2 = (newLength, lastLength, languageIndex) => {
  let parenthesesHint = "";
  if (newLength > lastLength) {
    parenthesesHint = parenthesesExtra[languageIndex];
  } else if (newLength === lastLength) {
    parenthesesHint = parenthesesPosition[languageIndex];
  } else {
    parenthesesHint = parenthesesLack[languageIndex];
  }
  return parenthesesHint;
}

export const stepMessage2 = (startIndex, endIndex, issue, decrease, languageIndex, fractionLinesArray, formulaFocusedIndex) => {
  console.log("decrease in stepMessage:" + decrease)
  let stepHint = "";
  let middleMessage =
    startIndex === endIndex + decrease
      ? ""
      : sameNumberOfFractions2[languageIndex] + (endIndex + decrease + 1);
  let sameNumberOfFractions6 = "";
  if (startIndex === 0) {//no left fractions
    if (fractionLinesArray[formulaFocusedIndex - 1].length - 1 > endIndex + decrease + 1) {//with right fractions
      sameNumberOfFractions6 = sameNumberOfFractions6Right[languageIndex];
    } else {//no right fractions
      sameNumberOfFractions6 = sameNumberOfFractions6None[languageIndex];
    }
    //with left fractions
  } else if (fractionLinesArray[formulaFocusedIndex - 1].length - 1 > endIndex + decrease + 1) {//with right fractions
    sameNumberOfFractions6 = sameNumberOfFractions6LeftRight[languageIndex];
  } else {//no right fractions
    sameNumberOfFractions6 = sameNumberOfFractions6Left[languageIndex];
  }
  stepHint = sameNumberOfFractions1[languageIndex] + (startIndex + 1) + middleMessage + sameNumberOfFractions3[languageIndex] + issue + sameNumberOfFractions4[languageIndex] + sameNumberOfFractions5[languageIndex] + sameNumberOfFractions6;
  return stepHint;
}

//A&S only
export function noVariousDenominatorCheck2(
  index, checkValueNeeded, startIndex, endIndex, setFractionIndexInProcess, setCalculationStage, setCalculatedLcm, languageIndex, handleSetError, primeNumbers, fractionLinesArray, stepMessage, bracketArray, parenthesesMessage, otherFractionsCheck, noNegativeNumeratorResultCheck, fractionIndexInProcess, startEndIndexLastLine, indexDecreasedByLastStage, setStartEndIndexLastLine, addLine
) {
  console.log("noVariousDenominatorCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  if (!checkValueNeeded) {
    //check having different only
    var firstDenominator = 0;
    var i;
    for (i = startIndex; i < endIndex + 1; i++) {
      //0 to <length - 1
      if (fractionLinesArray[index][i][4] > 0) {
        if (firstDenominator == 0) {
          firstDenominator = fractionLinesArray[index][i][4];
        } else {
          if (firstDenominator != fractionLinesArray[index][i][4]) {
            return false;
          }
        }
      }
    }
    setCalculatedLcm(firstDenominator);
    setCalculationStage(1);
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

    noNegativeNumeratorResultCheck(index, false, startIndex, endIndex);
    return true;
  } else {
    //check other fractions
    if (!otherFractionsCheck(index, startIndex, endIndex, 0, noVarDenom[languageIndex])) {
      return false;
    }
    //check brackets equal to last formula
    if (
      JSON.stringify(bracketArray[index]) !==
      JSON.stringify(bracketArray[index - 1])
    ) {
      handleSetError(parenthesesMessage(bracketArray[index].length, bracketArray[index - 1].length) + parentheses[languageIndex]);
      return false;
    }
    //check denominators become lcm
    var denominatorMultiples = [];
    var lcm = 0;
    //var i;
    if (
      fractionLinesArray[index].length != fractionLinesArray[index - 1].length
    ) {
      /*** let middleMessage =
        startIndex === endIndex
          ? ""
          : sameNumberOfFractions2[languageIndex] + (endIndex + 1);
      setErrorMessage(
        sameNumberOfFractions1[languageIndex] +
          (startIndex + 1) +
          middleMessage +
          sameNumberOfFractions3[languageIndex]
      );*/
      handleSetError(stepMessage(startIndex, endIndex, noVarDenom[languageIndex], 0));
      return false;
    }
    console.log("startIndex:" + startIndex);
    console.log("endIndex:" + endIndex);
    for (i = startIndex; i < endIndex + 1; i++) {
      //for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
      if (
        fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
      ) {
        handleSetError(sameOperatorsInNoVarDenom[languageIndex]);
        return false;
      }
      if (
        fractionLinesArray[index][i][1] != fractionLinesArray[index - 1][i][1]
      ) {
        handleSetError(sameWholeNumbersInNoVarDenom[languageIndex]);
        return false;
      }
      console.log("index in noVarious:" + index);
      console.log("i:" + i);
      if (fractionLinesArray[index - 1][i][4] > 0) {
        if (
          fractionLinesArray[index][i][4] %
          fractionLinesArray[index - 1][i][4] !=
          0 ||
          fractionLinesArray[index][i][4] == 0
        ) {
          handleSetError(newDenominatorBeCM[languageIndex]);
          return false;
        }
        if (lcm == 0) {
          lcm = fractionLinesArray[index][i][4];
        } else {
          if (fractionLinesArray[index][i][4] != lcm) {
            handleSetError(sameDenominatorHint[languageIndex]);
            return false;
          }
        }
        var denominatorMultiple =
          fractionLinesArray[index][i][4] /
          fractionLinesArray[index - 1][i][4];
        denominatorMultiples.push(denominatorMultiple);
        if (
          fractionLinesArray[index][i][3] /
          fractionLinesArray[index - 1][i][3] !=
          denominatorMultiple
        ) {
          handleSetError(multiplyWithSameInteger[languageIndex]);
          return false;
        }
        //whole number only
      } else {
        if (
          fractionLinesArray[index][i][3] > 0 ||
          fractionLinesArray[index][i][4] > 0
        ) {
          handleSetError(onlyWholeNumbers[languageIndex]);
          return false;
        }
      }
    }
    for (i = 0; i < primeNumbers.length; i++) {
      var isFactor = true;
      var j;
      for (j = 0; j < denominatorMultiples.length; j++) {
        if (primeNumbers[i] > denominatorMultiples[j]) {
          j = denominatorMultiples.length;
          i = primeNumbers.length;
        }
        if (denominatorMultiples[j] % primeNumbers[i] != 0) {
          isFactor = false;
          j = denominatorMultiples.length;
        }
      }
      if (isFactor) {
        handleSetError(CMToLCMHint[languageIndex]);
        return false;
      }
    }
    setCalculatedLcm(lcm);
    setCalculationStage(1);
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    setFractionIndexInProcess([startIndex, endIndex]);
    setStartEndIndexLastLine([startIndex, endIndex]); //*** */
    addLine();
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

    noNegativeNumeratorResultCheck(index, false, startIndex, endIndex);
    return true;
  }
}

//A&S only. need both A&S and mixed versions
export function noNegativeNumeratorResultCheck2(
  index, checkValueNeeded, startIndex, endIndex, setCalculationStage, setIndexDecreasedByLastStage, languageIndex, handleSetError, calculatedLcm, fractionLinesArray, bracketArray, stepMessage, parenthesesMessage, setFractionIndexInProcess, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, otherFractionsCheck, setStartEndIndexLastLine, addLine
) {
  console.log("noNegativeNumeratorResultCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  if (checkValueNeeded) {
    //check other fractions
    if (!otherFractionsCheck(index, startIndex, endIndex, 0, noNegNum[languageIndex])) {
      return false;
    }
  }
  var numeratorResult = fractionLinesArray[index][startIndex][3];
  //if (fractionLinesArray[index].length > 2) {
  var i;
  for (i = startIndex + 1; i < endIndex + 1; i++) {
    numeratorResult +=
      fractionLinesArray[index][i][3] *
      (fractionLinesArray[index][i][0] == "-" ? -1 : 1);
  }
  //}

  console.log("numer result in noNegative:" + numeratorResult);
  if (!checkValueNeeded) {
    if (numeratorResult >= 0) {
      setIndexDecreasedByLastStage(endIndex - startIndex);

      setCalculationStage(2);
      console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
      setFractionIndexInProcess([startIndex, startIndex]); //
      return true;
    } else {
      return false;
    }
    //check value
  } else {
    /*//check other fractions      
    if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
      return false;
    }*/
    //check brackets equal to last formula
    console.log("check answer in noNegative");
    if (
      JSON.stringify(bracketArray[index]) !==
      JSON.stringify(bracketArray[index - 1])
    ) {
      handleSetError(parenthesesMessage(bracketArray[index].length, bracketArray[index - 1].length) + parentheses[languageIndex]);
      return false;
    }
    if (
      fractionLinesArray[index].length != fractionLinesArray[index - 1].length
    ) {
      /***let middleMessage =
        startIndex === endIndex
          ? ""
          : sameNumberOfFractions2[languageIndex] + (endIndex + 1);
      setErrorMessage(
        sameNumberOfFractions1[languageIndex] +
          (startIndex + 1) +
          middleMessage +
          sameNumberOfFractions3[languageIndex]
      );*/
      handleSetError(stepMessage(startIndex, endIndex, noNegNum[languageIndex], 0));
      return false;
    }
    for (i = startIndex; i < endIndex + 1; i++) {
      if (
        fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
      ) {
        handleSetError(sameOperatorsInNoNegNum[languageIndex]);
        return false;
      }
      if (
        (includes(["", "+"], fractionLinesArray[index - 1][i][0]) || bracketArray[index - 1].indexOf(i) % 2 === 0) &&//*** */
        fractionLinesArray[index - 1][i][1] > 0
      ) {
        var wholeDiff =
          fractionLinesArray[index - 1][i][1] -
          fractionLinesArray[index][i][1];
        //denominator should be the lcm
        if (wholeDiff > 0 || fractionLinesArray[index - 1][i][4] > 0) {
          if (fractionLinesArray[index][i][4] != calculatedLcm) {
            handleSetError(denominatorInvolvedBeLCM[languageIndex]);
            return false;
          }
        } else {
          if (fractionLinesArray[index][i][4] != 0) {
            handleSetError(wholeNotInvolvedKeepSame[languageIndex]);
            return false;
          }
        }
        if (
          fractionLinesArray[index][i][3] !=
          fractionLinesArray[index - 1][i][3] + wholeDiff * calculatedLcm
        ) {
          handleSetError(abdicatedNumerator[languageIndex]);
          return false;
        }
      } else {
        if (
          fractionLinesArray[index][i][1] !=
          fractionLinesArray[index - 1][i][1] ||
          fractionLinesArray[index][i][3] !=
          fractionLinesArray[index - 1][i][3] ||
          fractionLinesArray[index][i][4] !=
          fractionLinesArray[index - 1][i][4]
        ) {
          handleSetError(fractionNotInvolvedKeepSame[languageIndex]);
          return false;
        }
      }
    }
    if (numeratorResult >= calculatedLcm) {
      handleSetError(abdicateTooMuch[languageIndex]);
      return false;
    }
    if (numeratorResult < 0) {
      handleSetError(abdicateTooLittle[languageIndex]);
      return false;
    }
    setIndexDecreasedByLastStage(endIndex - startIndex);

    setCalculationStage(2);
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    setFractionIndexInProcess([startIndex, startIndex]);
    setStartEndIndexLastLine([startIndex, endIndex]); //*** */
    addLine();
    //*** */setFractionIndexInProcess([startIndex, startIndex]);//
    return true;
  }
}

//A&S only
export function addToOneFractionCheck2(index, startIndex, endIndex, setCalculationStage, languageIndex, handleSetError, fractionLinesArray, calculatedLcm, startEndIndexLastLine, bracketArray, parenthesesMessage, bracketStage, mixedStage, indexDecreasedByLastStage, otherFractionsCheck, fractionIndexInProcess, setOkButtonStage, setFractionIndexInProcess) {
  console.log("addToOneFractionCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  //check other fractions
  if (
    !otherFractionsCheck(
      index,
      startIndex,
      startIndex,
      indexDecreasedByLastStage,
      addToOne[languageIndex]
    )
  ) {
    return false;
  }
  if (
    fractionLinesArray[index].length !==
    fractionLinesArray[index - 1].length - indexDecreasedByLastStage
  ) {
    //>2
    handleSetError(oneFractionOnly[languageIndex]);
    return false;
  }
  let allBracketArray = [...bracketArray];
  let newBracketArray = [...allBracketArray[index - 1]];
  //let newBracketArray = bracketArray[index - 1];
  if (mixedStage === "hasBracket") {
    let newPosition = newBracketArray[1] - indexDecreasedByLastStage;
    newBracketArray[1] = newPosition;
  }
  console.log("newBracketArray:" + newBracketArray);
  if (mixedStage === "hasBracket" && bracketStage === "noMixedCal") {
    newBracketArray = allBracketArray[index - 1].slice(
      2,
      allBracketArray[index - 1].length
    );
  }
  let tmpBracketArray = [];
  newBracketArray.forEach((position) => {
    tmpBracketArray.push(position - indexDecreasedByLastStage);
  });
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("mixedStage:" + mixedStage);
  console.log("bracketStage:" + bracketStage);
  console.log("newBracketArray:" + newBracketArray);
  console.log("bracketArray[index]:" + bracketArray[index]);
  console.log("tmpBracketArray:" + tmpBracketArray);
  if (
    JSON.stringify(bracketArray[index]) !== JSON.stringify(tmpBracketArray)
  ) {
    handleSetError(parenthesesMessage(bracketArray[index].length, tmpBracketArray.length) + parentheses[languageIndex]);
    return false;
  }
  var numeratorResult = 0;
  var wholeResult = 0;
  var negativeInNumeratorProcess = false;
  var negativeInWholeProcess = false;
  var i;
  for (i = startEndIndexLastLine[0]; i < startEndIndexLastLine[1] + 1; i++) {
    numeratorResult +=
      fractionLinesArray[index - 1][i][3] *
      (i === startEndIndexLastLine[0]
        ? 1
        : fractionLinesArray[index - 1][i][0] == "-"
          ? -1
          : 1);
    if (numeratorResult < 0) {
      negativeInNumeratorProcess = true;
    }
    wholeResult +=
      fractionLinesArray[index - 1][i][1] *
      (i === startEndIndexLastLine[0]
        ? 1
        : fractionLinesArray[index - 1][i][0] == "-"
          ? -1
          : 1);
    console.log("numeratorResult:" + numeratorResult);
    if (wholeResult < 0) {
      negativeInWholeProcess = true;
    }
  }
  if (numeratorResult > 0) {
    if (
      fractionLinesArray[index][startEndIndexLastLine[0]][4] != calculatedLcm
    ) {
      //position: [0]
      handleSetError(sameDenominatorInAddToOne[languageIndex]);
      return false;
    }
  } else {
    if (fractionLinesArray[index][startEndIndexLastLine[0]][4] != 0) {
      //position: [0]
      handleSetError(wholeWithoutFraction[languageIndex]);
      return false;
    }
  }
  if (
    fractionLinesArray[index][startEndIndexLastLine[0]][3] != numeratorResult
  ) {
    //position: [0]
    if (negativeInNumeratorProcess) {
      handleSetError(numeratorAvoidNegative[languageIndex]);
    } else {
      handleSetError(incorrectNumerator[languageIndex]);
    }
    return false;
  }
  if (
    fractionLinesArray[index][startEndIndexLastLine[0]][1] != wholeResult
  ) {
    //position: [0]
    if (negativeInWholeProcess) {
      handleSetError(wholeAvoidNegative[languageIndex]);
    } else {
      handleSetError(incorrectCalculatedWhole[languageIndex]);
    }
    return false;
  }
  setCalculationStage(3);
  console.log("addToOne call setOkButtonStage(1)");
  setOkButtonStage(1);
  //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
  console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
  setFractionIndexInProcess([startIndex, startIndex]);
  return true;
}

//equal //for whole formula
export function fractionOrIntegerCheck2(index, fractionLinesArray, handleSetError, languageIndex) {
  var i;
  for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
    if (i > 0 && fractionLinesArray[index][i][0] == "") {
      handleSetError(noOperator[languageIndex]);
      return false;
    }
    if (
      fractionLinesArray[index][i][1] == "" &&
      (fractionLinesArray[index][i][3] == "") &
      (fractionLinesArray[index][i][4] == "")
    ) {
      handleSetError(noNumber[languageIndex]);
      return false;
    }
    if (
      (fractionLinesArray[index][i][3] == "" &&
        fractionLinesArray[index][i][4] != "") ||
      (fractionLinesArray[index][i][3] != "" &&
        fractionLinesArray[index][i][4] == "")
    ) {
      handleSetError(fractionHasBoth[languageIndex]);
      return false;
    }
  }
  return true;
}

//equal //for question whole formula only
export function singleNumberCheck2(index, fractionLinesArray, languageIndex, handleSetError) {
  if (fractionLinesArray[index].length == 2) {
    if (index == 0) {
      handleSetError(singleNumber[languageIndex]);
      return false;
    }
  }
  return true;
}

//little bit differ, fix it for mixed final stage //for whole formula?
export function noImproperFractionCheck2(
  completeFunction, index, checkValueNeeded, startIndex, endIndex, setCompleted, setFormulaFocusedIndex, languageIndex, handleSetError, mixedStage, nextNewStep, typeOfCalculation, fractionLinesArray, parenthesesMessage, bracketArray, setFractionIndexInProcess, formulaFocusedIndex, otherFractionsCheck, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, setStartEndIndexLastLine, addLine, calculationStage
) {
  console.log("noImproperFractionCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  if (checkValueNeeded) {
    //check other fractions
    if (!otherFractionsCheck(index, startIndex, startIndex, 0, improperToMix[languageIndex])) {
      return false;
    }
  }
  console.log("formulaFocusedIndex: " + formulaFocusedIndex);
  var i;
  for (i = startIndex; i < endIndex + 1; i++) {
    if (
      fractionLinesArray[index][i][3] >= fractionLinesArray[index][i][4] &&
      fractionLinesArray[index][i][4] > 0
    ) {
      if (!checkValueNeeded && index > 0) {
        console.log(
          "setFractionIndexInProcess with: " + startIndex + endIndex
        );
        setFractionIndexInProcess([startIndex, startIndex]);
        setStartEndIndexLastLine([startIndex, endIndex]); //*** */
        addLine();
        return false;
      } else {
        //*** */setErrorMessage(noImproper[languageIndex]);
        handleSetError(noImproperAfterA_S[languageIndex]);
        return false;
      }
    }
  }
  if (index == 0) {
    console.log("noImprop2");
    return true;
  } else if (checkValueNeeded) {
    /*//check other fractions
    if (!otherFractionsCheck(index, startIndex, startIndex, 0)) {
      return false;
    }*/
    //check brackets equal to last formula
    if (
      JSON.stringify(bracketArray[index]) !==
      JSON.stringify(bracketArray[index - 1])
    ) {
      handleSetError(parenthesesMessage(bracketArray[index].length, bracketArray[index - 1].length) + parentheses[languageIndex]);
      return false;
    }
    if (
      fractionLinesArray[index].length !==
      fractionLinesArray[index - 1].length
    ) {
      handleSetError(oneFractionOnly[languageIndex]);
      return false;
    }
    for (i = startIndex; i < startIndex + 1; i++) {
      /*var integerPart = fractionLinesArray[index][i][3];
      if (integerPart == "") {
        integerPart = 0;
      }*/
      //use A&S version to include integer part without affect the result of M&D
      if (
        fractionLinesArray[index][i][1] !==
        fractionLinesArray[index - 1][i][1] +
        parseInt(
          fractionLinesArray[index - 1][i][3] /
          fractionLinesArray[index - 1][i][4]
        )
      ) {
        /*if (
        fractionLinesArray[index][i][1] !=
        parseInt(
          fractionLinesArray[index - 1][i][3] /
            fractionLinesArray[index - 1][i][4]
        )
      ) {*/
        handleSetError(incorrectWhole[languageIndex]);
        return false;
      }
      if (fractionLinesArray[index - 1][i][4] == 1) {
        if (
          fractionLinesArray[index][i][3] > 0 ||
          fractionLinesArray[index][i][4] > 0
        ) {
          handleSetError(wholeNoFraction[languageIndex]);
          return false;
        }
      } else {
        if (
          fractionLinesArray[index][i][4] !=
          fractionLinesArray[index - 1][i][4]
        ) {
          handleSetError(sameDenominatorInNoImproper[languageIndex]);
          return false;
        }
        if (
          fractionLinesArray[index][i][3] !=
          fractionLinesArray[index - 1][i][3] %
          fractionLinesArray[index - 1][i][4]
        ) {
          handleSetError(numeratorFromImproper[languageIndex]);
          return false;
        }
      }
    }
    console.log("welldone1");
    if (
      mixedStage === "noMixedCal" &&
      ((calculationStage === 4 && typeOfCalculation === "M&D") ||
        typeOfCalculation === "A&S") /* || A&S */
    ) {
      completeFunction();
      /*
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex((prevState) => prevState + 1); // formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
          setOpenAlert(true);
      }, timeDelay);*/
    } else {
      console.log("call nextNewStep");
      nextNewStep(index);
      /*setCalculationStage(0);
      setOkButtonStage(0);
      if (mixedStage === "hasBracket") {
        noBracketCheck(index, false);
      } else {
        //mixedStage === "hasMixedCal"
        noMixedCalCheck(
          index,
          false,
          0,
          fractionLinesArray[index].length - 2
        );
      }*/
    }
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    //***setFractionIndexInProcess([startIndex, endIndex]);//*** */
    return true;
  } else {
    console.log("welldone2");

    // if (calculationStage == 4) {
    if (mixedStage === "noMixedCal") {
      completeFunction();
      /*
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex((prevState) => prevState + 1); // formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
          setOpenAlert(true);
      }, timeDelay);*/
    } else {
      nextNewStep(index);
      /*setCalculationStage(0);
      setOkButtonStage(0);
      if (mixedStage === "hasBracket") {
        noBracketCheck(index, false);
      } else {
        //mixedStage === "hasMixedCal"
        noMixedCalCheck(
          index,
          false,
          0,
          fractionLinesArray[index].length - 2
        );
      }*/
    }
    //}
    //setIndexDecreasedByLastStage(endIndex - startIndex);
    return true;
  }
}

//M&D only
export function noMixedFractionCheck2(
  index, checkValueNeeded, startIndex, endIndex, isNewStepTmp, setCalculationStage, languageIndex, handleSetError, fractionLinesArray, stepMessage, bracketArray, parenthesesMessage, noDivisionCheck, setFractionIndexInProcess, calculationStage, otherFractionsCheck, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, addLine
) {
  console.log("noMixedFractionCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("isNewStepTmp:" + isNewStepTmp);
  if (checkValueNeeded) {
    //check other fractions
    if (!otherFractionsCheck(index, startIndex, endIndex, 0, noMixedIssue[languageIndex])) {
      return false;
    }
  }
  var i;
  for (i = startIndex; i < endIndex + 1; i++) {
    if (fractionLinesArray[index][i][1] != "") {
      if (index !== 0 && !isNewStepTmp && calculationStage === 0) {
        //newStep
        if (
          !(fractionLinesArray[index - 1][i][3] > 0) &&
          !(fractionLinesArray[index - 1][i][4] > 0)
        ) {
          if (
            fractionLinesArray[index][i][3] !=
            fractionLinesArray[index - 1][i][1] ||
            fractionLinesArray[index][i][4] != 1
          ) {
            handleSetError(wholeToNumerator[languageIndex]);
          }
        } else {
          handleSetError(noMixed[languageIndex]);
        }
      } else {
        console.log(
          "setFractionIndexInProcess with: " + startIndex + endIndex
        );
        setFractionIndexInProcess([startIndex, endIndex]); //*** */
        //setFractionIndexInProcess([startIndex, endIndex]);//*** */
        addLine();
      }
      return false;
    }
  }
  if (!checkValueNeeded) {
    //(index == 0 || !checkValueNeeded) {
    setCalculationStage(1);
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
    //good
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    setFractionIndexInProcess([startIndex, endIndex]); //*** */
    noDivisionCheck(index, false, startIndex, endIndex, isNewStepTmp);
    return true;
  } else if (checkValueNeeded) {
    //check other fractions
    /*if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
      return false;
    }*/
    //check brackets equal to last formula
    if (
      JSON.stringify(bracketArray[index]) !==
      JSON.stringify(bracketArray[index - 1])
    ) {
      handleSetError(parenthesesMessage(bracketArray[index].length, bracketArray[index - 1].length) + parentheses[languageIndex]);
      return false;
    }
    if (
      fractionLinesArray[index].length != fractionLinesArray[index - 1].length
    ) {
      /***let middleMessage =
        startIndex === endIndex
          ? ""
          : sameNumberOfFractions2[languageIndex] + (endIndex + 1);
      setErrorMessage(
        sameNumberOfFractions1[languageIndex] +
          (startIndex + 1) +
          middleMessage +
          sameNumberOfFractions3[languageIndex]
      );*/
      handleSetError(stepMessage(startIndex, endIndex, noMixedIssue[languageIndex], 0));
      return false;
    }
    for (i = startIndex; i < endIndex + 1; i++) {
      if (
        fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
      ) {
        handleSetError(sameOperatorsInNoMixFract[languageIndex]);
        return false;
      }
      var calculatedNumerator =
        fractionLinesArray[index - 1][i][3] +
        fractionLinesArray[index - 1][i][1] *
        fractionLinesArray[index - 1][i][4];
      //whole number management
      if (
        !(fractionLinesArray[index - 1][i][3] > 0) &&
        !(fractionLinesArray[index - 1][i][4] > 0)
      ) {
        if (
          fractionLinesArray[index][i][3] !=
          fractionLinesArray[index - 1][i][1] ||
          fractionLinesArray[index][i][4] != 1
        ) {
          handleSetError(wholeToNumerator[languageIndex]);
          return false;
        }
      } else {
        if (fractionLinesArray[index][i][3] != calculatedNumerator) {
          handleSetError(mixedToNumerator[languageIndex]);
          return false;
        }
        if (
          fractionLinesArray[index][i][4] !=
          fractionLinesArray[index - 1][i][4]
        ) {
          handleSetError(sameDenominatorInNoMixFract[languageIndex]);
          return false;
        }
      }
    }
    setCalculationStage(1);
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    setFractionIndexInProcess([startIndex, endIndex]);
    console.log(endIndex);
    noDivisionCheck(index, false, startIndex, endIndex, isNewStepTmp);
    //setOkButtonStage(1);
    //addLine();
    return true;
  }
}

//M&D only
export function noDivisionCheck2(
  index, checkValueNeeded, startIndex, endIndex, isNewStepTmp, languageIndex, handleSetError, fractionLinesArray, stepMessage, bracketArray, parenthesesMessage, setCalculationStage, setStartEndIndexLastLine, setFractionIndexInProcess, calculationStage, otherFractionsCheck, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, addLine, setOkButtonStage
) {
  console.log("noDivisionCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("calculationStage:" + calculationStage);
  console.log("isNewStepTmp:" + isNewStepTmp);
  if (checkValueNeeded) {
    //check other fractions
    if (!otherFractionsCheck(index, startIndex, endIndex, 0, noDivisionIssue[languageIndex])) {
      return false;
    }
  }
  //if (fractionLinesArray[index].length > 2) {
  var i;
  for (i = startIndex + 1; i < endIndex + 1; i++) {
    if (fractionLinesArray[index][i][0] == "÷") {
      if (index !== 0 && !isNewStepTmp && calculationStage === 1) {
        //newStep
        handleSetError(noDivision[languageIndex]);
      } else {
        console.log(
          "setFractionIndexInProcess with: " + startIndex + endIndex
        );
        setFractionIndexInProcess([startIndex, endIndex]); //*** */
        setStartEndIndexLastLine([startIndex, endIndex]); //*** */
        addLine();
      }
      return false;
    }
  }
  //}
  if (!checkValueNeeded) {
    //index == 0 || !checkValueNeeded) {
    setCalculationStage(2);
    console.log("noDivi call setOkButtonStage(1)");
    console.log("endIndex:" + endIndex);
    setOkButtonStage(1);
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
    //bad
    //addLine();
    //simplifiedCheck(index, false);
    return true;
  } else if (checkValueNeeded) {
    /*//check other fractions
    if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
      return false;
    }*/
    //check brackets equal to last formula
    if (
      JSON.stringify(bracketArray[index]) !==
      JSON.stringify(bracketArray[index - 1])
    ) {
      handleSetError(parenthesesMessage(bracketArray[index].length, bracketArray[index - 1].length) + parentheses[languageIndex]);
      return false;
    }
    if (
      fractionLinesArray[index].length != fractionLinesArray[index - 1].length
    ) {
      /***let middleMessage =
        startIndex === endIndex
          ? ""
          : sameNumberOfFractions2[languageIndex] + (endIndex + 1);
      setErrorMessage(
        sameNumberOfFractions1[languageIndex] +
          (startIndex + 1) +
          middleMessage +
          sameNumberOfFractions3[languageIndex]
      );*/
      handleSetError(stepMessage(startIndex, endIndex, noDivisionIssue[languageIndex], 0));
      return false;
    }
    for (i = startIndex; i < endIndex + 1; i++) {
      if (fractionLinesArray[index][i][1] > 0) {
        handleSetError(noMixed[languageIndex]);
        return false;
      }
      if (i == startIndex || fractionLinesArray[index - 1][i][0] == "×") {
        if (
          fractionLinesArray[index][i][3] !=
          fractionLinesArray[index - 1][i][3] ||
          fractionLinesArray[index][i][4] !=
          fractionLinesArray[index - 1][i][4]
        ) {
          handleSetError(sameMultipliers[languageIndex]);
          return false;
        }
      } else if (fractionLinesArray[index - 1][i][0] == "÷") {
        if (
          fractionLinesArray[index][i][3] !=
          fractionLinesArray[index - 1][i][4] ||
          fractionLinesArray[index][i][4] !=
          fractionLinesArray[index - 1][i][3]
        ) {
          handleSetError(divisorsUpDown[languageIndex]);
          return false;
        }
      }
    }
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

    setCalculationStage(2);
    console.log("noDivi call setOkButtonStage(1)");
    setOkButtonStage(1);
    //simplifiedCheck(index, false);
    //addLine();
    return true;
  }
}

//M&D only
export function noMultiplicationCheck2(
  index, checkValueNeeded, startIndex, endIndex, setIndexDecreasedByLastStage, setCalculationStage, noImproperFractionCheck, nextNewStep, fractionLinesArray, setOkButtonStage, languageIndex, handleSetError, primeNumbers, startEndIndexLastLine, bracketArray, parenthesesMessage, bracketStage, mixedStage, indexDecreasedByLastStage, lastMixBrackArray, fractionIndexInProcess, otherFractionsCheck, setFractionIndexInProcess, setStartEndIndexLastLine
) {
  console.log("noMultiplicationCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  if (checkValueNeeded) {
    //check other fractions
    //*** */if (!otherFractionsCheck(index, startEndIndexLastLine[0], startEndIndexLastLine[0], indexDecreasedByLastStage)) {
    if (
      !otherFractionsCheck(
        index,
        startIndex,
        startIndex,
        indexDecreasedByLastStage,
        noMultipleIssue[languageIndex]
      )
    ) {
      return false;
    }
    let allBracketArray = [...bracketArray];
    let newBracketArray = [...allBracketArray[index - 1]];
    //let newBracketArray = bracketArray[index - 1];
    /*if (lastMixBrackArray.lastMix === "hasBracket" && lastMixBrackArray.lastBrack === "hasMixedCal") {
    //if (mixedStage === "hasBracket") {
      console.log("bracket[1] goes to the front")
      let newPosition = newBracketArray[1] - indexDecreasedByLastStage;
      newBracketArray[1] = newPosition;
    }*/
    console.log("newBracketArray:" + newBracketArray);
    if (
      lastMixBrackArray.lastMix === "hasBracket" &&
      lastMixBrackArray.lastBrack === "noMixedCal"
    ) {
      //if (mixedStage === "hasBracket" && bracketStage === "noMixedCal") {
      newBracketArray = allBracketArray[index - 1].slice(
        2,
        allBracketArray[index - 1].length
      );
    }

    let tmpBracketArray = [];
    newBracketArray.forEach((position) => {
      if (position >= startEndIndexLastLine[1]) {
        tmpBracketArray.push(position - indexDecreasedByLastStage);
      } else {
        tmpBracketArray.push(position);
      }
    });
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    console.log("mixedStage:" + mixedStage);
    console.log("bracketStage:" + bracketStage);
    console.log("newBracketArray:" + newBracketArray);
    console.log("bracketArray[index]:" + bracketArray[index]);
    console.log("tmpBracketArray:" + tmpBracketArray);
    if (
      JSON.stringify(bracketArray[index]) !== JSON.stringify(tmpBracketArray)
    ) {
      handleSetError(parenthesesMessage(bracketArray[index].length, tmpBracketArray.length) + parentheses[languageIndex]);
      return false;
    }
    if (
      fractionLinesArray[index].length >
      fractionLinesArray[index - 1].length - indexDecreasedByLastStage
    ) {
      handleSetError(oneFractionOnly[languageIndex]);
      return false;
    }
    var i;
    var numerator = 1;
    var denominator = 1;
    for (
      i = startEndIndexLastLine[0];
      i < startEndIndexLastLine[1] + 1;
      i++
    ) {
      numerator *= fractionLinesArray[index - 1][i][3];
      denominator *= fractionLinesArray[index - 1][i][4];
    }
    if (
      fractionLinesArray[index][startIndex][3] != numerator ||
      fractionLinesArray[index][startIndex][4] != denominator
    ) {
      handleSetError(productOfFractions[languageIndex]);
      return false;
    }
    if (fractionLinesArray[index][startIndex][1] !== 0) {
      handleSetError(noIntegerAfterMulti[languageIndex]);
      return false;
    }
    for (i = 0; i < primeNumbers.length; i++) {
      if (
        fractionLinesArray[index][startIndex][3] % primeNumbers[i] == 0 &&
        fractionLinesArray[index][startIndex][4] % primeNumbers[i] == 0
      ) {
        handleSetError(simplifyIt[languageIndex]);
        console.log("noMulti call setOkButtonStage(1)");
        setOkButtonStage(1);
        return false;
      }
    }
    /*** setCalculationStage(4);
    console.log("noMulti call setOkButtonStage(1)");
    setOkButtonStage(1);
    //*** setIndexDecreasedByLastStage(endIndex - startIndex);
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    setFractionIndexInProcess([startIndex, startIndex]);
    noImproperFractionCheck(index, false, startIndex, startIndex);*/
    if (//*** */
      fractionLinesArray[index].length > 2 &&
      (includes(["×", "÷"], fractionLinesArray[index][startIndex][0]) ||
      includes(["×", "÷"], fractionLinesArray[index][startIndex + 1][0]))
    ) {
      nextNewStep(index);
    } else {
      setCalculationStage(4);
      console.log("noMulti call setOkButtonStage(1)");
      setOkButtonStage(1);
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
      console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
      setFractionIndexInProcess([startIndex, startIndex]);
      noImproperFractionCheck(index, false, startIndex, startIndex);
    } //*** */
    //addLine();
    return true;
  }
  setCalculationStage(4);
  setIndexDecreasedByLastStage(endIndex - startIndex);
  setStartEndIndexLastLine([startIndex, startIndex]); //*** */
  noImproperFractionCheck(index, false, startIndex, startIndex);
  return true;
}

export function otherFractionsCheck2(index, startIndex, endIndex, decrease, issue, fractionLinesArray, languageIndex, handleSetError, oneSectionFractionCheck, stepMessage, fractionIndexInProcess, startEndIndexLastLine, indexDecreasedByLastStage) {
  console.log("otherFractionsCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("decrease:" + decrease);
  if (
    fractionLinesArray[index].length !==
    fractionLinesArray[index - 1].length - decrease
  ) {
    //setErrorMessage("number of fractions is not correct");
    if (decrease === 0) {
      /*let middleMessage =
        fractionIndexInProcess[0] === fractionIndexInProcess[1]
          ? ""
          : sameNumberOfFractions2[languageIndex] +
            (fractionIndexInProcess[1] + 1);
      setErrorMessage(
        sameNumberOfFractions1[languageIndex] +
          (fractionIndexInProcess[0] + 1) +
          middleMessage +
          sameNumberOfFractions3[languageIndex]
      );*/
      handleSetError(stepMessage(startIndex, endIndex, issue, 0));
    } else {
      handleSetError(decreaseMessage[languageIndex] + stepMessage(startIndex, endIndex, issue, decrease));
    }
    return false;
  }
  if (startIndex === 0) {
    return oneSectionFractionCheck(
      index,
      endIndex + 1,
      fractionLinesArray[index].length - 1,
      decrease,
      false,//with left fractions?
      endIndex + 1 === fractionLinesArray[index].length - 1,//with right fractions?
      issue,
      startIndex,
      endIndex
    );
  } else if (startIndex > 0) {
    if (
      fractionLinesArray[index][startIndex][0] !==
      fractionLinesArray[index - 1][startIndex][0]
    ) {
      handleSetError(operatorBeforeStep[languageIndex]);
      return false;
    }
    return (
      oneSectionFractionCheck(index, 0, startIndex - 1, decrease, true, endIndex + 1 === fractionLinesArray[index].length - 1, issue, startIndex, endIndex) &&
      oneSectionFractionCheck(
        index,
        endIndex + 1,
        fractionLinesArray[index].length - 1,
        decrease,
        true,
        endIndex + 1 === fractionLinesArray[index].length - 1,
        issue,
        startIndex,
        endIndex
      )
    );
  }
}

export function oneSectionFractionCheck2(index, startIndex, endIndex, decrease, withLeft, withRight, issue, originalStart, originalEnd, handleSetError, stepMessage, fractionLinesArray, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, languageIndex) {
  console.log("oneSectionFractionCheck");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  let decreaseTmp = (startIndex === 0 ? 0 : decrease);
  var i;
  for (i = startIndex; i < endIndex + 1; i++) {
    console.log("decrease:" + decrease);
    console.log("i:" + i);
    console.log("index:" + index);
    console.log(fractionLinesArray[index][i]);
    console.log(fractionLinesArray[index - 1][i + decreaseTmp]);
    //*** */
    if (
      fractionLinesArray[index][i][0] !==
      fractionLinesArray[index - 1][i + decreaseTmp][0] ||
      fractionLinesArray[index][i][1] !==
      fractionLinesArray[index - 1][i + decreaseTmp][1] ||
      fractionLinesArray[index][i][3] !==
      fractionLinesArray[index - 1][i + decreaseTmp][3] ||
      fractionLinesArray[index][i][4] !==
      fractionLinesArray[index - 1][i + decreaseTmp][4]
    ) {
      //*** */if (JSON.stringify(fractionLinesArray[index][i]) !== JSON.stringify(fractionLinesArray[index - 1][i + decrease])) {
      //setErrorMessage("keep other fractions and operators the same");
      if (decrease > 0) {
        handleSetError(decreaseMessage[languageIndex] + stepMessage(originalStart, originalEnd, issue, decrease));
      } else {
        /*let middleMessage =
           fractionIndexInProcess[0] === fractionIndexInProcess[1]
             ? ""
             : keepOthers2[languageIndex] + (fractionIndexInProcess[1] + 1);
         setErrorMessage(
           keepOthers1[languageIndex] +
             (fractionIndexInProcess[0] + 1) +
             middleMessage +
             keepOthers3[languageIndex]
         );*/
        handleSetError(keepOthers1[languageIndex] + stepMessage(originalStart, originalEnd, issue, 0));
      }
      return false;
    }
  }
  return true;
}

export function noBracketCheck2(index, checkValueNeeded, bracketArray, noMixedCalCheck, setFractionIndexInProcess, bracketStage, mixedStage, fractionLinesArray, setMixedStageArray, setMixedStage, lastMixBrackArray, mixedStageArray, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, handleSetError, languageIndex) {
  console.log("noBracketCheck");
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("mixedStageArray:" + mixedStageArray);
  console.log("call noBracketCheck");
  console.log("mixedStage:" + mixedStage);
  console.log("lastMixBrackArray in noBracketCheck" + lastMixBrackArray);
  if (!checkValueNeeded) {
    if (bracketArray[index].length == 0) {
      //no bracket
      //setMixedStage("hasMixedCal");
      //setBracketStage("");
      if (mixedStage === "hasBracket") {
        //change state and fire next function in useEffect
        setMixedStage("hasMixedCal");
        setMixedStageArray({
          mixedStage: "hasMixedCal",
          type: "",
          startIndex: 0,
          endIndex: fractionLinesArray[index].length - 2
        });
      } else {
        console.log("set start index to 0");
        //***set some index? */
        noMixedCalCheck(
          index,
          false,
          0,
          fractionLinesArray[index].length - 2
        ); //with start index and end index
      }
      console.log(fractionLinesArray[index].length - 2);
      //noMixedCalCheck(index, false, 0, fractionLinesArray[index].length - 2); //with start index and end index
      return true;
    } else if (bracketArray[index].length % 2 === 0) {
      //bracket even number
      console.log("even brackets and set as hasBracket");
      console.log("mixedStage: " + mixedStage);
      console.log("bracketStage:" + bracketStage);
      //setMixedStage("hasBracket");
      //setBracketStage("hasMixedCal");
      console.log("set start end in noBracketCheck");
      console.log(
        "setFractionIndexInProcess with: " +
        bracketArray[index][0] +
        bracketArray[index][1]
      );
      setFractionIndexInProcess([
        bracketArray[index][0],
        bracketArray[index][1]
      ]); //*** */
      noMixedCalCheck(
        index,
        false,
        bracketArray[index][0],
        bracketArray[index][1]
      ); //with start index and end index
      return false;
    } else {
      //bracket odd number
      handleSetError(oddBrackets[languageIndex]);
      return false;
    }
  } else {
    //check values
  }
}

export function callbackOfBracketStage2(typeOfCal, startIndex, endIndex, formulaFocusedIndex, setFractionIndexInProcess, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, noMixedFractionCheck, addLine, noVariousDenominatorCheck) {
  console.log("callback");
  console.log("typeOfCal:" + typeOfCal);
  console.log("bracketStage callback");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
  setFractionIndexInProcess([startIndex, endIndex]); //*** */
  //if (stageOrder.stage === -1 || formulaFocusedIndex > 0) {//stage !==-1
  if (typeOfCal === "M&D") {
    noMixedFractionCheck(
      formulaFocusedIndex,
      false,
      startIndex,
      endIndex,
      true /*** */
    );
  } else if (typeOfCal === "A&S") {
    addLine();
    if (
      !noVariousDenominatorCheck(
        formulaFocusedIndex,
        false,
        startIndex,
        endIndex
      )
    ) {
      return;
    }
  }
  //}
}

export async function noMixedCalCheck2(
  index, checkValueNeeded, startIndex, endIndex, callbackOfBracketStage, mixedStage, setBracketStage, setBracketStageArray, bracketStage, setFractionIndexInProcess, startEndIndexLastLine, setIndexDecreasedByLastStage, calculationStage, setTypeOfCalculation, setStartEndIndexLastLine, setMixedStageArray, setMixedStage, setCalculationStage, mixedStageArray, typeOfCalculation, stageOrder, okButtonStage, fractionLinesArray, formulaFocusedIndex, indexDecreasedByLastStage, fractionIndexInProcess, lastMixBrackArray, completed, setOkButtonStage
) {
  console.log("index:" + index);
  console.log("call noMixedCalCheck");
  console.log("mixedStage:" + mixedStage);
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  console.log("lastMixBrackArray in noMixedCal" + lastMixBrackArray);
  console.log("formulaFocusedIndex:" + formulaFocusedIndex);
  console.log("completed:" + completed);
  console.log("fractionLinesArray:" + fractionLinesArray);
  console.log("okButtonStage:" + okButtonStage);
  console.log("calculationStage" + calculationStage);
  console.log("stageOrder:" + stageOrder);
  console.log("typeOfCalculation" + typeOfCalculation);
  console.log("mixedStageArray" + mixedStageArray);

  setOkButtonStage(0);
  setCalculationStage(0);
  if (!checkValueNeeded) {
    let A_S = false;
    let M_D = false;
    let M_D_startIndex = 0;
    let M_D_endIndex = 0;
    let i = 0;
    for (i = startIndex + 1; i < endIndex + 1; i++) {
      if (includes(["+", "-"], fractionLinesArray[index][i][0])) {
        A_S = true;
      } else {
        //it is M or D
        if (!M_D) {
          M_D_startIndex = i - 1;
          M_D_endIndex = i;
        } else if (M_D_endIndex === i - 1) {
          M_D_endIndex = i;
        }
        M_D = true;
      }
    }
    console.log("A_S: " + A_S);
    console.log("M_D:" + M_D);
    setCalculationStage(0);
    if (A_S && M_D) {
      //MixedCal
      setTypeOfCalculation("M&D");
      //*** */setIndexDecreasedByLastStage(M_D_endIndex - M_D_startIndex);
      setIndexDecreasedByLastStage(0); //*** */
      console.log("M_D_startIndex:" + M_D_startIndex);
      console.log("M_D_endIndex:" + M_D_endIndex);
      console.log("mixedStage:" + mixedStage);
      console.log("bracketStage:" + bracketStage);
      console.log(
        "setFractionIndexInProcess with: " + M_D_startIndex + M_D_endIndex
      );
      setFractionIndexInProcess([M_D_startIndex, M_D_endIndex]);
      if (mixedStage === "hasBracket") {
        //setBracketStage("hasMixedCal");
        if (bracketStage === "hasMixedCal") {
          //no state change, call function here
          console.log("call callbackOfBracketStage directly");
          callbackOfBracketStage("M&D", M_D_startIndex, M_D_endIndex);
        } else {
          //change state and call function in useEffect
          console.log("setBracketStage first");
          //*** */
          setBracketStageArray({
            bracketStage: "hasMixedCal",
            type: "M&D",
            startIndex: M_D_startIndex,
            endIndex: M_D_endIndex
          });
          setBracketStage("hasMixedCal");
        }
      } else {
        //setMixedStage("hasMixedCal");
        if (mixedStage === "hasMixedCal") {
          //no state change, call function here
          callbackOfBracketStage("M&D", M_D_startIndex, M_D_endIndex);
        } else {
          //change state and call function in useEffect
          setMixedStage("hasMixedCal");
          setMixedStageArray({
            mixedStage: "hasMixedCal",
            type: "M&D",
            startIndex: M_D_startIndex,
            endIndex: M_D_endIndex
          });
        }
      }
      return false;
    } else if (A_S) {
      //A&S
      setTypeOfCalculation("A&S");
      setStartEndIndexLastLine([startIndex, endIndex]); //*** */
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
      setIndexDecreasedByLastStage(0); //*** */
      console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
      setFractionIndexInProcess([startIndex, endIndex]); //*** */
      console.log("startIndex:" + startIndex);
      console.log("endIndex:" + endIndex);
      if (calculationStage === 2) {
        //                
        //*** */setFractionIndexInProcess([startEndIndexLastLine[0], startEndIndexLastLine[0]]);//
        //*** */setFractionIndexInProcess(startIndex, endIndex);
      } else {
        //                
      } //
      if (mixedStage === "hasBracket") {
        //setBracketStage("noMixedCal");
        if (bracketStage === "noMixedCal") {
          //no state change, call function
          callbackOfBracketStage("A&S", startIndex, endIndex);
          /*addLine();
          if (
            !noVariousDenominatorCheck(
              formulaFocusedIndex,
              false,
              startIndex,
              endIndex
            )
          ) {
            return;
          }*/
        } else {
          //change state, call function in useEffect
          //*** */
          setBracketStageArray({
            bracketStage: "noMixedCal",
            type: "A&S",
            startIndex: startIndex,
            endIndex: endIndex
          });

          setBracketStage("noMixedCal");
        }
      } else {
        //setMixedStage("noMixedCal");
        if (mixedStage === "noMixedCal") {
          //no state change, call function
          console.log("call callback directly with start 0");
          callbackOfBracketStage("A&S", startIndex, endIndex);
          /*addLine();
          if (
            !noVariousDenominatorCheck(
              formulaFocusedIndex,
              false,
              startIndex,
              endIndex
            )
          ) {
            return;
          }*/
        } else {
          //change state, call function in useEffect
          //setBracketStage("MixedStage from hasMixedCal to noMixedCal");
          console.log("setMixedStage first");
          setMixedStage("noMixedCal");
          setMixedStageArray({
            mixedStage: "noMixedCal",
            type: "A&S",
            startIndex: startIndex,
            endIndex: endIndex
          });
        }
      }

      /*addLine();
      if (
        !noVariousDenominatorCheck(
          formulaFocusedIndex,
          false,
          startIndex,
          endIndex
        )
      ) {
        return;
      }*/
      return true;
    } else {
      //M&D only
      console.log("In M&D mixedStage:" + mixedStage);
      setStartEndIndexLastLine([startIndex, endIndex]); //*** */
      setTypeOfCalculation("M&D");
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
      //good
      if (calculationStage === 3) {
        //
        console.log(
          "setFractionIndexInProcess with: " +
          startEndIndexLastLine[0] +
          startEndIndexLastLine[0]
        );
        setFractionIndexInProcess([
          startEndIndexLastLine[0],
          startEndIndexLastLine[0]
        ]); //
        setIndexDecreasedByLastStage(
          startEndIndexLastLine[1] - startEndIndexLastLine[0]
        ); //*** */
      } else {
        //
        console.log(
          "setFractionIndexInProcess with: " + startIndex + endIndex
        );
        setFractionIndexInProcess([startIndex, endIndex]); //*** */
      } //

      if (mixedStage === "hasBracket") {
        console.log("has bracket and no mixed in bracket");
        if (bracketStage === "noMixedCal") {
          //no state change, call function
          callbackOfBracketStage("M&D", startIndex, endIndex);
          //noMixedFractionCheck(formulaFocusedIndex, false, startIndex, endIndex);
        } else {
          //change state, call function in useEffect
          //*** */
          setBracketStageArray({
            bracketStage: "noMixedCal",
            type: "M&D",
            startIndex: startIndex,
            endIndex: endIndex
          });

          setBracketStage("noMixedCal");
        }
        //setBracketStage("noMixedCal");
      } else {
        if (mixedStage === "noMixedCal") {
          //no state change, call function
          callbackOfBracketStage("M&D", startIndex, endIndex);
          //noMixedFractionCheck(formulaFocusedIndex, false, startIndex, endIndex);
        } else {
          //change state, call function in useEffect
          //setBracketStage("MixedStage from hasMixedCal to noMixedCal");
          setMixedStage("noMixedCal");
          setMixedStageArray({
            mixedStage: "noMixedCal",
            type: "M&D",
            startIndex: startIndex,
            endIndex: endIndex
          });
        }
      }
      console.log("formulaFocusedIndex: " + formulaFocusedIndex);
      //noMixedFractionCheck(formulaFocusedIndex, false, startIndex, endIndex);
      return true;
    }
  } else {
    //check values
  }
}

export function checkSimplifyValue2(index, checkValue, startIndex, endIndex, fractionLinesArray, typeOfCalculation, addLine, setStartEndIndexLastLine, setFractionIndexInProcess, setCalculationStage, setIndexDecreasedByLastStage, setPartValue, primeNumbers, languageIndex, handleSetError, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, setOkButtonStage, nextNewStep, noImproperFractionCheck, okClick, reduceDecimalPositionArray, setReduceDecimalPositionArray, reduceDecimalInProcess, setReduceDecimalInProcess) {
  console.log("checkSimplifyValue");
  console.log("startIndex+endIndex:" + startIndex + endIndex);
  console.log("startEndIndexLastLine:" + startEndIndexLastLine);
  console.log("fractionIndexInProcess:" + fractionIndexInProcess);
  console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
  var newNumerator = 1;
  var newDenominator = 1;
  var numeratorDeduceFactor = 1;
  var denominatorDeduceFactor = 1;
  var i;
  for (i = startIndex; i < endIndex + 1; i++) {
    if (fractionLinesArray[index][i][2] > 0) {
      if (
        fractionLinesArray[index][i][3] % fractionLinesArray[index][i][2] ==
        0
      ) {
        newNumerator *= fractionLinesArray[index][i][2];
        numeratorDeduceFactor *=
          fractionLinesArray[index][i][3] / fractionLinesArray[index][i][2];
      } else {
        handleSetError(beAFactorOfNumerator[languageIndex]);
        return false;
      }
    } else {
      newNumerator *= fractionLinesArray[index][i][3];
    }
    if (fractionLinesArray[index][i][5] > 0) {
      if (
        fractionLinesArray[index][i][4] % fractionLinesArray[index][i][5] ==
        0
      ) {
        newDenominator *= fractionLinesArray[index][i][5];
        denominatorDeduceFactor *=
          fractionLinesArray[index][i][4] / fractionLinesArray[index][i][5];
      } else {
        handleSetError(beAFactorOfDenominator[languageIndex]);
        return false;
      }
    } else {
      newDenominator *= fractionLinesArray[index][i][4];
    }
  }
  if (numeratorDeduceFactor != denominatorDeduceFactor) {
    handleSetError(sameFactorInReduction[languageIndex]);
    return false;
  }
  for (i = 0; i < primeNumbers.length; i++) {
    if (
      newNumerator % primeNumbers[i] == 0 &&
      newDenominator % primeNumbers[i] == 0
    ) {
      handleSetError(
        furtherReduceFactorLeft[languageIndex] +
        primeNumbers[i] +
        furtherReduceFactorRight[languageIndex]
      );
      return false;
    } else {
      if (
        primeNumbers[i] ** 1 > newNumerator || //***&&
        primeNumbers[i] ** 1 > newDenominator //*** */
      ) {
        i = primeNumbers.length;
      }
    }
  }
  for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
    if (fractionLinesArray[index][i][2] > 0) {
      setPartValue(
        fractionLinesArray[index][i][2],
        i,
        3,
        false,
        false,
        false
      );
    }
    if (fractionLinesArray[index][i][5] > 0) {
      setPartValue(
        fractionLinesArray[index][i][5],
        i,
        4,
        false,
        false,
        false
      );
    }
  }
  setIndexDecreasedByLastStage(endIndex - startIndex);
  console.log("endIndex:" + endIndex); //bad
  console.log("startIndex:" + startIndex);
  if (!reduceDecimalInProcess) {setOkButtonStage(0);}
  if (checkValue) {
    //noMultiplicationCheck(index, false);
  }
  console.log("typeOfCalculation:" + typeOfCalculation);
  console.log("reduceDecimalInProcess"+reduceDecimalInProcess)
  console.log("reduceDecimalPositionArray.length"+reduceDecimalPositionArray.length)
  if (reduceDecimalInProcess) {
    if (reduceDecimalPositionArray.length > 2) {
      let reduceIndex = reduceDecimalPositionArray[2];
      setFractionIndexInProcess([reduceIndex, reduceIndex]);
      let oldReduceArray = [...reduceDecimalPositionArray];
      let newReduceArray = oldReduceArray.slice(1, oldReduceArray.length - 1);
      setReduceDecimalPositionArray(newReduceArray);
      return true;      
    } else {
      setReduceDecimalInProcess(false);
      nextNewStep(index);      
      return true;
    }
  }
  if (typeOfCalculation === "M&D") {
    console.log("setFractionIndexInProcess with: " + startIndex + endIndex);
    setCalculationStage(3);
    setFractionIndexInProcess([startIndex, startIndex]); //
    setStartEndIndexLastLine([startIndex, endIndex]); //***
    addLine();
  } else if (typeOfCalculation === "A&S") {
    //complete this step
    //*** */
    /*if (fractionLinesArray[index].length === 2) {
      setCalculationStage(4);
      noImproperFractionCheck(index, false, startIndex, startIndex);
    } else if (fractionLinesArray[index].length > 2) {
      nextNewStep(index);
    }*/
    //*** */
    if (
      fractionLinesArray[index].length > 2 &&
      (includes(["×", "÷"], fractionLinesArray[index][startIndex][0]) ||
      includes(["×", "÷"], fractionLinesArray[index][startIndex + 1][0]))
    ) {
      nextNewStep(index);
    } else {
      setCalculationStage(4);
      noImproperFractionCheck(index, false, startIndex, startIndex);
    } //*** */
  }
  return true;
}