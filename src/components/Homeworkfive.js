import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Textandpicturegrid from "./Textandpicturegrid";
import Sources from "./Sources";
import Text from "./Text";
import Grid from "@material-ui/core/Grid";
import Imgcard from "./Imgcard";

const useStyles = makeStyles(theme => ({
  homeworkone: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6)
    }
  },
  mainContainer: {
    padding: theme.spacing(3),
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  }
}));

const sourcesList = [];

const sectionA = {
  title: "",
  img: "",
  text: "",
  imgTitle: ""
};

const sectionB = {
  title: "",
  img: "",
  text: "",
  imgTitle: ""
};

const sectionC = {
  title: "",
  text: ""
};

const sectionD = {
  title: "",
  text: ""
};

const sectionE = {
  title: ""
};
export default function Homeworkone() {
  const classes = useStyles();
  return (
    <Paper className={classes.homeworkone}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </div>
      <Sources sourcesList={sourcesList}></Sources>
    </Paper>
  );
}
