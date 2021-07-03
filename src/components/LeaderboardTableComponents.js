import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { theme as myTheme } from "../themes/theme";

const StyledTableCell = withStyles((theme) => ({
  head: {
    padding: "0vw 1vw 0vw 1vw",
    maxHeight: "5.2vw",
    lineHeight: "5.2vw",
    backgroundColor: myTheme.color.myDarkPurple,//theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "2.2vw",    
    [theme.breakpoints.down("xs")]: {
      maxHeight: "10.4vw",
      lineHeight: "10.4vw",
      fontSize: "4.4vw",
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
      maxHeight: "12.4vw",
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
  },
}))(TableRow);

const useStyles = makeStyles((theme) =>
createStyles({
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
    fontSize: "2.5vw",
    width: "75vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5vw",
      width: "90vw",
    }
  },
}));

export const LeaderboardTable = ({ leaderboardData, languageIndex }) => {
  const rank = ["排名", "排名", "Rank", "Rang"];
  const name = ["姓名", "姓名", "Name", "Nom"];
  const email = ["電郵", "电邮", "Email", "E-mail"];
  const group = ["群組", "群组", "Group", "Grouper"];
  const score = ["積分", "积分", "Score", "But"];

  const classes = useStyles();
  console.log(leaderboardData[0])


  return (
    <Grid>
      <Typography className={classes.title}>{leaderboardData[0].month.stringValue + "  " + leaderboardData[0].year.integerValue + "  " + leaderboardData[0].unit.stringValue}</Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{rank[languageIndex]}</StyledTableCell>
              <StyledTableCell>{name[languageIndex]}</StyledTableCell>
              <StyledTableCell>{email[languageIndex]}</StyledTableCell>
              <StyledTableCell>{group[languageIndex]}</StyledTableCell>
              <StyledTableCell align="right">{score[languageIndex]}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData[0] != undefined && leaderboardData.map((row, index) => {
              return (<StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{row.firstLastName.stringValue}</StyledTableCell>
                <StyledTableCell>{row.email.stringValue}</StyledTableCell>
                <StyledTableCell>{row.groupTitle.stringValue}</StyledTableCell>
                <StyledTableCell align="right">{row.scoreTotalForUnit.integerValue}</StyledTableCell>
              </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}