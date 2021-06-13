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
    alignItems: "center",
  },
  logoutButton: {
    color: myTheme.color.myWhite,
    backgroundColor: myTheme.color.myBlue,
    height: "3.5vw",
    fontSize: "2.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "4.9vw",
      fontSize: "3.5vw",
    },
  },
}));

export const TextQuestion = ({ textQuestion, setIsLogined }) => {
  const [ logoutButtonStage, setLogoutButtonStage ] = useState("unclick");
  const textQestionArray = textQuestion.split("^"); //

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
      <Typography className={classes.questionText}>
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
        onClick={() => {clickLogoutButton()}}
      >
        { logoutButtonStage === "unclick" ? "Logout" : "Sure?"}
      </Button>
    </Grid>
    
  );
};