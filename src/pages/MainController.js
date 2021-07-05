import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { AlertSnackbar } from "../components/AlertComponents";//a
import { MyFrame } from "../components/HeadingComponents";//a
import { MyKeypad } from "../components/KeypadComponents";//a
import { FractionFormula } from "../components/FractionFormulaComponents";//b
import { StageButtons } from "../components/StageComponents";//a
import { Login } from "../components/LoginComponents";//a
import { TextQuestion } from "../components/TextQuestionComponents";//a
import { UploadScore } from "../components/UploadScoreComponents";//a
import { Leaderboard } from "../components/LeaderboardComponents";//a
import { ExamCompleteTable } from "../components/ExamCompleteTableComponents";//a
import { FractionUnitController } from "../unitControllers/FractionUnitController";
import answers0 from "../questionData/answers/Answers0";//a
import answers1 from "../questionData/answers/Answers1";
import answers2 from "../questionData/answers/Answers2";
import questions0 from "../questionData/questions/Questions0";
import questions1 from "../questionData/questions/Questions1";
import questions2 from "../questionData/questions/Questions2";
import responses0 from "../questionData/responses/Responses0";
import responses1 from "../questionData/responses/Responses1";
import responses2 from "../questionData/responses/Responses2";
import types0 from "../questionData/types/Types0";
import types1 from "../questionData/types/Types1";
import types2 from "../questionData/types/Types2";
import wrongAnswers0 from "../questionData/wrongAnswers/WrongAnswers0";
import wrongAnswers1 from "../questionData/wrongAnswers/WrongAnswers1";
import wrongAnswers2 from "../questionData/wrongAnswers/WrongAnswers2";//a
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";//b
import {
  timeDelay,//a,b
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
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";//a,b
import { pagesStyles } from "../themes/styles";//a,b
import { theme as myTheme } from "../themes/theme";//a,b

const style = {//a
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
};

//×÷👍👍🏻
export const MainController = ({
  languageIndex,
  bibleVersionIndex,
  topic,
  learningTool,
  topicToolIndex,
  unitIndex,
  examIndex,
  indexArray  
}) => {
  const [openAlert, setOpenAlert] = useState(false);//a->b
  const [errorMessage, setErrorMessage] = useState("");//a->b
  const [severity, setSeverity] = useState("error");//a->b
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);//b
  const [completed, setCompleted] = useState(false);//a->b
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
  const [stageOrder, setStageOrder] = useState({ stage: 0, order: 0 });//a //stage: 0-20common stages, -1self-design, -2exam, -3leaderboard, -4submitTotal
  const [isLogined, setIsLogined] = useState(false);//a //FALSE
  const { topicIndex, learningToolIndex } = topicToolIndex;//a
  //const timeDelay = 200;
  const primeNumbers = getPrimeNumbers();//b
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
  const [startEndIndexLastLine, setStartEndIndexLastLine] = useState([0, 0]); //b
  const [questions, setQuestions] = useState(answers0);//a
  const questionsFilesArray = [[...questions0], [...questions1], [...questions2]];//a
  const answersFilesArray = [[...answers0], [...answers1], [...answers2]];
  const responsesFilesArray = [[...responses0], [...responses1], [...responses2]];
  const typesFilesArray = [[...types0], [...types1], [...types2]];
  const wrongAnswersFilesArray = [[...wrongAnswers0], [...wrongAnswers1], [...wrongAnswers2]];//a
  const [loginQuestionData, setLoginQuestionData] = useState({});//a
  const [questionTextForAnyStage, setQuestionTextForAnyStage] = useState(["", "", "", ""]);//a
  const [fractionFormulaAnswerArrayForAnyStage, setFractionFormulaAnswerArrayForAnyStage] = useState([]);//a
  const [typeOfQForAnyStage, setTypeOfQForAnyStage] = useState("");//a
  const [responseArrayForAnyStage, setResponseArrayForAnyStage] = useState([]);//a
  const [wrongFractionAnswerArrayForAnyStage, setWrongFractionAnswerArrayForAnyStage] = useState([]);//a
  const [errorMessageArray, setErrorMessageArray] = useState([]);//a->b
  const [scoreArray, setScoreArray] = useState({ exam: 0, topic0: { tool0: { stage0: 0 } } });//a
  const [scoreTotalForUnit, setScoreTotalForUnit] = useState(0);//a
  const [errorMessageTimes, setErrorMessageTimes] = useState(0);//a
  const [stageScore, setStageScore] = useState(0);//0//a
  const [startTime, setStartTime] = useState(0);//a
  const [examCompleted, setExamCompleted] = useState(false);//a
  const [logoutButtonStage, setLogoutButtonStage] = useState("unclick");//a  

  const {
    stageText,//a
    manual,
    exam,
    leaderboard,
    okButtonText,
    topics,
    wellDone,//a
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
    uploadTotalScore,//a
    unitTitle,
    logoutText,
    sureText,//a
  } = constants;

  //both versions equal
  useEffect(() => {//a
    console.log("change topicToolIndex")    
    if (!isLogined) {
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
  }, [indexArray]);

  useEffect(() => {//a
    setStageScore(0);
  }, [indexArray[2], indexArray[3], indexArray[4], stageOrder.stage]);

  useEffect(() => {   //a
    setQuestions(questionsFilesArray[unitIndex]);   
    resetDefault();
    setScoreArray({ exam: 0, topic0: { tool0: { stage0: 0 } } });
    setScoreTotalForUnit(0);
  }, [unitIndex]);  

  //both versions equal
  useEffect(() => {//a
    console.log("stageOrder change: " + stageOrder.stage + stageOrder.order);
    resetDefault();
    resetQuestion();
  }, [stageOrder]);

  //both versions equal and need to get answers, brackets and responses
  useEffect(() => {//b
    console.log(fractionLinesArray[0]);
    console.log("fractionLinesArray.length:" + fractionLinesArray.length);
    console.log("completed:" + completed);
    if (
      ((stageOrder.stage > -1 && typeOfQForAnyStage === "fractionFormula") || (stageOrder.stage === -2 && isLogined && typeOfQForAnyStage === "fractionFormula")) &&
      formulaFocusedIndex === 0 &&
      fractionLinesArray[0][1][0] != "" &&
      calculationStage < 2 &&
      fractionLinesArray.length === 1
    ) {
      //get question and go to next stage
      okClick();
    }
  }, [fractionLinesArray]);

  //both versions equal
  const handleStageClick = (stage) => {//a
    if (!isLogined) {
      setStageOrder({ stage: stage, order: 0 });
    }
  };

  const clickLogoutButton = () => {//a
    if (logoutButtonStage === "unclick") {
      setLogoutButtonStage("clicked");
    } else if (logoutButtonStage === "clicked") {
      setErrorMessageArray([]);
      setExamCompleted(false);
      setIsLogined(false);
    }
  };

  useEffect(() => {//a
    const timer = setTimeout(() => {
      if (logoutButtonStage === "clicked") {
        setLogoutButtonStage("unclick");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [logoutButtonStage]);

  //equal
  const closeAlert = (e) => {//a
    setOpenAlert(false);
  };

  function handleSetError(errorMsg) {//a->b
    setSeverity("error");
    setErrorMessage(errorMsg);
    setTimeout(() => {
      setOpenAlert(true);
    }, timeDelay);
    if (examIndex === 1 && stageOrder.stage === -2 && isLogined) {
      let tmpErrorArray = [...errorMessageArray];
      tmpErrorArray.push(errorMsg);
      setErrorMessageArray(tmpErrorArray);
      setErrorMessageTimes((prev) => prev + 1);
    }
  }

  function pushScoreInArray(newScore) {//a
    if (examIndex === 1) {
      let tmpObject = scoreArray;
      if (stageOrder.stage === -2) {
        tmpObject["exam"] = newScore;
      } else if (stageOrder.stage > -1) {
        if (tmpObject["topic" + topicIndex] === undefined) {
          tmpObject["topic" + topicIndex] = {};
        }
        if (tmpObject["topic" + topicIndex]["tool" + learningToolIndex] === undefined) {
          tmpObject["topic" + topicIndex]["tool" + learningToolIndex] = {};
        }
        if (tmpObject["topic" + topicIndex]["tool" + learningToolIndex]["stage" + stageOrder.stage] === undefined
          || tmpObject["topic" + topicIndex]["tool" + learningToolIndex]["stage" + stageOrder.stage] < newScore) {
          tmpObject["topic" + topicIndex]["tool" + learningToolIndex]["stage" + stageOrder.stage] = newScore;
        }
      }
      console.log(tmpObject);
      setScoreArray(tmpObject);
      calculateTotalScoreForUnit(tmpObject);
    }
  }  

  //equal
  async function resetDefault() {//a and a call function b
    setSeverity("error")
    console.log("reset");
    setCompleted(false)//a    
    setErrorMessageTimes(0);//a
    console.log(Date.now())
    setStartTime(Date.now());//a    

    //delete
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
    setLastMixBrackArray({ lastMix: "", lastBrack: "" });//b //*** */
  }

  function getValues1LayerArray(array1Layer) {//common function
    console.log(array1Layer)
    let tmp1Layer = [];
    array1Layer.forEach(element => {
      console.log(element.stringValue)
      switch (element.valueType) {
        case "stringValue": { tmp1Layer.push(element.stringValue); break; }
        case "integerValue": { tmp1Layer.push(parseInt(element.integerValue, 10)); break; }
        default: { }
      }
    });
    return tmp1Layer;
  };

  function getValues2LayerArray(array2Layer) {//common function
    let tmp2Layer = [];
    array2Layer.forEach(element => {
      tmp2Layer.push(getValues1LayerArray(element));
    });
    return tmp2Layer;
  };

  function getValues3LayerArray(array3Layer) {//common function
    let tmp3Layer = [];
    array3Layer.forEach(element => {
      tmp3Layer.push(getValues2LayerArray(element));
    });
    return tmp3Layer;
  };

  function resetQuestion() {//a    
    if (stageOrder.stage === -1) {
      setFractionLinesArray([//call function b
        [
          ["", 0, 0, 0, 0, 0],
          ["", 0, 0, 0, 0, 0]
        ]
      ]);
      setBracketArray([[]]);
    } else if ((stageOrder.stage === -2 && isLogined) || stageOrder.stage > -1) {//b call commone function
      let tmpType = "";
      let tmpFormula = [[[]]];
      if (stageOrder.stage === -2) {
        setQuestionTextForAnyStage(getValues1LayerArray(loginQuestionData.questions[stageOrder.order]));//a
        setResponseArrayForAnyStage(getValues2LayerArray(loginQuestionData.responses[stageOrder.order]));//b
        tmpType = loginQuestionData.types[stageOrder.order].stringValue;
        setTypeOfQForAnyStage(tmpType);//a -> b
        tmpFormula = [...getValues3LayerArray(loginQuestionData.answers[stageOrder.order])];
        setFractionFormulaAnswerArrayForAnyStage(tmpFormula);
        setWrongFractionAnswerArrayForAnyStage(getValues3LayerArray(loginQuestionData.wrongAnswers[stageOrder.order]));
      } else {
        setQuestionTextForAnyStage(questionsFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]);//a
        setResponseArrayForAnyStage(responsesFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]);//b
        tmpType = typesFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]
        setTypeOfQForAnyStage(tmpType);//a->b
        tmpFormula = [...answersFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]];
        setFractionFormulaAnswerArrayForAnyStage(tmpFormula);
        setWrongFractionAnswerArrayForAnyStage(wrongAnswersFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]);
      }      
      switch (tmpType) { 
        case "fractionText": {//b
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
          console.log(tmpFormula[0])
          let tmpArray = [];
          let i;
          for (i = 0; i < tmpFormula[0].length - 1; i++) {
            tmpArray.push(tmpFormula[0][i]);
          }
          tmpArray.push(["", 0, 0, 0, 0, 0]);
          setBracketArray([tmpFormula[0][tmpFormula[0].length - 1]]);
          setFractionLinesArray([tmpArray]);
          break;
        };
        case "MC": {
          break;
        }
        default: {
          break;
        }

      }
    }
  }

  //completed part equal. not completed part needs mixed version and go to next mixed stage
  const resetClick = (e) => {//a
    console.log("completed: " + completed);
    console.log("startEndIndexLastLine:" + startEndIndexLastLine);
    console.log("fractionIndexInProcess:" + fractionIndexInProcess);
    if (completed) {
      if (stageOrder.stage > -1) {
        resetDefault(); 
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
          if (examIndex === 1) {
            setStageOrder({ stage: -2, order: 0 });
          } else {
            setStageOrder({ stage: -1, order: 0 });
          }
        }
      } else if (stageOrder.stage === -2 && isLogined) {
        console.log("loginQuestionData.questions.length:" + loginQuestionData.questions.length)
        if (stageOrder.order < loginQuestionData.questions.length - 1) {
          console.log("order+1")
          setStageOrder({
            stage: stageOrder.stage,
            order: stageOrder.order + 1
          });
        } else {
          //complete mock exam paper
          setQuestionTextForAnyStage(["", "", "", ""]);
          setTypeOfQForAnyStage("");
          setExamCompleted(true);
        }
      } else {
        console.log("resetClick");
        resetDefault();
        resetQuestion();
      }
    } else if (okButtonStage > 0) {//call b
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
  };

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
    if (typeOfQForAnyStage === "fractionText" && formulaFocusedIndex === 0) {
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

  const okClick = (e) => {//switch a stage to call b functions    
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

  //need mixed version
  const handleKeypadClick = (e, key) => {//a
    if (typeOfQForAnyStage === "MC") {
      checkMCAnswer(key);
      return;
    }
    var pushLine = false;
    var pushPosition = false;
    if (
      formulaFocusedIndex == fractionLinesArray.length - 1 &&
      (stageOrder.stage === -1 ||
        ((stageOrder.stage === -2 || stageOrder.stage > -1) && typeOfQForAnyStage === "fractionText") ||
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
  };

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

  function completeFunction() {//a
    setErrorMessage("👍🏻" + wellDone[languageIndex]);
    setFormulaFocusedIndex((prevState) => prevState + 1); 
    setCompleted(true);
    setSeverity("success");
    setTimeout(() => {
      setOpenAlert(true);
    }, timeDelay);
    let numberOfHalfMinute = (Date.now() - startTime) / (15 * 1000);
    console.log("numberOfHalfMinute:" + numberOfHalfMinute)
    if (numberOfHalfMinute > 10) { numberOfHalfMinute = 10; }
    let marksFromTime = (11 - numberOfHalfMinute) * 2;
    let marksFromNumberOfHints = (10 - errorMessageTimes) * 2;
    let marksFromThisQuestion = 20 + marksFromTime + marksFromNumberOfHints;
    if (isLogined && stageOrder.stage === -2) {
      if (typeOfQForAnyStage === "fractionText") {
        marksFromThisQuestion *= 3;
      } else {
        marksFromThisQuestion *= 2;
      }
    }
    console.log(marksFromThisQuestion);
    console.log(stageScore);
    pushScoreInArray(stageScore + marksFromThisQuestion);
    setStageScore((prev) => prev + marksFromThisQuestion);
  }

  useEffect(() => {//a
    if (isLogined) {
      console.log(loginQuestionData.questions[0][0]);
      setStageOrder({ stage: -2, order: 0 });//0
      resetDefault();
      resetQuestion();
    }
    setErrorMessageArray([]);
  }, [isLogined]);

  function calculateTotalScoreForUnit(tmpObject) {//a
    console.log("calculateTotalScoreForUnit");
    let scoreTotal = 0;
    for (let x in tmpObject) {
      if (x === "exam") {
        scoreTotal += tmpObject[x];
      } else {
        for (let y in tmpObject[x]) {
          for (let z in tmpObject[x][y]) {
            scoreTotal += tmpObject[x][y][z];
          }
        }
      }
    }
    console.log(Math.round(scoreTotal));
    setScoreTotalForUnit(Math.round(scoreTotal));
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
    fractionFormulaAnswerArrayForAnyStage.forEach(formula => {
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

  function compare2LayerArray(arrayA, arrayB) {//common function
    let tmpCorrect = true;
    if (arrayA.length === arrayB.length) {
      let i;
      for (i = 0; i < arrayA.length; i++) {
        if (arrayA[i].length === arrayB[i].length) {
          let j;
          for (j = 0; j < arrayA[i].length; j++) {
            if (arrayA[i][j] != arrayB[i][j]) {
              tmpCorrect = false;
              return tmpCorrect;
            }
          }
          if (!tmpCorrect) {
            return tmpCorrect;
          }
        } else { return false; }
      }
      return tmpCorrect;
    } else { return false; }
  }

  function checkMCAnswer(key) {//a
    console.log(key);
    console.log(fractionFormulaAnswerArrayForAnyStage[0][0][0]);
    if (key === fractionFormulaAnswerArrayForAnyStage[0][0][0]) {
      completeFunction();
    } else {
      let i;
      for (i = 0; i < wrongFractionAnswerArrayForAnyStage[0][0].length; i++) {
        if (key === wrongFractionAnswerArrayForAnyStage[0][0][i]) {
          handleSetError(responseArrayForAnyStage[i][languageIndex]);          
        }
      }
    }
  }

  const classes = pagesStyles(); //

  return (
    <MyFrame topic={topics[languageIndex] + topic} learningTool={learningTool} scoreTotalForUnit={scoreTotalForUnit} languageIndex={languageIndex}>
      <Grid className={classes.spaceGrid} />
      {questions[topicIndex][learningToolIndex].length > 0 && (
        <StageButtons
          stageText={stageText[languageIndex] + "："}
          stages={Object.keys(questions[topicIndex][learningToolIndex])}
          handleStageClick={handleStageClick}
          stageState={stageOrder.stage}
          manual={manual[languageIndex]}
          exam={exam[languageIndex]}
          leaderboard={leaderboard[languageIndex]}
          examIndex={examIndex}
          uploadTotalScore={uploadTotalScore[languageIndex]}
        />
      )}
      {isLogined && <Grid className={classes.centerRow}>
        <Button
          variant="contained"
          className={classes.logoutButton}
          style={{ textTransform: 'capitalize' }}
          onClick={() => { clickLogoutButton() }}
        >
          {logoutButtonStage === "unclick" ? logoutText[languageIndex] : sureText[languageIndex]}
        </Button>
      </Grid>}
      <Grid className={classes.spaceGrid} />

      {["fractionText", "integerText", "decimalText", "MC"].includes(typeOfQForAnyStage) && 
      !((stageOrder.stage === -2 & !isLogined) || [-3, -4].includes(stageOrder.stage) ) && (
        <TextQuestion
          textQuestion={questionTextForAnyStage[languageIndex]}
          setIsLogined={setIsLogined}
          languageIndex={languageIndex}
          setErrorMessageArray={setErrorMessageArray}
          setExamCompleted={setExamCompleted}
        />
      )}
      {stageOrder.stage === -2 && !isLogined &&
        <Grid className={classes.centerRow}>
          <Grid className={classes.formulaColumn}>
            <Login
              languageIndex={languageIndex}
              bibleVersionIndex={bibleVersionIndex}
              isLogined={isLogined}
              setIsLogined={setIsLogined}
              setLoginQuestionData={setLoginQuestionData}
            />
          </Grid>
        </Grid>
      }
      {
        ["fractionFormula", "fractionText"].includes(typeOfQForAnyStage) &&
        ![-3, -4].includes(stageOrder.stage) &&
        !(stageOrder.stage === -2 && (examCompleted || !isLogined)) &&        
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
      }
      {
        typeOfQForAnyStage === "MC" && completed && !examCompleted &&
        <Grid className={classes.centerRow}>
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
        </Grid>
      }
      {stageOrder.stage === -3 &&
        <Leaderboard
          languageIndex={languageIndex}
          handleSetError={handleSetError}
          unitTitle={unitTitle[unitIndex]}
        />
      }
      {stageOrder.stage === -4 &&
        <UploadScore
          languageIndex={languageIndex}
          scoreTotalForUnit={scoreTotalForUnit}
          setStageOrder={setStageOrder}
          handleSetError={handleSetError}
          unitTitle={unitTitle[unitIndex]}
          setScoreTotalForUnit={setScoreTotalForUnit}
        />
      }
      {stageOrder.stage === -2 && isLogined && examCompleted &&
        <ExamCompleteTable
          scoreTotalForUnit={scoreTotalForUnit}
          errorMessageArray={errorMessageArray}
          setErrorMessageArray={setErrorMessageArray}
          setIsLogined={setIsLogined}
          languageIndex={languageIndex}
          setExamCompleted={setExamCompleted}
        />
      }
      <MyKeypad
        handleClick={handleKeypadClick}
        topicIndex={topicIndex}
        formulaFocusedIndex={formulaFocusedIndex}
        isMC={typeOfQForAnyStage === "MC"}
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
