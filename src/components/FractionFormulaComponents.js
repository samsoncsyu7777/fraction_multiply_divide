import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const fractionFormulaStyles = makeStyles((theme) => ({
  /*myInputText: {
    width: "6vw",
    height: "2.4vw",
    fontSize: "2vw",
    margin: "0.5vw",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      width: "12vw",
      height: "4.8vw",
      fontSize: "4vw"
    }
  },*/
  centerRow: {
    display: "flex",
    justifyContent: "center"
  },
  overflow: {
    overflow: "auto",
    maxWidth: "78vw",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "94vw",
    },
  },
  leftRow: {
    display: "flex",
    alignItems: "center"
  },
  fractionColumn: {
    alignItems: "center"
  },
  integerInput: {
    width: "3.0vw",
    height: "3.0vw",
    fontSize: "1.7vw",
    minWidth: "3.0vw",
    borderRadius: "0.4vw",
    lineHeight: 1.9,
  },
  commonInput: {
    width: "4.2vw",
    height: "3vw",
    fontSize: "1.5vw",
    minWidth: "4.2vw",
    borderRadius: "0.4vw",
    lineHeight: 2.1,
  },
  smallInput: {
    width: "3.0vw",
    height: "1.6vw",
    fontSize: "1vw",
    minWidth: "3.0vw",
    borderRadius: "0.3vw",
  },
  operatorInput: {
    borderRadius: "6vw",
    width: "2.8vw",
    height: "2.8vw",
    minWidth: "2.8vw",
    fontSize: "1.7vw",
    //marginRight: "0.3vw",
    lineHeight: 1.7, 
  },
  border: {
    borderColor: myTheme.color.myGrey,
    borderWidth: 1,
    borderStyle: "solid",
    textAlign: "center",
    letterSpacing: 0,
  },
  bracket: {
    borderRadius: "2vw",
    width: "1.0vw",
    //maxWidth: "1.5vw",
    minWidth: "1.0vw",
    height: "4vw",
    fontSize: "2.6vw",
    margin: "0.3vw",
  },
  fractionLineBox: {
    width: "5.5vw",
    height: "0.01vw",
    padding: "0vw",
    margin: "0.3vw",
    minWidth: "5.5vw"
  },
  [theme.breakpoints.down("xs")]: {
    integerInput: {
      width: "5vw",
      height: "6vw",
      fontSize: "3vw",
      minWidth: "5vw",
      borderRadius: "0.8vw",
    },
    commonInput: {
      width: "6.4vw",
      height: "6vw",
      fontSize: "2.6vw",
      minWidth: "6.4vw",
      borderRadius: "0.8vw", 
    },
    smallInput: {
      width: "5vw",
      height: "4vw",
      fontSize: "2vw",
      minWidth: "5vw",
      borderRadius: "0.5vw",
    },
    operatorInput: {
      borderRadius: "8vw",
      width: "5vw",
      height: "5vw",
      minWidth: "5vw",
      fontSize: "3vw",
      //marginRight: "0.4vw",
      lineHeight: 1.67, 
    },
    bracket: {
      borderRadius: "3vw",
      width: "1.7vw",
      minWidth: "1.7vw",
      height: "6vw",
      fontSize: "3.8vw",
      margin: "0.4vw",
    },
    fractionLineBox: {
      width: "8vw",
      height: "0.02vw",
      padding: "0vw",
      margin: "0.4vw",
      minWidth: "8vw"
    }
  }
}));

export const FractionFormula = ({
  handlePartClick,
  formula,
  learningToolIndex,
  positionIndex,
  partIndex,
  showSmallInput,
  isFocusedLine,
  calculationStage,
  lineIndex,
  bracketArray,
  setBracketArray,
  fractionIndexInProcess,
  fractionLength,
  formulaFocusedIndex,
  okButtonStage
}) => {
  const handleBracketClick = (index, bracketOrder) => {
    if (isFocusedLine && okButtonStage === 0) {
      if (bracketArray[lineIndex].includes(index)) {
        //remove all the brackets in this formula
        let bracketFormula = [...bracketArray];
        bracketFormula[lineIndex] = [];
        setBracketArray(bracketFormula);
      } else if (bracketArray[lineIndex].length % 2 === bracketOrder && bracketArray[lineIndex].findIndex((indexValue) => {return indexValue >= index }) === -1) {
        //add bracket here
        let bracketFormula = [...bracketArray];
        let bracket = [...bracketFormula[lineIndex]];
        bracket.push(index);
        bracketFormula[lineIndex] = bracket;
        setBracketArray(bracketFormula);
      }
    }    
  }
  const classes = fractionFormulaStyles();

  return (
    <Grid className={`${classes.leftRow} ${classes.overflow}`}>
      {formula.map((fraction, index) => {
        return (
          <Grid key={index} className={classes.leftRow}>
            {index != 0 && (
              <Typography
                style={
                  isFocusedLine && positionIndex == index && partIndex == 0
                    ? {
                        backgroundColor: myTheme.color.myPink,
                        color: myTheme.color.myRed
                      }
                    : {
                        backgroundColor: myTheme.color.myWhite,
                        color: myTheme.color.myBlue
                      }
                }
                className={`${classes.operatorInput} ${classes.border}`}
                onClick={(e) => {
                  handlePartClick(e, index, 0);
                }}
              >
                {fraction[0]}
              </Typography>
            )}

            <Typography
              style={{backgroundColor: myTheme.color.myWhite,
                      color: myTheme.color.myBlue}}
              className={`${classes.bracket} ${classes.border}`}
              onClick={() => {
                handleBracketClick(index, 0);
              }}
            >
              { bracketArray.length > lineIndex && bracketArray[lineIndex].indexOf(index) % 2 === 0 ? "(" : ""}
            </Typography>

            {(learningToolIndex == 1 ||
              (/*calculationStage > 0 &&*/ lineIndex > 0)) && (
              <Typography
                style={
                  isFocusedLine && positionIndex == index && partIndex == 1
                    ? {
                        backgroundColor: myTheme.color.myPink,
                        color: myTheme.color.myRed
                      }
                    : {
                        backgroundColor: myTheme.color.myWhite,
                        color: myTheme.color.myBlue
                      }
                }
                className={`${classes.integerInput} ${classes.border}`}
                onClick={(e) => {
                  handlePartClick(e, index, 1);
                }}
              >
                {fraction[1] == 0 ? "" : fraction[1]}
              </Typography>
            )}
            <Grid
              container
              direction="column"
              className={classes.fractionColumn}
            >
              {(showSmallInput && index >= fractionIndexInProcess[0] && index <= fractionIndexInProcess[1]) && (
                <Typography
                  style={
                    isFocusedLine && positionIndex == index && partIndex == 2
                      ? {
                          backgroundColor: myTheme.color.myPink,
                          color: myTheme.color.myRed
                        }
                      : {
                          backgroundColor: myTheme.color.myWhite,
                          color: myTheme.color.myBlue
                        }
                  }
                  className={`${classes.smallInput} ${classes.border}`}
                  onClick={(e) => {
                    handlePartClick(e, index, 2);
                  }}
                >
                  {fraction[2] == 0 ? "" : fraction[2]}
                </Typography>
              )}
              <Typography
                style={
                  isFocusedLine && positionIndex == index && partIndex == 3
                    ? {
                        backgroundColor: myTheme.color.myPink,
                        color: myTheme.color.myRed
                      }
                    : {
                        backgroundColor: myTheme.color.myWhite,
                        color: myTheme.color.myBlue
                      }
                }
                className={`${classes.commonInput} ${classes.border}`}
                onClick={(e) => {
                  handlePartClick(e, index, 3);
                }}
              >
                {fraction[3] == 0 ? "" : fraction[3]}
              </Typography>
              <Box borderBottom={3} className={classes.fractionLineBox} />
              <Typography
                style={
                  isFocusedLine && positionIndex == index && partIndex == 4
                    ? {
                        backgroundColor: myTheme.color.myPink,
                        color: myTheme.color.myRed
                      }
                    : {
                        backgroundColor: myTheme.color.myWhite,
                        color: myTheme.color.myBlue
                      }
                }
                className={`${classes.commonInput} ${classes.border}`}
                onClick={(e) => {
                  handlePartClick(e, index, 4);
                }}
              >
                {fraction[4] == 0 ? "" : fraction[4]}
              </Typography>
              {(showSmallInput && index >= fractionIndexInProcess[0] && index <= fractionIndexInProcess[1]) && (
                <Typography
                  style={
                    isFocusedLine && positionIndex == index && partIndex == 5
                      ? {
                          backgroundColor: myTheme.color.myPink,
                          color: myTheme.color.myRed
                        }
                      : {
                          backgroundColor: myTheme.color.myWhite,
                          color: myTheme.color.myBlue
                        }
                  }
                  className={`${classes.smallInput} ${classes.border}`}
                  onClick={(e) => {
                    handlePartClick(e, index, 5);
                  }}
                >
                  {fraction[5] == 0 ? "" : fraction[5]}
                </Typography>
              )}
            </Grid>

            <Typography
              style={{backgroundColor: myTheme.color.myWhite,
                      color: myTheme.color.myBlue}}
              className={`${classes.bracket} ${classes.border}`}
              onClick={() => {
                handleBracketClick(index, 1);
              }}
            >
              { bracketArray.length > lineIndex && bracketArray[lineIndex].indexOf(index) % 2 === 1 ? ")" : ""}
            </Typography>

          </Grid>
        );
      })}
    </Grid>
  );
};
