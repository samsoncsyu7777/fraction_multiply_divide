import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { theme as myTheme, theme } from "../themes/theme";
import { FacebookShareButton, FacebookIcon } from "react-share";
import CircularProgress from "@material-ui/core/CircularProgress";

const loginStyles = makeStyles(() =>
  createStyles({
    centerRow: {
      display: "flex",
      justifyContent: "center"
    },
    verticalCenterRow: {
      display: "flex",
      alignItems: "center"
    },
    introduction: {
      fontSize: 20,
      color: myTheme.color.myBrown,
      margin: "1vh"
    },
    explanation: {
      fontSize: 16,
      color: myTheme.color.myBlack,
      margin: "1vh"
    },
    buy: {
      fontSize: 28,
      color: myTheme.color.myBlue,
      marginTop: "2vh"
    },
    currency: {
      fontSize: 20,
      color: myTheme.color.myBlue,
      borderColor: myTheme.color.myBlue,
      borderWidth: 3,
      margin: 10
    },
    margin: {
      marginBottom: "2vh"
    },
    research: {
      fontSize: 24,
      marginTop: "2vh"
    },
    researchLink: {
      fontSize: 20,
      color: myTheme.color.myGreen
    },
    facebookShare: {
      fontSize: 24,
      margin: "2vh"
    },
    waitingText: {
      fontSize: 20,
      color: myTheme.color.myMagenta
    }
  })
);

export const Login = ({
  languageIndex,
  bibleVersionIndex,
  isLogined,
  setIsLogined
}) => {
  const [isShared, setIsShared] = useState(false);
  const [isClickFacebook, setIsClickFacebook] = useState(false);

  const introduction = [
    "針對學習盲點，對同學的列式、步驟和答案進行分析，即時作出回饋和概念解釋，同學完成試卷後，末頁將列出同學需注意的所有學習盲點和完成所需時間。",
    "针对学习盲点，对同学的列式、步骤和答案进行分析，即时作出回馈和概念解释，同学完成试卷后，末页将列出同学需注意的所有学习盲点和完成所需时间。",
    "For learning blind spots, analyze the students’ formulas, steps and answers, and give immediate feedback and conceptual explanations. After students complete the mock exam paper, the last page will list all the learning blind spots that students need to pay attention to and the time required for completion.",
    "Pour apprendre les angles morts, analysez les formules, les étapes et les réponses des étudiants, et donnez des commentaires immédiats et des explications conceptuelles. Une fois que les étudiants ont terminé l'examen simulé, la dernière page répertorie tous les angles morts d'apprentissage auxquels les étudiants doivent prêter attention et le temps nécessaire à l'achèvement."
  ];
  const explanation = [
    "每道數學題都有幾個運算步驟，而每個步驟都包含數個小概念，當同學未能算出正確答案時，通常都有一至兩個重要的小概念停留在學習盲點中，即使把題目向同學解釋一遍，也未必能幫助同學跳出該學習盲點，這會導致同學在考試中重覆出現這些小錯誤而失去不少分數。要有效幫助同學準備考試，首先要找出學習盲點，然後把握錯誤的步驟作出即時回應，最後把同學在整分試卷中的所有學習盲點列出，作為下一步溫習的目標。找出同學的學習盲點是一件極具挑戰性的專業工作，這數學網站運用資深老師的教學經驗、人工智能、課程概念架構和變易理論來對同學的每個步驟中的每個數字進行分析，找出隱藏的學習盲點，並把握最佳時機向同學解釋重要概念，如果在完成該道題目時才向同學作出回應，這時已錯過了最關鍵時刻。同學在完成一分模擬試卷後，最需要的不是接着做下一分模擬試卷，而是需按着學習盲點的列表逐一進行鞏固。這兒的模擬試卷能為同學提供一分有待鞏固的概念列表，讓同學不需再為準確考試而徬徨不安。",
    "每道数学题都有几个运算步骤，而每个步骤都包含数个小概念，当同学未能算出正确答案时，通常都有一至两个重要的小概念停留在学习盲点中，即使把题目向同学解释一遍，也未必能帮助同学跳出该学习盲点，这会导致同学在考试中重覆出现这些小错误而失去不少分数。要有效帮助同学准备考试，首先要找出学习盲点，然后把握错误的步骤作出即时回应，最后把同学在整分试卷中的所有学习盲点列出，作为下一步温习的目标。找出同学的学习盲点是一件极具挑战性的专业工作，这数学网站运用资深老师的教学经验、人工智能、课程概念架构和变易理论来对同学的每个步骤中的每个数字进行分析，找出隐藏的学习盲点，并把握最佳时机向同学解释重要概念，如果在完成该道题目时才向同学作出回应，这时已错过了最关键时刻。同学在完成一分模拟试卷后，最需要的不是接着做下一分模拟试卷，而是需按着学习盲点的列表逐一进行巩固。这儿的模拟试卷能为同学提供一分有待巩固的概念列表，让同学不需再为准确考试而彷徨不安。",
    "Each math problem has several calculation steps, and each step contains several small concepts. When students fail to figure out the correct answer, there are usually one or two important small concepts that remain in the blind spots of learning, even explaining the question to the students may not help them escape the blind spots of learning. This will cause the students to repeat these small mistakes in the exam and lose a lot of scores. To effectively help students prepare for the exam, first find out the blind spots, and then grasp respond to the wrong steps immediately, and finally list all the blind spots of the students in the whole mock exam paper as the goal of the next review. Finding out the blind spots of the students is very challenging professional work. This math website uses senior teachers’ teaching experience, artificial intelligence, curriculum concept architecture, and Variant Theory to analyze each number in each calculation step of the students, find hidden learning blind spots, and grasp the best time to explain important concepts to the students. If we only respond to the students when they complete the question, at this time, we miss the most critical moment. After completing a mock exam paper, what students need most is not to do the next mock test, but to follow the list of blind spots to consolidate. The mock exam papers here can provide students with a list of concepts that need to be consolidated, so that students no longer need to worry about their exams.",
    "Chaque problème mathématique comporte plusieurs étapes de calcul et chaque étape contient plusieurs petits concepts. Lorsque les élèves ne parviennent pas à trouver la bonne réponse, il y a généralement un ou deux petits concepts importants qui restent dans les angles morts de l'apprentissage, expliquant même la question à les étudiants peuvent ne pas les aider à échapper aux angles morts de l'apprentissage. Cela les amènera à répéter ces petites erreurs à l'examen et à perdre beaucoup de notes. Pour aider efficacement les étudiants à se préparer à l'examen, commencez par découvrir les angles morts, et Ensuite, saisissez immédiatement les mauvaises étapes et répertoriez enfin tous les angles morts des étudiants dans l'ensemble de la copie d'examen simulé comme objectif de la prochaine révision.Découvrir les angles morts des étudiants est un travail professionnel très difficile.Ce site Web de mathématiques utilise l'expérience d'enseignement des enseignants chevronnés, l'intelligence artificielle, l'architecture conceptuelle du programme et la théorie des variantes pour analyser chaque nombre à chaque étape de calcul des étudiants, trouver des apprentissages cachés les angles morts et saisir le meilleur moment pour expliquer les concepts importants aux élèves. Si nous ne répondons aux étudiants que lorsqu'ils ont répondu à la question, à ce moment-là, nous manquons le moment le plus critique. Après avoir terminé un examen simulé, ce dont les étudiants ont le plus besoin n'est pas de faire le prochain test simulé, mais de suivre la liste des angles morts à consolider. Les copies d'examen simulées ici peuvent fournir aux étudiants une liste de concepts qui doivent être consolidés, afin que les étudiants n'aient plus à se soucier de leurs examens."
  ];
  const research = [
    "相關學術研究",
    "相关学术研究",
    "Related academic research",
    "Recherche académique connexe"
  ];
  const buy = [
    "購買模擬試卷",
    "购买模拟试卷",
    "Purchase mock exam paper",
    "Acheter une copie d'examen blanc"
  ];
  const price1 = [
    "HK$49.50",
    "CA$7.70",
    "US$6.40",
    "£4.50",
    "A$8.25",
    "¥40.80",
    "NT$176.00"
  ];
  const price2 = [
    "HK$29.70",
    "CA$4.65",
    "US$3.85",
    "£2.70",
    "A$4.95",
    "¥24.50",
    "NT$106.00"
  ];
  const urlsArray1 = [
    "https://buy.stripe.com/5kAaHybqq7FL6HubIO",
    "https://buy.stripe.com/00gg1Samm0dj3vi5kr",
    "https://buy.stripe.com/aEU4ja8eeaRXaXK008",
    "https://buy.stripe.com/aEU16Y666e49aXKdQZ",
    "https://buy.stripe.com/8wM3f6dyy5xD3vifZ8",
    "https://buy.stripe.com/28o8zq7aaaRXe9W8wH",
    "https://buy.stripe.com/bIY02U1PQ9NT7Ly5kw"
  ];
  const urlsArray2 = [
    "https://buy.stripe.com/3cs5ne6661hn9TG9AN",
    "https://buy.stripe.com/28o5nebqq2lr4zm9AO",
    "https://buy.stripe.com/28ocPG1PQ5xDe9W14j",
    "https://buy.stripe.com/28o9Du2TUaRXfe03cs",
    "https://buy.stripe.com/6oEg1S3XYe497LyaEV",
    "https://buy.stripe.com/bIY8zq3XY6BHgi48wO",
    "https://buy.stripe.com/7sI9Du8ee9NT7Ly3cv"
  ];
  const facebookShare = [
    "在Facebook分享我們的網頁，即可享六折優惠",
    "在Facebook分享我们的网页，即可享六折优惠",
    "Share our webpage on Facebook and enjoy a 40% discount",
    "Partagez notre page web sur Facebook et profitez d'une remise de 40%"
  ];
  const shareTopic = [
    "分數乘除模擬試卷",
    "分数乘除模拟试卷",
    "Mock Exam Paper for Multiplication and Division of Fractions",
    "Mock Exam Paper for Multiplication and Division of Fractions"
  ];
  const waitingText = [
    "現正等待您把分享發佈到Facebook及來自Facebook的確認。",
    "现正等待您把分享发布到Facebook及来自Facebook的确认。",
    "Now waiting for your share to Facebook and confirmation from Facebook.",
    "En attendant votre partage sur Facebook et la confirmation de Facebook."
  ];
  const shareUrl =
    "https://u2snfukih9dkcrgrzex8iq-on.drv.tw/MathsFractionMultiplyDivide/?lang=" +
    languageIndex +
    "&ver=" +
    bibleVersionIndex;

  const clickFacebook = () => {
    setIsClickFacebook(true);
  };

  useEffect(() => {
    if (isClickFacebook) {
      const timer = setTimeout(() => {
        setIsShared(true);
        setIsClickFacebook(false);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [isClickFacebook]);

  const classes = loginStyles();

  return (
    <Grid>
      <Grid
        container
        className={`${classes.centerRow} ${classes.verticalCenterRow}`}
      >
        <Grid className={classes.centerColumn}>
          <Typography className={classes.introduction}>
            {introduction[languageIndex]}
          </Typography>
          <Typography className={classes.explanation}>
            {explanation[languageIndex]}
          </Typography>
          <Typography className={classes.research}>
            {research[languageIndex]}:
          </Typography>
          <Typography
            className={classes.researchLink}
            onClick={() =>
              window.open(
                "https://link.springer.com/chapter/10.1007/978-3-030-52240-7_48",
                "Popup",
                "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30, left=30"
              )
            }
          >
            1. Effect of Immediate Feedback on Math Achievement at the High
            School Level
          </Typography>
          <Typography
            className={classes.researchLink}
            onClick={() =>
              window.open(
                "https://www.researchgate.net/publication/240886944_Using_online_assessment_to_provide_instant_feedback",
                "Popup",
                "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30, left=30"
              )
            }
          >
            2. Using online assessment to provide instant feedback
          </Typography>
          <Typography className={classes.buy}>{buy[languageIndex]}:</Typography>
          <Grid
            container
            className={`${classes.centerRow} ${classes.verticalCenterRow} ${classes.margin}`}
          >
            {price1.map((price, index) => {
              return (
                <Button
                  className={classes.currency}
                  variant="outlined"
                  onClick={() =>
                    window.open(
                      isShared ? urlsArray2[index] : urlsArray1[index],
                      "Popup",
                      "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30, left=30"
                    )
                  }
                >
                  {isShared ? price2[index]: price}
                </Button>
              );
            })}
          </Grid>
          <Grid
            container
            className={`${classes.centerRow} ${classes.verticalCenterRow} ${classes.margin}`}
          >
            <Typography className={classes.facebookShare}>
              {facebookShare[languageIndex]}:
            </Typography>
            <FacebookShareButton
              children={<FacebookIcon />}
              url={shareUrl}
              quote={
                shareTopic[languageIndex] + ": " + introduction[languageIndex]
              }
              onClick={() => clickFacebook()}
            />
          </Grid>
          {isClickFacebook && (
            <Grid
              container
              className={`${classes.centerRow} ${classes.verticalCenterRow} ${classes.margin}`}
            >
              <Typography className={classes.waitingText}>
                {waitingText[languageIndex]}
              </Typography>
              <CircularProgress className={classes.waitingText} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
