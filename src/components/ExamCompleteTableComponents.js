import React, { createRef } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { ExamComplete } from './ExamCompleteComponents';
import { useScreenshot, createFileName } from "use-react-screenshot";
import { EmailShareButton, EmailIcon } from "react-share";
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { theme as myTheme } from "../themes/theme";

const examCompleteTableStyles = makeStyles((theme) => ({
  centerRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: myTheme.color.myDarkGreen,
    color: myTheme.color.myWhite,    
    fontSize: "1.6vw",
    margin: "0.5vw",
    textAlign: "center",
    lineHeight: "200%",
    [theme.breakpoints.down("xs")]: {      
      fontSize: "3.2vw",
    },
  },
  emailButton: {
    color: myTheme.color.myDarkGreen,
    height: "10vw",
    size: "30vw",
  }
}));

export const ExamCompleteTable = ({ scoreTotalForUnit, errorMessageArray, setErrorMessageArray, setIsLogined, languageIndex, setExamCompleted }) => {
  const shareUrl =
    "https://u2snfukih9dkcrgrzex8iq-on.drv.tw/MathsFractionMultiplyDivide/?lang=" +
    languageIndex +
    "&ver=" + 0;
  const downloadImageText = ["下載提示列表", "下载提示列表", "Download hint list", "Télécharger la liste de conseils"];
  const sendEmailText = ["發送電子郵件", "发送电子邮件", "Send Email", "Envoyer un E-mail"];
  const emailBody = ["請附上提示列表的圖像檔。", "请附上提示列表的图像档。", "Please attach the image file of the hint list.", "Veuillez joindre le fichier image de la liste d'indices."];
  let isSmallDevice = window.innerWidth < 600 ? true : false;
  let rowHeight = isSmallDevice ? 12.4 : 5.2;
  let imageHeight = 50 + rowHeight * errorMessageArray.length;
  let imageHeightVw = imageHeight + "vw";
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => {
    window.scrollTo(0, 0);
    takeScreenShot(ref.current).then(download);
  };

  const classes = examCompleteTableStyles();

  return (
    <Grid>
      <Grid className={classes.centerRow}>
        <Button
          className={classes.button}
          variant="contained"
          style={{ textTransform: 'capitalize' }}
          onClick={downloadScreenshot}
        >{downloadImageText[languageIndex]}</Button>
        <EmailShareButton
          children={
            <Button
              className={classes.button}
              variant="contained"
              style={{ textTransform: 'capitalize' }}
            >{sendEmailText[languageIndex]}</Button>
          }
          url={shareUrl}
          subject="Maths Learning mock exam paper completed"
          body={emailBody[languageIndex]}
        />
      </Grid>
      <div
        ref={ref}
        style={{ width: "100vw", height: { imageHeightVw }, margin: 0, padding: 0 }}
      >
        <ExamComplete
          coreTotalForUnit={scoreTotalForUnit}
          errorMessageArray={errorMessageArray}
          setErrorMessageArray={setErrorMessageArray}
          setIsLogined={setIsLogined}
          languageIndex={languageIndex}
          setExamCompleted={setExamCompleted}
        />
      </div>
    </Grid>
  );
};
