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
      fontSize: 20,
      color: myTheme.color.myBlue,
    },
    buttonText: {
      fontSize: 20,
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
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
  exam
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
                color={color}
                style={{ backgroundColor: bgColor, height: 45 }}
                onClick={() => handleStageClick(parseInt(stage))}
              >
                {parseInt(stage) + 1}
              </Button>
            );
          })}
        </ButtonGroup>
        })}
        <Button
          size="small"
          variant="outlined"
          className={classes.buttonText}
          color={stageState === -1 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -1 ? myTheme.color.myYellow : "",
            height: 45
          }}
          onClick={() => handleStageClick(-1)}
        >
          {manual}
        </Button>
        <Button
          size="small"
          variant="outlined"
          className={classes.buttonText}
          color={stageState === -2 ? "secondary" : "primary"}
          style={{
            backgroundColor: stageState === -2 ? myTheme.color.myYellow : "",
            height: 45
          }}
          onClick={() => handleStageClick(-2)}
        >
          {exam}
        </Button>
      </Grid>
    </Grid>
  );
};
