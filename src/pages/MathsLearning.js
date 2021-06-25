import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { HeadingSelect } from "../components/MathsLearningComponents";
import { FractionMultiplyDivide } from "./FractionMultiplyDivide";
import { withStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
import constants from "../constants/MathsLearningConstants";
import pic1 from "../assets/cross5.jpg";
import pic2 from "../assets/cross6.jpg";
import pic3 from "../assets/neighbor1.jpg";
import prayerImage from "../assets/prayer4.jpg";
import { FreeBreakfast } from "@material-ui/icons";

const mathsLearningStyle = (theme) => ({
  mathsLearningContainer: {
    margin: "1vw",
    minHeight: "97vh",
    backgroundImage: myTheme.color.skyGradient
  },
  headingContainer: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  scriptureVerseRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  scriptureVerseBorder: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80vw",
    borderWidth: "0.5vw",
    borderImage: myTheme.color.conicGradient,
    border: "solid",
    [theme.breakpoints.down("sm")]: {
      width: "95vw"
    }
  },
  scriptureImage: {
    height: "8vw",
    padding: "0.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "20vw"
    }
  },
  scriptureVerse: {
    width: "70vw",
    fontSize: "2vw",
    color: myTheme.color.myPurple,
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      fontSize: "4vw"
    }
  },
  prayerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  prayerImage: {
    height: "6vw",
    padding: "0.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "12vw"
    }
  },
  prayerText: {
    width: "60vw",
    fontSize: "2vw",
    color: myTheme.color.myPurple,
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      fontSize: "4vw"
    }
  },
  commonText: {
    fontSize: "1.4vw",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.8vw"
    }
  },
  emailText: {
    width: "92vw",
    textAlign: "right",
    fontSize: "1.5vw",
    color: myTheme.color.myBrown,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3vw"
    }
  }
});

function MathsLearning(props) {
  const [languageIndex, setLanguageIndex] = useState(2); //0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState(0); //0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState(0); //*** */
  const [learningToolIndex, setLearningToolIndex] = useState(0);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState(0);
  const [isLogined, setIsLogined] = useState(false);
  const [unitIndex, setUnitIndex] = useState(0); //(0:M&D, 1:A&S, 2:MixWithBrackets)
  const [examIndex, setExamIndex] = useState(-1); //(0: no, 1: yes)
  const [indexArray, setIndexArray] = useState([2, 0, 0, 0, 0, -1]); //[languageIndex, bibleVersionIndex, topicIndex, learningToolIndex, unitIndex, examIndex]

  const numberOfBibleVersions = 2;
  const numberOfTopics = [3, 3, 2];
  const numberOfLearningTools = 2;
  const numberOfScriptureVerses = 3;
  const numberOfUnits = 3;
  const scriptureImages = [pic1, pic2, pic3];

  const {
    languages,
    bibleVersions,
    bibleVersionsQuestion,
    topics,
    topicsQuestion,
    learningTools,
    learningToolsQuestion,
    scriptureVerses,
    prayers,
    noticificationText,
    applicationHint
  } = constants;

  useEffect(() => {//*** */
    setIndexArray(prev => [languageIndex, bibleVersionIndex, topicIndex, learningToolIndex, prev[4], prev[5]]);
  }, [languageIndex, bibleVersionIndex, topicIndex, learningToolIndex])

  useEffect(() => {
    const queryString = props.location.search;
    const urlParams = new URLSearchParams(queryString);
    let lang = 2;
    let ver = 0;
    let topic = 0;
    let tool = 0;
    let unit = 0;
    let exam = 0;
    if (
      urlParams.get("lang") != null &&
      urlParams.get("lang") != "" &&
      urlParams.get("lang") >= 0 &&
      urlParams.get("lang") < 4
    ) {
      //*** */setLanguageIndex(parseInt(urlParams.get("lang")));
      lang = parseInt(urlParams.get("lang"), 10);
    }
    if (
      urlParams.get("ver") != null &&
      urlParams.get("ver") != "" &&
      urlParams.get("ver") >= 0 &&
      urlParams.get("ver") < numberOfBibleVersions
    ) {
      //*** */setBibleVersionIndex(parseInt(urlParams.get("ver")));
      ver = parseInt(urlParams.get("ver"), 10);
    }
    if (
      urlParams.get("unit") != null &&
      urlParams.get("unit") != "" &&
      urlParams.get("unit") >= 0 &&
      urlParams.get("unit") < numberOfUnits
    ) {
      //*** */setUnitIndex(parseInt(urlParams.get("unit")));
      unit = parseInt(urlParams.get("unit"), 10);
    }
    if (
      urlParams.get("exam") != null &&
      urlParams.get("exam") != "" &&
      urlParams.get("exam") >= 0 &&
      urlParams.get("exam") < 2
    ) {
      //*** */setExamIndex(parseInt(urlParams.get("exam")));
      exam = parseInt(urlParams.get("exam"), 10);
    }
    setIndexArray([lang, ver, topic, tool, unit, exam]);
    setScriptureVerseIndex(Math.floor(Math.random() * numberOfScriptureVerses));
  }, []);

  const { classes } = props;

  return (
    <Grid className={classes.mathsLearningContainer}>
      <Grid container className={classes.headingContainer}>
        <HeadingSelect
          selectLabel="Language"
          selectIndex={indexArray[0]} //*** */languageIndex}
          setItemIndex={setLanguageIndex}
          itemsArray={languages}
        />
        <HeadingSelect
          selectLabel={bibleVersionsQuestion[indexArray[0]]} //*** */languageIndex]}
          selectIndex={indexArray[1]}//*** */bibleVersionIndex}
          setItemIndex={setBibleVersionIndex}
          itemsArray={bibleVersions.slice(
            /*languageIndex*/ indexArray[0] * numberOfBibleVersions,
            /*languageIndex*/ indexArray[0] * numberOfBibleVersions + numberOfBibleVersions
          )}
        />
        <HeadingSelect
          selectLabel={topicsQuestion[indexArray[0]]} //*** */languageIndex]}
          selectIndex={topicIndex}
          setItemIndex={setTopicIndex}
          itemsArray={topics[indexArray[4]].slice(
            /*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]],
            /*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]] +
              numberOfTopics[indexArray[4]]
          )}
        />
        <HeadingSelect
          selectLabel={learningToolsQuestion[indexArray[0]]}//*** */languageIndex]}
          selectIndex={learningToolIndex}
          setItemIndex={setLearningToolIndex}
          itemsArray={learningTools.slice(
            (/*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]] + topicIndex) *
              numberOfLearningTools,
            (/*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]] + topicIndex + 1) *
              numberOfLearningTools
          )}
        />
      </Grid>
      <Grid className={classes.scriptureVerseRow}>
        <Grid className={classes.scriptureVerseBorder} border={1}>
          <img
            className={classes.scriptureImage}
            alt="scripture"
            src={scriptureImages[scriptureVerseIndex]}
          />
          <Typography className={classes.scriptureVerse}>
            {
              scriptureVerses[
                (/*languageIndex*/indexArray[0] * numberOfBibleVersions + indexArray[1]) *
                  numberOfScriptureVerses +
                  scriptureVerseIndex
              ]
            }
          </Typography>
        </Grid>
      </Grid>
      {indexArray[5] > -1 && ( //*** */
        <FractionMultiplyDivide
          languageIndex={indexArray[0]} //*** */languageIndex}
          bibleVersionIndex={indexArray[1]} //*** */bibleVersionIndex}
          topic={
            topics[indexArray[4]][ //*** */unitIndex][
              indexArray[0] * numberOfTopics[indexArray[4]] + indexArray[2]//*** */languageIndex * numberOfTopics[unitIndex] + topicIndex
            ]
          }
          learningTool={
            learningTools[
              (indexArray[0] * numberOfTopics[indexArray[4]] + indexArray[2]) * //*** */(languageIndex * numberOfTopics[unitIndex] + topicIndex) *
                numberOfLearningTools +
                indexArray[3] //*** */learningToolIndex
            ]
          }
          topicToolIndex={{
            topicIndex: indexArray[2], //*** */topicIndex,
            learningToolIndex: indexArray[3] //*** */learningToolIndex
          }}
          isLogined={isLogined}
          setIsLogined={setIsLogined}
          unitIndex={indexArray[4]} //*** */unitIndex}
          examIndex={indexArray[5]} //*** */examIndex}
        />
      )}
      <Grid className={classes.prayerRow}>
        <img className={classes.prayerImage} src={prayerImage} />
        <Typography className={classes.prayerText}>
          {prayers[indexArray[0]]} 
        </Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>
          {applicationHint[indexArray[0]]}
        </Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>
          {noticificationText[indexArray[0]]}
        </Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText}>
          samsoncsyuapple@gmail.com
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(mathsLearningStyle)(MathsLearning);
