import React from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { includes } from "../functions/CommonFunctions";

import { theme as myTheme } from "../themes/theme";

const myKeypadStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  keypadKey: {
    width: "4vw",
    height: "4vw",
    fontSize: "2vw",
    minWidth: "1vw",
    [theme.breakpoints.down("xs")]: {
      width: "8vw",
      height: "8vw",
      fontSize: "4vw",
    },
  },
}));

export const MyKeypad = ({ handleClick, type, decimalFractionStage }) => {
  let keypadTexts = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const keypadColors = [myTheme.color.red, myTheme.color.orange, myTheme.color.yellow, myTheme.color.lime, myTheme.color.green, myTheme.color.cyan, myTheme.color.blue, myTheme.color.purple];
  var randomIndex = Math.floor(Math.random() * keypadColors.length);
  
  keypadTexts.push("+");
  keypadTexts.push("-");
  keypadTexts.push("×");
  keypadTexts.push("÷");
  if (type != undefined && includes(type, "ecimal")) {
    keypadTexts.push(".");
  }
  if (type != undefined && includes(type, "Fraction")) {
    switch(decimalFractionStage) {
      case 0: keypadTexts.push("?/2"); break;
      case 1: keypadTexts.push("1/?"); break;
      case 2: keypadTexts.push("OK"); break;
      default: break;
    }
  }
  if (type != undefined && includes(type, "%")) {
    keypadTexts.push("%");
  }
  if (type != undefined && (includes(type, "decimal") || includes(type, "integer"))) {
    keypadTexts.push("(");
    keypadTexts.push(")");
  }
  keypadTexts.push("<-");
  if (type === "MC") {
    keypadTexts = ["A", "B", "C", "D"];
  }
  const classes = myKeypadStyles();

  return (
    <>
      <Grid className={classes.centerRow}>
        {
          keypadTexts.map((key, index) => {
            if (index < parseInt(keypadTexts.length / 2)) {
              return <Button
                key={index}
                className={classes.keypadKey}
                value={key}
                variant="contained"
                style={{
                  color: myTheme.color.myBlack,
                  backgroundColor: keypadColors[(index + randomIndex) % keypadColors.length]
                }}
                onClick={e => { handleClick(e, key) }}
              >{key}</Button>
            }
          })
        }
      </Grid>
      <Grid className={classes.centerRow}>
        {
          keypadTexts.map((key, index) => {
            if (index > parseInt(keypadTexts.length / 2) - 1) {
              return <Button
                key={index}
                className={classes.keypadKey}
                value={key}
                variant="contained"
                style={{
                  color: myTheme.color.myBlack,
                  backgroundColor: keypadColors[(index + randomIndex + 5) % keypadColors.length]
                }}
                onClick={e => { handleClick(e, key) }}
              >{key}</Button>
            }
          })
        }
      </Grid>
    </>
  )
}

