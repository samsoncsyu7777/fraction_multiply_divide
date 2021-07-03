import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { theme as myTheme } from "../themes/theme";
import "katex/dist/katex.min.css";
import { InlineMath, /*BlockMath*/ } from "react-katex";

const StyledTableCell = withStyles((theme) => ({
  head: {
    padding: "0vw 1vw 0vw 1vw",
    maxHeight: "5.2vw",
    lineHeight: "5.2vw",
    backgroundColor: myTheme.color.myDarkPurple,//theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "2.0vw",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "10.4vw",
      lineHeight: "10.4vw",
      fontSize: "4.0vw",
      maxWidth: "25vw",
    },
    overflowWrap: "break-word",
  },
  body: {
    padding: "0vw 1vw 0vw 1vw",
    maxHeight: "5.2vw",
    height: "5.2vw",
    minHeight: "5.2vw",
    fontSize: "1.6vw",
    maxWidth: "25vw",
    [theme.breakpoints.down("xs")]: {
      minHeight: "12.4vw",
      height: "12.4vw",
      fontSize: "3.2vw",
      maxWidth: "30vw",
    },
    overflowWrap: "break-word",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: myTheme.color.myLightPink,//theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
      backgroundColor: myTheme.color.myWhite,//theme.palette.action.hover,
    },
  },
}))(TableRow);

const examCompleteStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    marginBottom: "2vw",
    minWidth: "80vw",
    width: "80vw",
    maxWidth: "80vw",
    [theme.breakpoints.down("xs")]: {
      minWidth: "90vw",
      width: "90vw",
      maxWidth: "90vw",
    }
  },
  title: {
    color: myTheme.color.myBrown,
    textAlign: "center",
    fontSize: "1.8vw",
    width: "75vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.6vw",
      width: "90vw",
    }
  },
}));

export const ExamComplete = ({ scoreTotalForUnit, errorMessageArray, setErrorMessageArray, setIsLogined, languageIndex, setExamCompleted }) => {
  const examConclusion = [
    "欣賞你完成這份模擬試卷，你能答對所有題目實在是在這單元的學習上到達一個重要的里程碑。以下是曾在進行模擬試卷中出現的提示，重覆出現的提示正是這單元的學習難點，你需多加留意及鞏固。請按以下的電郵分享按扭，把這些學習難點寄給父母或導師，他們便可以針對這些學習難點為你準備考試作最後而最重要的鞏固。祝你在數學考試中取得優良成績！",
    "欣赏你完成这份模拟试卷，你能答对所有题目实在是在这单元的学习上到达一个重要的里程碑。以下是曾在进行模拟试卷中出现的提示，重覆出现的提示正是这单元的学习难点，你需多加留意及巩固。请按以下的电邮分享按扭，把这些学习难点寄给父母或导师，他们便可以针对这些学习难点为你准备考试作最后而最重要的巩固。祝你在数学考试中取得优良成绩！",
    "Appreciate that you have completed this mock exam paper and that you can answer all the questions correctly is an important milestone in the study of this unit. The following are the hints that have appeared in the mock exam paper. The repeated hints are the learning difficulties of this unit. You need to pay more attention to and strengthen them. Please click the following e-mail sharing button to send these learning difficulties to your parents or tutors, and they can prepare you for the exam as the final and most important reinforcement for these learning difficulties. I wish you good grades on the math exam!",
    "Le fait de savoir que vous avez terminé cette copie d'examen simulé et que vous pouvez répondre correctement à toutes les questions est une étape importante dans l'étude de cette unité. Ce qui suit sont les conseils qui sont apparus dans le papier d'examen blanc. Les conseils répétés sont les difficultés d'apprentissage de cette unité. Vous devez y prêter plus d'attention et les renforcer. Veuillez cliquer sur le bouton de partage de courrier électronique suivant pour envoyer ces difficultés d'apprentissage à vos parents ou tuteurs, et ils peuvent vous préparer à l'examen en tant que renforcement final et le plus important pour ces difficultés d'apprentissage. Je te souhaite de bonnes notes à l'examen de maths !"
  ];
  const displayComments = [
    "和這單元的學習難點相關的提示", "和这单元的学习难点相关的提示", "Hints related to learning difficulties in this unit", "Conseils liés aux difficultés d'apprentissage dans cette unité"
  ];
  
  const classes = examCompleteStyles();

  return (
    <Grid className={classes.centerRow}>
      <Grid >
        <Typography className={classes.title}>{examConclusion[languageIndex]}</Typography>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">{displayComments[languageIndex]}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {errorMessageArray[0] != undefined && errorMessageArray.map((msg, index) => {
                let msgArray = msg.split("^");
                return (<StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" style={{ whiteSpace: 'pre-line' }}>
                    {msgArray.map((text, index) => {
                      return index % 2 === 0 ? (
                        <span key={index}>{text}</span>
                      ) : (
                        <InlineMath key={index}>{text}</InlineMath>
                      );
                    })}
                  </StyledTableCell>
                </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

};