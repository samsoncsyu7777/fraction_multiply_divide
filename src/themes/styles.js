import { makeStyles} from "@material-ui/core/styles";
import { theme as myTheme } from "../themes/theme";

export const pagesStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
  },
  formulaRow: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  twoButtons: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  formulaColumn: {
    width: "80vw",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      width: "94vw",
      maxWidth: "96vw",
    },
  },
  formulaLine: {
    fontSize: "2.5vw",
    letterSpacing: "0.6vw",
    textAlign: "left",
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5vw",
    },
  },
  formulaBox: {
    width: "75vw",
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    }
  },
  spaceGrid: {
    height: "2vw",
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },
  okButton: {
    height: "4vw",
    width: "7vw",
    fontSize: "1.3vw",
    margin: "0.5vw",
    [theme.breakpoints.down("xs")]: {
      height: "8vw",
      width: "14vw",
      fontSize: "2.6vw",
    },
  },
  resetArrow: {
    fontSize: "6vw",    
    height: "2.5vw",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12vw",
      height: "5.0vw"
    },
  },
  logoutButton: {
    color: myTheme.color.myWhite,
    backgroundColor: myTheme.color.myBlue,    
    marginTop: "1vw",
    height: "4vw",
    width: "7vw",
    fontSize: "1.3vw",
    [theme.breakpoints.down("xs")]: {
      height: "8vw",
      width: "14vw",
      fontSize: "2.6vw",
    }
  },
}));