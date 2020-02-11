import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HighlightedMarkdown from "./Highligtedmarkdown.js";
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
    flexGrow: 1,
    width: "60%",
    textAlign: "left",
    padding: theme.spacing(3)
  }
}));

export default function Homeworkone(props) {
  const classes = useStyles();
  return (
    <Paper align="center" className={classes.homeworkone}>
      <div className={classes.root}>
        <HighlightedMarkdown>{props.children}</HighlightedMarkdown>
      </div>
    </Paper>
  );
}
