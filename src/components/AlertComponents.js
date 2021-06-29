import React from "react";
import {
  Snackbar,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { InlineMath, /*BlockMath*/ } from "react-katex";

import { theme as myTheme } from "../themes/theme";

const alertSnackbarStyles = makeStyles((theme) => ({
  alert: {
    fontSize: "2vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AlertSnackbar = ({ open, closeAlert, errorMessage, severity }) => {
  const classes = alertSnackbarStyles();
  console.log(errorMessage)
  const errorMessageArray = errorMessage.split("^"); //

  return (
    <Snackbar
      open={open}
      autoHideDuration={16000}
      onClose={closeAlert}
    >
      <Alert
        className={classes.alert}
        onClose={closeAlert}
        severity={severity}
      >
        <Typography 
        className={classes.alert} 
        style={{whiteSpace: 'pre-line'}}
        >
        {errorMessageArray.map((text, index) => {
          return index % 2 === 0 ? (
            <span key={index}>{text}</span>
          ) : (
            <InlineMath key={index}>{text}</InlineMath>
          );
        })}
      </Typography>
      </Alert>
    </Snackbar>
  );
};

        /*<div>{errorMessage}</div>*/
