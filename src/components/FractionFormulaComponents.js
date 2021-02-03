import React from "react";
import {
  Box,
  Button,
  Grid,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { theme as myTheme } from "../themes/theme";

const fractionFormulaStyles = makeStyles((theme) => ({
  myInputText: {
    width: "6vw",
    height: "2.4vw",
    fontSize: "2vw",
    margin: "0.5vw",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      width: "12vw",
      height: "4.8vw",
      fontSize: "4vw",
    },
  },
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  leftRow: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    overflow: 'auto',
  },
  fractionColumn: {
    alignItems: 'center',
  },
  integerInput: {
    width: "4vw",
    height: "4vw",
    fontSize: "1.7vw",
    minWidth: "4vw",
  },
  commonInput: {
    width: "5.5vw",
    height: "3vw",
    fontSize: "1.5vw",
    minWidth: "5.5vw",
  },
  smallInput: {
    width: "4vw",
    height: "2vw",
    fontSize: "1vw",
    minWidth: "4vw",
  },
  operatorInput: {
    borderRadius: "6vw",
    width: "4vw",
    height: "4vw",
    minWidth: "1vw",
    fontSize: "1.7vw",
    marginRight: "0.3vw",
  },
  fractionLineBox: {
    width: "6vw",
    height: "0.01vw",
    padding: "0vw",
    margin: "0.3vw",
    minWidth: "6vw",
  },
  [theme.breakpoints.down("sm")]: {
    integerInput: {
      width: "6vw",
      height: "8vw",
      fontSize: "3vw",
      minWidth: "6vw",
    },
    commonInput: {
      width: "8vw",
      height: "6vw",
      fontSize: "2.6vw",
      minWidth: "8vw",
    },
    smallInput: {
      width: "6vw",
      height: "4vw",
      fontSize: "2vw",
      minWidth: "6vw",
    },
    operatorInput: {
      borderRadius: "8vw",
      width: "6vw",
      height: "6vw",
      minWidth: "2vw",
      fontSize: "3vw",
      marginRight: "0.4vw",
    },
    fractionLineBox: {
      width: "10vw",
      height: "0.02vw",
      padding: "0vw",
      margin: "0.4vw",
      minWidth: "8vw",
    },
  },

}));

export const FractionFormula = ({ handlePartClick, formula, learningToolIndex, positionIndex, partIndex, showSmallInput, isFocusedLine, calculationStage, lineIndex }) => {

  const classes = fractionFormulaStyles();
  
  return (
    <Grid className={classes.leftRow}>

      {
        formula.map((fraction, index) => {
          return <>
            {
              index != 0 && <Button
                variant="outlined"
                style={(isFocusedLine && positionIndex == index && partIndex == 0) ? { backgroundColor: myTheme.color.myPink, color: myTheme.color.myRed } : { backgroundColor: myTheme.color.myWhite, color: myTheme.color.myBlue }}
                className={classes.operatorInput}
                onClick={e => { handlePartClick(e, index, 0) }}
              >
                {fraction[0]}
              </Button>
            }
            {
              (learningToolIndex == 1 || (calculationStage > 1 && lineIndex > 0)) && <Button
                variant="outlined"
                style={(isFocusedLine && positionIndex == index && partIndex == 1) ? { backgroundColor: myTheme.color.myPink, color: myTheme.color.myRed } : { backgroundColor: myTheme.color.myWhite, color: myTheme.color.myBlue }}
                className={classes.integerInput}
                onClick={e => { handlePartClick(e, index, 1) }}
              >
                {fraction[1] == 0? "": fraction[1]}
              </Button>
            }
            <Grid container direction="column" className={classes.fractionColumn}>
              {
                showSmallInput && <Button
                  variant="outlined"
                  style={(isFocusedLine && positionIndex == index && partIndex == 2) ? { backgroundColor: myTheme.color.myPink, color: myTheme.color.myRed } : { backgroundColor: myTheme.color.myWhite, color: myTheme.color.myBlue }}
                  className={classes.smallInput}
                  onClick={e => { handlePartClick(e, index, 2) }}
                >
                  {fraction[2] == 0? "": fraction[2]}
                </Button>
              }
              <Button
                variant="outlined"
                style={(isFocusedLine && positionIndex == index && partIndex == 3) ? { backgroundColor: myTheme.color.myPink, color: myTheme.color.myRed } : { backgroundColor: myTheme.color.myWhite, color: myTheme.color.myBlue }}
                className={classes.commonInput}
                onClick={e => { handlePartClick(e, index, 3) }}
              >
                {fraction[3] == 0? "": fraction[3]}
              </Button>
              <Box
                borderBottom={3}
                className={classes.fractionLineBox}
              />
              <Button
                variant="outlined"
                style={(isFocusedLine && positionIndex == index && partIndex == 4) ? { backgroundColor: myTheme.color.myPink, color: myTheme.color.myRed } : { backgroundColor: myTheme.color.myWhite, color: myTheme.color.myBlue }}
                className={classes.commonInput}
                onClick={e => { handlePartClick(e, index, 4) }}
              >
                {fraction[4] == 0? "": fraction[4]}
              </Button>
              {
                showSmallInput && <Button
                  variant="outlined"
                  style={(isFocusedLine && positionIndex == index && partIndex == 5) ? { backgroundColor: myTheme.color.myPink, color: myTheme.color.myRed } : { backgroundColor: myTheme.color.myWhite, color: myTheme.color.myBlue }}
                  className={classes.smallInput}
                  onClick={e => { handlePartClick(e, index, 5) }}
                >
                  {fraction[5] == 0? "": fraction[5]}
                </Button>
              }
            </Grid>
          </>
        })
      }

    </Grid>
  )
}

