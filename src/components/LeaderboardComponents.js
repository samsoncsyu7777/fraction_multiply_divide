import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";
import { LeaderboardTable } from "./LeaderboardTableComponents";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const leaderboardStyles = makeStyles((theme) =>
  createStyles({
    centerRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    centerColumn: {
      
    },
    leftRow: {
      display: "flex",
      alignItems: "center",//"flex-start",
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
    enquiryText: {
      fontSize: "2vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "4vw"
      }
    },
    input: {
      width: "35vw",
      height: "2.4vw",
      fontSize: "1.6vw",
      [theme.breakpoints.down("xs")]: {
        width: "70vw",
        height: "4.8vw",
        fontSize: "3.2vw",
      }
    },
    submitButton: {
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
    introduction: {
      color: myTheme.color.myGreenBlue,
      fontSize: "1.5vw",
      margin: "1vw",
      width: "78vw",
      [theme.breakpoints.down("xs")]: {
        fontSize: "3.0vw",
        width: "88vw",
      }
    }
  })
);

export const Leaderboard = ({
  languageIndex,
  handleSetError,
  unitTitle
}) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const [targetYear, setTargetYear] = useState(year);
  const [targetMonth, setTargetMonth] = useState(month);
  const [groupTitle, setGroupTitle] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);

  const targetYearText = ["查詢年份", "查询年份", "Query Year", "Année de la requête"];
  const targetMonthText = ["查詢月份", "查询月份", "Query Month", "Mois de la requête"];
  const groupText = ["查詢群組", "查询群组", "Query Group", "Groupe de requêtes"];
  const submitText = ["遞交", "递交", "Submit", "Soumettre"];
  const failGetMsg = ["網絡繁忙，未能成功讀取資料，請再嘗試。", "网络繁忙，未能成功读取资料，请再尝试。", "The network is busy and the data cannot be read successfully. Please try again.", "Le réseau est occupé et les données ne peuvent pas être lues avec succès. Veuillez réessayer."]
  const leaderboardIntroA = [
    "計分方法：每答對一題得20分；在150秒內答對加4分，在120秒內答對加8分，如此類推；顯示9次提示加2分，顯示8次提示加4分，如此類推；模擬試卷內的題目會有雙倍分數，當中的列式應用題更有三倍分數。",
    "计分方法：每答对一题得20分；在150秒内答对加4分，在120秒内答对加8分，如此类推；显示9次提示加2分，显示8次提示加4分，如此类推；模拟试卷内的题目会有双倍分数，当中的列式应用题更有三倍分数。",
    "Scoring method: 20 points for each correct answer. Get 4 more points for correct answers within 150 seconds, get 8 more points for correct answers within 120 seconds, and so on. Get 2 more points with 9 prompts displayed, get 4 more points with 8 prompts displayed, and so on. The questions in the mock exam papers will have double scores, and the word problems in the mock exam papers will have triple scores.",
    "Méthode de notation : 20 points pour chaque bonne réponse. Obtenez 4 points de plus pour des réponses correctes dans les 150 secondes, obtenez 8 points de plus pour des réponses correctes dans les 120 secondes, et ainsi de suite. Obtenez 2 points de plus avec 9 invites affichées, obtenez 4 points de plus avec 8 invites affichées, et ainsi de suite. Les questions des copies d'examen simulé auront des scores doubles, et les problèmes de mots dans les copies d'examen simulé auront des scores triples."
  ];
  const leaderboardIntroB = [
    "龍虎榜分類：我們於每個月每個學習單元皆設立一個環球龍虎榜。辦學團體或教師也可為同學們設定學習群組名稱，我們也為各群組於每個月每個單元設立一個組別龍虎榜。",
    "龙虎榜分类：我们于每个月每个学习单元皆设立一个环球龙虎榜。办学团体或教师也可为同学们设定学习群组名称，我们也为各群组于每个月每个单元设立一个组别龙虎榜。",
    "Classification of the leaderboard: We set up a global leaderboard for each learning unit every month. School boards, schools, or teachers can also set the name of the learning group for the students, and we will set up a group leaderboard for each group in each unit every month.",
    "Classement du classement : Nous mettons en place un classement global pour chaque unité d'apprentissage chaque mois. Les commissions scolaires, les écoles ou les enseignants peuvent également définir le nom du groupe d'apprentissage pour les élèves, et nous mettrons en place un classement de groupe pour chaque groupe dans chaque unité chaque mois."
  ];
  const leaderboardIntroC = [
    "群組名稱建議格式：城市英文字首_學校或團體英文字首_級別或班別。",
    "群组名称建议格式：城市英文字首_学校或团体英文字首_级别或班别。",
    "Suggested format for group name: city initials_school or group initials_grade or class.",
    "Format suggéré pour le nom du groupe: initiales de la ville_initiales de l'école ou du groupe_niveau ou classe."
  ];

  const yearChange = (e) => {
    if (e.target.value > -1 && e.target.value < 3000) {
      setTargetYear(parseInt(e.target.value, 10));
    }
  };

  const monthChange = (e) => {
    if (e.target.value > -1 && e.target.value < 100) {
      setTargetMonth(e.target.value);
    }
  };

  const groupChange = (e) => {
    setGroupTitle(e.target.value);
  };

  useEffect(() => {
    submit();
  }, [])

  const submit = () => {
    let month = targetMonth;
    if (month < 1 || month > 12) {
      month = new Date().getMonth() + 1;
      setTargetMonth(month);
    }
    let year = targetYear;
    let thisYear = new Date().getFullYear();
    if (year < 2021 || year > thisYear) {
      year = thisYear;
      setTargetYear(year);
    }
    const targetDate = new Date(targetYear, month - 1, 1);
    const monthLong = targetDate.toLocaleString('default', { month: 'long' });
    async function fetchData() {
      await axios
        .post("https://u5xz7.sse.codesandbox.io/todos/getLeaderboard", {
          groupTitle: groupTitle,
          year: year,
          month: monthLong,
          unit: unitTitle[2]
        })
        .then((response) => {
          console.log(response.data.leaderboardArray[0]);
          console.log(response.data.isGetSuccess);
          if (response.data.isGetSuccess) {
            setLeaderboardData(response.data.leaderboardArray)
          } else {
            handleSetError(failGetMsg[languageIndex]);
          }
        });
    }
    fetchData();
  };

  const classes = leaderboardStyles();

  return (
    <Grid>
      <Grid
        container
        className={`${classes.centerRow} `}
      >
        <Grid className={classes.centerColumn}>

          {<Grid className={classes.marginLeft}>
            <Grid
              container
              className={`${classes.leftRow} ${classes.marginTop}`}
            >
              <Typography className={classes.enquiryText}>{targetYearText[languageIndex] + ": "}</Typography>
              <input
                className={classes.input}
                value={targetYear}
                max="2099"
                min="2020"
                type="number"
                name="year"
                id="year"
                onChange={(e) => {
                  yearChange(e);
                }}
              />
            </Grid>
            <Grid
              container
              className={`${classes.leftRow} ${classes.marginTop}`}
            >
              <Typography className={classes.enquiryText}>{targetMonthText[languageIndex] + ": "}</Typography>
              <input
                className={classes.input}
                value={targetMonth}
                max="12"
                min="1"
                type="number"
                name="month"
                id="month"
                onChange={(e) => {
                  monthChange(e);
                }}
              />
            </Grid>
            <Grid
              container
              className={`${classes.leftRow}  ${classes.marginTop}`}
            >
              <Typography className={classes.enquiryText}>{groupText[languageIndex] + ": "}</Typography>
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
          </Grid>}
          <Grid
            className={`${classes.centerRow} ${classes.margin}`}
          >
            <Button
              variant="contained"
              className={classes.submitButton}
              style={{ textTransform: 'capitalize' }}
              onClick={() => {
                submit();
              }}
            >
              {submitText[languageIndex]}
            </Button>
          </Grid>
          <Grid>
            <Typography className={classes.introduction}>{leaderboardIntroA[languageIndex]}</Typography>
            <Typography className={classes.introduction}>{leaderboardIntroB[languageIndex]}</Typography>
            <Typography className={classes.introduction}>{leaderboardIntroC[languageIndex]}</Typography>
          </Grid>
          {leaderboardData[0] != undefined && <LeaderboardTable leaderboardData={leaderboardData} languageIndex={languageIndex} />}
        </Grid>
      </Grid>
    </Grid>
  );
};
