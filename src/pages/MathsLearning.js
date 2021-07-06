import React, { useState, useEffect } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import { HeadingSelect } from "../components/MathsLearningComponents";
import { MainController } from "./MainController";
import { withStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
import constants from "../constants/MathsLearningConstants";
import pic1 from "../assets/cross5.jpg";
import pic2 from "../assets/cross6.jpg";
import pic3 from "../assets/neighbor1.jpg";
import pic4 from "../assets/egypt1.jpeg";
import pic5 from "../assets/jairusDaughter2.jpeg";
import pic6 from "../assets/love2.jpeg";
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
    width: "90vw",
    borderWidth: "0.3vw",
    borderImage: myTheme.color.conicGradient,
    border: "solid",
    [theme.breakpoints.down("xs")]: {
      width: "95vw"
    }
  },
  scriptureImage: {
    height: "4vw",
    padding: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "0vw"
    }
  },
  scriptureVerse: {
    width: "80vw",
    fontSize: "1.4vw",
    color: myTheme.color.myPurple,
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      fontSize: "2.6vw"
    }
  },
  prayerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2vh",
  },
  prayerImage: {
    height: "4vw",
    padding: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "8vw"
    }
  },
  prayerText: {
    width: "60vw",
    fontSize: "1.4vw",
    color: myTheme.color.myPurple,
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      fontSize: "2.8vw"
    }
  },
  commonText: {
    fontSize: "1.4vw",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.8vw"
    }
  },
  emailText: {
    width: "92vw",
    textAlign: "right",
    fontSize: "1.5vw",
    color: myTheme.color.myBrown,
    marginTop: "2vh",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3vw"
    }
  }
});

function MathsLearning(props) {
  const [languageIndex, setLanguageIndex] = useState(-1); //0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState(-1); //0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState(-1); //*** */
  const [learningToolIndex, setLearningToolIndex] = useState(-1);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState(0);
  const [isLogined, setIsLogined] = useState(false);
  const [unitIndex, setUnitIndex] = useState(0); //(0:M&D, 1:A&S, 2:MixWithBrackets)
  const [examIndex, setExamIndex] = useState(-1); //(0: no, 1: yes)
  const [indexArray, setIndexArray] = useState([2, 0, 0, 0, 0, -1]); //[languageIndex, bibleVersionIndex, topicIndex, learningToolIndex, unitIndex, examIndex]

  const numberOfBibleVersions = 2;
  const numberOfTopics = [3, 3, 2];
  const numberOfLearningTools = [2, 2, 2];
  const numberOfScriptureVerses = 6;
  const numberOfUnits = 3;
  const scriptureImages = [pic1, pic2, pic3, pic4, pic5, pic6];

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
    applicationHint,
    applicationHintIndex,
    topicIntroduction
  } = constants;

  useEffect(() => {//*** */
    setIndexArray(prev => [languageIndex, prev[1], prev[2], prev[3], prev[4], prev[5]]);
  }, [languageIndex]);

  useEffect(() => {//*** */
    setIndexArray(prev => [prev[0], bibleVersionIndex, prev[2], prev[3], prev[4], prev[5]]);
  }, [bibleVersionIndex]);

  useEffect(() => {//*** */
    setIndexArray(prev => [prev[0], prev[1], topicIndex, prev[3], prev[4], prev[5]]);
  }, [topicIndex]);

  useEffect(() => {//*** */
    setIndexArray(prev => [prev[0], prev[1], prev[2], learningToolIndex, prev[4], prev[5]]);
  }, [learningToolIndex]);

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
    if (
      urlParams.get("topic") != null &&
      urlParams.get("topic") != "" &&
      urlParams.get("topic") >= 0 &&
      urlParams.get("topic") < numberOfTopics[unit]
    ) {
      //*** */setLanguageIndex(parseInt(urlParams.get("lang")));
      topic = parseInt(urlParams.get("topic"), 10);
    }
    if (
      urlParams.get("tool") != null &&
      urlParams.get("tool") != "" &&
      urlParams.get("tool") >= 0 &&
      urlParams.get("tool") < numberOfLearningTools[unit]
    ) {
      //*** */setBibleVersionIndex(parseInt(urlParams.get("ver")));
      tool = parseInt(urlParams.get("tool"), 10);
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
          selectIndex={indexArray[2]}
          setItemIndex={setTopicIndex}
          itemsArray={topics[indexArray[4]].slice(
            /*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]],
            /*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]] +
              numberOfTopics[indexArray[4]]
          )}
        />
        {indexArray[5] > -1 && <HeadingSelect
          selectLabel={learningToolsQuestion[indexArray[0]]}//*** */languageIndex]}
          selectIndex={indexArray[3]}
          setItemIndex={setLearningToolIndex}
          itemsArray={learningTools[indexArray[4]].slice(
            (/*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]] + indexArray[2]) *
              numberOfLearningTools[indexArray[4]],
            (/*languageIndex*/indexArray[0] * numberOfTopics[indexArray[4]] + indexArray[2] + 1) *
              numberOfLearningTools[indexArray[4]]
          )}
        />}
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
        <MainController
          languageIndex={indexArray[0]} //*** */languageIndex}
          bibleVersionIndex={indexArray[1]} //*** */bibleVersionIndex}
          topic={
            topics[indexArray[4]][ //*** */unitIndex][
              indexArray[0] * numberOfTopics[indexArray[4]] + indexArray[2]//*** */languageIndex * numberOfTopics[unitIndex] + topicIndex
            ]
          }
          learningTool={
            learningTools[indexArray[4]][
              (indexArray[0] * numberOfTopics[indexArray[4]] + indexArray[2]) * //*** */(languageIndex * numberOfTopics[unitIndex] + topicIndex) *
                numberOfLearningTools[indexArray[4]] +
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
          indexArray={indexArray}
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
          {applicationHint[applicationHintIndex[indexArray[4]]][indexArray[0]]}
        </Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>
          {topicIntroduction[indexArray[0]]}
        </Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>
          {noticificationText[indexArray[0]]}
        </Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText} >
          <Link href="mailto:samsoncsyuapple@gmail.com">
          samsoncsyuapple@gmail.com
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(mathsLearningStyle)(MathsLearning);
