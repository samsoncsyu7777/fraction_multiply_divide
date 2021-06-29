import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { theme as myTheme } from "../themes/theme";
import "katex/dist/katex.min.css";
import { InlineMath, /*BlockMath*/ } from "react-katex";
import { makeStyles } from "@material-ui/core/styles";

const textQuestionStyles = makeStyles((theme) => ({
  questionText: {
    width: "70vw",
    //height: "2.4vw",
    fontSize: "2.2vw",
    margin: "0.5vw",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      //height: "4.8vw",
      fontSize: "3.2vw",
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
    /*height: "3.5vw",
    fontSize: "1.0vw",
    [theme.breakpoints.down("xs")]: {
      height: "4.9vw",
      fontSize: "2.6vw",
    },*/
    height: "4vw",
    width: "7vw",
    fontSize: "1.3vw",
    //margin: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "8vw",
      width: "14vw",
      fontSize: "2.6vw",
    }
  },
}));

export const TextQuestion = ({ textQuestion, setIsLogined }) => {
  const [ logoutButtonStage, setLogoutButtonStage ] = useState("unclick");
  //const textQestionArray = textQuestion.split("^"); //
  const textQestionArray = "12^1\\frac{1}{2},^".split("^"); //

  const clickLogoutButton = () => {
    if (logoutButtonStage === "unclick") {
      setLogoutButtonStage("clicked");
    } else if (logoutButtonStage === "clicked") {
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
    <Grid className={classes.centerRow}>
      <Typography className={classes.questionText} style={{whiteSpace: 'pre-line'}}>
        {textQestionArray.map((text, index) => {
          return index % 2 === 0 ? (
            <span key={index}>{text}</span>
          ) : (
            <InlineMath key={index}>{text}</InlineMath>
          );
        })}
      </Typography>
      <Button 
        variant="contained"
        className={classes.logoutButton}
        style={{textTransform: 'capitalize'}}
        onClick={() => {clickLogoutButton()}}
      >
        { logoutButtonStage === "unclick" ? "Logout" : "Sure?"}
      </Button>
    </Grid>
    
  );
};