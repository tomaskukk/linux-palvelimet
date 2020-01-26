import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  titleForText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}));

export default function Textandpicturegrid(props) {
  const { title, imgSrc, text } = props;
  console.log(imgSrc);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Typography
          className={classes.titleForText}
          variant="h5"
          color="inherit"
        >
          {title}
        </Typography>
        <Grid item xs={6}>
          <Typography variant="body1" color="inherit">
            {text}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={imgSrc}></img>
        </Grid>
      </Grid>
    </div>
  );
}
