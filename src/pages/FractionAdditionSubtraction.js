import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyKeypad } from "../components/KeypadComponents";
import { FractionFormula } from "../components/FractionFormulaComponents";
import { StageButtons } from "../components/StageComponents";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import questions from "../questions/Questions";
import constants from "../constants/FractionAdditionSubtractionConstants";
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";
import { pagesStyles } from "../themes/styles";
import { theme as myTheme } from "../themes/theme";

//×÷👍👍🏻
export const FractionAdditionSubtraction = ({
  languageIndex,
  topic,
  learningTool,
  topicToolIndex
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
  const [fractionPositionIndex, setFractionPositionIndex] = useState(0);
  const [fractionPartIndex, setFractionPartIndex] = useState(3);
  const [okButtonStage, setOkButtonStage] = useState(0);
  const [calculationStage, setCalculationStage] = useState(0);
  const [calculatedLcm, setCalculatedLcm] = useState(1);
  const [stageOrder, setStageOrder] = useState({ stage: 0, order: 0 });
  const { topicIndex, learningToolIndex } = topicToolIndex;
  const timeDelay = 200;
  const primeNumbers = getPrimeNumbers();
  const [indexDecreasedByLastStage, setIndexDecreasedByLastStage] = useState(0);
  const [typeOfCalculation, setTypeOfCalculation] = useState(""); //"A&S" or "M&D"
  const [mixedStage, setMixedStage] = useState("hasBracket"); //"hasMixedCal" or "noMixedCal"
  const [fractionIndexInProcess, setFractionIndexInProcess] = useState([0, 1]); //need to change
  const [bracketStage, setBracketStage] = useState(""); //"hasMixedCal" or "noMixedCal"
  const [startEndIndexLastStage, setStartEndIndexLastStage] = useState([0, 0]);
  //use calculationStage for both A&S and M&D
  
  const {
    stageText,
    manual,
    okButtonText,
    topics,
    wellDone,
    noOperator,
    atLeastOneFraction,
    negativeResult,
    noNumber,
    fractionHasBoth,
    noImproper,
    oneFractionOnly,
    incorrectWhole,
    wholeNoFraction,
    sameDenominator,
    numeratorFromImproper,
    sameNumberOfFractions,
    sameOperators,
    sameWholeNumbers,
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
    beAFactorOfNumerator,
    beAFactorOfDenominator,
    sameFactorInReduction,
    furtherReduceFactorLeft,
    furtherReduceFactorRight
  } = constants;

  useEffect(() => {
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
  }, [topicToolIndex]);

  useEffect(() => {
    resetDefault();
  }, [stageOrder]);

  useEffect(() => {
    if (
      stageOrder.stage > -1 &&
      formulaFocusedIndex === 0 &&
      fractionLinesArray[0][1][0] != ""
    ) {
      okClick();
    }
  }, [fractionLinesArray]);

  const handleStageClick = (stage) => {
    setStageOrder({ stage: stage, order: 0 });
  };

  const setQuestion = (stage, order) => {
    let tmpArray = [...questions[topicIndex][learningToolIndex][stage][order]];
    tmpArray.push(["", 0, 0, 0, 0, 0]);
    setFractionLinesArray([tmpArray]);
  };

  const closeAlert = (e) => {
    setOpenAlert(false);
  };

  function resetDefault() {
    setSeverity("error");
    setFormulaFocusedIndex(0);
    setCompleted(false);
    setOkButtonStage(0);
    setCalculationStage(0);
    if (stageOrder.stage > -1) {
      setQuestion(stageOrder.stage, stageOrder.order);
    } else {
      setFractionLinesArray([
        [
          ["", 0, 0, 0, 0, 0],
          ["", 0, 0, 0, 0, 0]
        ]
      ]);
    }
  }

  const resetClick = (e) => {
    if (completed) {
      if (stageOrder.stage > -1) {
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
        resetDefault();
      }
    } else if (okButtonStage > 0) {
      if (calculationStage == 3) {
        var checkValue = false;
        if (fractionLinesArray[formulaFocusedIndex][0][4] > 0) {
          checkValue = true;
        }
        checkSimplifyValue(formulaFocusedIndex, checkValue);
      } else {
        // addLine();
      }
    }
  };

  function addLine() {
    setPartValue(0, -1, -1, true, false, false);
    setFormulaFocusedIndex(formulaFocusedIndex + 1);
    setOkButtonStage(0);
  }

  function fractionOrIntegerCheck(index) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      //check with operators
      if (i > 0 && fractionLinesArray[index][i][0] == "") {
        setErrorMessage(noOperator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      //check with numbers
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
      //check fraction has both
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

  function singleNumberCheck(index) {
    if (fractionLinesArray[index].length == 2) {
      if (index == 0) {
        setErrorMessage(noOperator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    return true;
  }

  //A&S only. Need both A&S and mixed versions
  function positiveResultCheck(index) {
    var result = 0.0;
    var sumOfDenominators = 0;
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      result +=
        (fractionLinesArray[index][i][1] +
          fractionLinesArray[index][i][3] / fractionLinesArray[index][i][4]) *
        (fractionLinesArray[index][i][0] == "-" ? -1 : 1);
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
    //check at least one fraction
    if (sumOfDenominators == 0) {
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
  function noVariousDenominatorCheck(index, checkValueNeeded) {
    if (!checkValueNeeded) {
      //check having different only
      var firstDenominator = 0;
      var i;
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
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
      noNegativeNumeratorResultCheck(index, false);
      return true;
    } else {
      //check denominators become lcm
      var denominatorMultiples = [];
      var lcm = 0;
      var i;
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        setErrorMessage(sameNumberOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
        if (
          fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
        ) {
          setErrorMessage(sameOperators[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (
          fractionLinesArray[index][i][1] != fractionLinesArray[index - 1][i][1]
        ) {
          setErrorMessage(sameWholeNumbers[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
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
            setErrorMessage(sameWholeNumbers[languageIndex]);
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
      addLine();
      noNegativeNumeratorResultCheck(index, false);
      return true;
    }
  }

  //A&S only. need both A&S and mixed versions
  function noNegativeNumeratorResultCheck(index, checkValueNeeded) {
    var numeratorResult = 0;
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      numeratorResult +=
        fractionLinesArray[index][i][3] *
        (fractionLinesArray[index][i][0] == "-" ? -1 : 1);
    }
    if (!checkValueNeeded) {
      if (numeratorResult >= 0) {
        setCalculationStage(2);
        return true;
      } else {
        return false;
      }
      //check value
    } else {
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        setErrorMessage(sameNumberOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
        if (
          fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
        ) {
          setErrorMessage(sameOperators[languageIndex]);
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
      setCalculationStage(2);
      addLine();
      return true;
    }
  }

  //A&S only
  function addToOneFractionCheck(index) {
    if (fractionLinesArray[index].length > 2) {
      setErrorMessage(oneFractionOnly[languageIndex]);
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
    for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
      numeratorResult +=
        fractionLinesArray[index - 1][i][3] *
        (fractionLinesArray[index - 1][i][0] == "-" ? -1 : 1);
      if (numeratorResult < 0) {
        negativeInNumeratorProcess = true;
      }
      wholeResult +=
        fractionLinesArray[index - 1][i][1] *
        (fractionLinesArray[index - 1][i][0] == "-" ? -1 : 1);
      if (wholeResult < 0) {
        negativeInWholeProcess = true;
      }
    }
    if (numeratorResult > 0) {
      if (fractionLinesArray[index][0][4] != calculatedLcm) {
        setErrorMessage(sameDenominator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    } else {
      if (fractionLinesArray[index][0][4] != 0) {
        setErrorMessage(wholeWithoutFraction[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    if (fractionLinesArray[index][0][3] != numeratorResult) {
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
    if (fractionLinesArray[index][0][1] != wholeResult) {
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
    setOkButtonStage(1);
    return true;
  }

  function noImproperFractionCheck(index, checkValueNeeded) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      if (
        fractionLinesArray[index][i][3] >= fractionLinesArray[index][i][4] &&
        fractionLinesArray[index][i][4] > 0
      ) {
        if (!checkValueNeeded && index > 0) {
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
      return true;
    } else if (checkValueNeeded) {
      if (fractionLinesArray[index].length > 2) {
        setErrorMessage(oneFractionOnly[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < 1; i++) {
        var integerPart = fractionLinesArray[index][i][3];
        if (integerPart == "") {
          integerPart = 0;
        }
        if (
          fractionLinesArray[index][i][1] !=
          fractionLinesArray[index - 1][i][1] +
            parseInt(
              fractionLinesArray[index - 1][i][3] /
                fractionLinesArray[index - 1][i][4]
            )
        ) {
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
            setErrorMessage(sameDenominator[languageIndex]);
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
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return true;
    } else {
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return true;
    }
  }

  function enterCheck() {
    if (!fractionOrIntegerCheck(formulaFocusedIndex)) {
      return;
    }
    if (formulaFocusedIndex == 0) {
      if (!singleNumberCheck(formulaFocusedIndex)) {
        return;
      }
      if (!positiveResultCheck(formulaFocusedIndex)) {
        return;
      }
      addLine();
      if (!noVariousDenominatorCheck(formulaFocusedIndex, false)) {
        return;
      }
    } else {
      switch (calculationStage) {
        case 0:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noVariousDenominatorCheck(formulaFocusedIndex, true);
          }
          break;
        case 1:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noNegativeNumeratorResultCheck(formulaFocusedIndex, true);
          }
          break;
        case 2:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            addToOneFractionCheck(formulaFocusedIndex);
          }
          break;
        case 3:
          break;
        case 4:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noImproperFractionCheck(formulaFocusedIndex, true);
          }
          break;
      }
    }
  }

  function checkSimplifyValue(index, checkValue) {
    if (checkValue) {
      var newNumerator = 1;
      var newDenominator = 1;
      var numeratorDeduceFactor = 1;
      var denominatorDeduceFactor = 1;
      var i;
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
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
    }
    setCalculationStage(4);
    setOkButtonStage(0);
    noImproperFractionCheck(index, false);
    return true;
  }

  const okClick = (e) => {
    switch (okButtonStage) {
      case 0:
        enterCheck();
        break;
      case 1:
        setFractionPartIndex(2);
        setOkButtonStage(2);
        break;
      case 2:
        var checkValue = false;
        if (fractionLinesArray[formulaFocusedIndex][0][4] > 0) {
          checkValue = true;
        }
        checkSimplifyValue(formulaFocusedIndex, checkValue);
        break;
    }
  };

  const handleKeypadClick = (e, key) => {
    var pushLine = false;
    var pushPosition = false;
    if (formulaFocusedIndex == fractionLinesArray.length - 1) {
      if (
        (["+", "-"].includes(key) &&
          fractionPartIndex == 0 &&
          fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
            fractionPartIndex
          ] == "") ||
        (!["+", "-"].includes(key) &&
          fractionPartIndex != 0 &&
          (fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
            fractionPartIndex
          ] != "" ||
            key != "0")) ||
        key == "<-"
      ) {
        if (
          ["+", "-"].includes(key) &&
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

  const handlePartClick = (e, positionIndex, partIndex) => {
    //in reduction, only small boxes can be focused
    if (
      (okButtonStage == 2 && (partIndex == 2 || partIndex == 5)) ||
      okButtonStage != 2
    ) {
      setFractionPositionIndex(positionIndex);
      setFractionPartIndex(partIndex);
    }
  };

  const classes = pagesStyles();

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
        />
      )}
      <Grid className={classes.spaceGrid} />
      <Grid className={classes.centerRow}>
        <Grid className={classes.formulaColumn}>
          {fractionLinesArray.map((formula, index) => {
            return (
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
                    lineIndex={index}
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
                        <ForwardRoundedIcon className={classes.resetArrow} />
                      </Button>
                    )}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
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
