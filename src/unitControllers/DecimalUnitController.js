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
  const { topicIndex, learningToolIndex } = topicToolIndex;//a, b
  const [formulaLinesArray, setFormulaLinesArray] = useState([""]);
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);
  const [answersArray, setAnswersArray] = useState([]);
  const [maximumOperators, setMaximumOperators] = useState(
    topicIndex + 3
  );
  const [acceptDecimal, setAcceptDecimal] = useState(
    typeAndFormulaAnswerArrayForAnyStage[0].includes("decimal") ? true : false
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
  } = constants;

  useEffect(() => {
    setAcceptDecimal(typeAndFormulaAnswerArrayForAnyStage[0].includes("decimal") ? true : false);
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
    if (typeAndFormulaAnswerArrayForAnyStage[0].includes("Text")) {
      //set formula line 0
      console.log("text type clear first line")
      setFormulaLinesArray([""]);
    } else if (typeAndFormulaAnswerArrayForAnyStage[0].includes("Formula")) {
      console.log(typeAndFormulaAnswerArrayForAnyStage[1][0])
      console.log(typeAndFormulaAnswerArrayForAnyStage[1][0][0][0])
      let tmpString = typeAndFormulaAnswerArrayForAnyStage[1][0][0][0];
      console.log(tmpString);
      setFormulaLinesArray([tmpString]);
    }
  }, [typeAndFormulaAnswerArrayForAnyStage]);

  const okClick = () => {
    //check last character is an operator
    let tmpString = formulaLinesArray[formulaFocusedIndex];
    let lastChar = tmpString.slice(tmpString.length - 1);
    if (["+", "-", "×", "÷"].includes(lastChar)) {
      return;
    }
    //replace last formula hints
    let replacedHint = errorMessage.replace(/\*/g, "×");
    replacedHint = replacedHint.replace(/\//g, "÷");
    setErrorMessage(replacedHint);
    //replace this formula
    let replacedString = formulaLinesArray[formulaFocusedIndex].replace(/×/g, "*");
    replacedString = replacedString.replace(/÷/g, "/");

    //first formula
    if (formulaFocusedIndex == 0) {
      //check answer is a positive integer
      let removeFractionString = replacedString.replace("^\\frac{", "(");
      removeFractionString = removeFractionString.replace("}{", ")/(");
      removeFractionString = removeFractionString.replace("}^", ")");
      console.log(removeFractionString)
      let tmpValue =
        Math.round(eval(removeFractionString) * 10 ** (numberOfDecimal + 2)) /
        10 ** (numberOfDecimal + 2);
      if (
        ((Number.isInteger(tmpValue) && !acceptDecimal) ||
          (Number(tmpValue.toFixed(numberOfDecimal)) == tmpValue &&
            acceptDecimal)) &&
        tmpValue >= 0
      ) {
        nextStepPreparation(replacedString);
      } else {
        //not a positive integer
        let acceptDecimalIndex = (typeAndFormulaAnswerArrayForAnyStage[0].includes("decimal") ? 1 : 0);
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
        if (
          replacedString.includes("+") ||
          replacedString.includes("-") ||
          replacedString.includes("*") ||
          replacedString.includes("/")
        ) {
          nextStepPreparation(replacedString);
        } else {
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
    let tmpAnswersArray = generateAnswersArray(replacedString);
    //formula cannot generate next step
    if (tmpAnswersArray[0] == "false") {
      handleSetError(errorMessage);
    } else {
      //formula can generate next step
      setAnswersArray(tmpAnswersArray);
      let tmpFormulaLinesArray = [...formulaLinesArray];
      tmpFormulaLinesArray.push("");
      console.log("call next step prep")
      setFormulaLinesArray(tmpFormulaLinesArray);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
    }
  }

  function checkStringContainsElement(thisString, thisArray) {
    let isContain = false;
    thisArray.forEach(element => {
      if (thisString.includes(element)) {
        isContain = true;
      }
    })
    return isContain;
  }

  function checkExcceedMaxOperators(thisString, maximum) {
    const {
      operatorsStringArray,
      operatorsIndexArray,
    } = createIndexArrays(thisString);
    if (
      operatorsStringArray.length > maximum + 10 || //without + 10
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
    if (!checkExcceedMaxOperators(replacedStringOriginal, maximumOperators)) {
      return ["false"];
    }

    //if with () //at last add () if answer string with operators
    let endString = "";
    let startString = "";
    let replacedString = replacedStringOriginal;
    let withParentheses = false;
    if (replacedStringOriginal.includes("(")) {
      withParentheses = true;
      endString = replacedStringOriginal.slice(replacedStringOriginal.indexOf(")") + 1, replacedStringOriginal.length);
      let replacedStringWithStart = replacedStringOriginal.slice(0, replacedStringOriginal.indexOf(")"));
      startString = replacedStringWithStart.slice(0, replacedStringWithStart.lastIndexOf("("));
      replacedString = replacedStringWithStart.slice(replacedStringWithStart.lastIndexOf("(") + 1, replacedStringWithStart.length);
      console.log("startString: " + startString)
      console.log("replacedString: " + replacedString)
      console.log("endString: " + endString)
    }

    let thisAnswersArray = []; //["3+4*2", "4*2+3"]

    //check with fraction
    if (
      replacedString.includes("^")
    ) {
      let stringArray = replacedString.split("^");
      //check any operators in denom or numer
      let targetFractionString = ""
      let noOperatorInFraction = true;
      let thisStartString = "";
      let thisEndString = "";
      for (let i = 0; i < stringArray.length; i++) {
        if (i % 2 === 1 && noOperatorInFraction === true && checkStringContainsElement(stringArray[i], ["+", "-", "*", "/"])) {
          noOperatorInFraction = false;
          let numerString = stringArray[i].slice(stringArray[i].indexOf("{") + 1, stringArray[i].indexOf("}"));
          if (checkStringContainsElement(numerString, ["+", "-", "*", "/"])) {
            thisAnswersArray = generateAnswersArray(numerString);
            thisStartString += "\\frac{";
            thisEndString = stringArray[i].slice(stringArray[i].indexOf("}"));
          } else {
            let denomString = stringArray[i].slice(stringArray[i].indexOf("}") + 2, -1);
            thisAnswersArray = generateAnswersArray(denomString);
            thisStartString += "\\frac{" + numerString + "}{";
            thisEndString = "}";
          }
          //targetFractionString = stringArray[i];
        } else if (noOperatorInFraction) {
          thisStartString += stringArray[i] + "^";
        } else if (!noOperatorInFraction) {
          thisEndString += "^" + stringArray[i];
        }
      }
      console.log("thisStartString"+thisStartString)
      console.log("thisEndString"+ thisEndString)
      console.log("thisAnswersArray"+thisAnswersArray)
      if (noOperatorInFraction) {
        thisStartString = replacedString.slice(0, replacedString.indexOf("^"));
        let numerString = replacedString.slice(replacedString.indexOf("{") + 1, replacedString.indexOf("}"));
        let denomString = replacedString.slice(replacedString.indexOf("}{") + 2, replacedString.indexOf("}^"));
        let value = parseInt(eval(numerString + "/" + denomString) * 100) / 100;
        let valueString = value.toString();
        thisAnswersArray = [valueString];
        thisEndString = replacedString.slice(replacedString.indexOf("}^") + 2);
      }
      if (withParentheses) {
        startString += "(" + thisStartString;
        endString = thisEndString + ")" + endString;
      } else {
        startString += thisStartString;
        endString = thisEndString + endString;
      }
      console.log("startString"+startString)
      console.log("endString"+endString)
    } else {
      //without fraction

      //create operatorsStringArray and operatorsIndexArray
      const {
        operatorsStringArray,
        operatorsIndexArray,
      } = createIndexArrays(replacedString);

      //go to generate answers array
      //check it has + or -
      if (
        operatorsStringArray.includes("+") ||
        operatorsStringArray.includes("-")
      ) {
        //check it is mixed
        if (
          operatorsStringArray.includes("*") ||
          operatorsStringArray.includes("/")
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
      if ((element.includes("+") || element.includes("-") || element.includes("*") || element.includes("/")) && withParentheses && !replacedString.includes("^")) {
        updatedArray.push(startString + "(" + element + ")" + endString);
      } else {
        updatedArray.push(startString + element + endString);
      }
    })
    console.log(updatedArray)
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
      if (["+", "-"].includes(pushedOperatorsStringArray[i])) {
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
      setErrorMessage(firstHintText);
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
      if (eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) < 0) {
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
              setErrorMessage(
                tmpHint + exchangeToAvoidNegativeHint[languageIndex]
              );
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
        setErrorMessage(
          calculateFirstHintLeft[languageIndex] +
          tmpHint +
          calculateFirstHintRight[languageIndex]
        );
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
              setErrorMessage(tmpHint + subtractGetTensHint[languageIndex]);
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
      setErrorMessage(thisHints);
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
              setErrorMessage(
                tmpHint + exchangeToAvoidDecimalHint[languageIndex]
              );
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "/"
        const {
          tmpAnswer,
          tmpHint,
        } = getAnswerString(
          replacedString,
          operatorsIndexArray,
          0,
          0
        );
        setErrorMessage(
          calculateFirstHintLeft[languageIndex] +
          tmpHint +
          calculateFirstHintRight[languageIndex]
        );
        thisAnswersArray.push(tmpAnswer);
        return thisAnswersArray;
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
              setErrorMessage(tmpHint + divideGetSmallerHint[languageIndex]);
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
      setErrorMessage(thisHints);
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
    //value from this operator
    let operationString = replacedString.substring(
      operatorsIndexArray[startIndex + 1 - 1] + 1,
      operatorsIndexArray[endIndex + 1 + 1]
    );
    let value =
      Math.round(eval(operationString) * 10 ** (numberOfDecimal + 2)) /
      10 ** (numberOfDecimal + 2);
    if (
      ((Number.isInteger(value) && !acceptDecimal) ||
        (Number(value.toFixed(numberOfDecimal)) == value && acceptDecimal)) &&
      value >= 0
    ) {
      //this step is a positive integer
      //set one of possible hints
      tmpHint = operationString;
      let startString = replacedString.substring(
        0,
        operatorsIndexArray[startIndex + 1 - 1] + 1
      );
      let valueString = value.toString();
      let endString = replacedString.substring(
        operatorsIndexArray[endIndex + 1 + 1]
      );
      tmpAnswer = startString + valueString + endString;
      return { tmpAnswer, tmpHint };
    } else {
      //this step is not a positive integer
      let acceptDecimalIndex = (typeAndFormulaAnswerArrayForAnyStage[0].includes("decimal") ? 1 : 0);
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
      if (["+", "-", "*", "/"].includes(replacedString.slice(i, i + 1))) {
        operatorsStringArray.push(replacedString.slice(i, i + 1));
        operatorsIndexArray.push(i);
      }
    }
    operatorsIndexArray.push(replacedString.length);
    return { operatorsStringArray, operatorsIndexArray };
  }

  useEffect(() => {
    if (callKeypadClick[0] > 0 && !["1/?", "OK"].includes(callKeypadClick[1])) {
      let key = callKeypadClick[1];
      if (key === "?/2") {
        key = "^\\frac{|}{|}^";
      }
      if (formulaFocusedIndex == formulaLinesArray.length - 1) {
        let tmpFormulaLinesArray = [...formulaLinesArray];
        let tmpString = tmpFormulaLinesArray[formulaFocusedIndex];
        if (key == "<-") {
          if (tmpString.slice(-1) === "^") {
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.slice(0, tmpString.lastIndexOf("^\\frac"));
            setDecimalFractionStage(0);
          } else {
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.slice(0, -1);
          }
        } else {          
          let lastCharIndex = tmpString.length - 1;
          switch(decimalFractionStage) {
            case 1: lastCharIndex = tmpString.lastIndexOf("}{") - 1; break;
            case 2: lastCharIndex = tmpString.lastIndexOf("}") - 1; break;
            default: lastCharIndex = tmpString.length - 1; break;
          }
          let lastChar = tmpString.substr(lastCharIndex, 1);
          if (
            !(
              (["+", "-", "×", "÷", ".", "(", ""].includes(lastChar) &&
                ["+", "-", "×", "÷", ".", ")"].includes(key)) ||
              (!["+", "-", "×", "÷", "(", ""].includes(lastChar) &&
                key === "(") ||
              ((lastChar === ")" || lastChar === "^") &&
                ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "^\\frac{|}{|}^"].includes(key)) ||
              (lastChar === "^" &&
                ["^\\frac{|}{|}^", "."].includes(key))
            )
          ) {
            if (key === "^\\frac{|}{|}^") {
              setDecimalFractionStage((prev) => prev + 1);
            }
            let removeCursor = 0;
            if (lastChar === "|") { removeCursor = 1; }
            tmpFormulaLinesArray[formulaFocusedIndex] = tmpString.slice(0, lastCharIndex - removeCursor + 1) + key + tmpString.slice(lastCharIndex + 1, tmpString.length);
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
