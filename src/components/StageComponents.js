import React from "react";
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
const stageButtonsStyles = makeStyles((theme) =>
  createStyles({
    centerRow: {
      display: "flex",
      justifyContent: "center",
    },
    verticalCenterRow: {
      display: "flex",
      alignItems: "center",
    },
    stageText: {
      fontSize: "1.6vw",
      color: myTheme.color.myBlue,
      [theme.breakpoints.down("xs")]: {
        fontSize: "3.2vw",
      },
    },
    buttonText: {
      fontSize: "1.6vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3.2vw",
      },
    },
    stageButton: {
      width: "4.5vw",
      minWidth: "4.5vw",
      [theme.breakpoints.down("xs")]: {
        width: "8vw",
        minWidth: "8vw",
      },
    },
  })
);

export const StageButtons = ({
  stageText,
  stages,
  handleStageClick,
  stageState,
  manual,
  exam,
  leaderboard,
  examIndex,
  uploadTotalScore,
}) => {
  const classes = stageButtonsStyles();
  const buttonsInLine = 7;
  let linesOfStages = [0];
  if (stages.length > buttonsInLine) {
    linesOfStages.push(1);
  }
  return (
    <Grid>
      <Grid
        container
        className={`${classes.centerRow} ${classes.verticalCenterRow}`}
      >
        <Typography className={classes.stageText}>{stageText}</Typography>
        {linesOfStages.map((line, lineIndex) => {
          return <ButtonGroup key={line} size="small" color="primary" aria-label="outlined primary button group">
          {stages.map((stage, index) => {
            let color =
              stageState === parseInt(stage) ? "secondary" : "primary";
            let bgColor =
              stageState === parseInt(stage) ? myTheme.color.myYellow : "";
            return (
              index >= line * buttonsInLine && index < (line + 1) * buttonsInLine && <Button
                key={parseInt(stage)}
                className={`${classes.buttonText} ${classes.stageButton}`}
                color={color}
                style={{ backgroundColor: bgColor/*, height: 45*/ }}
                onClick={() => handleStageClick(parseInt(stage))}
              >
                {parseInt(stage) + 1}
              </Button>
            );
          })}
        </ButtonGroup>
        })}
        {examIndex === 0 && <Button
          size="small"
          variant="outlined"
          className={classes.buttonText}
          color={stageState === -1 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -1 ? myTheme.color.myYellow : "",
            textTransform: 'capitalize'
            //height: 45
          }}
          onClick={() => handleStageClick(-1)}
        >
          {manual}
        </Button>}
        {examIndex === 1 && <Button
          size="small"
          variant="outlined"
          className={classes.buttonText}
          color={stageState === -2 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -2 ? myTheme.color.myYellow : "",
            textTransform: 'capitalize'
            //height: 45
          }}
          onClick={() => handleStageClick(-2)}
        >
          {exam}
        </Button>}
        <Button
          size="small"
          variant="outlined"
          className={classes.buttonText}
          color={stageState === -3 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -3 ? myTheme.color.myYellow : "",
            textTransform: 'capitalize'
            //height: 45
          }}
          onClick={() => handleStageClick(-3)}
        >
          {leaderboard}
        </Button>
        <Button
          size="small"
          variant="outlined"
          className={classes.buttonText}
          color={stageState === -4 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -4 ? myTheme.color.myYellow : "",
            textTransform: 'capitalize'
            //height: 45
          }}
          onClick={() => handleStageClick(-4)}
        >
          {uploadTotalScore}
        </Button>
      </Grid>
    </Grid>
  );
};
