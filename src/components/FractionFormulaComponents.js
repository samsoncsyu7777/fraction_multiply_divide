import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { findIndex, includes} from "../functions/CommonFunctions";
import { theme as myTheme } from "../themes/theme";

const fractionFormulaStyles = makeStyles((theme) => ({    
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
    width: "3.8vw",
    height: "3.0vw",
    fontSize: "1.8vw",
    minWidth: "3.8vw",
    borderRadius: "0.4vw",
    lineHeight: "175%", 
  },
  commonInput: {
    width: "4.2vw",
    height: "3vw",
    fontSize: "1.8vw",
    minWidth: "4.2vw",
    borderRadius: "0.4vw",
    lineHeight: "175%", 
  },
  smallInput: {
    width: "3.0vw",
    height: "1.6vw",
    fontSize: "1.3vw",
    minWidth: "3.0vw",
    borderRadius: "0.3vw",
    lineHeight: "130%", 
  },
  operatorInput: {
    borderRadius: "6vw",
    width: "2.8vw",
    height: "2.8vw",
    minWidth: "2.8vw",
    fontSize: "1.7vw",
    lineHeight: "170%", 
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
      width: "6vw",
      height: "6vw",
      fontSize: "2.8vw",
      minWidth: "6vw",
      borderRadius: "0.8vw",
      lineHeight: "210%", 
    },
    commonInput: {
      width: "6.4vw",
      height: "6vw",
      fontSize: "2.8vw",
      minWidth: "6.4vw",
      borderRadius: "0.8vw", 
      lineHeight: "210%", 
    },
    smallInput: {
      width: "5vw",
      height: "4vw",
      fontSize: "2.5vw",
      minWidth: "5vw",
      borderRadius: "0.5vw",
      lineHeight: "170%", 
    },
    operatorInput: {
      borderRadius: "8vw",
      width: "5vw",
      height: "5vw",
      minWidth: "5vw",
      fontSize: "3vw",
      lineHeight: "170%", 
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
  positionIndex,
  partIndex,
  showSmallInput,
  isFocusedLine,
  calculationStage,
  lineIndex,
  bracketArray,
  setBracketArray,
  fractionIndexInProcess,
  okButtonStage
}) => {
  const handleBracketClick = (index, bracketOrder) => {
    if (isFocusedLine && okButtonStage === 0) {
      if (includes(bracketArray[lineIndex], index)) {
        //remove all the brackets in this formula
        let bracketFormula = [...bracketArray];
        bracketFormula[lineIndex] = [];
        setBracketArray(bracketFormula);
      } else if (bracketArray[lineIndex].length % 2 === bracketOrder && findIndex(bracketArray[lineIndex], (indexValue) => {return indexValue >= index }) === -1) { //bracketArray[lineIndex].findIndex((indexValue) => {return indexValue >= index }) === -1) {
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
                {fraction[1] === 0 ? "" : fraction[1]}
              </Typography>
            
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
                  {fraction[2] === 0 ? "" : fraction[2]}
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
                {fraction[3] === 0 ? "" : fraction[3]}
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
                {fraction[4] === 0 ? "" : fraction[4]}
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
                  {fraction[5] === 0 ? "" : fraction[5]}
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
