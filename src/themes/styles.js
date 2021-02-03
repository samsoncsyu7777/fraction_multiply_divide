import { makeStyles} from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";

export const pagesStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  formulaColumn: {
    width: "80vw",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: "94vw",
      maxWidth: "96vw",
    },
  },
  formulaLine: {
    fontSize: "2.5vw",
    letterSpacing: "0.6vw",
    textAlign: "left",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      fontSize: "5vw",
    },
  },
  formulaBox: {
    width: "75vw",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    }
  },
  verticalCenterRow: {
    display: "flex",
    alignItems: "center",
  },
  commonPadding: {
    margin: "1vw",
  },
  commonText: {
    fontSize: "2vw",
    margin: '0.5vw',
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw",
    },
  },
  okButton: {
    height: "4vw",
    width: "7vw",
    fontSize: "1vw",
    margin: "0.5vw",
    [theme.breakpoints.down("sm")]: {
      height: "8vw",
      width: "14vw",
      fontSize: "2vw",
    },
  },
  resetArrow: {
    fontSize: "6vw",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12vw",
    },
  },
}));