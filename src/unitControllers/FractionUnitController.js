import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { FractionFormula } from "../components/FractionFormulaComponents";//b
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";//b
import { compare2LayerArray, includes } from "../functions/CommonFunctions";
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
} from "../functions/FractionFunctions";
import constants from "../constants/FractionConstants";//a,b
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
  const { topicIndex, learningToolIndex } = topicToolIndex;//can be removed in Unit Controllers
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
  const [reduceDecimalInProcess, setReduceDecimalInProcess] = useState(false);
  const [reduceDecimalPositionArray, setReduceDecimalPositionArray] = useState([-1]);
  const {
    noMixedBeforeReduction,//b(a call be functions)
    noDivisionBeforeReduction,//b
    //a&s    
    okButtonText,
    decimalToFractionIssue,
    sameOperatorsInDecToFract,
    sameWholeNumbersInDecToFract,
    wrongNumerInDecToFract,
    wrongDenomInDecToFract1,
    wrongDenomInDecToFract2,
    fullStop,
    decimalPlaces,

  } = constants;

  //both versions equal and need to get answers, brackets and responses
  useEffect(() => {//b
    console.log(fractionLinesArray[0]);
    console.log("fractionLinesArray.length:" + fractionLinesArray.length);
    console.log("completed:" + completed);
    if (
      ((stageOrder.stage > -1 && includes(typeAndFormulaAnswerArrayForAnyStage[0], "Formula")) || (stageOrder.stage === -2 && isLogined && includes(typeAndFormulaAnswerArrayForAnyStage[0], "Formula"))) && // ((stageOrder.stage > -1 && typeAndFormulaAnswerArrayForAnyStage[0].includes("Formula")) || (stageOrder.stage === -2 && isLogined && typeAndFormulaAnswerArrayForAnyStage[0].includes("Formula"))) &&   //((stageOrder.stage > -1 && typeAndFormulaAnswerArrayForAnyStage[0] === "fractionFormula") || (stageOrder.stage === -2 && isLogined && typeAndFormulaAnswerArrayForAnyStage[0] === "fractionFormula")) &&
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
    if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Text")) { //if (typeAndFormulaAnswerArrayForAnyStage[0].includes("Text")) {
      //set formula line 0
      setFractionLinesArray([
        [
          ["", 0, 0, 0, 0, 0],
          ["", 0, 0, 0, 0, 0]
        ]
      ]);
      setBracketArray([[]]);
    } else if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Formula")) { //} else if (typeAndFormulaAnswerArrayForAnyStage[0].includes("Formula")) {
      console.log(typeAndFormulaAnswerArrayForAnyStage[1][0])
      let tmpArray = [];
      let i;
      for (i = 0; i < typeAndFormulaAnswerArrayForAnyStage[1][0].length - 1; i++) {
        tmpArray.push(typeAndFormulaAnswerArrayForAnyStage[1][0][i]);
      }
      tmpArray.push(["", 0, 0, 0, 0, 0]);
      setBracketArray([typeAndFormulaAnswerArrayForAnyStage[1][0][typeAndFormulaAnswerArrayForAnyStage[1][0].length - 1]]);
      setFractionLinesArray([tmpArray]);
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

  /*function stringToNumber(formula) {
    let newFormula = [];
    for (let i = 0; i < formula.length - 1; i++) {
      let newFraction = [];
      newFraction.push(formula[i][0]);
      for (let j = 1; j < formula[i].length; j++) {
        if (typeof formula[i][j] === "string") {
          newFraction.push(parseFloat(formula[i][j]));
        } else {
          newFraction.push(formula[i][j]);
        }
      }
      newFormula.push(newFraction);
    }
    console.log("newFormula" + newFormula)
    return newFormula;
  }*/

  function integerWithDotCheck(formula) {
    for (let i = 0; i < formula.length - 1; i++) {
      for (let j = 1; j < formula[i].length; j++) {
        if (typeof formula[i][j] === "string" && formula[i][j].slice(-1) === ".") {
          handleSetError("Remove dot after an integer");
          return false;
        }
      }
    }
    return true
  }

  //both versions differ, also need mixed version. So, it needs 3 versions
  async function enterCheck() {//b
    console.log("enterCheck");
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:" + indexDecreasedByLastStage);
    let isNewStepTmp = false;
    if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Decimal") && !integerWithDotCheck(fractionLinesArray[formulaFocusedIndex])) { //if (typeAndFormulaAnswerArrayForAnyStage[0].includes("Decimal") && !integerWithDotCheck(fractionLinesArray[formulaFocusedIndex])) {
      return false;
    }
    if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Decimal") && formulaFocusedIndex > 0) { //if (typeAndFormulaAnswerArrayForAnyStage[0].includes("Decimal") && formulaFocusedIndex > 0) {
      let checkDecimalDictionary = lastLineWithDecimalCheck();
      console.log("checkDecimalDictionary.correctStep:" + checkDecimalDictionary.correctStep) //correctStep, withDecimal: withDecimal, decimalPositionArray:
      console.log("checkDecimalDictionary.withDecimal:" + checkDecimalDictionary.withDecimal)
      console.log("checkDecimalDictionary.decimalPositionArray:" + checkDecimalDictionary.decimalPositionArray)
      if (!checkDecimalDictionary.correctStep) {
        return false
      }      
      if (checkDecimalDictionary.withDecimal) {
        let position = checkDecimalDictionary.decimalPositionArray[1];
        setFractionIndexInProcess([position, position]);
        setReduceDecimalInProcess(true);
        setFractionPartIndex(2);
        setOkButtonStage(2);
        return true;
      }
    }

    if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Text") && formulaFocusedIndex === 0) {//typeAndFormulaAnswerArrayForAnyStage[0].includes("Text") && formulaFocusedIndex === 0) {//if (typeAndFormulaAnswerArrayForAnyStage[0] === "fractionText" && formulaFocusedIndex === 0) {
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
    return checkSimplifyValue2(index, checkValue, startIndex, endIndex, fractionLinesArray, typeOfCalculation, addLine, setStartEndIndexLastLine, setFractionIndexInProcess, setCalculationStage, setIndexDecreasedByLastStage, setPartValue, primeNumbers, languageIndex, handleSetError, indexDecreasedByLastStage, fractionIndexInProcess, startEndIndexLastLine, setOkButtonStage, nextNewStep, noImproperFractionCheck, okClick, reduceDecimalPositionArray, setReduceDecimalPositionArray, reduceDecimalInProcess, setReduceDecimalInProcess);
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
        ((stageOrder.stage === -2 || stageOrder.stage > -1) && includes(typeAndFormulaAnswerArrayForAnyStage[0], "Text")) || //typeAndFormulaAnswerArrayForAnyStage[0].includes("Text")) || //((stageOrder.stage === -2 || stageOrder.stage > -1) && typeAndFormulaAnswerArrayForAnyStage[0] === "fractionText") ||
        formulaFocusedIndex > 0 ||
        (includes([2, 5], fractionPartIndex) && (okButtonStage === 2))) //([2, 5].includes(fractionPartIndex) && (okButtonStage === 2)))
    ) {
      if (
        (includes(["+", "-", "×", "÷"], key) && //(["+", "-", "×", "÷"].includes(key) &&
        fractionPartIndex == 0 &&
          fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
          fractionPartIndex
          ] == "") ||
        (!includes(["+", "-", "×", "÷"], key) && //(!["+", "-", "×", "÷"].includes(key) &&
          fractionPartIndex != 0 &&
          (fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
            fractionPartIndex
          ] != "" ||
            key != "0")) ||
        key == "<-"
      ) {
        if (
          includes(["+", "-", "×", "÷"], key) && //["+", "-", "×", "÷"].includes(key) &&
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
            if (prevValue.toString() != "0") {
              prevValue = prevValue.toString().slice(0, -1); //prevValue = parseInt(prevValue / 10);
              if (prevValue === "") {
                prevValue = "0";
              }
            }
          }
        } else if ((key === "." && formulaFocusedIndex === 0 && fractionPartIndex === 1 && !includes(prevValue.toString(), ".") /*prevValue.toString().includes(".")*/) || key != ".") {
          prevValue += key;
        }
        if (fractionPartIndex != 0 && typeof prevValue === "string" && !includes(prevValue.toString(), ".") /*prevValue.toString().includes(".")*/) { //if (fractionPartIndex != 0) {
          //
          prevValue = parseFloat(prevValue); //revValue = parseInt(prevValue);
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

  function decimalToFractionCheck(positionIndex) {
    let originalDecimal = fractionLinesArray[formulaFocusedIndex - 1][positionIndex][1]
    let numberOfDecimal = originalDecimal.toString().split(".")[1].length;
    console.log("numberOfDecimal:" + numberOfDecimal)
    let newDenom = Math.pow(10, numberOfDecimal);
    let wholeNumber = parseInt(originalDecimal);
    let newNumer = (originalDecimal - wholeNumber) * newDenom;
    console.log(newNumer);
    let newFraction = fractionLinesArray[formulaFocusedIndex][positionIndex]
    if (newFraction[0] != fractionLinesArray[formulaFocusedIndex - 1][positionIndex][0]) {
      handleSetError(sameOperatorsInDecToFract[languageIndex]);
      return false;
    }
    if (newFraction[1] != wholeNumber) {
      handleSetError(sameWholeNumbersInDecToFract[languageIndex]);
      return false;
    }
    if (newFraction[3] != newNumer) {
      handleSetError(wrongNumerInDecToFract[languageIndex] + newNumer + fullStop[languageIndex]);
      return false;
    }
    if (newFraction[4] != newDenom) {
      handleSetError(wrongDenomInDecToFract1[languageIndex] + decimalPlaces[numberOfDecimal - 1][languageIndex] + wrongDenomInDecToFract2[languageIndex] + newDenom + fullStop[languageIndex]);
      return false;
    }
    return true;
  }

  function lastLineWithDecimalCheck() {
    let decimalPositionArray = [-1];
    let formula = fractionLinesArray[formulaFocusedIndex - 1];
    let withDecimal = false;
    let correctStep = true;
    for (let i = 0; i < formula.length; i++) {
      if (!Number.isInteger(formula[i][1])) {
        //with decimal
        let oneSectionCorrect = true;
        withDecimal = true;
        if (i > decimalPositionArray[decimalPositionArray.length - 1] + 1) {
          //with one section check on the left
          oneSectionCorrect = oneSectionFractionCheck(formulaFocusedIndex, decimalPositionArray[decimalPositionArray.length - 1] + 1, i - 1, 0, false, false, decimalToFractionIssue[languageIndex], decimalPositionArray[1], decimalPositionArray[1]);
        }
        decimalPositionArray.push(i);
        if (!decimalToFractionCheck(i) || !oneSectionCorrect) {
          correctStep = false;
          i = formula.length;
        }
      }
    }
    console.log("decimalPositionArray:"+decimalPositionArray)
    //one more oneSectionFractionCheck
    if (decimalPositionArray.length > 1 && correctStep) {
      let oneSectionCorrect = oneSectionFractionCheck(formulaFocusedIndex, decimalPositionArray[decimalPositionArray.length - 1] + 1, formula.length - 1, 0, false, false, decimalToFractionIssue[languageIndex], decimalPositionArray[1], decimalPositionArray[1]);
      if (!oneSectionCorrect) {
        correctStep = false;
      }
    }
    setReduceDecimalPositionArray(decimalPositionArray);
    return { correctStep: correctStep, withDecimal: withDecimal, decimalPositionArray: decimalPositionArray };
  }

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
