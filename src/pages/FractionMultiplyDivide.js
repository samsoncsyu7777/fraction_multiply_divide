import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyKeypad } from "../components/KeypadComponents";
import { FractionFormula } from "../components/FractionFormulaComponents";
import { StageButtons } from "../components/StageComponents";
import { Login } from "../components/LoginComponents";
import { TextQuestion } from "../components/TextQuestionComponents";
import questions0 from "../questions/Questions0";
import brackets0 from "../questions/Brackets0";
import questions1 from "../questions/Questions1";
import brackets1 from "../questions/Brackets1";
import questions2 from "../questions/Questions2";
import brackets2 from "../questions/Brackets2";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import constants from "../constants/FractionMultiplyDivideConstants";
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";
import { pagesStyles } from "../themes/styles";
import { theme as myTheme } from "../themes/theme";
import { ContactSupportOutlined } from "@material-ui/icons";

const style = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
};

//×÷👍👍🏻
export const FractionMultiplyDivide = ({
  languageIndex,
  bibleVersionIndex,
  topic,
  learningTool,
  topicToolIndex,
  unitIndex,
  examIndex
  //isLogined,
  //setIsLogined
}) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [fractionLinesArray, setFractionLinesArray] = useState([
    [
      ["", 0, 0, 0, 0, 0],
      ["", 0, 0, 0, 0, 0]
    ]
  ]);
  const [bracketArray, setBracketArray] = useState([[]]);
  const [fractionPositionIndex, setFractionPositionIndex] = useState(0);
  const [fractionPartIndex, setFractionPartIndex] = useState(3);
  const [okButtonStage, setOkButtonStage] = useState(0); //"Enter", "Reduce?", "Completed"
  const [calculationStage, setCalculationStage] = useState(0); //0:with mixed number, 1:with division, 2:need simplify, 3:with multiplication, 4:improper number, 5:completed
  const [calculatedLcm, setCalculatedLcm] = useState(1);
  const [stageOrder, setStageOrder] = useState({ stage: 0, order: 0 });
  const [isLogined, setIsLogined] = useState(false);//FALSE
  const { topicIndex, learningToolIndex } = topicToolIndex;
  const timeDelay = 200;
  const primeNumbers = getPrimeNumbers();
  const [indexDecreasedByLastStage, setIndexDecreasedByLastStage] = useState(0);
  const [typeOfCalculation, setTypeOfCalculation] = useState(""); //"A&S" or "M&D"
  const [mixedStage, setMixedStage] = useState("hasBracket"); //"hasMixedCal" or "noMixedCal"
  const [fractionIndexInProcess, setFractionIndexInProcess] = useState([0, 1]); //need to change
  const [bracketStage, setBracketStage] = useState(""); //"hasMixedCal" or "noMixedCal"
  const [startEndIndexLastStage, setStartEndIndexLastStage] = useState([0, 0]);
  const [isNewStep, setIsNewStep] = useState(true);
  const [bracketStageArray, setBracketStageArray] = useState({bracketStage: "", type: "", startIndex: 0, endIndex: 1});
  const [mixedStageArray, setMixedStageArray] = useState({mixedStage: "hasBracket", type: "", startIndex: 0, endIndex: 1});
  const [lastMixBrackArray, setLastMixBrackArray] = useState({lastMix: "", lastBrack: ""});
  const [startEndIndexLastLine, setStartEndIndexLastLine] = useState([0, 0]);
  //let questions = questions0;
  //let brackets = brackets0;
  const [questions, setQuestions] = useState(questions0);
  const [brackets, setBrackets] = useState(brackets0);
  const questionsFilesArray = [[...questions0], [...questions1], [...questions2]];
  const bracketsFilesArray = [[...brackets0], [...brackets1], [...brackets2]];
  //use calculationStage for both A&S and M&D
  /*let mixedStage; //= "hasBracket";
  const setMixedStage = (stage) => {
    mixedStage = stage;
  };
  let bracketStage; //= "";
  console.log("let again")
  const setBracketStage = (stage) => {
    console.log("bracket stage: "+stage)
    bracketStage = stage;
  };*/
  /*let typeOfCalculation = "";
  const setTypeOfCalculation = (type) => {
    typeOfCalculation = type;
  };*/

  const {
    stageText,
    manual,
    exam,
    okButtonText,
    topics,
    wellDone,
    noOperator,
    singleNumber,
    noNumber,
    fractionHasBoth,
    noImproper,
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
    noMixedBeforeReduction,
    noDivisionBeforeReduction,
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
    operatorBeforeStep,
    decreaseMessage,
    keepOthers1,
    keepOthers2,
    keepOthers3,
    noIntegerAfterMulti,
    oddBrackets
  } = constants;

  useEffect(() => {
    //arrange all setSeverity before setOpenAlert
    if (severity === "error") {
      //.push errorMessage
    }
  }, [openAlert]);

  //both versions equal
  useEffect(() => {
    if (isLogined) {
      setStageOrder({ stage: -2, order: 0 });
    } else {
      if (questions[topicIndex][learningToolIndex].length === 0) {
        if (stageOrder === { stage: -1, order: 0 }) {
          resetDefault();
        } else {
          setStageOrder({ stage: -1, order: 0 });
        }
      } else {
        if (stageOrder === { stage: 0, order: 0 }) {
          resetDefault();
        } else {
          setStageOrder({ stage: 0, order: 0 });
        }
      }
    }
  }, [topicToolIndex]);

  useEffect(() => {
    //console.log("unitIndex:"+unitIndex)
    //console.log("questionsFilesArray[0]:"+questionsFilesArray[0])
    //questions = [...questionsFilesArray[unitIndex]];
    setQuestions(questionsFilesArray[unitIndex]);
    //console.log("questions:"+questions)
    //brackets = [...bracketsFilesArray[unitIndex]];
    setBrackets(bracketsFilesArray[unitIndex]);
    resetDefault();
  }, [unitIndex])

  //both versions equal
  useEffect(() => {
    console.log("stageOrder change: " + stageOrder.stage + stageOrder.order);
    resetDefault();
  }, [stageOrder]);

  //both versions equal and need to get answers, brackets and responses
  useEffect(() => {
    if (
      stageOrder.stage > -1 &&
      formulaFocusedIndex === 0 &&
      fractionLinesArray[0][1][0] != "" &&
      calculationStage < 2
    ) {
      //get question and go to next stage
      okClick();
    }
  }, [fractionLinesArray]);

  //both versions equal
  const handleStageClick = (stage) => {
    if (!isLogined) {
      setStageOrder({ stage: stage, order: 0 });
    }
  };

  //both versions equal and need to get brackets
  const setQuestion = (stage, order) => {
    //console.log("questions:"+questions)
    let tmpArray = [...questions[topicIndex][learningToolIndex][stage][order]];
    tmpArray.push(["", 0, 0, 0, 0, 0]);
    setFractionLinesArray([tmpArray]);
    let tmpArray2 = [...brackets[topicIndex][learningToolIndex][stage][order]];
    let tmpArray3 = [];
    tmpArray3.push(tmpArray2);
    setBracketArray(tmpArray3);
    console.log("get from file:"+tmpArray2 )
    console.log("tmpArray3:"+tmpArray3)
  };

  //equal
  const closeAlert = (e) => {
    setOpenAlert(false);
  };

  //equal
  function resetDefault() {
    setSeverity("error");
    console.log("reset");
    setFormulaFocusedIndex(0);
    setCompleted(false);
    setOkButtonStage(0);
    setCalculationStage(0);
    setIndexDecreasedByLastStage(0);
    setTypeOfCalculation("");
    setMixedStage("hasBracket");
    setMixedStageArray({mixedStage: "hasBracket", type: "", startIndex: 0, endIndex: 1});
    setFractionIndexInProcess([0, 1]);
    setBracketStage("");
    setStartEndIndexLastStage([0, 0]);
    setStartEndIndexLastLine([0,0]);//***
    setLastMixBrackArray({lastMix: "", lastBrack: ""});//*** */
    if (stageOrder.stage > -1) {
      setQuestion(stageOrder.stage, stageOrder.order);
      //setBracketArray([[]]); //get from const
    } else if (stageOrder.stage === -1) {
      setFractionLinesArray([
        [
          ["", 0, 0, 0, 0, 0],
          ["", 0, 0, 0, 0, 0]
        ]
      ]);
      setBracketArray([[]]);
    } else if (stageOrder.stage === -2) {
      //get from server
      setFractionLinesArray([
        [
          ["", 0, 0, 0, 0, 0],
          ["", 0, 0, 0, 0, 0]
        ]
      ]);
      setBracketArray([[]]);
    }
  }
  //completed part equal. not completed part needs mixed version and go to next mixed stage
  const resetClick = (e) => {
    console.log("completed: " + completed);
    console.log("startEndIndexLastStage:" + startEndIndexLastStage);
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    if (completed) {
      if (stageOrder.stage > -1) {
        resetDefault();//*** */
        if (
          stageOrder.order <
          questions[topicIndex][learningToolIndex][stageOrder.stage].length - 1
        ) {
          setStageOrder({
            stage: stageOrder.stage,
            order: stageOrder.order + 1
          });
        } else if (
          stageOrder.stage <
          questions[topicIndex][learningToolIndex].length - 1
        ) {
          setStageOrder({ stage: stageOrder.stage + 1, order: 0 });
        } else {
          setStageOrder({ stage: -1, order: 0 });
        }
      } else {
        console.log("resetClick");
        resetDefault();
      }
    } else if (okButtonStage > 0) {
      if (typeOfCalculation === "M&D") {
        if (calculationStage == 2) {
          checkSimplifyValue(
            formulaFocusedIndex,
            false,
            fractionIndexInProcess[0],//*** */startEndIndexLastStage[0],
            fractionIndexInProcess[1]//*** */startEndIndexLastStage[1]
          ); //or index = 1?
        } else {
          //*** */setFractionIndexInProcess(startEndIndexLastStage);
          addLine();
        }
      } else if (typeOfCalculation === "A&S") {
        if (calculationStage == 3) {
          var checkValue = false;
          if (
            fractionLinesArray[formulaFocusedIndex][
              startEndIndexLastStage[0]
            ][4] > 0
          ) {
            //position[0]
            checkValue = true;
          }
          checkSimplifyValue(
            formulaFocusedIndex,
            checkValue,
            fractionIndexInProcess[0],//*** */startEndIndexLastStage[0],
            fractionIndexInProcess[0]//*** */startEndIndexLastStage[0]
          );
        } else {
          // addLine();
        }
      }
    }
  };

  useEffect(() => {
    console.log(formulaFocusedIndex);
  }, [formulaFocusedIndex]);

  //equal
  async function addLine() {
    console.log("addLine");
    console.log("fractionLinesArray.length:" + fractionLinesArray.length);
    setLastMixBrackArray({lastMix: mixedStage, lastBrack: bracketStage});
    //*** */let tmpIndex = [...startEndIndexLastStage];
    let tmpIndex = [...fractionIndexInProcess];
    //*** */setStartEndIndexLastLine(tmpIndex);
    let bracketFormula = [...bracketArray];
    bracketFormula.push([]);
    setBracketArray(bracketFormula);
    setPartValue(0, -1, -1, true, false, false);
    setFormulaFocusedIndex((prevState) => prevState + 1); // formulaFocusedIndex + 1);
    setOkButtonStage(0);
  }

  //A&S only. Need both A&S and mixed versions -> This version can serve both
  function positiveResultCheck(index, startIndex, endIndex) {
    console.log("positiveResultCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    //setStartEndIndexLastStage([startIndex, endIndex]);
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
        setErrorMessage(noImproper[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    console.log("expression:"+expression)
    try {
      result = eval(expression);
    } catch (err) {
      result = 0;
    }
    console.log("result:"+result)

    //check at least one fraction
    if (sumOfDenominators === 0) {
      setErrorMessage(atLeastOneFraction[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    //check result is negative
    if (result < 0) {
      setErrorMessage(negativeResult[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    } else {
      return true;
    }
  }

  //A&S only
  function noVariousDenominatorCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    console.log("noVariousDenominatorCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
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

      //*** */setStartEndIndexLastStage([startIndex, endIndex]);
      noNegativeNumeratorResultCheck(index, false, startIndex, endIndex);
      return true;
    } else {
      //check other fractions
      if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
        return false;
      }
      //check brackets equal to last formula
      if (
        JSON.stringify(bracketArray[index]) !==
        JSON.stringify(bracketArray[index - 1])
      ) {
        setErrorMessage(parentheses[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      //check denominators become lcm
      var denominatorMultiples = [];
      var lcm = 0;
      //var i;
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        let middleMessage = (startIndex === endIndex ? "" : sameNumberOfFractions2[languageIndex] + (endIndex + 1));
        setErrorMessage(sameNumberOfFractions1[languageIndex] + (startIndex + 1) + middleMessage + sameNumberOfFractions3[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      console.log("startIndex:"+startIndex)
      console.log("endIndex:"+endIndex)
      for (i = startIndex; i < endIndex + 1; i++) {
        //for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
        if (
          fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
        ) {
          setErrorMessage(sameOperatorsInNoVarDenom[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (
          fractionLinesArray[index][i][1] != fractionLinesArray[index - 1][i][1]
        ) {
          setErrorMessage(sameWholeNumbersInNoVarDenom[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        console.log("index in noVarious:"+index)
        console.log("i:"+i)
        if (fractionLinesArray[index - 1][i][4] > 0) {
          if (
            fractionLinesArray[index][i][4] %
              fractionLinesArray[index - 1][i][4] !=
              0 ||
            fractionLinesArray[index][i][4] == 0
          ) {
            setErrorMessage(newDenominatorBeCM[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          if (lcm == 0) {
            lcm = fractionLinesArray[index][i][4];            
          } else {
            if (fractionLinesArray[index][i][4] != lcm) {
              setErrorMessage(sameDenominatorHint[languageIndex]);
              setTimeout(() => {
                setOpenAlert(true);
              }, timeDelay);
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
            setErrorMessage(multiplyWithSameInteger[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          //whole number only
        } else {
          if (
            fractionLinesArray[index][i][3] > 0 ||
            fractionLinesArray[index][i][4] > 0
          ) {
            setErrorMessage(onlyWholeNumbers[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
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
          setErrorMessage(CMToLCMHint[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
      }
      setCalculatedLcm(lcm);
      setCalculationStage(1);
      setFractionIndexInProcess([startIndex, endIndex]);
      setStartEndIndexLastLine([startIndex, endIndex]);//*** */
      addLine();
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

      //*** */setStartEndIndexLastStage([startIndex, endIndex]);
      noNegativeNumeratorResultCheck(index, false, startIndex, endIndex);
      return true;
    }
  }

  //A&S only. need both A&S and mixed versions
  function noNegativeNumeratorResultCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    console.log("noNegativeNumeratorResultCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    if (checkValueNeeded) {
      //check other fractions      
      if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
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

    console.log("numer result in noNegative:"+ numeratorResult)
    if (!checkValueNeeded) {
      if (numeratorResult >= 0) {
        setIndexDecreasedByLastStage(endIndex - startIndex);

        setStartEndIndexLastStage([startIndex, endIndex]);
        setCalculationStage(2);
        setStartEndIndexLastStage([startIndex, startIndex]);//
        setFractionIndexInProcess([startIndex, startIndex]);//
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
      console.log("check answer in noNegative")
      if (
        JSON.stringify(bracketArray[index]) !==
        JSON.stringify(bracketArray[index - 1])
      ) {
        setErrorMessage(parentheses[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        let middleMessage = (startIndex === endIndex ? "" : sameNumberOfFractions2[languageIndex] + (endIndex + 1));
        setErrorMessage(sameNumberOfFractions1[languageIndex] + (startIndex + 1) + middleMessage + sameNumberOfFractions3[languageIndex]);        
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = startIndex; i < endIndex + 1; i++) {
        if (
          fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
        ) {
          setErrorMessage(sameOperatorsInNoNegNum[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (
          fractionLinesArray[index - 1][i][0] != "-" &&
          fractionLinesArray[index - 1][i][1] > 0
        ) {
          var wholeDiff =
            fractionLinesArray[index - 1][i][1] -
            fractionLinesArray[index][i][1];
          //denominator should be the lcm
          if (wholeDiff > 0 || fractionLinesArray[index - 1][i][4] > 0) {
            if (fractionLinesArray[index][i][4] != calculatedLcm) {
              setErrorMessage(denominatorInvolvedBeLCM[languageIndex]);
              setTimeout(() => {
                setOpenAlert(true);
              }, timeDelay);
              return false;
            }
          } else {
            if (fractionLinesArray[index][i][4] != 0) {
              setErrorMessage(wholeNotInvolvedKeepSame[languageIndex]);
              setTimeout(() => {
                setOpenAlert(true);
              }, timeDelay);
              return false;
            }
          }
          if (
            fractionLinesArray[index][i][3] !=
            fractionLinesArray[index - 1][i][3] + wholeDiff * calculatedLcm
          ) {
            setErrorMessage(abdicatedNumerator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
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
            setErrorMessage(fractionNotInvolvedKeepSame[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      if (numeratorResult >= calculatedLcm) {
        setErrorMessage(abdicateTooMuch[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (numeratorResult < 0) {
        setErrorMessage(abdicateTooLittle[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      setIndexDecreasedByLastStage(endIndex - startIndex);

      //*** */setStartEndIndexLastStage([startIndex, endIndex]);
      setCalculationStage(2);
      setFractionIndexInProcess([startIndex, startIndex]);
      setStartEndIndexLastLine([startIndex, endIndex]);//*** */
      addLine();
      //*** */setStartEndIndexLastStage([startIndex, startIndex]);//
      //*** */setFractionIndexInProcess([startIndex, startIndex]);//
      return true;
    }
  }

  //A&S only
  function addToOneFractionCheck(index, startIndex, endIndex) {
    console.log("addToOneFractionCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    //check other fractions
    //*** */if (!otherFractionsCheck(index, startEndIndexLastStage[0], startEndIndexLastStage[0], indexDecreasedByLastStage)) {
    if (!otherFractionsCheck(index, startIndex, startIndex, indexDecreasedByLastStage)) {

      return false;
    }
    if (
      fractionLinesArray[index].length !==
      fractionLinesArray[index - 1].length - indexDecreasedByLastStage
    ) {
      //>2
      setErrorMessage(oneFractionOnly[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
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
      console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage)
      console.log("mixedStage:" + mixedStage);
      console.log("bracketStage:" + bracketStage);
      console.log("newBracketArray:" + newBracketArray);
      console.log("bracketArray[index]:" + bracketArray[index]);
      console.log("tmpBracketArray:"+tmpBracketArray)
    if (
      JSON.stringify(bracketArray[index]) !== JSON.stringify(tmpBracketArray)
    ) {
      setErrorMessage(parentheses[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    var numeratorResult = 0;
    var wholeResult = 0;
    var negativeInNumeratorProcess = false;
    var negativeInWholeProcess = false;
    var i;
    for (
      i = startEndIndexLastLine[0];
      i < startEndIndexLastLine[1] + 1;
      i++
    ) {
      numeratorResult +=
        fractionLinesArray[index - 1][i][3] *
        (i === startEndIndexLastLine[0] ? 1 : (fractionLinesArray[index - 1][i][0] == "-" ? -1 : 1));
      if (numeratorResult < 0) {
        negativeInNumeratorProcess = true;
      }
      wholeResult +=
        fractionLinesArray[index - 1][i][1] *
        (i === startEndIndexLastLine[0] ? 1 : (fractionLinesArray[index - 1][i][0] == "-" ? -1 : 1));
      console.log("numeratorResult:"+numeratorResult)
        if (wholeResult < 0) {
        negativeInWholeProcess = true;
      }
    }
    if (numeratorResult > 0) {
      if (
        fractionLinesArray[index][startEndIndexLastStage[0]][4] != calculatedLcm
      ) {
        //position: [0]
        setErrorMessage(sameDenominatorInAddToOne[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    } else {
      if (fractionLinesArray[index][startEndIndexLastStage[0]][4] != 0) {
        //position: [0]
        setErrorMessage(wholeWithoutFraction[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    if (
      fractionLinesArray[index][startEndIndexLastStage[0]][3] != numeratorResult
    ) {
      //position: [0]
      if (negativeInNumeratorProcess) {
        setErrorMessage(numeratorAvoidNegative[languageIndex]);
      } else {
        setErrorMessage(incorrectNumerator[languageIndex]);
      }
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    if (
      fractionLinesArray[index][startEndIndexLastStage[0]][1] != wholeResult
    ) {
      //position: [0]
      if (negativeInWholeProcess) {
        setErrorMessage(wholeAvoidNegative[languageIndex]);
      } else {
        setErrorMessage(incorrectCalculatedWhole[languageIndex]);
      }
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    setCalculationStage(3);
    console.log("addToOne call setOkButtonStage(1)");
    setOkButtonStage(1);
    //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

    setStartEndIndexLastStage([startIndex, startIndex]);
    setFractionIndexInProcess([startIndex, startIndex]);
    return true;
  }

  //equal //for whole formula
  function fractionOrIntegerCheck(index) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      if (i > 0 && fractionLinesArray[index][i][0] == "") {
        setErrorMessage(noOperator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index][i][1] == "" &&
        (fractionLinesArray[index][i][3] == "") &
          (fractionLinesArray[index][i][4] == "")
      ) {
        setErrorMessage(noNumber[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        (fractionLinesArray[index][i][3] == "" &&
          fractionLinesArray[index][i][4] != "") ||
        (fractionLinesArray[index][i][3] != "" &&
          fractionLinesArray[index][i][4] == "")
      ) {
        setErrorMessage(fractionHasBoth[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    return true;
  }

  //equal //for question whole formula only
  function singleNumberCheck(index) {
    if (fractionLinesArray[index].length == 2) {
      if (index == 0) {
        setErrorMessage(singleNumber[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    return true;
  }

  //little bit differ, fix it for mixed final stage //for whole formula?
  function noImproperFractionCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    console.log("noImproperFractionCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    if (checkValueNeeded) {
      //check other fractions
      if (!otherFractionsCheck(index, startIndex, startIndex, 0)) {
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
          setFractionIndexInProcess([startIndex, startIndex]);
          setStartEndIndexLastLine([startIndex, endIndex]);//*** */
          addLine();
          return false;
        } else {
          setErrorMessage(noImproper[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
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
        setErrorMessage(parentheses[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index].length !==
        fractionLinesArray[index - 1].length
      ) {
        setErrorMessage(oneFractionOnly[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
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
          setErrorMessage(incorrectWhole[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (fractionLinesArray[index - 1][i][4] == 1) {
          if (
            fractionLinesArray[index][i][3] > 0 ||
            fractionLinesArray[index][i][4] > 0
          ) {
            setErrorMessage(wholeNoFraction[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else {
          if (
            fractionLinesArray[index][i][4] !=
            fractionLinesArray[index - 1][i][4]
          ) {
            setErrorMessage(sameDenominatorInNoImproper[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          if (
            fractionLinesArray[index][i][3] !=
            fractionLinesArray[index - 1][i][3] %
              fractionLinesArray[index - 1][i][4]
          ) {
            setErrorMessage(numeratorFromImproper[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
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
        setErrorMessage("👍🏻" + wellDone[languageIndex]);
        setFormulaFocusedIndex((prevState) => prevState + 1); // formulaFocusedIndex + 1);
        setCompleted(true);
        setSeverity("success");
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
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
      setStartEndIndexLastStage([startIndex, endIndex]);
      setFractionIndexInProcess([startIndex, endIndex]);//*** */
      return true;
    } else {
      console.log("welldone2");

      // if (calculationStage == 4) {
      if (mixedStage === "noMixedCal") {
        setErrorMessage("👍🏻" + wellDone[languageIndex]);
        setFormulaFocusedIndex((prevState) => prevState + 1); // formulaFocusedIndex + 1);
        setCompleted(true);
        setSeverity("success");
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
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
      //setStartEndIndexLastStage([startIndex, endIndex]);
      return true;
    }
  }

  function nextNewStep(index) {
    console.log("nextNewStep")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    setIsNewStep(true);
    setCalculationStage(0);
    setOkButtonStage(0);
    if (mixedStage === "hasBracket") {
      noBracketCheck(index, false);
    } else {
      //mixedStage === "hasMixedCal"
      console.log("set start to 0 in nextnewStep")
      setStartEndIndexLastStage([0, fractionLinesArray[index].length - 2]);
      setStartEndIndexLastLine([fractionIndexInProcess[0], fractionIndexInProcess[1]]);//*** */
      noMixedCalCheck(index, false, 0, fractionLinesArray[index].length - 2);
    }
  }

  //M&D only
  function noMixedFractionCheck(index, checkValueNeeded, startIndex, endIndex, isNewStepTmp/*** */) {
    console.log("noMixedFractionCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    console.log("isNewStepTmp:"+isNewStepTmp)
    if (checkValueNeeded) {
      //check other fractions
      if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
        return false;
      }
    }
    var i;
    for (i = startIndex; i < endIndex + 1; i++) {
      if (fractionLinesArray[index][i][1] != "") {
        //*** */if (index != 0 && !isNewStep && calculationStage == 0) {
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
              setErrorMessage(wholeToNumerator[languageIndex]);
            }
          } else {
            setErrorMessage(noMixed[languageIndex]);
          }
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
        } else {
          setFractionIndexInProcess([startIndex, endIndex]);//*** */
          setFractionIndexInProcess([startIndex, endIndex]);//*** */
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
      setFractionIndexInProcess([startIndex, endIndex]);//*** */
      setStartEndIndexLastStage([startIndex, endIndex]);
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
        setErrorMessage(parentheses[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        let middleMessage = (startIndex === endIndex ? "" : sameNumberOfFractions2[languageIndex] + (endIndex + 1));
        setErrorMessage(sameNumberOfFractions1[languageIndex] + (startIndex + 1) + middleMessage + sameNumberOfFractions3[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = startIndex; i < endIndex + 1; i++) {
        if (
          fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
        ) {
          setErrorMessage(sameOperatorsInNoMixFract[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
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
            setErrorMessage(wholeToNumerator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else {
          if (fractionLinesArray[index][i][3] != calculatedNumerator) {
            setErrorMessage(mixedToNumerator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          if (
            fractionLinesArray[index][i][4] !=
            fractionLinesArray[index - 1][i][4]
          ) {
            setErrorMessage(sameDenominatorInNoMixFract[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      setCalculationStage(1);
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

      setStartEndIndexLastStage([startIndex, endIndex]);
      setFractionIndexInProcess([startIndex, endIndex]);
      console.log(endIndex);
      noDivisionCheck(index, false, startIndex, endIndex, isNewStepTmp);
      //setOkButtonStage(1);
      //addLine();
      return true;
    }
  }

  //M&D only
  function noDivisionCheck(index, checkValueNeeded, startIndex, endIndex, isNewStepTmp /*** */ ) {
    console.log("noDivisionCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    console.log("calculationStage:"+calculationStage)
    console.log("isNewStepTmp:"+isNewStepTmp)
    if (checkValueNeeded) {
      //check other fractions
      if (!otherFractionsCheck(index, startIndex, endIndex, 0)) {
        return false;
      }
    }
    //if (fractionLinesArray[index].length > 2) {
      var i;
      for (i = startIndex + 1; i < endIndex + 1; i++) {
        if (fractionLinesArray[index][i][0] == "÷") {
          //*** */if (index != 0 && !isNewStep && calculationStage == 1) {
          if (index !== 0 && !isNewStepTmp && calculationStage === 1) {

            //newStep
            setErrorMessage(noDivision[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
          } else {
            setFractionIndexInProcess([startIndex, endIndex]);//*** */
            setStartEndIndexLastLine([startIndex, endIndex]);//*** */
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
      setStartEndIndexLastStage([startIndex, endIndex]);
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
        setErrorMessage(parentheses[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        let middleMessage = (startIndex === endIndex ? "" : sameNumberOfFractions2[languageIndex] + (endIndex + 1));
        setErrorMessage(sameNumberOfFractions1[languageIndex] + (startIndex + 1) + middleMessage + sameNumberOfFractions3[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = startIndex; i < endIndex + 1; i++) {
        if (fractionLinesArray[index][i][1] > 0) {
          setErrorMessage(noMixed[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (i == startIndex || fractionLinesArray[index - 1][i][0] == "×") {
          if (
            fractionLinesArray[index][i][3] !=
              fractionLinesArray[index - 1][i][3] ||
            fractionLinesArray[index][i][4] !=
              fractionLinesArray[index - 1][i][4]
          ) {
            setErrorMessage(sameMultipliers[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else if (fractionLinesArray[index - 1][i][0] == "÷") {
          if (
            fractionLinesArray[index][i][3] !=
              fractionLinesArray[index - 1][i][4] ||
            fractionLinesArray[index][i][4] !=
              fractionLinesArray[index - 1][i][3]
          ) {
            setErrorMessage(divisorsUpDown[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

      setStartEndIndexLastStage([startIndex, endIndex]);
      setCalculationStage(2);
      console.log("noDivi call setOkButtonStage(1)");
      setOkButtonStage(1);
      //simplifiedCheck(index, false);
      //addLine();
      return true;
    }
  }

  //M&D only
  function noMultiplicationCheck(
    index,
    checkValueNeeded,
    startIndex,
    endIndex
  ) {
    console.log("noMultiplicationCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);
    if (checkValueNeeded) {
      //check other fractions
      //*** */if (!otherFractionsCheck(index, startEndIndexLastLine[0], startEndIndexLastLine[0], indexDecreasedByLastStage)) {
      if (!otherFractionsCheck(index, startIndex, startIndex, indexDecreasedByLastStage)) {
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
      if (lastMixBrackArray.lastMix === "hasBracket" && lastMixBrackArray.lastBrack === "noMixedCal") {
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
      console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage)
      console.log("mixedStage:" + mixedStage);
      console.log("bracketStage:" + bracketStage);
      console.log("newBracketArray:" + newBracketArray);
      console.log("bracketArray[index]:" + bracketArray[index]);
      console.log("tmpBracketArray:"+tmpBracketArray)
      if (
        JSON.stringify(bracketArray[index]) !== JSON.stringify(tmpBracketArray)
      ) {
        setErrorMessage(parentheses[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index].length >
        fractionLinesArray[index - 1].length - indexDecreasedByLastStage
      ) {
        setErrorMessage(oneFractionOnly[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
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
        setErrorMessage(productOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (
        fractionLinesArray[index][startIndex][1] !== 0
      ) {
        setErrorMessage(noIntegerAfterMulti[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < primeNumbers.length; i++) {
        if (
          fractionLinesArray[index][startIndex][3] % primeNumbers[i] == 0 &&
          fractionLinesArray[index][startIndex][4] % primeNumbers[i] == 0
        ) {
          setErrorMessage(simplifyIt[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          console.log("noMulti call setOkButtonStage(1)");
          setOkButtonStage(1);
          return false;
        }
      }
      setCalculationStage(4);
      console.log("noMulti call setOkButtonStage(1)");
      setOkButtonStage(1);
      //*** */setIndexDecreasedByLastStage(endIndex - startIndex);

      setStartEndIndexLastStage([startIndex, startIndex]);
      setFractionIndexInProcess([startIndex, startIndex]);
      noImproperFractionCheck(index, false, startIndex, startIndex);
      //addLine();
      return true;
    }
    setCalculationStage(4);
    setIndexDecreasedByLastStage(endIndex - startIndex);
    setStartEndIndexLastStage([startIndex, startIndex]);
    setStartEndIndexLastLine([startIndex, startIndex]);//*** */
    noImproperFractionCheck(index, false, startIndex, startIndex);
    return true;
  }

  function otherFractionsCheck(index, startIndex, endIndex, decrease) {
    console.log("otherFractionsCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);    
    console.log("decrease:"+decrease)
    if (fractionLinesArray[index].length !== fractionLinesArray[index - 1].length - decrease) {
      //setErrorMessage("number of fractions is not correct");
      if (decrease === 0) {
        let middleMessage = (fractionIndexInProcess[0] === fractionIndexInProcess[1] ? "" : sameNumberOfFractions2[languageIndex] + (fractionIndexInProcess[1] + 1));
        setErrorMessage(sameNumberOfFractions1[languageIndex] + (fractionIndexInProcess[0] + 1) + middleMessage + sameNumberOfFractions3[languageIndex]);
      } else {
        setErrorMessage(decreaseMessage[languageIndex]);
      }
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    if (startIndex === 0) {
      return oneSectionFractionCheck(index, endIndex + 1, fractionLinesArray[index].length - 1, decrease);
    } else if (startIndex > 0) {
      if (fractionLinesArray[index][startIndex][0] !== fractionLinesArray[index - 1][startIndex][0]) {
        setErrorMessage(operatorBeforeStep[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      return oneSectionFractionCheck(index, 0, startIndex - 1, 0)
      && oneSectionFractionCheck(index, endIndex + 1, fractionLinesArray[index].length - 1, decrease);
    }
  }
  
  function oneSectionFractionCheck(index, startIndex, endIndex, decrease) {
    console.log("oneSectionFractionCheck")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage);      
    var i;
    for (i = startIndex; i < endIndex + 1; i++) {
      console.log("decrease:"+decrease)
      console.log("i:"+i)
      console.log("index:"+ index)
      console.log(fractionLinesArray[index][i])
      console.log(fractionLinesArray[index - 1][i + decrease])
      //*** */
      if (fractionLinesArray[index][i][0] !== fractionLinesArray[index - 1][i + decrease][0]
        || fractionLinesArray[index][i][1] !== fractionLinesArray[index - 1][i + decrease][1]
        || fractionLinesArray[index][i][3] !== fractionLinesArray[index - 1][i + decrease][3]
        || fractionLinesArray[index][i][4] !== fractionLinesArray[index - 1][i + decrease][4]) {
      //*** */if (JSON.stringify(fractionLinesArray[index][i]) !== JSON.stringify(fractionLinesArray[index - 1][i + decrease])) {
        //setErrorMessage("keep other fractions and operators the same");
        if (decrease > 0) {
          setErrorMessage(decreaseMessage[languageIndex]);
        } else {
          let middleMessage = (fractionIndexInProcess[0] === fractionIndexInProcess[1] ? "" : keepOthers2[languageIndex] + (fractionIndexInProcess[1] + 1));
          setErrorMessage(keepOthers1[languageIndex] + (fractionIndexInProcess[0] + 1) + middleMessage + keepOthers3[languageIndex]);
        }
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    return true;
  }

  /*useEffect(() => {
    console.log("startEndIndexLastStage:"+startEndIndexLastStage)
    if (mixedStage === "hasMixedCal") {
      //if (stageOrder.stage !== -1 || formulaFocusedIndex > 0) {
      if (fractionLinesArray[0].length > 2 || formulaFocusedIndex > 0) {
        console.log("call noMix in hasMixed")
        noMixedCalCheck(
          formulaFocusedIndex,
          false,
          0,
          fractionLinesArray[formulaFocusedIndex].length - 2
        ); //with start index and end index
      }
    } else if (mixedStage === "noMixedCal") {
      console.log("call callback in noMixed")
      callbackOfBracketStage(
        typeOfCalculation,
        startEndIndexLastStage[0],
        startEndIndexLastStage[1]
      );
    }
  }, [mixedStage]);*/

  useEffect(() => {
    console.log("mixedStageArray callback")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    console.log("mixedStageArray:"+mixedStageArray)
    if (mixedStageArray.mixedStage === "hasMixedCal") {
      //if (stageOrder.stage !== -1 || formulaFocusedIndex > 0) {
      if (fractionLinesArray[0].length > 2 || formulaFocusedIndex > 0) {
        console.log("call noMix in hasMixed")
        noMixedCalCheck(
          formulaFocusedIndex,
          false,
          0,
          fractionLinesArray[formulaFocusedIndex].length - 2
        ); //with start index and end index
      }
    } else if (mixedStageArray.mixedStage === "noMixedCal") {
      console.log("call callback in noMixed")
      callbackOfBracketStage(
        mixedStageArray.type,
        mixedStageArray.startIndex,
        mixedStageArray.endIndex
      );
    }
  }, [mixedStageArray]);

  function noBracketCheck(index, checkValueNeeded) {
    console.log("noBracketCheck")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    console.log("mixedStageArray:"+mixedStageArray)
    console.log("call noBracketCheck");
    console.log("mixedStage:" + mixedStage);
    console.log("lastMixBrackArray in noBracketCheck" + lastMixBrackArray)
    if (!checkValueNeeded) {
      if (bracketArray[index].length == 0) {
        //no bracket
        //setMixedStage("hasMixedCal");
        //setBracketStage("");
        if (mixedStage === "hasBracket") {
          //change state and fire next function in useEffect
          setMixedStage("hasMixedCal");
          setMixedStageArray({mixedStage: "hasMixedCal", type: "", startIndex: 0, endIndex: fractionLinesArray[index].length - 2});
        } else {
          console.log("set start index to 0")
          setStartEndIndexLastStage([0, fractionLinesArray[index].length - 2]);
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
        console.log("set start end in noBracketCheck")
        setStartEndIndexLastStage([bracketArray[index][0], bracketArray[index][1]]);
        setFractionIndexInProcess([bracketArray[index][0], bracketArray[index][1]]);//*** */
        noMixedCalCheck(
          index,
          false,
          bracketArray[index][0],
          bracketArray[index][1]
        ); //with start index and end index
        return false;
      } else {
        //bracket odd number
        setErrorMessage(oddBrackets[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    } else {
      //check values
    }
  }

  /***
  useEffect(() => {
    console.log("bracketStage callback")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    console.log("mixedStageArray:"+mixedStageArray.mixedStage+mixedStageArray.startIndex+mixedStageArray.endIndex)    
    callbackOfBracketStage(
      typeOfCalculation,
      fractionIndexInProcess[0],
      fractionIndexInProcess[1]
    );
    /*if (stageOrder.stage !== -1 || formulaFocusedIndex > 0) {
      if (typeOfCalculation === "M&D") {
        noMixedFractionCheck(formulaFocusedIndex, false, startEndIndexLastStage[0], startEndIndexLastStage[1]);
      } else if (typeOfCalculation === "A&S") {
        addLine();
        if (
          !noVariousDenominatorCheck(
            formulaFocusedIndex,
            false,
            startEndIndexLastStage[0],
            startEndIndexLastStage[1]
          )
        ) {
          return;
        }
      }
    }    
  }, [bracketStage]);*/

  useEffect(() => {
    console.log("bracketStage callback")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    console.log("mixedStageArray:"+mixedStageArray.mixedStage+mixedStageArray.startIndex+mixedStageArray.endIndex)    
    console.log("bracketStageArray:"+bracketStageArray.bracketStage+bracketStageArray.type +bracketStageArray.startIndex+bracketStageArray.endIndex)    

    callbackOfBracketStage(
      bracketStageArray.type,
      bracketStageArray.startIndex,
      bracketStageArray.endIndex
    );    
  }, [bracketStageArray]);

  function callbackOfBracketStage(typeOfCal, startIndex, endIndex) {
    console.log("callback");
    console.log("typeOfCal:" + typeOfCal);
    console.log("bracketStage callback")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    setStartEndIndexLastStage([startIndex, endIndex]);
    setFractionIndexInProcess([startIndex, endIndex]);//*** */
    //if (stageOrder.stage === -1 || formulaFocusedIndex > 0) {//stage !==-1
    if (typeOfCal === "M&D") {
      noMixedFractionCheck(formulaFocusedIndex, false, startIndex, endIndex, true /*** */);
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

  async function noMixedCalCheck(index, checkValueNeeded, startIndex, endIndex) {
    console.log("index:"+index);
    console.log("call noMixedCalCheck");
    console.log("mixedStage:" + mixedStage);
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    console.log("lastMixBrackArray in noMixedCal" + lastMixBrackArray)
    console.log("formulaFocusedIndex:"+formulaFocusedIndex)
    console.log("completed:"+completed)
    console.log("fractionLinesArray:"+fractionLinesArray)
    console.log("okButtonStage:"+okButtonStage)
    console.log("calculationStage"+calculationStage)
    console.log("stageOrder:"+stageOrder)
    console.log("typeOfCalculation"+typeOfCalculation)
    console.log("mixedStageArray"+mixedStageArray)

    setOkButtonStage(0);
    setCalculationStage(0);
    if (!checkValueNeeded) {
      let A_S = false;
      let M_D = false;
      let M_D_startIndex = 0;
      let M_D_endIndex = 0;
      let i = 0;
      for (i = startIndex + 1; i < endIndex + 1; i++) {
        if (["+", "-"].includes(fractionLinesArray[index][i][0])) {
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
        setIndexDecreasedByLastStage(0);//*** */
        console.log("M_D_startIndex:" + M_D_startIndex);
        console.log("M_D_endIndex:" + M_D_endIndex);
        console.log("mixedStage:"+mixedStage)
        console.log("bracketStage:"+bracketStage)
        setStartEndIndexLastStage([M_D_startIndex, M_D_endIndex]);
        setFractionIndexInProcess([M_D_startIndex, M_D_endIndex]);
        if (mixedStage === "hasBracket") {
          //setBracketStage("hasMixedCal");
          if (bracketStage === "hasMixedCal") {
            //no state change, call function here
            console.log("call callbackOfBracketStage directly")
            callbackOfBracketStage("M&D", M_D_startIndex, M_D_endIndex);
          } else {
            //change state and call function in useEffect
            console.log("setBracketStage first")
            //*** */
            setBracketStageArray({bracketStage: "hasMixedCal", type: "M&D", startIndex: M_D_startIndex, endIndex: M_D_endIndex});
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
            setMixedStageArray({mixedStage: "hasMixedCal", type: "M&D", startIndex: M_D_startIndex})
          }
        }

        return false;
      } else if (A_S) {
        //A&S
        setTypeOfCalculation("A&S");
        setStartEndIndexLastLine([startIndex, endIndex]);//*** */
        //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
        setIndexDecreasedByLastStage(0);//*** */
        setFractionIndexInProcess([startIndex, endIndex]);//*** */
        console.log("startIndex:" + startIndex);
        console.log("endIndex:" + endIndex);
        if (calculationStage === 2) {//
          //*** setStartEndIndexLastStage([startEndIndexLastLine[0], startEndIndexLastLine[0]]); //***
          setStartEndIndexLastStage([startEndIndexLastLine[0], startEndIndexLastLine[1]]);//
          //*** */setFractionIndexInProcess([startEndIndexLastLine[0], startEndIndexLastLine[0]]);//
          //*** */setFractionIndexInProcess(startIndex, endIndex);
        } else {//
          //*** */setStartEndIndexLastStage([startIndex, endIndex]);
          //*** */setFractionIndexInProcess([startIndex, endIndex]);
        }//
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
            setBracketStageArray({bracketStage: "noMixedCal", type: "A&S", startIndex: startIndex, endIndex: endIndex});

            setBracketStage("noMixedCal");
          }
        } else {
          //setMixedStage("noMixedCal");
          if (mixedStage === "noMixedCal") {
            //no state change, call function
            console.log("call callback directly with start 0")
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
            console.log("setMixedStage first")
            setMixedStage("noMixedCal");
            setMixedStageArray({mixedStage: "noMixedCal", type: "A&S", startIndex: startIndex, endIndex: endIndex});
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
        setStartEndIndexLastLine([startIndex, endIndex]);//*** */
        setTypeOfCalculation("M&D");
        //*** */setIndexDecreasedByLastStage(endIndex - startIndex);
        //good
        if (calculationStage === 3) {//
          setStartEndIndexLastStage([startEndIndexLastLine[0], startEndIndexLastLine[0]]);//
          setFractionIndexInProcess([startEndIndexLastLine[0], startEndIndexLastLine[0]]);//
          setIndexDecreasedByLastStage(startEndIndexLastLine[1] - startEndIndexLastLine[0]);//*** */
        } else {//
          //*** */setStartEndIndexLastStage([startIndex, endIndex]);
          setFractionIndexInProcess([startIndex, endIndex]);//*** */
        }//
        
        if (mixedStage === "hasBracket") {
          console.log("has bracket and no mixed in bracket");
          if (bracketStage === "noMixedCal") {
            //no state change, call function
            callbackOfBracketStage("M&D", startIndex, endIndex);
            //noMixedFractionCheck(formulaFocusedIndex, false, startIndex, endIndex);
          } else {
            //change state, call function in useEffect
            //*** */
            setBracketStageArray({bracketStage: "noMixedCal", type: "M&D", startIndex: startIndex, endIndex: endIndex});

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
            setMixedStageArray({mixedStage: "noMixedCal", type: "M&D", startIndex: startIndex, endIndex: endIndex});
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

  //both versions differ, also need mixed version. So, it needs 3 versions
  function enterCheck() {
    console.log("enterCheck")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
    setIsNewStep(false);
    let isNewStepTmp = false;
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
      //addLine();
      noBracketCheck(formulaFocusedIndex, false);
      if (typeOfCalculation === "A&S") {
        console.log("call noVarious in enterCheck, startEndIndex:"+ startEndIndexLastStage);
        if (          
          !noVariousDenominatorCheck(
            formulaFocusedIndex,
            false,
            startEndIndexLastStage[0],
            startEndIndexLastStage[1]
          )
        ) {
          return;
        }
      }
      //noMixedFractionCheck(formulaFocusedIndex, false);//M&D
      //setOkButtonStage(1);
    } else {
      if (typeOfCalculation === "M&D") {
        switch (calculationStage) {
          case 0:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            //console.log(startEndIndexLastStage);
            noMixedFractionCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],//*** */startEndIndexLastStage[0],
              fractionIndexInProcess[1],//*** */startEndIndexLastStage[1]
              isNewStepTmp//*** */
            );
            //}
            break;
          case 1:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            console.log(startEndIndexLastStage);
            noDivisionCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0], //*** */startEndIndexLastStage[0],
              fractionIndexInProcess[1], //*** */startEndIndexLastStage[1]
              isNewStepTmp//*** */
            );
            //}
            break;
          case 2:
            //simplifiedCheck(formulaFocusedIndex, true);
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            console.log("enterCheck call setOkButtonStage(1)");
            setOkButtonStage(1);
            //noMultiplicationCheck(formulaFocusedIndex, true);
            // }
            break;
          case 3:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            console.log("fractionIndexInProcess:"+fractionIndexInProcess);
            console.log("startEndIndexLastLine:"+startEndIndexLastLine);
            noMultiplicationCheck(
              formulaFocusedIndex,
              true,
              startEndIndexLastLine[0], //*** */startEndIndexLastStage[0],
              startEndIndexLastLine[0]//*** */startEndIndexLastStage[1]
            );
            //}
            break;
          case 4:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noImproperFractionCheck(
              formulaFocusedIndex,
              true,
              startEndIndexLastLine[0],//*** */startEndIndexLastStage[0],
              startEndIndexLastLine[0]//*** */startEndIndexLastStage[0]
            );
            //}
            break;
        }
      } else if (typeOfCalculation === "A&S") {
        switch (calculationStage) {
          case 0:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
              console.log("call noVarious in enterCheck, startEndIndex:"+ startEndIndexLastStage);
            noVariousDenominatorCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],//*** */startEndIndexLastStage[0],
              fractionIndexInProcess[1]//*** */startEndIndexLastStage[1]
            );
            //}
            break;
          case 1:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noNegativeNumeratorResultCheck(
              formulaFocusedIndex,
              true,
              fractionIndexInProcess[0],//*** */startEndIndexLastStage[0],
              fractionIndexInProcess[1]//*** */startEndIndexLastStage[1]
            );
            //}
            break;
          case 2:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            addToOneFractionCheck(
              formulaFocusedIndex,
              fractionIndexInProcess[0],//***startEndIndexLastLine[0],//*** */startEndIndexLastStage[0],
              fractionIndexInProcess[0]//***startEndIndexLastLine[0]//*** */startEndIndexLastStage[0]
            );
            //}
            break;
          case 3:
            break;
          case 4:
            //if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noImproperFractionCheck(
              formulaFocusedIndex,
              true,
              startEndIndexLastLine[0],//*** */startEndIndexLastStage[0],
              startEndIndexLastLine[0]//*** */startEndIndexLastStage[0]
            );
            //}
            break;
        }
      }
    }
  }

  function checkSimplifyValue(index, checkValue, startIndex, endIndex) {
    console.log("checkSimplifyValue")
    console.log("startIndex+endIndex:"+startIndex+endIndex)
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
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
          setErrorMessage(beAFactorOfNumerator[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
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
          setErrorMessage(beAFactorOfDenominator[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
      } else {
        newDenominator *= fractionLinesArray[index][i][4];
      }
    }
    if (numeratorDeduceFactor != denominatorDeduceFactor) {
      setErrorMessage(sameFactorInReduction[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    for (i = 0; i < primeNumbers.length; i++) {
      if (
        newNumerator % primeNumbers[i] == 0 &&
        newDenominator % primeNumbers[i] == 0
      ) {
        setErrorMessage(
          furtherReduceFactorLeft[languageIndex] +
            primeNumbers[i] +
            furtherReduceFactorRight[languageIndex]
        );
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      } else {
        if (
          primeNumbers[i] ** 2 > newNumerator &&
          primeNumbers[i] ** 2 > newDenominator
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
    setStartEndIndexLastStage([startIndex, endIndex]);
    setOkButtonStage(0);
    if (checkValue) {
      //noMultiplicationCheck(index, false);
    }
    console.log("typeOfCalculation:" + typeOfCalculation);
    //*** */setFractionIndexInProcess([startIndex, startIndex]);
    if (typeOfCalculation === "M&D") {
      setCalculationStage(3);
      setStartEndIndexLastStage([startIndex, startIndex]);//
      setFractionIndexInProcess([startIndex, startIndex]);//
      setStartEndIndexLastLine([startIndex, endIndex]);//*** */
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
      if (fractionLinesArray[index].length > 2 
        && (["×", "÷"].includes(fractionLinesArray[index][startIndex][0])
        || ["×", "÷"].includes(fractionLinesArray[index][startIndex + 1][0]))) {
      nextNewStep(index);
      } else {
        setCalculationStage(4);
        noImproperFractionCheck(index, false, startIndex, startIndex);
      }//*** */
    }
    return true;
  }

  const okClick = (e) => {
    /*console.log("okButtonStage:" + okButtonStage)
    console.log("calculationStage:" + calculationStage)
    console.log("mixedStage:" + mixedStage)
    console.log("typeOfCalculation:" + typeOfCalculation)*/
    console.log("okclick")
    console.log("startEndIndexLastLine:"+startEndIndexLastLine)
    console.log("fractionIndexInProcess:"+fractionIndexInProcess);
    console.log("indexDecreasedByLastStage:"+indexDecreasedByLastStage); 
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
              setErrorMessage(noMixedBeforeReduction[languageIndex]);
            } else {
              setErrorMessage(noDivisionBeforeReduction[languageIndex]);
            }
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
          }
        }
        break;
      case 2:
        //use it instead
        var checkValue = true;
        if (
          typeOfCalculation == "A&S" &&
          fractionLinesArray[formulaFocusedIndex][0][4] > 0
        ) {
          checkValue = false;
        }
        console.log(startEndIndexLastStage);
        checkSimplifyValue(
          formulaFocusedIndex,
          checkValue,
          startEndIndexLastStage[0],
          startEndIndexLastStage[1]
        );
        break;
    }
  };

  //need mixed version
  const handleKeypadClick = (e, key) => {
    var pushLine = false;
    var pushPosition = false;
    if (
      formulaFocusedIndex == fractionLinesArray.length - 1 &&
      (stageOrder.stage === -1 ||
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
                //prevValue = "";
              }
            }
          }
          //prevValue = prevValue.slice(0, -1);
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
  };

  //both versions equal
  function setPartValue(
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
  const handlePartClick = (e, positionIndex, partIndex) => {
    //in simplification, only small boxes can be focused
    if (
      (okButtonStage == 2 && (partIndex == 2 || partIndex == 5)) ||
      okButtonStage === 0//!= 2
    ) {
      setFractionPositionIndex(positionIndex);
      setFractionPartIndex(partIndex);
    }
  };

  let textQ = "abc \n def"
  const classes = pagesStyles(); //

  return (
    <MyFrame topic={topics[languageIndex] + topic} learningTool={learningTool}>
      <Grid className={classes.spaceGrid} />
      {questions[topicIndex][learningToolIndex].length > 0 && (
        <StageButtons
          stageText={stageText[languageIndex] + "："}
          stages={Object.keys(questions[topicIndex][learningToolIndex])}
          handleStageClick={handleStageClick}
          stageState={stageOrder.stage}
          manual={manual[languageIndex]}
          exam={exam[languageIndex]}
        />
      )}
      <Grid className={classes.spaceGrid} />

      {isLogined && (
        <TextQuestion textQuestion={textQ} setIsLogined={setIsLogined} />
      )}
      <Grid className={classes.centerRow}>
        {stageOrder.stage === -2 && !isLogined ? (
          <Grid className={classes.formulaColumn}>
            <Login
              languageIndex={languageIndex}
              bibleVersionIndex={bibleVersionIndex}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
            />
          </Grid>
        ) : (
          <Grid className={classes.formulaColumn}>
            {fractionLinesArray.map((formula, index) => {
              return (
                (index === formulaFocusedIndex ||
                  index < formulaFocusedIndex) && ( //
                  <Grid
                    key={index}
                    className={`${classes.verticalCenterRow} ${classes.commonPadding}`}
                  >
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
                        learningToolIndex={learningToolIndex}
                        showSmallInput={
                          okButtonStage == 2 && index == formulaFocusedIndex
                        }
                        calculationStage={calculationStage}
                        lineIndex={fractionLinesArray.indexOf(formula)} //{index}
                        bracketArray={bracketArray}
                        setBracketArray={setBracketArray}
                        fractionIndexInProcess={fractionIndexInProcess}
                        fractionLength={fractionLinesArray.length} //
                        formulaFocusedIndex={formulaFocusedIndex} //
                        okButtonStage={okButtonStage}
                      />
                    </Box>
                    <Grid>
                      {index == formulaFocusedIndex && (
                        <Button
                          className={classes.okButton}
                          variant="contained"
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
            })}
          </Grid>
        )}
      </Grid>
      <MyKeypad
        handleClick={handleKeypadClick}
        topicIndex={topicIndex}
        formulaFocusedIndex={formulaFocusedIndex}
      />
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
    </MyFrame>
  );
};
