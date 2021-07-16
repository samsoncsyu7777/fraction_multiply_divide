import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { InlineMath, /*BlockMath*/ } from "react-katex";
//import { useSelector, RootStateOrAny } from "react-redux";
//import { AlertSnackbar } from "../components/AlertComponents";
//import { MyFrame } from "../components/HeadingComponents";
//import { MyKeypad } from "../components/KeypadComponents";
//import { StageButtons } from "../components/StageComponents";
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";
import { pagesStyles } from "../themes/styles";
import { theme as myTheme } from "../themes/theme";//a,b
import constants from "../constants/MixedOperationsConstants";
import { findIndex, includes } from "../functions/CommonFunctions";
//import questions from "../questions/Questions";

//×÷👍👍🏻
export const DecimalUnitController = ({
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
  callIncreaseFormulaIndex,
  errorMessage,
  setErrorMessage,
  decimalFractionStage,
  setDecimalFractionStage
}) => {
  const { topicIndex, learningToolIndex } = topicToolIndex;//kept only for maximum number of operators
  const [formulaLinesArray, setFormulaLinesArray] = useState([""]);
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);
  const [answersArray, setAnswersArray] = useState([]);
  const [maximumOperators, setMaximumOperators] = useState(
    topicIndex + 3
  );
  const [acceptDecimal, setAcceptDecimal] = useState(
    includes(typeAndFormulaAnswerArrayForAnyStage[0], "decimal") ? true : false
  );
  const [numberOfDecimal, setNumberOfDecimal] = useState(7);

  const {
    stageText,
    manual,
    formaulaPlaceholder,
    topics,
    resultBeValidHint,
    wellDone,
    numberOfOperatorsHintLeft,
    numberOfOperatorsHintRight,
    multiplyDivideFirstHintLeft,
    multiplyDivideFirstHintRight,
    exchangeToAvoidNegativeHint,
    exchangeToAvoidDecimalHint,
    orText,
    calculateFirstHintLeft,
    calculateFirstHintRight,
    subtractGetTensHint,
    divideGetSmallerHint,
    rearrangeHintLeft,
    rearrangeHintRight,
    firstCalculate,
    fractionText,
    numerPart,
    denomPart,
    firstConvert,
    toDecimal,
    parenthesesBeforePercent,
    percentText,
    innerParenthesesFirst1,
    innerParenthesesFirst2,
    fullStop,
    negativeInParentheses,
    toPositiveNumber,
    beforeAddSubtractPercent,
    firstConvert2,
    toPercent,
    beforeDecimalDivision1,
    beforeDecimalDivision2,
    operationWithPercent,
    
  } = constants;

  let completeHintString = "";

  useEffect(() => {
    setAcceptDecimal(includes(typeAndFormulaAnswerArrayForAnyStage[0], "decimal") ? true : false);
    setMaximumOperators(topicIndex + 3);
  }, [topicIndex, learningToolIndex]);

  useEffect(() => {
    if (
      stageOrder.stage > -1 &&
      formulaFocusedIndex === 0 &&
      formulaLinesArray[0] != ""
    ) {
      okClick();
    }
  }, [formulaLinesArray]);

  useEffect(() => {
    setFormulaFocusedIndex((prevState) => prevState + 1); //b
  }, [callIncreaseFormulaIndex]);

  useEffect(() => {//a and a call function b  
    if (callResetDefault > 0) {
      console.log("call reset default" + callResetDefault)
      setFormulaLinesArray([""]);
      setFormulaFocusedIndex(0);
      setCompleted(false);
    }
  }, [callResetDefault]);

  useEffect(() => {//resetQustion A
    if (clearFirstLineForSelfLearning > 0) {
      console.log("call clear first line")
      console.log("clearFirstLineForSelfLearning: " + clearFirstLineForSelfLearning)
      setFormulaLinesArray([""]);
    }
  }, [clearFirstLineForSelfLearning]);

  useEffect(() => {//resetQuestionC
    if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Text")) {
      //set formula line 0
      console.log("text type clear first line")
      setFormulaLinesArray([""]);
    } else if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Formula")) {
      console.log(typeAndFormulaAnswerArrayForAnyStage[1][0])
      console.log(typeAndFormulaAnswerArrayForAnyStage[1][0][0][0])
      let tmpString = typeAndFormulaAnswerArrayForAnyStage[1][0][0][0];
      console.log(tmpString);
      setFormulaLinesArray([tmpString]);
    }
  }, [typeAndFormulaAnswerArrayForAnyStage]);

  const okClick = () => {
    console.log("call okclick")
    setDecimalFractionStage(0);
    //check last character is an operator
    let tmpFormulaLinesArray = [...formulaLinesArray];
    let tmpString = tmpFormulaLinesArray[formulaFocusedIndex];
    let updatedString = tmpString.replace("|", "");
    tmpFormulaLinesArray[formulaFocusedIndex] = updatedString;
    let lastChar = tmpString.slice(tmpString.length - 1);
    if (includes(["+", "-", "×", "÷"], lastChar)) {
      return;
    }
    //replace last formula hints
    let replacedHint = errorMessage.replace(/\*/g, "×");
    replacedHint = replacedHint.replace(/\//g, "÷");
    setErrorMessage(replacedHint);
    //replace this formula
    let replacedString = updatedString.replace(/×/g, "*");
    replacedString = replacedString.replace(/÷/g, "/");

    //first formula
    if (formulaFocusedIndex == 0) {
      //check answer is a positive integer
      let removeFractionString = replacedString;//.replace("0^\\frac{", "0+(");      
      let lastOperatorIndex = -1;
      for (let i = 0; i < removeFractionString.length; i++) {
        if (includes(["+", "-", "*", "/", "("], removeFractionString[i])) {
          lastOperatorIndex = i;
        } else if (removeFractionString[i] === "^" && removeFractionString[i + 1] === "\\") {
          if (i - 1 === lastOperatorIndex) {
            //no whole number before fraction
            let startString = removeFractionString.slice(0, i);
            let endString = removeFractionString.slice(i);
            endString = endString.slice(endString.indexOf("{") + 1);
            //let endString = removeFractionString.slice(i + 8);
            removeFractionString = startString + "(" + endString;
          } else {
            //with whole number before fraction
            let startString = removeFractionString.slice(0, lastOperatorIndex + 1);
            let wholeNumberString = "(" + removeFractionString.slice(lastOperatorIndex + 1, i) + "+(";
            //let endString = removeFractionString.slice(i + 7);
            let endString = removeFractionString.slice(i);
            endString = endString.slice(endString.indexOf("{") + 1);
            let fractionString = endString.slice(0, endString.indexOf("}^")) + "))";
            endString = endString.slice(endString.indexOf("}^") + 2);
            removeFractionString = startString + wholeNumberString + fractionString + endString;
          }
        }
      }
      removeFractionString = removeFractionString.replace(/\}{/g, ")/(");
      removeFractionString = removeFractionString.replace(/\}\^/g, ")");
      removeFractionString = removeFractionString.replace(/\%/g, "*0.01");
      console.log(removeFractionString)
      let tmpValue =
        Math.round(eval(removeFractionString) * 10 ** (numberOfDecimal + 2)) /
        10 ** (numberOfDecimal + 2);
      console.log("calculated value: " + tmpValue)
      if (
        ((Number.isInteger(tmpValue) && !acceptDecimal) ||
          (Number(tmpValue.toFixed(numberOfDecimal)) == tmpValue &&
            acceptDecimal)) &&
        (tmpValue >= 0 || includes(typeAndFormulaAnswerArrayForAnyStage[0], "Negative"))
      ) {
        nextStepPreparation(replacedString);
      } else {
        //not a positive integer
        let acceptDecimalIndex = (includes(typeAndFormulaAnswerArrayForAnyStage[0], "decimal") ? 1 : 0);
        handleSetError(resultBeValidHint[acceptDecimalIndex * 4 + languageIndex]);
      }
    } else {
      //other steps or answer
      //correct steps

      let correctStep = false;
      let i;
      for (i = 0; i < answersArray.length; i++) {
        if (answersArray[i] == replacedString) {
          correctStep = true;
        }
      }
      if (correctStep) {
        if (checkStringContainsElement(replacedString, ["+", "-", "*", "/"])) {
          nextStepPreparation(replacedString);
        } else {
          setFormulaLinesArray(tmpFormulaLinesArray);
          completeFunction();
        }
      } else {
        //wrong steps
        handleSetError(errorMessage);
      }
    }
  };
  /*
    function nextQuestion() {
      if (stageState > -1) {
        if (
          orderState <
          questions[topicIndex][learningToolIndex][stageState].length - 1
        ) {
          setOrderState((prevState) => prevState + 1);
        } else if (
          stageState <
          questions[topicIndex][learningToolIndex].length - 1
        ) {
          setStageState((prevState) => prevState + 1);
          setOrderState(0);
        } else {
          setStageState(-1);
          setOrderState(0);
        }
      } else {
        resetClick();
      }
    }*/

  function nextStepPreparation(replacedString) {
    nextStepPreparation = "";
    let tmpAnswersArray = generateAnswersArray(replacedString);
    //formula cannot generate next step
    if (tmpAnswersArray[0] == "false") {
      handleSetError(errorMessage);
    } else {
      //formula can generate next step
      setAnswersArray(tmpAnswersArray);
      let tmpFormulaLinesArray = [...formulaLinesArray];
      let tmpString = tmpFormulaLinesArray[formulaFocusedIndex].replace("|", "");
      tmpFormulaLinesArray[formulaFocusedIndex] = tmpString;
      tmpFormulaLinesArray.push("");
      console.log("call next step prep")
      setFormulaLinesArray(tmpFormulaLinesArray);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
    }
  }

  function checkStringContainsElement(thisString, thisArray) {
    let isContain = false;
    for (let i = 0; i < thisString.length; i++) {
      if (includes(thisArray, thisString[i])) {
        if (thisString[i] != "-" || (thisString[i] === "-" && i > 0 && !includes(["+", "×", "÷", "(", "{"], thisString[i - 1]))) {
          isContain = true;
        }
      }
    }
    /*thisArray.forEach(element => {
      let thisIndex = thisString.indexOf(element);
      console.log("thisIndex = thisString.indexOf(element):"+ thisString.indexOf(element))
      console.log('!includes(["+", "×", "÷", "(", "{"], thisString[thisIndex - 1]):'+ !includes(["+", "×", "÷", "(", "{"], thisString[thisIndex - 1]))
      if (includes(thisString, element)) {
        if (element != "-" || (element === "-" && thisIndex > 0 && !includes(["+", "×", "÷", "(", "{"], thisString[thisIndex - 1]))) {
          //if (includes(thisString, element)) {
          isContain = true;
        }
      }
    })*/
    return isContain;
  }

  function checkExcceedMaxOperators(thisString, maximum) {
    const {
      operatorsStringArray,
      operatorsIndexArray,
    } = createIndexArrays(thisString);
    if (
      operatorsStringArray.length > maximum || //without + 10
      operatorsIndexArray.length == 0
    ) {
      let message = numberOfOperatorsHintLeft[languageIndex] +
        maximum +
        numberOfOperatorsHintRight[languageIndex];
      handleSetError(message);
      return false;
    } else { return true; }
  }

  function generateAnswersArray(replacedStringOriginal) {
    //check no more than maximumOperators
    if (formulaFocusedIndex === 0 && stageOrder.stage === -1) {
      if (!checkExcceedMaxOperators(replacedStringOriginal, maximumOperators)) {
        return ["false"];
      }
    }
    let endString = "";
    let startString = "";
    let replacedString = replacedStringOriginal;
    let withParentheses = false;
    let thisAnswersArray = []; //["3+4*2", "4*2+3"]
    console.log("replacedString: "+replacedString)
    //create operatorsStringArray and operatorsIndexArray
    const {
      operatorsStringArray,
      operatorsIndexArray,
    } = createIndexArrays(replacedString);
    //check with fraction
    if (
      includes(replacedString, "^")
    ) {
      let stringArray = replacedString.split("^");
      //check any operators in denom or numer
      let targetFractionString = ""
      let noOperatorInFraction = true;
      let thisStartString = "";
      let thisEndString = "";
      for (let i = 0; i < stringArray.length; i++) {
        if (i % 2 === 1 && noOperatorInFraction === true && checkStringContainsElement(stringArray[i], ["+", "-", "*", "/"])) {
          let orderOfThisFraction = parseInt((i + 1) / 2);
          //first fraction with operator
          noOperatorInFraction = false;
          let numerString = stringArray[i].slice(stringArray[i].indexOf("{") + 1, stringArray[i].indexOf("}"));
          if (checkStringContainsElement(numerString, ["+", "-", "*", "/"])) {
            //cope with numer with operator first
            completeHintString += firstCalculate[languageIndex] + fractionText[languageIndex] + "^" + stringArray[i] + "^" + numerPart[languageIndex];
            thisAnswersArray = generateAnswersArray(numerString);
            thisStartString += "\\frac{";
            thisEndString = stringArray[i].slice(stringArray[i].indexOf("}"));
            console.log("completeHintString: "+completeHintString)
          } else {
            //then cope with denom with operator
            let denomString = stringArray[i].slice(stringArray[i].indexOf("}") + 2, -1);
            completeHintString += firstCalculate[languageIndex] + fractionText[languageIndex] + "^" + stringArray[i] + "^" + denomPart[languageIndex];
            thisAnswersArray = generateAnswersArray(denomString);
            thisStartString += "\\frac{" + numerString + "}{";
            thisEndString = "}";
            console.log("completeHintString: "+completeHintString)
          }
          //targetFractionString = stringArray[i];
        } else if (noOperatorInFraction) {
          thisStartString += stringArray[i] + "^";
        } else if (!noOperatorInFraction) {
          thisEndString += "^" + stringArray[i];
        }
      }
      console.log("thisStartString" + thisStartString)
      console.log("thisEndString" + thisEndString)
      console.log("thisAnswersArray" + thisAnswersArray)
      if (noOperatorInFraction) {
        //convert 1st fraction without operators to decimal
        thisStartString = replacedString.slice(0, replacedString.indexOf("^"));
        let numerString = replacedString.slice(replacedString.indexOf("{") + 1, replacedString.indexOf("}"));
        let denomString = replacedString.slice(replacedString.indexOf("}{") + 2, replacedString.indexOf("}^"));
        let value = parseInt(eval(numerString + "/" + denomString) * 100) / 100;
        let digitOfWholeNumber = 0;
        for (let i = 0; i < thisStartString.length; i++) {
          if (includes(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], thisStartString.charAt(thisStartString.length - 1 - i))) {
            digitOfWholeNumber = i + 1
          } else {
            i = thisStartString.length
          }
        }
        let wholeNumber = 0;
        if (digitOfWholeNumber > 0) {
          wholeNumber = parseInt(thisStartString.slice(thisStartString.length - digitOfWholeNumber, thisStartString.length));
        }
        value = wholeNumber + value;
        let valueString = value.toString();
        thisAnswersArray = [valueString];
        thisStartString = thisStartString.slice(0, thisStartString.length - digitOfWholeNumber);
        thisEndString = replacedString.slice(replacedString.indexOf("}^") + 2);
        let wholeNumberString = (wholeNumber === 0 ? "" : wholeNumber.toString());
        completeHintString += firstConvert[languageIndex] + fractionText[languageIndex] + "^" + wholeNumberString + "\\frac{" + numerString + "}{" + denomString + "}^" + toDecimal[languageIndex];
        console.log("completeHintString: "+completeHintString)
      }
      if (withParentheses) {/* */
        startString += "(" + thisStartString;
        endString = thisEndString + ")" + endString;
      } else {
        startString += thisStartString;
        endString = thisEndString + endString;
      } /* */
      console.log("startString" + startString)
      console.log("endString" + endString)
    } else if (includes(replacedString, "%") && includes(typeAndFormulaAnswerArrayForAnyStage[0], "%.")) {
      //with % needed to convert to decimal
      let firstIndex = replacedString.indexOf("%");
      if (replacedString.charAt(firstIndex - 1) === ")") {
        //calculate () part before % first
        withParentheses = true;
        startString = replacedString.slice(0, firstIndex);
        let valueStartIndex = startString.lastIndexOf("(") + 1;
        endString = replacedString.slice(valueStartIndex);
        let valueEndIndex = endString.indexOf(")");
        startString = startString.slice(0, valueStartIndex - 1);
        let valueString = endString.slice(0, valueEndIndex);
        endString = endString.slice(valueEndIndex + 1);
        console.log("startString: " + startString)
        console.log("valueString: " + valueString)
        console.log("endString: " + endString)
        completeHintString += firstCalculate[languageIndex] + parenthesesBeforePercent[languageIndex] + "(" + valueString + ")%" + fullStop[languageIndex];
        thisAnswersArray = generateAnswersArray(valueString);
        console.log("completeHintString: "+completeHintString)
      } else {
        //no parentheses before %, just convert xxx% to decimal
        let endFirstOperatorIndexInArray = findIndex(operatorsIndexArray, (index) => { return index > firstIndex }); //operatorsIndexArray.findIndex((index) => {return index > firstIndex});
        let startLastOperatorIndex = operatorsIndexArray[endFirstOperatorIndexInArray - 1];
        startString = replacedString.slice(0, startLastOperatorIndex + 1);
        endString = replacedString.slice(firstIndex + 1);
        let value = parseFloat(replacedString.slice(startLastOperatorIndex + 1, firstIndex)) * 0.01;
        let valueString = value.toString();
        thisAnswersArray = [valueString];
        completeHintString += firstConvert[languageIndex] + percentText[languageIndex] + replacedString.slice(startLastOperatorIndex + 1, firstIndex) + "%" + toDecimal[languageIndex];
        console.log("completeHintString: "+completeHintString)
      }

    } else {
      //without fraction or %

      //check with (-(-3)) at the 1st innermost parentheses
      if (includes(replacedStringOriginal, "(-(-") && includes(replacedStringOriginal, "))")) {
        let rightIndex = replacedStringOriginal.indexOf("))") + 1;
        let startWithOperation = replacedStringOriginal.slice(0, rightIndex + 1);
        let leftIndex = startWithOperation.lastIndexOf("(-(-");
        let operationString = startWithOperation.slice(leftIndex);
        let withOperator = checkStringContainsElement(operationString, ["+", "-", "*", "/"]);
        if (!withOperator) {
          console.log("operationString: " + operationString)
          let newValueString = eval(operationString).toString();
          startString = startWithOperation.slice(0, leftIndex);
          endString = replacedStringOriginal.slice(rightIndex + 1);
          let newAnswerString = startString + newValueString + endString;
          let updatedArray = []
          console.log("newAnswerString: " + newAnswerString)
          updatedArray.push(newAnswerString);
          console.log("updatedArray: " + updatedArray)
          completeHintString += firstConvert[languageIndex] + negativeInParentheses[languageIndex] + operationString + toPositiveNumber[languageIndex];
          setErrorMessage(completeHintString);
          return updatedArray;
        }
      }
      console.log("replacedString: "+ replacedString)
      //change all (-3) -> <3>
      let tmpString = replacedString;
      let revisedString = ""
      for(let i = 0; i < replacedString.length; i++) {
        let leftIndex = tmpString.indexOf("(-");
        console.log('tmpString + tmpString.indexOf("(-")' + tmpString + tmpString.indexOf("(-"))
        if (leftIndex === -1) {
          revisedString += tmpString;
          i = replacedString.length;
        } else {
          revisedString += tmpString.slice(0, leftIndex);
          tmpString = tmpString.slice(leftIndex);
          let rightIndex = tmpString.indexOf(")");
          let operationString = tmpString.slice(0, rightIndex + 1);
          let withOperator = checkStringContainsElement(operationString, ["+", "-", "*", "/"]);
          if (!withOperator) {
            tmpString = tmpString.slice(rightIndex + 1);
            operationString = operationString.replace("(-", "<");
            operationString = operationString.replace(")", ">");
            revisedString += operationString;
          } else {
            revisedString += tmpString.slice(0, 2);
            tmpString = tmpString.slice(2);
          }
        }
      }
      console.log("revisedString: "+revisedString)
      //replacedStringOriginal --> revisedString
      //if with () //at last add () if answer string with operators
      if (includes(revisedString, "(")) {
        withParentheses = true;
        endString = revisedString.slice(revisedString.indexOf(")") + 1, revisedString.length).replace(/\</g, "(-").replace(/\>/g, ")");
        let replacedStringWithStart = revisedString.slice(0, revisedString.indexOf(")"));
        startString = replacedStringWithStart.slice(0, replacedStringWithStart.lastIndexOf("(")).replace(/\</g, "(-").replace(/\>/g, ")");
        replacedString = replacedStringWithStart.slice(replacedStringWithStart.lastIndexOf("(") + 1, replacedStringWithStart.length).replace(/\</g, "(-").replace(/\>/g, ")");
        completeHintString += innerParenthesesFirst1[languageIndex] + "(" + replacedString + ")" + innerParenthesesFirst2[languageIndex];
        console.log("completeHintString: "+completeHintString)
        console.log("startString: " + startString)
        console.log("replacedString: " + replacedString)
        console.log("endString: " + endString)
      }
      console.log("replacedString: "+replacedString)
      replacedString = replacedString.replace(/\</g, "(-");
      replacedString = replacedString.replace(/\>/g, ")");
      console.log("replacedString: "+replacedString)

      //let withOperator = checkStringContainsElement(replacedString, ["+", "-", "*", "/"]);
      //check no operator, eg just a negative number inside parentheses
      //if (!withOperator) {
        /*if (startString.lastIndexOf("(") > -1) {
          //find 2nd parentheses outside this negative number
          replacedString = startString.slice(startString.lastIndexOf("(") + 1) + "(" + replacedString;
          startString = startString.slice(0, startString.lastIndexOf("("));
        } else {
          //without 2nd parentheses, take the whole string to consider the next step
          replacedString = startString + "(" + replacedString;
          startString = "";
          withParentheses = false;
        }
        if (endString.indexOf(")" > -1)) {
          //find 2nd parentheses outside this negative number
          replacedString = replacedString + ")" + endString.slice(0, endString.indexOf(")"));
          endString = endString.slice(endString.indexOf(")") + 1);
        } else {
          //without 2nd parentheses, take the whole string to consider the next step
          replacedString = replacedString + endString;
          endString = "";
        }*/
        /*replacedString = startString.slice(startString.lastIndexOf("(") + 1) + "(" + replacedString + ")" + endString.slice(0, endString.indexOf(")"));
        startString = startString.slice(0, startString.lastIndexOf("("));
        endString = endString.slice(endString.indexOf(")") + 1);*/
        /* withOperator = checkStringContainsElement(replacedString, ["+", "-", "*", "/"]);
        if (!withOperator) {
          //convert (-(-3)) to 3
          console.log("replacedString: " + replacedString)
          let newValueString = eval(replacedString).toString();
          let newAnswerString = startString + newValueString + endString;
          let updatedArray = []
          console.log("newAnswerString: " + newAnswerString)
          updatedArray.push(newAnswerString);
          console.log("updatedArray: " + updatedArray)
          completeHintString += firstConvert[languageIndex] + negativeInParentheses[languageIndex] + "(" + replacedString + ")" + toPositiveNumber[languageIndex];
          setErrorMessage(completeHintString);
          return updatedArray;
        }*/
        /*
        for (let i = 0; i > -1; i++) {
          console.log("startString: "+ startString)
          if (!includes(startString, "(")) {
            startString = "";
            replacedString = replacedStringOriginal;
            endString = "";
            i = -3;
          } else {
            replacedString = startString.slice(startString.lastIndexOf("(") + 1) + "(" + replacedString + ")" + endString.slice(endString.indexOf(")"));
            startString = startString.slice(0, startString.lastIndexOf("("));
            endString = endString.slice(endString.indexOf(")"));
            withOperator = checkStringContainsElement(replacedString, ["+", "-", "*", "/"]);
            if (withOperator) {
              i = -3;
            }
          }
        }*/
      //}
      console.log("cannot return")
      console.log("replacedString: "+replacedString)
      const {
        operatorsStringArray,
        operatorsIndexArray
      } = createIndexArrays(replacedString);

      //go to generate answers array
      //check it has + or -
      if (
        includes(operatorsStringArray, "+") ||
        includes(operatorsStringArray, "-")
      ) {
        //check it is mixed
        if (
          includes(operatorsStringArray, "*") ||
          includes(operatorsStringArray, "/")
        ) {
          thisAnswersArray = fourMixedFunction(
            replacedString,
            operatorsStringArray,
            operatorsIndexArray
          );
        } else {
          //it has + and - only
          thisAnswersArray = addSubtract(
            replacedString,
            operatorsStringArray,
            operatorsIndexArray
          );
        }
      } else {
        //it has * and / only
        thisAnswersArray = multiplyDivide(
          replacedString,
          operatorsStringArray,
          operatorsIndexArray
        );
      }
    }
    //combine string outside () and add () when needed
    let updatedArray = []
    thisAnswersArray.forEach(element => {
      //get "-3", add () to (-3)
      if ((checkStringContainsElement(element, ["+", "-", "*", "/"]) || element[0] === "-") && withParentheses && !includes(replacedString, "^")) {
        updatedArray.push(startString + "(" + element.replace("--", "+") + ")" + endString);//replace "--" with "+"
      } else {
        updatedArray.push(startString + element.replace("--", "+") + endString);//replace "--" with "+"
      }
    })
    console.log(updatedArray)
    setErrorMessage(completeHintString);
    return updatedArray;
  }

  function fourMixedFunction(
    replacedString,
    getOperatorsStringArray,
    getOperatorsIndexArray
  ) {
    let thisAnswersArray = [];
    let previousIndex = -1;
    let pushedOperatorsStringArray = getOperatorsStringArray;
    //for the case of chain * and / at the end
    pushedOperatorsStringArray.push("+");
    let i;
    let firstHint = true;
    let firstHintText = "";
    for (i = 0; i < pushedOperatorsStringArray.length; i++) {
      if (includes(["+", "-"], pushedOperatorsStringArray[i])) {
        //check there is chain * and /
        if (i - previousIndex > 2) {
          firstHint = false;
          let startString = replacedString.substring(
            0,
            getOperatorsIndexArray[previousIndex + 1] + 1
          );
          let operationsString = replacedString.substring(
            getOperatorsIndexArray[previousIndex + 1] + 1,
            getOperatorsIndexArray[i + 1]
          );
          let endString = replacedString.substring(
            getOperatorsIndexArray[i + 1]
          );
          const {
            operatorsStringArray,
            operatorsIndexArray,
          } = createIndexArrays(operationsString);
          let tmpAnswersArray = multiplyDivide(
            operationsString,
            operatorsStringArray,
            operatorsIndexArray
          );
          let j;
          for (j = 0; j < tmpAnswersArray.length; j++) {
            tmpAnswersArray[j] = startString + tmpAnswersArray[j] + endString;
            thisAnswersArray.push(tmpAnswersArray[j]);
          }
        }

        //not a chain also a valid answer
        else {
          //check there is one * or /
          if (i - previousIndex == 2) {
            let tmpHintString = "";
            const {
              tmpAnswer,
              tmpHint,
            } = getAnswerString(
              replacedString,
              getOperatorsIndexArray,
              i - 1,
              i - 1
            );
            if (tmpAnswer == "false") {
              thisAnswersArray = [tmpAnswer];
              firstHintText = tmpHint;
              i = pushedOperatorsStringArray.length;
            } else {
              tmpHintString +=
                (tmpHintString == "" ? "" : orText[languageIndex]) + tmpHint;
              thisAnswersArray.push(tmpAnswer);
              tmpHintString =
                multiplyDivideFirstHintLeft[languageIndex] +
                tmpHintString +
                multiplyDivideFirstHintRight[languageIndex];
              if (firstHint) {
                firstHintText = tmpHintString;
                firstHint = false;
              }
            }
          }
        }
        previousIndex = i;
      }
    }
    if (firstHintText != "") {
      //setErrorMessage(firstHintText);
      completeHintString += firstHintText;
    }
    return thisAnswersArray;
  }

  function addSubtract(
    replacedString,
    operatorsStringArray,
    operatorsIndexArray
  ) {
    let thisAnswersArray = [];
    let thisHints = "";
    if (operatorsStringArray[0] == "-") {
      //check first "-" gets negative number
      if (replacedString.indexOf("%") === -1 && eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) < 0 && !includes(typeAndFormulaAnswerArrayForAnyStage[0], "Negative")) {
        //one exchange
        let i;
        let firstHint = true;
        for (i = 1; i < operatorsStringArray.length; i++) {
          if (operatorsStringArray[i] == "+") {
            const {
              tmpAnswer,
              tmpHint,
            } = exchange(
              replacedString,
              operatorsStringArray,
              operatorsIndexArray,
              i
            );
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              //setErrorMessage(tmpHint + exchangeToAvoidNegativeHint[languageIndex]);
              completeHintString += tmpHint + exchangeToAvoidNegativeHint[languageIndex];
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "-"
        const {
          tmpAnswer,
          tmpHint,
        } = getAnswerString(
          replacedString,
          operatorsIndexArray,
          0,
          0
        );
        //setErrorMessage(calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex]);
        completeHintString += calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex];
        thisAnswersArray.push(tmpAnswer);
        return thisAnswersArray;
      }
    } else {
      //check subtract to tens or hundreds
      let j;
      let firstHint = true;
      for (j = 1; j < operatorsStringArray.length; j++) {
        if (operatorsStringArray[j] == "-") {
          let {
            tmpAnswer,
            tmpHint,
          } = exchange(
            replacedString,
            operatorsStringArray,
            operatorsIndexArray,
            j
          );
          let tmpOperationString = tmpAnswer.substring(
            0,
            tmpAnswer.indexOf("+")
          );
          let tmpNumber = eval(tmpOperationString);
          //check result is tens or hundreds
          if (
            (tmpNumber >= 0 && tmpNumber < 100 && tmpNumber % 10 == 0) ||
            (tmpNumber >= 100 && tmpNumber % 100 == 0)
          ) {
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              //setErrorMessage(tmpHint + subtractGetTensHint[languageIndex]);
              completeHintString += tmpHint + subtractGetTensHint[languageIndex];
              firstHint = false;
            }
          }
        }
      }
      if (!firstHint) {
        return thisAnswersArray;
      }
      //"+" chain
      let i;
      for (i = 0; i < operatorsStringArray.length; i++) {
        if (operatorsStringArray[i] == "+") {
          const {
            tmpAnswer,
            tmpHint,
          } = getAnswerString(
            replacedString,
            operatorsIndexArray,
            0,
            i
          );
          thisAnswersArray.push(tmpAnswer);
          thisHints += (thisHints == "" ? "" : orText[languageIndex]) + tmpHint;
        } else {
          i = operatorsStringArray.length;
        }
      }
      thisHints =
        calculateFirstHintLeft[languageIndex] +
        thisHints +
        calculateFirstHintRight[languageIndex];
      //setErrorMessage(thisHints);
      completeHintString += thisHints;
      return thisAnswersArray;
    }
  }

  function multiplyDivide(
    replacedString,
    operatorsStringArray,
    operatorsIndexArray
  ) {
    let thisAnswersArray = [];
    let thisHints = "";
    if (operatorsStringArray[0] == "/") {
      //check first "/" gets decimal number
      let tmpValue =
        Math.round(
          eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) *
          10 ** (numberOfDecimal + 2)
        ) /
        10 ** (numberOfDecimal + 2);
      if (
        (!Number.isInteger(tmpValue) && !acceptDecimal) ||
        (Number(tmpValue.toFixed(numberOfDecimal)) != tmpValue && acceptDecimal)
      ) {
        //one exchange
        let i;
        let firstHint = true;
        for (i = 1; i < operatorsStringArray.length; i++) {
          if (operatorsStringArray[i] == "*") {
            let {
              tmpAnswer,
              tmpHint,
            } = exchange(
              replacedString,
              operatorsStringArray,
              operatorsIndexArray,
              i
            );
            thisAnswersArray.push(tmpAnswer);
            tmpValue =
              Math.round(
                eval(
                  replacedString.substring(0, operatorsIndexArray[2]) +
                  replacedString.substring(
                    operatorsIndexArray[i + 1],
                    operatorsIndexArray[i + 2]
                  )
                ) *
                10 ** (numberOfDecimal + 2)
              ) /
              10 ** (numberOfDecimal + 2);
            console.log(tmpValue);
            if (
              firstHint == true ||
              (Number.isInteger(tmpValue) && !acceptDecimal) ||
              (Number(tmpValue.toFixed(numberOfDecimal)) === tmpValue &&
                acceptDecimal)
            ) {
              //setErrorMessage(tmpHint + exchangeToAvoidDecimalHint[languageIndex]);
              completeHintString += tmpHint + exchangeToAvoidDecimalHint[languageIndex];
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "/"

        //check divisor is a decimal
        let divisor = replacedString.slice(operatorsIndexArray[1] + 1, operatorsIndexArray[2]);
        if (divisor.indexOf(".") > -1) {
          //divisor with decimal
          let numberOfDecimal = divisor.split(".")[1].length;
          let dividend = replacedString.slice(operatorsIndexArray[0] + 1, operatorsIndexArray[1]);
          let newDivisor = (parseFloat(divisor) * Math.pow(10, numberOfDecimal)).toString();
          let newDividend = (parseFloat(dividend) * Math.pow(10, numberOfDecimal)).toString();
          let rightPart = replacedString.slice(operatorsIndexArray[2]);
          let tmpAnswer = newDividend + "/" + newDivisor + rightPart;
          //let tmpHint = "expand the division to an integer divisor first";
          let tmpHint = beforeDecimalDivision1[languageIndex] + divisor + beforeDecimalDivision2[languageIndex];
          //setErrorMessage(tmpHint);
          completeHintString += tmpHint;
          thisAnswersArray.push(tmpAnswer);
          return thisAnswersArray;
        } else {
          //divisor without decimal
          const {
            tmpAnswer,
            tmpHint,
          } = getAnswerString(
            replacedString,
            operatorsIndexArray,
            0,
            0
          );
          //setErrorMessage(calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex]);
          completeHintString += calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex];
          thisAnswersArray.push(tmpAnswer);
          return thisAnswersArray;
        }
      }
    } else {
      //check division to an integer
      let j;
      let firstHint = true;
      for (j = 1; j < operatorsStringArray.length; j++) {
        if (operatorsStringArray[j] == "/") {
          let {
            tmpAnswer,
            tmpHint,
          } = exchange(
            replacedString,
            operatorsStringArray,
            operatorsIndexArray,
            j
          );
          let tmpOperationString = tmpAnswer.substring(
            0,
            tmpAnswer.indexOf("*")
          );
          let tmpNumber =
            Math.round(eval(tmpOperationString) * 10 ** (numberOfDecimal + 2)) /
            10 ** (numberOfDecimal + 2);
          //check result is an integer
          if (
            (Number.isInteger(tmpNumber) && !acceptDecimal) ||
            (Number(tmpNumber.toFixed(numberOfDecimal)) == tmpNumber &&
              acceptDecimal)
          ) {
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              //setErrorMessage(tmpHint + divideGetSmallerHint[languageIndex]);
              completeHintString += tmpHint + divideGetSmallerHint[languageIndex];
              firstHint = false;
            }
          }
        }
      }
      if (!firstHint) {
        return thisAnswersArray;
      }
      //"*" chain
      let i;
      for (i = 0; i < operatorsStringArray.length; i++) {
        if (operatorsStringArray[i] == "*") {
          const {
            tmpAnswer,
            tmpHint,
          } = getAnswerString(
            replacedString,
            operatorsIndexArray,
            0,
            i
          );
          thisAnswersArray.push(tmpAnswer);
          thisHints += (thisHints == "" ? "" : orText[languageIndex]) + tmpHint;
        } else {
          i = operatorsStringArray.length;
        }
      }
      thisHints =
        calculateFirstHintLeft[languageIndex] +
        thisHints +
        calculateFirstHintRight[languageIndex];
      //setErrorMessage(thisHints);
      completeHintString += thisHints;
      return thisAnswersArray;
    }
  }

  function exchange(
    replacedString,
    operatorsStringArray,
    operatorsIndexArray,
    index
  ) {
    let startString = replacedString.substring(
      0,
      operatorsIndexArray[1]
    );
    let firstOperation = replacedString.substring(
      operatorsIndexArray[1],
      operatorsIndexArray[index + 1]
    );
    let secondOperation = replacedString.substring(
      operatorsIndexArray[index + 1],
      operatorsIndexArray[index + 1 + 1]
    );
    let endString = replacedString.substring(
      operatorsIndexArray[index + 1 + 1]
    );
    let tmpAnswer =
      startString + secondOperation + firstOperation + endString;
    let tmpHint =
      rearrangeHintLeft[languageIndex] +
      startString +
      secondOperation +
      rearrangeHintRight[languageIndex];
    //setErrorMessage(tmpHint);
    //completeHintString += tmpHint;
    return { tmpAnswer, tmpHint };
  }

  //calculate the operator at index
  function getAnswerString(
    replacedString,
    operatorsIndexArray,
    startIndex,
    endIndex
  ) {
    let tmpAnswer = "";
    let tmpHint = "";
    let percentString = "";
    //value from this operator
    let operationString = replacedString.substring(
      operatorsIndexArray[startIndex + 1 - 1] + 1,
      operatorsIndexArray[endIndex + 1 + 1]
    );
    console.log("operatorsIndexArray[startIndex + 1 - 1] + 1: " + (operatorsIndexArray[startIndex + 1 - 1] + 1))
    console.log("operatorsIndexArray[endIndex + 1 + 1]: "+operatorsIndexArray[endIndex + 1 + 1])
    console.log("operationString: "+operationString)
    console.log("operatorsIndexArray: "+operatorsIndexArray)
    console.log("replacedString: "+ replacedString);
    let startString = replacedString.substring(
      0,
      operatorsIndexArray[startIndex + 1 - 1] + 1
    );
    let endString = replacedString.substring(
      operatorsIndexArray[endIndex + 1 + 1]
    );
    if (operationString.indexOf("%") > -1) {
      //with % in + or -, change 1 to 100%
      let onlySomeNumberWithPercent = false;
      let updatedString = "";
      let hintString = "";
      for (let i = startIndex + 1; i < endIndex + 3; i++) {
        let indexBeforeOperator = operatorsIndexArray[i] - 1;
        let thisOperator = "";
        if (i < endIndex + 2) {
          thisOperator = replacedString[operatorsIndexArray[i]];
          console.log("thisOperator: " + thisOperator);
        }
        if (replacedString[indexBeforeOperator] != "%") {
          onlySomeNumberWithPercent = true;
          let thisValue = parseFloat(replacedString.slice(operatorsIndexArray[i - 1] + 1, indexBeforeOperator + 1));
          console.log("the number: " + replacedString.slice(operatorsIndexArray[i - 1] + 1, indexBeforeOperator + 1))
          let updatedValue = thisValue * 100;
          let updatedNumberString = updatedValue.toString() + "%";
          updatedString += updatedNumberString + thisOperator;
          hintString += ", " + thisValue;
          console.log("updatedString: " + updatedString);
        } else {
          updatedString += replacedString.slice(operatorsIndexArray[i - 1] + 1, operatorsIndexArray[i]) + thisOperator;
          console.log("updatedString: " + updatedString);
        }
      }
      //+ or - operations with only some numbers with %
      if (onlySomeNumberWithPercent && includes(["+", "-"], replacedString[operatorsIndexArray[1]])) {
        tmpAnswer = startString + updatedString + endString;
        hintString = hintString.slice(2);
        //tmpHint = "convert integer or decimal to percentage";
        tmpHint = beforeAddSubtractPercent[languageIndex] + firstConvert2[languageIndex] + hintString + toPercent[languageIndex];
        return { tmpAnswer, tmpHint };
      } else {
        //with %, but all have or * or / operations
        percentString = "%";
        operationString = operationString.replace(/\%/g, "");
        completeHintString += operationWithPercent[languageIndex];
      }
    }
    console.log("not break")
    console.log(operationString)
    /*if (operationString.indexOf("%") > -1) {
      percentString = "%";
      operationString = operationString.replace(/\%/g, "");
    }*/
    let value =
      Math.round(eval(operationString) * 10 ** (numberOfDecimal + 2)) /
      10 ** (numberOfDecimal + 2);
    if (
      ((Number.isInteger(value) && !acceptDecimal) ||
        (Number(value.toFixed(numberOfDecimal)) == value && acceptDecimal)) &&
      (value >= 0 || includes(typeAndFormulaAnswerArrayForAnyStage[0], "Negative"))
    ) {
      //this step is a positive integer
      //set one of possible hints
      tmpHint = operationString;

      let valueString = value.toString();

      tmpAnswer = startString + valueString + percentString + endString;
      return { tmpAnswer, tmpHint };
    } else {
      //this step is not a positive integer
      let acceptDecimalIndex = (includes(typeAndFormulaAnswerArrayForAnyStage[0], "decimal") ? 1 : 0);
      tmpHint = resultBeValidHint[acceptDecimalIndex * 4 + languageIndex];
      tmpAnswer = "false";
      return { tmpAnswer, tmpHint };
    }
  }

  function createIndexArrays(
    replacedString
  ) {
    let operatorsStringArray = []; //eg.["+","-","-"]
    let operatorsIndexArray = [-1]; //eg.[-1,4,6,9]

    //create operatorsStringArray and operatorsIndexArray
    let i;
    for (i = 0; i < replacedString.length; i++) {
      //if (includes(["+", "-", "*", "/"], replacedString.slice(i, i + 1))) {
      if (includes(["+", "*", "/"], replacedString[i]) || replacedString[i] === "-" && i > 0 && !includes(["+", "*", "/", "(", "{"], replacedString[i - 1])) {
        operatorsStringArray.push(replacedString.slice(i, i + 1));
        operatorsIndexArray.push(i);
      }
    }
    operatorsIndexArray.push(replacedString.length);
    console.log("replacedString: "+replacedString)
    console.log(operatorsStringArray);
    return { operatorsStringArray, operatorsIndexArray };
  }

  function getLastOperatorIndex(thisString) {
    console.log("thisString:" + thisString)
    let thisIndex = -1;
    for (let i = 0; i < thisString.length; i++) {
      console.log("thisString[thisString.length - 1 - i]: " + thisString[thisString.length - 1 - i])
      if (includes(["+", "-", "*", "/", "×", "÷"], thisString[thisString.length - 1 - i])) {
        thisIndex = thisString.length - 1 - i;
        console.log("thisIndex: " + thisIndex)
        i = thisString.length;
      }
    }
    return thisIndex;
  }

  useEffect(() => {
    if (callKeypadClick[0] > 0) {
      let key = callKeypadClick[1];
      if (formulaFocusedIndex == formulaLinesArray.length - 1) {
        let tmpFormulaLinesArray = [...formulaLinesArray];
        let tmpString = tmpFormulaLinesArray[formulaFocusedIndex];
        let lastCharIndex = tmpString.indexOf("|") - 1;
        let lastChar = tmpString.substr(lastCharIndex, 1);
        if (tmpString === "" || tmpString === "|") {
          //setup for the beginning with no character
          tmpString = "|";
          lastChar = "";
        }
        //move cursor when fraction button is clicked
        if (key === "?/2") {
          if (!includes([")", "^", "%", "."], lastChar) && tmpString.lastIndexOf(".") <= getLastOperatorIndex(tmpString)) {
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.replace("|", "^\\frac{|}{}^");
            setDecimalFractionStage((prev) => prev + 1);
          }
        } else if (key === "1/?") {
          tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.replace("|}{}^", "}{|}^");
        } else if (key === "OK") {
          tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.replace("|}^", "}^|");
        } else if (key === "<-") {
          if (includes(["^|", "{|"], tmpString.substr(tmpString.indexOf("|") - 1, 2))) {
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.slice(0, tmpString.lastIndexOf("^\\frac")) + "|";
            setDecimalFractionStage(0);
          } else {
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.slice(0, tmpString.indexOf("|") - 1) + tmpString.slice(tmpString.indexOf("|"));
          }
        } else {
          console.log("tmpString.lastIndexOf(.):" + tmpString.lastIndexOf("."))
          console.log("getLastOperatorIndex(tmpString):" + getLastOperatorIndex(tmpString))
          if (
            !(
              (includes(["+", "-", "×", "÷", ".", "(", "{", ""], lastChar) &&
                includes(["+", "×", "÷", ".", ")", "%"], key)) ||
              (!includes(["+", "-", "×", "÷", "(", ""], lastChar) &&
                key === "(") ||
              (includes([")", "^", "%"], lastChar) &&
                includes(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], key)) ||
              ((includes(["^", "%", "{"], lastChar) || tmpString.lastIndexOf(".") > getLastOperatorIndex(tmpString)) &&
                includes(["."], key)) ||
              ((lastChar === "%" || tmpString.slice(-1) === "^") &&
                includes(["%"], key)) ||
              ((includes(["-", "."], lastChar) || (includes(["+", "×", "÷", "(", "{", ""], lastChar) && !includes(typeAndFormulaAnswerArrayForAnyStage[0], "Negative"))) &&
                includes(["-"], key))//
            )
          ) {
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.replace("|", key + "|");
          }
        }
        console.log("call keypad click" + callKeypadClick[0])
        setFormulaLinesArray(tmpFormulaLinesArray);
      }
    }
  }, [callKeypadClick]);

  const classes = pagesStyles();

  return (
    <Grid className={classes.centerRow}>
      <Grid className={classes.formulaColumn}>
        {formulaLinesArray.map((formula, index) => {
          const formulaArray = (formula === "" ? [formaulaPlaceholder[languageIndex]] : formula.split("^")); //
          return (
            <Grid
              key={index}
              className={`${classes.verticalCenterRow} ${classes.commonPadding}`}
            >
              <Typography
                className={classes.equalSign}
                style={{ opacity: index == 0 ? 0 : 1 }}
              >
                =
              </Typography>
              <Button
                className={`${classes.formulaLine} ${classes.formulaBox}`}
                variant="outlined"
                style={{
                  borderColor:
                    index == formulaFocusedIndex
                      ? myTheme.color.myMagenta
                      : myTheme.color.blue,
                  borderWidth: index == formulaFocusedIndex ? 3 : 1,
                  whiteSpace: 'pre-line'
                }}
              >
                {formulaArray.map((text, index) => {
                  return index % 2 === 0 ? (
                    <span key={index}>{text}</span>
                  ) : (
                    <InlineMath key={index}>{text}</InlineMath>
                  );
                })}
              </Button>
              {index == formulaFocusedIndex && (
                <Button
                  className={classes.okButton}
                  variant="contained"
                  style={{ textTransform: 'capitalize' }}
                  onClick={okClick}
                  color="primary"
                >
                  OK
                </Button>
              )}
              {index == formulaLinesArray.length - 1 && completed && (
                <Button
                  className={classes.okButton}
                  variant="contained"
                  style={{ textTransform: 'capitalize' }}
                  onClick={resetClick}
                  color="primary"
                >
                  <ForwardRoundedIcon className={classes.resetArrow} />
                </Button>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
