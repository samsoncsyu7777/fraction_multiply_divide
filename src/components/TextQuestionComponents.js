import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { theme as myTheme } from "../themes/theme";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { makeStyles } from "@material-ui/core/styles";

const textQuestionStyles = makeStyles((theme) => ({
  questionText: {
    width: "70vw",
    //height: "2.4vw",
    fontSize: "3vw",
    margin: "0.5vw",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      //height: "4.8vw",
      fontSize: "4.5vw",
    },
  },
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const TextQuestion = ({ textQuestion }) => {
  const textQestionArray = textQuestion.split("^"); //

  const classes = textQuestionStyles();

  return (
    <Grid className={classes.centerRow}>
      <Typography className={classes.questionText}>
        {textQestionArray.map((text, index) => {
          return index % 2 === 0 ? (
            <span key={index}>{text}</span>
          ) : (
            <InlineMath key={index}>{text}</InlineMath>
          );
        })}
      </Typography>
    </Grid>
    
  );
};