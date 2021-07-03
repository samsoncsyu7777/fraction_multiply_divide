import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { theme as myTheme } from "../themes/theme";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { makeStyles } from "@material-ui/core/styles";

const textQuestionStyles = makeStyles((theme) => ({
  questionText: {
    width: "70vw",
    fontSize: "2.2vw",
    margin: "0.5vw",
    textAlign: "left",
    lineHeight: "270%",
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      fontSize: "4.0vw",
    },
  },
  centerRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    color: myTheme.color.myWhite,
    backgroundColor: myTheme.color.myBlue,    
    height: "4vw",
    width: "7vw",
    fontSize: "1.3vw",
    [theme.breakpoints.down("xs")]: {
      height: "8vw",
      width: "14vw",
      fontSize: "2.6vw",
    }
  },
}));

export const TextQuestion = ({ textQuestion, setIsLogined, languageIndex, setErrorMessageArray, setExamCompleted }) => {
  const [logoutButtonStage, setLogoutButtonStage] = useState("unclick");
  const textQestionArray = textQuestion.split("^"); //
  const logoutText = ["登出", "登出", "Logout", "Logout"];
  const sureText = ["確定?", "确定?", "Sure?", "Sûre?"];

  const clickLogoutButton = () => {
    if (logoutButtonStage === "unclick") {
      setLogoutButtonStage("clicked");
    } else if (logoutButtonStage === "clicked") {
      setErrorMessageArray([]);
      setExamCompleted(false);
      setIsLogined(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (logoutButtonStage === "clicked") {
        setLogoutButtonStage("unclick");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [logoutButtonStage]);

  const classes = textQuestionStyles();

  return (
    <Grid>      
      <Grid className={classes.centerRow}>
        <Typography className={classes.questionText} style={{ whiteSpace: 'pre-line' }}>
          {textQestionArray.map((text, index) => {
            return index % 2 === 0 ? (
              <span key={index}>{text}</span>
            ) : (
              <InlineMath key={index}>{text}</InlineMath>
            );
          })}
        </Typography>        
      </Grid>
    </Grid>
  );
};