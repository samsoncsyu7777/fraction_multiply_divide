import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const uploadScoreStyles = makeStyles((theme) =>
  createStyles({
    centerRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",      
    },
    leftRow: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start",
      }
    },
    marginLeft: {      
      width: "66vw",
      marginLeft: "14vw",
      [theme.breakpoints.down("xs")]: {
        width: "84vw",
        marginLeft: "6vw",
      },
    },   
    margin: {
      marginTop: "2vh",
      marginBottom: "2vh"
    },
    marginTop: {
      marginTop: "2vh"
    },
    login: {
      fontSize: "2vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "4vw"
      }
    },
    input: {
      width: "35vw",
      height: 28,
      fontSize: 16,
      [theme.breakpoints.down("xs")]: {
        width: "70vw",
        height: 20,
        fontSize: 12
      }
    },
    loginButton: {      
      color: myTheme.color.myWhite,
      backgroundColor: myTheme.color.myBlue,
      height: "4vw",
      width: "7vw",
      fontSize: "1.3vw",
      [theme.breakpoints.down("xs")]: {
        height: "8vw",
        width: "14vw",
        fontSize: "2.6vw",
      },
    },
    waitingText: {
      fontSize: 20,
      color: myTheme.color.myBrown,
      [theme.breakpoints.down("xs")]: {
        fontSize: 12
      }
    },
  })
);

export const UploadScore = ({
  languageIndex,
  scoreTotalForUnit,
  setStageOrder,
  handleSetError,
  unitTitle,
  setScoreTotalForUnit
}) => {
  const [firstLastName, setFirstLastName] = useState("");
  const [email, setEmail] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [showCircular, setShowCircular] = useState(false);

  const nameText = ["學生姓名", "学生姓名", "Student First and Last Name", "Nom et prénom de l'étudiant"];
  const emailText = ["學生電郵", "学生电邮", "Student Email", "Courriel de l'étudiant"];
  const groupText = ["所屬群組", "所属群组", "Group Belonged", "Groupe appartenait"];
  const groupIntroduction = [
    "請跟據老師的指示，填上所屬群組的獨特名稱。",
    "请跟据老师的指示，填上所属群组的独特名称。",
    "Please follow the teacher’s instructions and fill in the unique name of the group you belong to.",
    "Veuillez suivre les instructions de l'enseignant et indiquer le nom unique du groupe auquel vous appartenez."
  ];
  const submitText = ["遞交", "递交", "Submit", "Soumettre"];
  const failUploadMsg = ["網絡繁忙，未能成功遞交，請再嘗試。", "网络繁忙，未能成功递交，请再尝试。", "The network is busy and the submission failed. Please try again.", "Le réseau est occupé et la soumission a échoué. Veuillez réessayer."]
  const smallNewScoreMsg = ["新總分比原有總分少，所以未能遞交。", "新总分比原有总分少，所以未能递交。", "The new total score is less than the original total score, so it cannot be submitted.", "Le nouveau score total est inférieur au score total d'origine, il ne peut donc pas être soumis."]
  const noName = ["請填寫姓名。", "请填写姓名。", "Please fill in your name.", "Veuillez remplir votre nom."];
  const noEmail = ["請填寫電郵地址。", "请填写电邮地址。", "Please fill in the email address.", "Veuillez remplir l'adresse e-mail."];
  const noScore = ["請先解答題目，獲得分數後再遞交新總分。", "请先解答题目，获得分数后再递交新总分。", "Please answer the questions first and submit the new total score after obtaining the score.", "Veuillez d'abord répondre aux questions et soumettre le nouveau score total après avoir obtenu le score."]
  const nameChange = (e) => {
    setFirstLastName(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const groupChange = (e) => {
    setGroupTitle(e.target.value);
  };

  const submit = () => {
    if (firstLastName === "") {
      handleSetError(noName[languageIndex]);
      return;
    }
    if (email === "") {
      handleSetError(noEmail[languageIndex]);
      return;
    }
    if (scoreTotalForUnit === 0) {
      handleSetError(noScore[languageIndex]);
      return;
    }
    setShowCircular(true);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.toLocaleString('default', { month: 'long' });
    console.log(month);
    async function fetchData() {
      await axios
        .post("https://u5xz7.sse.codesandbox.io/todos/uploadscore", {
          firstLastName: firstLastName,
          email: email,
          groupTitle: groupTitle,
          scoreTotalForUnit: scoreTotalForUnit,
          year: year,
          month: month,
          unit: unitTitle[2]
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.isUploadSuccess) {
            setScoreTotalForUnit(0);
            setStageOrder({ stage: -3, order: 0 });
          } else {
            if (response.data.reason === "smallNewScore") {
              handleSetError(smallNewScoreMsg[languageIndex]);//
            } else {
              handleSetError(failUploadMsg[languageIndex]);
            }
          }
          setShowCircular(false);
        });
    }
    fetchData();
  };

  const classes = uploadScoreStyles();

  return (
    <Grid>
      <Grid
        container
        className={`${classes.centerRow} `}
      >
        <Grid className={classes.centerColumn}>

          <Grid className={classes.marginLeft}>
            <Grid
              container
              className={`${classes.leftRow} ${classes.marginTop}`}
            >
              <Typography className={classes.login}>{nameText[languageIndex] + ": "}</Typography>
              <input
                className={classes.input}
                value={firstLastName}
                type="name"
                id="name"
                name="name"
                onChange={(e) => {
                  nameChange(e);
                }}
              />
            </Grid>
            <Grid
              container
              className={`${classes.leftRow} ${classes.marginTop}`}
            >
              <Typography className={classes.login}>{emailText[languageIndex] + ": "}</Typography>
              <input
                className={classes.input}
                value={email}
                type="email"
                id="email"
                name="email"
                onChange={(e) => {
                  emailChange(e);
                }}
              />
            </Grid>
            <Grid
              container
              className={`${classes.leftRow} ${classes.marginTop}`}
            >
              <Typography className={classes.login}>{groupText[languageIndex] + ": "}</Typography>
              <input
                className={classes.input}
                value={groupTitle}
                type="text"
                id="text"
                name="text"
                onChange={(e) => {
                  groupChange(e);
                }}
              />
            </Grid>

          </Grid>
          <Grid
            className={`${classes.centerRow} ${classes.margin}`}
          >
            <Button
              variant="contained"
              className={classes.loginButton}
              style={{ textTransform: 'capitalize' }}
              onClick={() => {
                submit();
              }}
            >
              {submitText[languageIndex]}
            </Button>
          </Grid>
          {showCircular && (
            <Grid
              container
              className={`${classes.centerRow} ${classes.margin}`}
            >
              <Typography className={classes.waitingText}>
                Uploading
              </Typography>
              <CircularProgress className={classes.waitingText} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
