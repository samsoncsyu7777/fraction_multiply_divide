
import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { FractionFormula } from "../components/FractionFormulaComponents";//b
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";//b
import { compare2LayerArray } from "../functions/CommonFunctions";
import {
  positiveResultCheck2,//b
  parenthesesMessage2,
  stepMessage2,
  noVariousDenominatorCheck2,
  noNegativeNumeratorResultCheck2,
  addToOneFractionCheck2,
  fractionOrIntegerCheck2,
  singleNumberCheck2,
  noImproperFractionCheck2,
  noMixedFractionCheck2,
  noDivisionCheck2,
  noMultiplicationCheck2,
  otherFractionsCheck2,
  oneSectionFractionCheck2,
  noBracketCheck2,
  callbackOfBracketStage2,
  noMixedCalCheck2,
  checkSimplifyValue2,//b
} from "../functions/FractionMultiplyDivideFunctions";
import constants from "../constants/FractionMultiplyDivideConstants";//a,b
import { timeDelay } from "../constants/MainControllerConstants";
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";//a,b
import { pagesStyles } from "../themes/styles";//a,b
import { theme as myTheme } from "../themes/theme";//a,b

//×÷👍👍🏻
export const FractionUnitController = ({
  languageIndex,
  topicToolIndex,
  completed,
  setCompleted,
  stageOrder,
  isLogined,
  handleSetError,
  clearFirstLineForSelfLearning,
  callResetDefault,
  typeAndFormulaAnswerArrayForAnyStage,
  callResetClickForOtherPurpose,
  callKeypadClick,
  completeFunction,
  responseArrayForAnyStage,
  wrongFractionAnswerArrayForAnyStage,
  resetClick,
  callIncreaseFormulaIndex
}) => {
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);//b
  const [fractionLinesArray, setFractionLinesArray] = useState([//b
    [
      ["", 0, 0, 0, 0, 0],
      ["", 0, 0, 0, 0, 0]
    ]
  ]);
  const [bracketArray, setBracketArray] = useState([[]]);//b
  const [fractionPositionIndex, setFractionPositionIndex] = useState(0);//b
  const [fractionPartIndex, setFractionPartIndex] = useState(3);//b
  const [okButtonStage, setOkButtonStage] = useState(0);//b //"Enter", "Reduce?", "Completed"
  const [calculationStage, setCalculationStage] = useState(0);//b //0:with mixed number, 1:with division, 2:need simplify, 3:with multiplication, 4:improper number, 5:completed
  const [calculatedLcm, setCalculatedLcm] = useState(1);//b
  const { topicIndex, learningToolIndex } = topicToolIndex;//a, b
  const primeNumbers = getPrimeNumbers();//b
  const [startEndIndexLastLine, setStartEndIndexLastLine] = useState([0, 0]); //b
  const [indexDecreasedByLastStage, setIndexDecreasedByLastStage] = useState(0);//b
  const [typeOfCalculation, setTypeOfCalculation] = useState("");//b //"A&S" or "M&D"
  const [mixedStage, setMixedStage] = useState("hasBracket");//b //"hasMixedCal" or "noMixedCal"
  const [fractionIndexInProcess, setFractionIndexInProcess] = useState([0, 1]);//b //need to change
  const [bracketStage, setBracketStage] = useState("");//b //"hasMixedCal" or "noMixedCal"
  const [bracketStageArray, setBracketStageArray] = useState({//b
    bracketStage: "",
    type: "",
    startIndex: 0,
    endIndex: 1
  });
  const [mixedStageArray, setMixedStageArray] = useState({//b
    mixedStage: "hasBracket",
    type: "",
    startIndex: 0,
    endIndex: 1
  });
  const [lastMixBrackArray, setLastMixBrackArray] = useState({//b
    lastMix: "",
    lastBrack: ""
  });

  const {
    noOperator,//b
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
    furtherReduceFactorRight,//b
    noMixedBeforeReduction,//b(a call be functions)
    noDivisionBeforeReduction,//b
    //a&s
    atLeastOneFraction,//b
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
    noMultipleIssue,//b    
    okButtonText,

  } = constants;

  //both versions equal and need to get answers, brackets and responses
  useEffect(() => {//b
    console.log(fractionLinesArray[0]);
    console.log("fractionLinesArray.length:" + fractionLinesArray.length);
    console.log("completed:" + completed);
    if (
      ((stageOrder.stage > -1 && typeAndFormulaAnswerArrayForAnyStage[0] === "fractionFormula") || (stageOrder.stage === -2 && isLogined && typeAndFormulaAnswerArrayForAnyStage[0] === "fractionFormula")) &&
      formulaFocusedIndex === 0 &&
      fractionLinesArray[0][1][0] != "" &&
      calculationStage < 2 &&
      fractionLinesArray.length === 1
    ) {
      //get question and go to next stage
      okClick();
    }
  }, [fractionLinesArray]);

  useEffect(() => {
    setFormulaFocusedIndex((prevState) => prevState + 1); //b
  }, [callIncreaseFormulaIndex]);

  //equal
  useEffect(() => {//a and a call function b    
    setFormulaFocusedIndex(0);//b
    setOkButtonStage(0);//b
    setCalculationStage(0);//b
    setIndexDecreasedByLastStage(0);//b
    setTypeOfCalculation("");//b
    setMixedStage("hasBracket");//b
    console.log("setFractionIndexInProcess with: 01");
    setFractionIndexInProcess([0, 1]);//b
    setBracketStage("");//b
    setStartEndIndexLastLine([0, 0]);//b //***
    setLastMixBrackArray({ lastMix: "", lastBrack: "" });//b 
  }, [callResetDefault]);

  useEffect(() => {//resetQustion A
    setFractionLinesArray([//call function b
      [
        ["", 0, 0, 0, 0, 0],
        ["", 0, 0, 0, 0, 0]
      ]
    ]);
    setBracketArray([[]]);
  }, [clearFirstLineForSelfLearning]);

  useEffect(() => {//resetQuestionC
    switch (typeAndFormulaAnswerArrayForAnyStage[0]) {
      case "fractionText": {//call function b
        //set formula line 0
        setFractionLinesArray([
          [
            ["", 0, 0, 0, 0, 0],
            ["", 0, 0, 0, 0, 0]
          ]
        ]);
        setBracketArray([[]]);
        break;
      };
      case "fractionFormula": {
        console.log(typeAndFormulaAnswerArrayForAnyStage[1][0])
        let tmpArray = [];
        let i;
        for (i = 0; i < typeAndFormulaAnswerArrayForAnyStage[1][0].length - 1; i++) {
          tmpArray.push(typeAndFormulaAnswerArrayForAnyStage[1][0][i]);
        }
        tmpArray.push(["", 0, 0, 0, 0, 0]);
        setBracketArray([typeAndFormulaAnswerArrayForAnyStage[1][0][typeAndFormulaAnswerArrayForAnyStage[1][0].length - 1]]);
        setFractionLinesArray([tmpArray]);
        break;
      };
      default: {
        break;
      }
    }
  }, [typeAndFormulaAnswerArrayForAnyStage]);

  useEffect(() => {
    if (okButtonStage > 0) {//call b
      if (typeOfCalculation === "M&D") {
        if (calculationStage == 2) {
          checkSimplifyValue(
            formulaFocusedIndex,
            false,
            fractionIndexInProcess[0],
            fractionIndexInProcess[1]
          );
        } else {
          addLine();
        }
      } else if (typeOfCalculation === "A&S") {
        if (calculationStage == 3) {
          var checkValue = false;
          if (
            fractionLinesArray[formulaFocusedIndex][
            startEndIndexLastLine[0]
            ][4] > 0
          ) {
            //lastLinePosition[0]
            checkValue = true;
          }
          checkSimplifyValue(
            formulaFocusedIndex,
            checkValue,
            fractionIndexInProcess[0],
            fractionIndexInProcess[0]
          );
        } else {
          // addLine();
        }
      }
    }
  }, [callResetClickForOtherPurpose]);

  //equal
  async function addLine() {//b
    console.log("addLine");
    console.log("fractionLinesArray.length:" + fractionLinesArray.length);
    setLastMixBrackArray({ lastMix: mixedStage, lastBrack: bracketStage });
    let tmpIndex = [...fractionIndexInProcess];
    let bracketFormula = [...bracketArray];
    bracketFormula.push([]);
    setBracketArray(bracketFormula);
    setPartValue(0, -1, -1, true, false, false);
    setFormulaFocusedIndex((prevState) => prevState + 1);
    setOkButtonStage(0);
  }

  //A&S only. Need both A&S and mixed versions -> This version can serve both
  function positiveResultCheck(index, startIndex, endIndex) {
    return positiveResultCheck2(index, startIndex, endIndex, bracketArray, fractionLinesArray, handleSetError, languageIndex);
  }

  const parenthesesMessage = (newLength, lastLength) => {
    return parenthesesMessage2(newLength, lastLength, languageIndex);
  }

  const stepMessage = (startIndex, endIndex, issue, decrease) => {//b
    return stepMessage2(startIndex, endIndex, issue, decrease, languageIndex, fractionLinesArray, formulaFocusedIndex);
  }

  //A&S only
  function noVariousDenominatorCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    return noVariousDenominatorCheck2(
      index, checkValueNeeded, startIndex, endIndex, setFractionIndexInProcess, setCalculationStage, setCalculatedLcm, languageIndex, handleSetError, primeNumbers, fractionLinesArray, stepMessage, bracketArray, parenthesesMessage, otherFractionsCheck, noNegativeNumeratorResultCheck, fractionIndexInProcess, startEndIndexLastLine, indexDecreasedByLastStage, setStartEndIndexLastLine, addLine
    );
  }

  //A&S only. need both A&S and mixed versions
  function noNegativeNumeratorResultCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    return noNegativeNumeratorResultCheck2(index, checkValueNeeded, startIndex, endIndex, setCalculationStage, setIndexDecreasedByLastStage, languageIndex, handleSetError, calculatedLcm, fractionLinesArray, bracketArray, stepMessage, parenthesesMessage, setFractionIndexInProcess, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, otherFractionsCheck, setStartEndIndexLastLine, addLine);
  }

  //A&S only
  function addToOneFractionCheck(index, startIndex, endIndex) {
    return addToOneFractionCheck2(index, startIndex, endIndex, setCalculationStage, languageIndex, handleSetError, fractionLinesArray, calculatedLcm, startEndIndexLastLine, bracketArray, parenthesesMessage, bracketStage, mixedStage, indexDecreasedByLastStage, otherFractionsCheck, fractionIndexInProcess, setOkButtonStage, setFractionIndexInProcess);
  }

  //equal //for whole formula
  function fractionOrIntegerCheck(index) {
    return fractionOrIntegerCheck2(index, fractionLinesArray, handleSetError, languageIndex);
  }

  //equal //for question whole formula only
  function singleNumberCheck(index) {
    return singleNumberCheck2(index, fractionLinesArray, languageIndex, handleSetError);
  }

  //little bit differ, fix it for mixed final stage //for whole formula?
  function noImproperFractionCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    return noImproperFractionCheck2(
      completeFunction, index, checkValueNeeded, startIndex, endIndex, setCompleted, setFormulaFocusedIndex, languageIndex, handleSetError, mixedStage, nextNewStep, typeOfCalculation, fractionLinesArray, parenthesesMessage, bracketArray, setFractionIndexInProcess, formulaFocusedIndex, otherFractionsCheck, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, setStartEndIndexLastLine, addLine, calculationStage
    )
  }

  function nextNewStep(index) {//b
    console.log("nextNewStep");
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    setCalculationStage(0);
    setOkButtonStage(0);
    if (mixedStage === "hasBracket") {
      noBracketCheck(index, false);
    } else {
      console.log("set start to 0 in nextnewStep");
      setStartEndIndexLastLine([
        fractionIndexInProcess[0],
        fractionIndexInProcess[1]
      ]);
      noMixedCalCheck(index, false, 0, fractionLinesArray[index].length - 2);
    }
  }

  //M&D only
  function noMixedFractionCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex,
    isNewStepTmp
  ) {
    return noMixedFractionCheck2(
      index, checkValueNeeded, startIndex, endIndex, isNewStepTmp, setCalculationStage, languageIndex, handleSetError, fractionLinesArray, stepMessage, bracketArray, parenthesesMessage, noDivisionCheck, setFractionIndexInProcess, calculationStage, otherFractionsCheck, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, addLine
    )
  }

  //M&D only
  function noDivisionCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex,
    isNewStepTmp
  ) {
    return noDivisionCheck2(
      index, checkValueNeeded, startIndex, endIndex, isNewStepTmp, languageIndex, handleSetError, fractionLinesArray, stepMessage, bracketArray, parenthesesMessage, setCalculationStage, setStartEndIndexLastLine, setFractionIndexInProcess, calculationStage, otherFractionsCheck, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, addLine, setOkButtonStage
    );
  }

  //M&D only
  function noMultiplicationCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    return noMultiplicationCheck2(
      index, checkValueNeeded, startIndex, endIndex, setIndexDecreasedByLastStage, setCalculationStage, noImproperFractionCheck, nextNewStep, fractionLinesArray, setOkButtonStage, languageIndex, handleSetError, primeNumbers, startEndIndexLastLine, bracketArray, parenthesesMessage, bracketStage, mixedStage, indexDecreasedByLastStage, lastMixBrackArray, fractionIndexInProcess, otherFractionsCheck, setFractionIndexInProcess, setStartEndIndexLastLine
    );
  }

  function otherFractionsCheck(index, startIndex, endIndex, decrease, issue) {
    return otherFractionsCheck2(index, startIndex, endIndex, decrease, issue, fractionLinesArray, languageIndex, handleSetError, oneSectionFractionCheck, stepMessage, fractionIndexInProcess, startEndIndexLastLine, indexDecreasedByLastStage);
  }

  function oneSectionFractionCheck(index, startIndex, endIndex, decrease, withLeft, withRight, issue, orginalStart, orginalEnd) {
    return oneSectionFractionCheck2(index, startIndex, endIndex, decrease, withLeft, withRight, issue, orginalStart, orginalEnd, handleSetError, stepMessage, fractionLinesArray, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, languageIndex);
  }

  useEffect(() => {//b
    console.log("mixedStageArray callback");
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    console.log("mixedStageArray:" + mixedStageArray);
    if (mixedStageArray.mixedStage === "hasMixedCal") {
      if (fractionLinesArray[0].length > 2 || formulaFocusedIndex > 0) {
        console.log("call noMix in hasMixed");
        noMixedCalCheck(
          formulaFocusedIndex,
          false,
          0,
          fractionLinesArray[formulaFocusedIndex].length - 2
        ); //with start index and end index
      }
    } else if (mixedStageArray.mixedStage === "noMixedCal") {
      console.log("call callback in noMixed");
      callbackOfBracketStage(
        mixedStageArray.type,
        mixedStageArray.startIndex,
        mixedStageArray.endIndex
      );
    }
  }, [mixedStageArray]);

  function noBracketCheck(index, checkValueNeeded) {
    return noBracketCheck2(index, checkValueNeeded, bracketArray, noMixedCalCheck, setFractionIndexInProcess, bracketStage, mixedStage, fractionLinesArray, setMixedStageArray, setMixedStage, lastMixBrackArray, mixedStageArray, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, handleSetError, languageIndex);
  }

  useEffect(() => {//b
    console.log("bracketStage callback");
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    console.log(
      "mixedStageArray:" +
      mixedStageArray.mixedStage +
      mixedStageArray.startIndex +
      mixedStageArray.endIndex
    );
    console.log(
      "bracketStageArray:" +
      bracketStageArray.bracketStage +
      bracketStageArray.type +
      bracketStageArray.startIndex +
      bracketStageArray.endIndex
    );

    callbackOfBracketStage(
      bracketStageArray.type,
      bracketStageArray.startIndex,
      bracketStageArray.endIndex
    );
  }, [bracketStageArray]);

  function callbackOfBracketStage(typeOfCal, startIndex, endIndex) {
    return callbackOfBracketStage2(typeOfCal, startIndex, endIndex, formulaFocusedIndex, setFractionIndexInProcess, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, noMixedFractionCheck, addLine, noVariousDenominatorCheck);
  }

  async function noMixedCalCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    return await noMixedCalCheck2(
      index, checkValueNeeded, startIndex, endIndex, callbackOfBracketStage, mixedStage, setBracketStage, setBracketStageArray, bracketStage, setFractionIndexInProcess, startEndIndexLastLine, setIndexDecreasedByLastStage, calculationStage, setTypeOfCalculation, setStartEndIndexLastLine, setMixedStageArray, setMixedStage, setCalculationStage, mixedStageArray, typeOfCalculation, stageOrder, okButtonStage, fractionLinesArray, formulaFocusedIndex, indexDecreasedByLastStage, fractionIndexInProcess, lastMixBrackArray, completed, setOkButtonStage
    )
  }

  //both versions differ, also need mixed version. So, it needs 3 versions
  function enterCheck() {//b
    console.log("enterCheck");
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    let isNewStepTmp = false;
    if (typeAndFormulaAnswerArrayForAnyStage[0] === "fractionText" && formulaFocusedIndex === 0) {
      if (!textQuestionFormulaCheck()) {
        return;
      }
    }
    if (!fractionOrIntegerCheck(formulaFocusedIndex)) {
      return;
    }
    if (formulaFocusedIndex == 0) {
      if (!singleNumberCheck(formulaFocusedIndex)) {
        return;
      }
      if (
        !positiveResultCheck(
          formulaFocusedIndex,
          0,
          fractionLinesArray[formulaFocusedIndex].length - 2
        )
      ) {
        return;
      }
      if (
        !noImproperFractionCheck(
          formulaFocusedIndex,
          false,
          0,
          fractionLinesArray[0].length - 1
        )
      ) {
        return;
      }
      noBracketCheck(formulaFocusedIndex, false);
      if (typeOfCalculation === "A&S") {
        if (
          !noVariousDenominatorCheck(
            formulaFocusedIndex,
            false,
            fractionIndexInProcess[0],
            fractionIndexInProcess[1]
          )
        ) {
          return;
        }
      }
    } else {
      if (typeOfCalculation === "M&D") {
        switch (calculationStage) {
          case 0:
            noMixedFractionCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],
              fractionIndexInProcess[1],
              isNewStepTmp
            );
            break;
          case 1:
            noDivisionCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],
              fractionIndexInProcess[1],
              isNewStepTmp
            );

            break;
          case 2:
            console.log("enterCheck call setOkButtonStage(1)");
            setOkButtonStage(1);
            break;
          case 3:
            console.log("fractionIndexInProcess:" + fractionIndexInProcess);
            console.log("startEndIndexLastLine:" + startEndIndexLastLine);
            noMultiplicationCheck(
              formulaFocusedIndex,
              true,
              startEndIndexLastLine[0],
              startEndIndexLastLine[0]
            );
            break;
          case 4:
            noImproperFractionCheck(
              formulaFocusedIndex,
              true,
              startEndIndexLastLine[0],
              startEndIndexLastLine[0]
            );
            break;
        }
      } else if (typeOfCalculation === "A&S") {
        switch (calculationStage) {
          case 0:
            noVariousDenominatorCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],
              fractionIndexInProcess[1]
            );
            break;
          case 1:
            noNegativeNumeratorResultCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],
              fractionIndexInProcess[1]
            );
            break;
          case 2:
            addToOneFractionCheck(
              formulaFocusedIndex,
              fractionIndexInProcess[0],
              fractionIndexInProcess[0]
            );
            break;
          case 3:
            break;
          case 4:
            noImproperFractionCheck(
              formulaFocusedIndex,
              true,
              startEndIndexLastLine[0],
              startEndIndexLastLine[0]
            );

            break;
        }
      }
    }
  }

  function checkSimplifyValue(index, checkValue, startIndex, endIndex) {//b
    return checkSimplifyValue2(index, checkValue, startIndex, endIndex, fractionLinesArray, typeOfCalculation, addLine, setStartEndIndexLastLine, setFractionIndexInProcess, setCalculationStage, setIndexDecreasedByLastStage, setPartValue, primeNumbers, languageIndex, handleSetError, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, setOkButtonStage, nextNewStep, noImproperFractionCheck);
  }

  const okClick = (e) => {//b    
    console.log("okclick");
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    switch (okButtonStage) {
      case 0:
        setFractionPartIndex(2);
        enterCheck();
        break;
      case 1:
        if (calculationStage > 1) {
          setFractionPartIndex(2);
          setOkButtonStage(2);
        } else {
          //only for M&D
          if (typeOfCalculation === "M&D") {
            if (calculationStage == 0) {
              handleSetError(noMixedBeforeReduction[languageIndex]);
            } else {
              handleSetError(noDivisionBeforeReduction[languageIndex]);
            }
          }
        }
        break;
      case 2:
        //use it instead
        var checkValue = true;
        checkSimplifyValue(
          formulaFocusedIndex,
          checkValue,
          fractionIndexInProcess[0],
          fractionIndexInProcess[1]
        );
        break;
    }
  };

  useEffect(() => {
    let key = callKeypadClick[1];
    var pushLine = false;
    var pushPosition = false;
    if (
      formulaFocusedIndex == fractionLinesArray.length - 1 &&
      (stageOrder.stage === -1 ||
        ((stageOrder.stage === -2 || stageOrder.stage > -1) && typeAndFormulaAnswerArrayForAnyStage[0] === "fractionText") ||
        formulaFocusedIndex > 0 ||
        [2, 5].includes(fractionPartIndex))
    ) {
      if (
        (["+", "-", "×", "÷"].includes(key) &&
          fractionPartIndex == 0 &&
          fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
          fractionPartIndex
          ] == "") ||
        (!["+", "-", "×", "÷"].includes(key) &&
          fractionPartIndex != 0 &&
          (fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
            fractionPartIndex
          ] != "" ||
            key != "0")) ||
        key == "<-"
      ) {
        if (
          ["+", "-", "×", "÷"].includes(key) &&
          fractionPositionIndex ==
          fractionLinesArray[formulaFocusedIndex].length - 1
        ) {
          pushPosition = true;
        }
        var tmpFractionLinesArray = [...fractionLinesArray];
        var prevValue =
          tmpFractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
          fractionPartIndex
          ];
        if (key == "<-") {
          if (fractionPartIndex == 0) {
            prevValue = "";
          } else {
            if (prevValue != "") {
              prevValue = parseInt(prevValue / 10);
              if (prevValue == 0) {
              }
            }
          }
        } else {
          prevValue += key;
        }
        if (fractionPartIndex != 0) {
          //
          prevValue = parseInt(prevValue); //
        }
        setPartValue(
          prevValue,
          fractionPositionIndex,
          fractionPartIndex,
          pushLine,
          pushPosition,
          false
        );
      }
    }
  }, [callKeypadClick]);

  //both versions equal
  function setPartValue(//b
    value,
    positionIndex,
    partIndex,
    pushLine,
    pushPosition,
    popPosition
  ) {
    var nullPosition = false;
    setFractionLinesArray((prevLines) => {
      var tmpPrevLines = prevLines.map((line, lIndex) => {
        if (lIndex == formulaFocusedIndex) {
          var tmpLine = line.map((position, pIndex) => {
            if (pIndex == positionIndex) {
              var changedPosition = position.map((part, index) => {
                if (index == partIndex) {
                  return value;
                } else {
                  return part;
                }
              });
              if (
                pIndex == fractionLinesArray[formulaFocusedIndex].length - 2 &&
                pIndex > 0
              ) {
                if (
                  changedPosition[0] == "" &&
                  !(changedPosition[1] > 0) &&
                  !(changedPosition[3] > 0) &&
                  !(changedPosition[4] > 0)
                ) {
                  nullPosition = true;
                }
              }
              return changedPosition;
            } else {
              return position;
            }
          });
          if (pushPosition) {
            tmpLine.push(["", 0, 0, 0, 0, 0]);
          }
          if (popPosition || nullPosition) {
            tmpLine.pop();
          }
          return tmpLine;
        } else {
          return line;
        }
      });
      if (pushLine) {
        tmpPrevLines.push([
          ["", 0, 0, 0, 0, 0],
          ["", 0, 0, 0, 0, 0]
        ]);
      }
      return tmpPrevLines;
    });
  }

  //both versions equal
  const handlePartClick = (e, positionIndex, partIndex) => {//b
    //in simplification, only small boxes can be focused
    if (
      (okButtonStage == 2 && (partIndex == 2 || partIndex == 5)) ||
      okButtonStage === 0 //!= 2
    ) {
      setFractionPositionIndex(positionIndex);
      setFractionPartIndex(partIndex);
    }
  };

  function textQuestionFormulaCheck() {//b
    let tmpArray = [];
    let i;
    for (i = 0; i < fractionLinesArray[0].length; i++) {
      tmpArray.push(fractionLinesArray[0][i]);
    }
    tmpArray.push(bracketArray[0]);
    console.log(tmpArray);
    let formulaIsCorrect = false;
    typeAndFormulaAnswerArrayForAnyStage[1].forEach(formula => {
      let tmpFormula = [...formula];
      tmpFormula.splice(formula.length - 1, 0, ["", 0, 0, 0, 0, 0]);
      console.log("tmpFormula:" + tmpFormula);
      console.log(compare2LayerArray(tmpArray, tmpFormula))
      if (compare2LayerArray(tmpArray, tmpFormula)) {
        console.log("correct")
        formulaIsCorrect = true;
        return formulaIsCorrect;
      }
    });
    if (formulaIsCorrect) {
      return formulaIsCorrect;
    }
    let formulaErrorMessage = responseArrayForAnyStage[responseArrayForAnyStage.length - 1][languageIndex];
    for (i = 0; i < wrongFractionAnswerArrayForAnyStage.length; i++) {
      let tmpFormula = [...wrongFractionAnswerArrayForAnyStage[i]];
      tmpFormula.splice(wrongFractionAnswerArrayForAnyStage[i].length - 1, 0, ["", 0, 0, 0, 0, 0]);
      console.log(wrongFractionAnswerArrayForAnyStage[i])
      if (compare2LayerArray(tmpArray, tmpFormula)) {
        formulaErrorMessage = responseArrayForAnyStage[i][languageIndex];
      }
    }
    handleSetError(formulaErrorMessage);
  }  

  const classes = pagesStyles(); //

  return (
    <Grid>
      <Grid className={classes.centerRow}>
        <Grid className={classes.formulaColumn}>
          {
            fractionLinesArray.map((formula, index) => {
              return (
                (index === formulaFocusedIndex ||
                  index < formulaFocusedIndex) && ( //
                  <Grid
                    key={index}
                    className={`${classes.formulaRow} ${classes.commonPadding}`}
                  >
                    <Grid className={classes.row}>
                      <Typography
                        className={classes.formulaLine}
                        style={{ opacity: index == 0 ? 0 : 1 }}
                      >
                        =
                      </Typography>
                      <Box
                        className={`${classes.formulaLine} ${classes.formulaBox}`}
                        border={1}
                        borderColor={
                          index == formulaFocusedIndex
                            ? myTheme.color.myMagenta
                            : myTheme.color.blue
                        }
                        style={{
                          borderWidth: index == formulaFocusedIndex ? 3 : 1
                        }}
                      >
                        <FractionFormula
                          formula={formula}
                          handlePartClick={handlePartClick}
                          isFocusedLine={formulaFocusedIndex == index}
                          positionIndex={fractionPositionIndex}
                          partIndex={fractionPartIndex}
                          learningToolIndex={(isLogined && stageOrder.stage === -2) ? 1 : learningToolIndex}
                          showSmallInput={
                            okButtonStage == 2 && index == formulaFocusedIndex
                          }
                          calculationStage={calculationStage}
                          lineIndex={fractionLinesArray.indexOf(formula)} //{index}
                          bracketArray={bracketArray}
                          setBracketArray={setBracketArray}
                          fractionIndexInProcess={fractionIndexInProcess}
                          okButtonStage={okButtonStage}
                        />
                      </Box>
                    </Grid>
                    <Grid className={classes.twoButtons}>
                      {index == formulaFocusedIndex && (
                        <Button
                          className={classes.okButton}
                          variant="contained"
                          style={{ textTransform: 'capitalize' }}
                          onClick={okClick}
                          color="primary"
                        >
                          {okButtonText[languageIndex * 3 + okButtonStage]}
                        </Button>
                      )}
                      {index == fractionLinesArray.length - 1 &&
                        (okButtonStage == 1 || completed) && (
                          <Button
                            className={classes.okButton}
                            variant="contained"
                            style={{ textTransform: 'capitalize' }}
                            onClick={resetClick}
                            color="primary"
                          >
                            <ForwardRoundedIcon
                              className={classes.resetArrow}
                            />
                          </Button>
                        )}
                    </Grid>
                  </Grid>
                )
              );
            }
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};
