import { colors, createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 30,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    //primary: { main: "#FF0000" },
    //secondary: { main: "#0055FF"},
  },
  color: {
    myBlack: "#111111",
    myRed: "#AA0000",
    myBlue: "#0044AA",
    myGreen: "#00BB00",
    myOrange: "#DD8800",
    myYellow: "#FFDF44",
    myBrown: "#BB6611",
    myPink: "#FFAAAA",
    myPurple: "#AA00FF",
    myMagenta: "#FF00FF",
    myWhite: "#F5FFE8",
    myGrey: "#CCCCCC",
    myDarkGreen: "#227700",
    myLightGreen: "#AAFF55",
    myDarkPurple: "#550055",
    red: "#FF4444",
    orange: "#FF8400",
    yellow: "#F0E900",
    lime: "#B0FF33",
    green: "#55FF77",
    cyan: "#22EEFF",
    blue: "#0088FF",
    purple: "#B400FF",
    skyGradient: "linear-gradient(to top, #FFE760, #FFF4E0)",
    conicGradient: "linear-gradient(to bottom right, red, orange, yellow, lime, yellow, orange, red) 1",
  },
});
