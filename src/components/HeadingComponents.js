import React from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import constants from "../constants/MainControllerConstants";

import { theme as myTheme } from "../themes/theme";

const myFrameStyles = makeStyles((theme) => ({
  frame: {

  },
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  totalScore: {
    fontSize: "2.4vw",
    color: myTheme.color.myGreenBlue,
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.8vw",
    },
  },
  topic: {
    fontSize: "2.4vw",
    color: myTheme.color.myOrange,
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.8vw",
      textAlign: "center",
    },
  },
  learningTool: {
    fontSize: "1.6vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.2vw",
    },
  },
}));

export const MyFrame = (props) => {
  const classes = myFrameStyles();
  const { children, topic, learningTool, scoreTotalForUnit, languageIndex, unitTitle, unitIndex, ...otherProps } = props;
  const { totalScoreForUnit } = constants;

  return (
    <Grid className={classes.frame} {...otherProps}>
      <Grid className={classes.centerRow}>
        <Typography className={classes.totalScore}>{unitTitle[unitIndex][languageIndex] + " " + totalScoreForUnit[languageIndex] + ": " + scoreTotalForUnit}</Typography>
      </Grid>
      <Grid className={classes.centerRow}>
        <Typography className={classes.topic}>{topic}</Typography>
      </Grid>
      <Grid className={classes.centerRow}>
        <Typography className={classes.learningTool}>{learningTool}</Typography>
      </Grid>
      {children}
    </Grid>
  )
}