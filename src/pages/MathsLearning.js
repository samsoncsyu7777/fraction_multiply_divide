import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
} from "@material-ui/core";
import {
  HeadingSelect,
} from "../components/MathsLearningComponents";
import {
  FractionMultiplyDivide,
} from "./FractionMultiplyDivide";
import { withStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
import constants from "../constants/MathsLearningConstants";
import pic1 from "../assets/cross5.jpg";
import pic2 from "../assets/cross6.jpg";
import pic3 from "../assets/neighbor1.jpg";
import prayerImage from "../assets/prayer4.jpg";

const mathsLearningStyle = (theme) => ({
  mathsLearningContainer: {
    margin: "1vw",
    minHeight: "97vh",
    backgroundImage: myTheme.color.skyGradient,
  },
  headingContainer: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scriptureVerseRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
      width: "95vw",
    },
  },
  scriptureImage: {
    height: "8vw",
    padding: "0.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "20vw",
    },
  },
  scriptureVerse: {
    width: "70vw",
    fontSize: "2vw",
    color: myTheme.color.myPurple,
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
      fontSize: "4vw",
    },
  },
  prayerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  prayerImage: {
    height: "6vw",    
    padding: "0.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "12vw",
    },
  },
  prayerText: {
    width: "60vw",
    fontSize: "2vw",
    color: myTheme.color.myPurple,
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      fontSize: "4vw",
    },
  },
  commonText: {
    fontSize: "1.4vw",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.8vw",
    },
  },
  emailText: {
    width: "92vw",
    textAlign: "right",
    fontSize: "1.5vw",
    color: myTheme.color.myBrown,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3vw",
    },
  }
});

function MathsLearning(props) {
  const [languageIndex, setLanguageIndex] = useState(2);//0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState(0);//0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState(0);
  const [learningToolIndex, setLearningToolIndex] = useState(0);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState(0);
  const [isLogined, setIsLogined] = useState(false);
  const [unitIndex, setUnitIndex] = useState(0);//(0:M&D, 1:A&S, 2:MixWithBrackets)
  const [examIndex, setExamIndex] = useState(0);//(0: no, 1: yes)


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
    applicationHint,
  } = constants;

  useEffect(() => {
    const queryString = props.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("lang") != null && urlParams.get("lang") != "" && urlParams.get("lang") >= 0 && urlParams.get("lang") < 4) {
      setLanguageIndex(parseInt(urlParams.get("lang")));
    } 
    if (urlParams.get("ver") != null && urlParams.get("ver") != "" && urlParams.get("ver") >= 0 && urlParams.get("ver") < numberOfBibleVersions) {
      setBibleVersionIndex(parseInt(urlParams.get("ver")));
    }
    if (urlParams.get("unit") != null && urlParams.get("unit") != "" && urlParams.get("unit") >= 0 && urlParams.get("unit") < numberOfUnits) {
      setUnitIndex(parseInt(urlParams.get("unit")));
    } 
    if (urlParams.get("exam") != null && urlParams.get("exam") != "" && urlParams.get("exam") >= 0 && urlParams.get("exam") < 2) {
      setExamIndex(parseInt(urlParams.get("exam")));
    }
    setScriptureVerseIndex(Math.floor(Math.random() * numberOfScriptureVerses));
  }, []);

  const { classes } = props;

  return (
    <Grid className={classes.mathsLearningContainer} >
      <Grid container className={classes.headingContainer}>
        <HeadingSelect
          selectLabel="Language"
          selectIndex={languageIndex}
          setItemIndex={setLanguageIndex}
          itemsArray={languages}
        />
        <HeadingSelect
          selectLabel={bibleVersionsQuestion[languageIndex]}
          selectIndex={bibleVersionIndex}
          setItemIndex={setBibleVersionIndex}
          itemsArray={bibleVersions.slice(languageIndex * numberOfBibleVersions, languageIndex * numberOfBibleVersions + numberOfBibleVersions)}
        />
        <HeadingSelect
          selectLabel={topicsQuestion[languageIndex]}
          selectIndex={topicIndex}
          setItemIndex={setTopicIndex}
          itemsArray={topics[unitIndex].slice(languageIndex * numberOfTopics[unitIndex], languageIndex * numberOfTopics[unitIndex] + numberOfTopics[unitIndex])}
        />
        <HeadingSelect
          selectLabel={learningToolsQuestion[languageIndex]}
          selectIndex={learningToolIndex}
          setItemIndex={setLearningToolIndex}
          itemsArray={learningTools.slice((languageIndex * numberOfTopics[unitIndex] + topicIndex) * numberOfLearningTools, (languageIndex * numberOfTopics[unitIndex] + topicIndex + 1) * numberOfLearningTools)}
        />
      </Grid>
      <Grid className={classes.scriptureVerseRow} >
        <Grid className={classes.scriptureVerseBorder} border={1}>
          <img className={classes.scriptureImage} alt="scripture" src={scriptureImages[scriptureVerseIndex]} />
          <Typography className={classes.scriptureVerse}>{scriptureVerses[(languageIndex * numberOfBibleVersions + bibleVersionIndex) * numberOfScriptureVerses + scriptureVerseIndex]}</Typography>
        </Grid>
      </Grid>
      <FractionMultiplyDivide
        languageIndex={languageIndex}
        bibleVersionIndex={bibleVersionIndex}
        topic={topics[unitIndex][languageIndex * numberOfTopics[unitIndex] + topicIndex]}
        learningTool={learningTools[(languageIndex * numberOfTopics[unitIndex] + topicIndex) * numberOfLearningTools + learningToolIndex]}
        topicToolIndex={{topicIndex: topicIndex, learningToolIndex: learningToolIndex}}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
        unitIndex={unitIndex}
        examIndex={examIndex}
      />
      <Grid className={classes.prayerRow}>
        <img className={classes.prayerImage} src={prayerImage} />
        <Typography className={classes.prayerText}>{prayers[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>{applicationHint[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.prayerRow}>
        <Typography className={classes.commonText}>{noticificationText[languageIndex]}</Typography>
      </Grid>
      <Grid className={classes.emailRow}>
        <Typography className={classes.emailText}>samsoncsyuapple@gmail.com</Typography>
      </Grid>
    </Grid>
  );

}

export default withStyles(mathsLearningStyle)(MathsLearning);