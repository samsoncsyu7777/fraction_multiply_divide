import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyKeypad } from "../components/KeypadComponents";
import { FractionFormula } from "../components/FractionFormulaComponents";
import { StageButtons } from "../components/StageComponents";
import { Login } from "../components/LoginComponents";
import { TextQuestion } from "../components/TextQuestionComponents";
import questions from "../questions/Questions";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import constants from "../constants/FractionMultiplyDivideConstants";
import ForwardRoundedIcon from "@material-ui/icons/ForwardRounded";
import { pagesStyles } from "../themes/styles";
import { theme as myTheme } from "../themes/theme";

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
  const [fractionPositionIndex, setFractionPositionIndex] = useState(0);
  const [fractionPartIndex, setFractionPartIndex] = useState(3);
  const [okButtonStage, setOkButtonStage] = useState(0);
  const [calculationStage, setCalculationStage] = useState(0); //0:with mixed number, 1:with division, 2:need simplify, 3:with multiplication, 4:improper number, 5:completed
  const [stageOrder, setStageOrder] = useState({ stage: 0, order: 0 });
  const [isLogined, setIsLogined] = useState(false);
  const { topicIndex, learningToolIndex } = topicToolIndex;
  const timeDelay = 200;
  const primeNumbers = getPrimeNumbers();

  const {
    stageText,
    manual,
    exam,
    okButtonText,
    topics,
    wellDone,
    noOperator,
    noNumber,
    fractionHasBoth,
    noImproper,
    oneFractionOnly,
    incorrectWhole,
    wholeNoFraction,
    sameDenominator,
    numeratorFromImproper,
    noMixed,
    sameNumberOfFractions,
    sameOperators,
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
    noDivisionBeforeReduction
  } = constants;

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
    resetDefault();
  }, [stageOrder]);

  useEffect(() => {
    if (
      stageOrder.stage > -1 &&
      formulaFocusedIndex === 0 &&
      fractionLinesArray[0][1][0] != "" &&
      calculationStage < 2
    ) {
      okClick();
    }
  }, [fractionLinesArray]);

  const handleStageClick = (stage) => {
    if (!isLogined) {
      setStageOrder({ stage: stage, order: 0 });
    }
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
      if (calculationStage == 2) {
        checkSimplifyValue(formulaFocusedIndex, false);
      } else {
        addLine();
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
      if (calculationStage == 4) {
        setErrorMessage("👍🏻" + wellDone[languageIndex]);
        setFormulaFocusedIndex(formulaFocusedIndex + 1);
        setCompleted(true);
        setSeverity("success");
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
      }
      return true;
    } else {
      // if (calculationStage == 4) {
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      //}
      return true;
    }
  }

  function noMixedFractionCheck(index, checkValueNeeded) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      if (fractionLinesArray[index][i][1] != "") {
        if (index != 0 && calculationStage == 0) {
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
          addLine();
        }
        return false;
      }
    }
    if (index == 0 || !checkValueNeeded) {
      setCalculationStage(1);
      noDivisionCheck(index, false);
      return true;
    } else if (checkValueNeeded) {
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        setErrorMessage(sameNumberOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
        if (
          fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]
        ) {
          setErrorMessage(sameOperators[languageIndex]);
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
            setErrorMessage(sameDenominator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      setCalculationStage(1);
      noDivisionCheck(index, false);
      //setOkButtonStage(1);
      //addLine();
      return true;
    }
  }

  function noDivisionCheck(index, checkValueNeeded) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      if (fractionLinesArray[index][i][0] == "÷") {
        if (index != 0 && calculationStage == 1) {
          setErrorMessage(noDivision[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
        } else {
          addLine();
        }
        return false;
      }
    }
    if (index == 0 || !checkValueNeeded) {
      setCalculationStage(2);
      setOkButtonStage(1);
      //addLine();
      //simplifiedCheck(index, false);
      return true;
    } else if (checkValueNeeded) {
      if (
        fractionLinesArray[index].length != fractionLinesArray[index - 1].length
      ) {
        setErrorMessage(sameNumberOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
        if (fractionLinesArray[index][i][1] > 0) {
          setErrorMessage(noMixed[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (i == 0 || fractionLinesArray[index - 1][i][0] == "×") {
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
      setCalculationStage(2);
      setOkButtonStage(1);
      //simplifiedCheck(index, false);
      //addLine();
      return true;
    }
  }

  function noMultiplicationCheck(index, checkValueNeeded) {
    if (checkValueNeeded) {
      if (fractionLinesArray[index].length != 2) {
        setErrorMessage(oneFractionOnly[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      var i;
      var numerator = 1;
      var denominator = 1;
      for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
        numerator *= fractionLinesArray[index - 1][i][3];
        denominator *= fractionLinesArray[index - 1][i][4];
      }
      if (
        fractionLinesArray[index][0][3] != numerator ||
        fractionLinesArray[index][0][4] != denominator
      ) {
        setErrorMessage(productOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < primeNumbers.length; i++) {
        if (
          fractionLinesArray[index][0][3] % primeNumbers[i] == 0 &&
          fractionLinesArray[index][0][4] % primeNumbers[i] == 0
        ) {
          setErrorMessage(simplifyIt[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setOkButtonStage(1);
          return false;
        }
      }
      setCalculationStage(4);
      setOkButtonStage(1);
      noImproperFractionCheck(index, false);
      //addLine();
      return true;
    }
    setCalculationStage(4);
    noImproperFractionCheck(index, false);
    return true;
  }

  function enterCheck() {
    if (!fractionOrIntegerCheck(formulaFocusedIndex)) {
      return;
    }
    if (formulaFocusedIndex == 0) {
      if (!singleNumberCheck(formulaFocusedIndex)) {
        return;
      }
      if (!noImproperFractionCheck(formulaFocusedIndex, false)) {
        return;
      }
      noMixedFractionCheck(formulaFocusedIndex, false);
      //setOkButtonStage(1);
    } else {
      switch (calculationStage) {
        case 0:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noMixedFractionCheck(formulaFocusedIndex, true);
          }
          break;
        case 1:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noDivisionCheck(formulaFocusedIndex, true);
          }
          break;
        case 2:
          //simplifiedCheck(formulaFocusedIndex, true);
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            setOkButtonStage(1);
            //noMultiplicationCheck(formulaFocusedIndex, true);
          }
          break;
        case 3:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noMultiplicationCheck(formulaFocusedIndex, true);
          }
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
    setCalculationStage(3);
    setOkButtonStage(0);
    if (checkValue) {
      //noMultiplicationCheck(index, false);
    }
    addLine();
    return true;
  }

  const okClick = (e) => {
    switch (okButtonStage) {
      case 0:
        enterCheck();
        break;
      case 1:
        if (calculationStage > 1) {
          setFractionPartIndex(2);
          setOkButtonStage(2);
        } else {
          if (calculationStage == 0) {
            setErrorMessage(noMixedBeforeReduction[languageIndex]);
          } else {
            setErrorMessage(noDivisionBeforeReduction[languageIndex]);
          }
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
        }
        break;
      case 2:
        checkSimplifyValue(formulaFocusedIndex, true);
        break;
    }
  };

  const handleKeypadClick = (e, key) => {
    var pushLine = false;
    var pushPosition = false;
    if (formulaFocusedIndex == fractionLinesArray.length - 1) {
      if (
        (["×", "÷"].includes(key) &&
          fractionPartIndex == 0 &&
          fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
            fractionPartIndex
          ] == "") ||
        (!["×", "÷"].includes(key) &&
          fractionPartIndex != 0 &&
          (fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][
            fractionPartIndex
          ] != "" ||
            key != "0")) ||
        key == "<-"
      ) {
        if (
          ["×", "÷"].includes(key) &&
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
    //in simplification, only small boxes can be focused
    if (
      (okButtonStage == 2 && (partIndex == 2 || partIndex == 5)) ||
      okButtonStage != 2
    ) {
      setFractionPositionIndex(positionIndex);
      setFractionPartIndex(partIndex);
    }
  };

  const classes = pagesStyles(); //
  const textQuestion = "多少個 ^\\frac{13}{7}^ 相加後的總和是50?相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是相加後的總和是";//

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

      { 
        isLogined && 
        <TextQuestion textQuestion={textQuestion}/>
      }
      <Grid className={classes.centerRow}>
        {stageOrder.stage === -2 && !isLogined ? 
          <Grid className={classes.formulaColumn}>
            <Login
                languageIndex={languageIndex}
                bibleVersionIndex={bibleVersionIndex}
                isLogined={isLogined}
                setIsLogined={setIsLogined}
            />
          </Grid>
          :
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
        }
        
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
