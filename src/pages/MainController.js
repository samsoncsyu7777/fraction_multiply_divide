import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { AlertSnackbar } from "../components/AlertComponents";//a
import { MyFrame } from "../components/HeadingComponents";//a
import { MyKeypad } from "../components/KeypadComponents";//a
import { StageButtons } from "../components/StageComponents";//a
import { Login } from "../components/LoginComponents";//a
import { TextQuestion } from "../components/TextQuestionComponents";//a
import { UploadScore } from "../components/UploadScoreComponents";//a
import { Leaderboard } from "../components/LeaderboardComponents";//a
import { ExamCompleteTable } from "../components/ExamCompleteTableComponents";//a
import { FractionUnitController } from "../unitControllers/FractionUnitController";//a
import { DecimalUnitController } from "../unitControllers/DecimalUnitController";//a

import {
  getValues1LayerArray,
  getValues2LayerArray,
  getValues3LayerArray,
  calculateTotalScoreForUnit,
  includes,

} from "../functions/CommonFunctions";
import { questionsFilesArray, answersFilesArray, responsesFilesArray, typesFilesArray, wrongAnswersFilesArray } from "../questionData/ArrayForAllQuestionFiles";
import constants from "../constants/MainControllerConstants";//a,b
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";//a,b
import { pagesStyles } from "../themes/styles";//a,b
import { theme as myTheme } from "../themes/theme";//a,b

/*const style = {//a
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
};*/

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
  const [completed, setCompleted] = useState(false);//a->b
  const [stageOrder, setStageOrder] = useState({ stage: 0, order: 0 });//a //stage: 0-20common stages, -1self-design, -2exam, -3leaderboard, -4submitTotal
  const [isLogined, setIsLogined] = useState(false);//a //FALSE
  const { topicIndex, learningToolIndex } = topicToolIndex;//a 
  const [questions, setQuestions] = useState(answersFilesArray[0]);//a
  const [loginQuestionData, setLoginQuestionData] = useState({});//a
  const [questionTextForAnyStage, setQuestionTextForAnyStage] = useState(["", "", "", ""]);//a  
  const [typeAndFormulaAnswerArrayForAnyStage, setTypeAndFormulaAnswerArrayForAnyStage] = useState([]);//a
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
  const [clearFirstLineForSelfLearning, setClearFirstLineForSelfLearning] = useState(0);//a
  const [callResetDefault, setCallResetDefault] = useState(0);//a
  const [callResetClickForOtherPurpose, setCallResetClickForOtherPurpose] = useState(true);//a
  const [callKeypadClick, setCallKeypadClick] = useState([0, ""]);//a
  const [callIncreaseFormulaIndex, setCallIncreaseFormulaIndex] = useState(true);//a
  const [decimalFractionStage, setDecimalFractionStage] = useState(0);//0: "?/2"; 1: "1/?"; 2: "OK"

  const {
    stageText,//a
    manual,
    exam,
    leaderboard,
    topics,
    wellDone,//a
    uploadTotalScore,//a
    unitTitle,
    logoutText,
    sureText,//a
    timeDelay,//a
    typeHint,
  } = constants;

  //both versions equal
  useEffect(() => {//a
    console.log("change topicToolIndex")
    if (!isLogined) {
      if (questions[topicIndex][learningToolIndex].length === 0) {
        if (stageOrder.stage === -1 && stageOrder.order === 0) {//stageOrder === { stage: -1, order: 0 }) {
          resetDefault();
        } else {
          setStageOrder({ stage: -1, order: 0 });
        }
      } else {
        console.log("stageOrder in callback: " + stageOrder.stage + stageOrder.order)
        if (stageOrder.stage === 0 && stageOrder.order === 0) {//stageOrder === { stage: 0, order: 0 }) {
          console.log("reset in callback")
          resetDefault();
          resetQuestion();//***
        } else {
          console.log("set stageOrder in callback")
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
    let replacedErrorMsg = errorMsg.replace(/\*/g, "×");
    replacedErrorMsg = replacedErrorMsg.replace(/\//g, "÷");
    setSeverity("error");
    setErrorMessage(replacedErrorMsg);
    setTimeout(() => {
      setOpenAlert(true);
    }, timeDelay);
    if (examIndex === 1 && stageOrder.stage === -2 && isLogined) {
      let tmpErrorArray = [...errorMessageArray];
      tmpErrorArray.push(replacedErrorMsg);
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
      calculateTotalScoreForUnit(tmpObject, setScoreTotalForUnit);
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

    setCallResetDefault((prev) => prev + 1);
  }

  function resetQuestion() {//a    
    console.log("resetQ in controller2")
    if (stageOrder.stage === -1) {
      console.log("set clear first line")
      setClearFirstLineForSelfLearning((prev) => prev + 1);
    } else if ((stageOrder.stage === -2 && isLogined) || stageOrder.stage > -1) {//a resetQuestion B
      let tmpType = "";
      let tmpFormula = [[[]]];
      if (stageOrder.stage === -2) {
        setQuestionTextForAnyStage(getValues1LayerArray(loginQuestionData.questions[stageOrder.order]));//a->b
        setResponseArrayForAnyStage(getValues2LayerArray(loginQuestionData.responses[stageOrder.order]));
        tmpType = loginQuestionData.types[stageOrder.order].stringValue;
        //setTypeOfQForAnyStage(tmpType);
        tmpFormula = [...getValues3LayerArray(loginQuestionData.answers[stageOrder.order])];
        //setFractionFormulaAnswerArrayForAnyStage(tmpFormula);//change state callback at unitController
        setTypeAndFormulaAnswerArrayForAnyStage([tmpType, tmpFormula]);
        setWrongFractionAnswerArrayForAnyStage(getValues3LayerArray(loginQuestionData.wrongAnswers[stageOrder.order]));
      } else {
        setQuestionTextForAnyStage(questionsFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]);
        setResponseArrayForAnyStage(responsesFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]);
        tmpType = typesFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]
        //setTypeOfQForAnyStage(tmpType);//a->b
        tmpFormula = [...answersFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]];
        //setFractionFormulaAnswerArrayForAnyStage(tmpFormula);//change state callback at unitController
        setTypeAndFormulaAnswerArrayForAnyStage([tmpType, tmpFormula]);
        setWrongFractionAnswerArrayForAnyStage(wrongAnswersFilesArray[unitIndex][topicIndex][learningToolIndex][stageOrder.stage][stageOrder.order]);
      }
    }
  }

  //completed part equal. not completed part needs mixed version and go to next mixed stage
  const resetClick = (e) => {//a
    console.log("completed: " + completed);
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
          setTypeAndFormulaAnswerArrayForAnyStage(["", [[["", 0, 0, 0, 0, 0]]]]);
          setExamCompleted(true);
        }
      } else {
        console.log("resetClick");
        resetDefault();
        resetQuestion();
      }
    } else {
      setCallResetClickForOtherPurpose((prev) => !prev);
    }
  };

  //need mixed version
  const handleKeypadClick = (e, key) => {//a
    if (typeAndFormulaAnswerArrayForAnyStage[0] === "MC") {
      checkMCAnswer(key);
      return;
    }
    if (includes(["1/?", "OK"], key)) {
      setDecimalFractionStage((prev) => (prev + 1) % 3);
    }
    setCallKeypadClick((prev) => [prev[0] + 1, key]);
  };

  function completeFunction() {//a
    setErrorMessage("👍🏻" + wellDone[languageIndex]);
    setCallIncreaseFormulaIndex((prev) => !prev);
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
      if (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Text")) {//if (typeAndFormulaAnswerArrayForAnyStage[0] === "fractionText") {
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

  function checkMCAnswer(key) {//a
    console.log(key);
    console.log(typeAndFormulaAnswerArrayForAnyStage[1][0][0][0]);
    if (key === typeAndFormulaAnswerArrayForAnyStage[1][0][0][0]) {
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
    <MyFrame topic={topics[languageIndex] + topic} learningTool={learningTool} scoreTotalForUnit={scoreTotalForUnit} languageIndex={languageIndex} unitTitle={unitTitle} unitIndex={unitIndex} >
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
      {typeAndFormulaAnswerArrayForAnyStage[0] != undefined && (includes(typeAndFormulaAnswerArrayForAnyStage[0], "Text") || typeAndFormulaAnswerArrayForAnyStage[0] === "MC") && //{["fractionText", "integerText", "decimalText", "decimalTextFraction", "fractionTextDecimal", "MC"].includes(typeAndFormulaAnswerArrayForAnyStage[0]) &&
        !((stageOrder.stage === -2 & !isLogined) || includes([-3, -4], stageOrder.stage)) && (
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
        typeAndFormulaAnswerArrayForAnyStage[0] != undefined && includes(typeAndFormulaAnswerArrayForAnyStage[0], "fraction") && //        ["fractionFormula", "fractionText", "fractionFormulaDecimal", "fractionTextDecimal", "fraction%", "fraction%End"].includes(typeAndFormulaAnswerArrayForAnyStage[0]) &&
        !includes([-3, -4], stageOrder.stage) &&
        !(stageOrder.stage === -2 && (examCompleted || !isLogined)) &&
        <FractionUnitController
          languageIndex={languageIndex}
          topicToolIndex={topicToolIndex}
          completed={completed}
          setCompleted={setCompleted}
          stageOrder={stageOrder}
          isLogined={isLogined}
          handleSetError={handleSetError}
          clearFirstLineForSelfLearning={clearFirstLineForSelfLearning}
          callResetDefault={callResetDefault}
          typeAndFormulaAnswerArrayForAnyStage={typeAndFormulaAnswerArrayForAnyStage}
          callResetClickForOtherPurpose={callResetClickForOtherPurpose}
          callKeypadClick={callKeypadClick}
          completeFunction={completeFunction}
          responseArrayForAnyStage={responseArrayForAnyStage}
          wrongFractionAnswerArrayForAnyStage={wrongFractionAnswerArrayForAnyStage}
          resetClick={resetClick}
          callIncreaseFormulaIndex={callIncreaseFormulaIndex}
        />
      }
      {
        typeAndFormulaAnswerArrayForAnyStage[0] != undefined &&
        (includes(typeAndFormulaAnswerArrayForAnyStage[0], "integer") || includes(typeAndFormulaAnswerArrayForAnyStage[0], "decimal")) && //        ["fractionFormula", "fractionText", "fractionFormulaDecimal", "fractionTextDecimal", "fraction%", "fraction%End"].includes(typeAndFormulaAnswerArrayForAnyStage[0]) &&
        !includes([-3, -4], stageOrder.stage) &&
        !(stageOrder.stage === -2 && (examCompleted || !isLogined)) &&
        <DecimalUnitController
          languageIndex={languageIndex}
          topicToolIndex={topicToolIndex}
          completed={completed}
          setCompleted={setCompleted}
          stageOrder={stageOrder}
          isLogined={isLogined}
          handleSetError={handleSetError}
          clearFirstLineForSelfLearning={clearFirstLineForSelfLearning}
          callResetDefault={callResetDefault}
          typeAndFormulaAnswerArrayForAnyStage={typeAndFormulaAnswerArrayForAnyStage}
          callResetClickForOtherPurpose={callResetClickForOtherPurpose}
          callKeypadClick={callKeypadClick}
          completeFunction={completeFunction}
          responseArrayForAnyStage={responseArrayForAnyStage}
          wrongFractionAnswerArrayForAnyStage={wrongFractionAnswerArrayForAnyStage}
          resetClick={resetClick}
          callIncreaseFormulaIndex={callIncreaseFormulaIndex}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          decimalFractionStage={decimalFractionStage}
          setDecimalFractionStage={setDecimalFractionStage}
        />
      }
      {
        typeAndFormulaAnswerArrayForAnyStage[0] != undefined &&
        typeAndFormulaAnswerArrayForAnyStage[0] === "MC" && completed && !examCompleted &&
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
        type={typeAndFormulaAnswerArrayForAnyStage[0]}
        decimalFractionStage={decimalFractionStage}
      />
      {
        typeAndFormulaAnswerArrayForAnyStage[0] != undefined &&
        <Grid className={classes.centerRow}>
          <Typography style={{ whiteSpace: 'pre-line' }} className={classes.typeHint}>
            {typeHint[typeAndFormulaAnswerArrayForAnyStage[0]][languageIndex]}
          </Typography>
        </Grid>
      }
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
    </MyFrame>
  );
};
