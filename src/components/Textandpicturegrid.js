import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Imgcard from "./Imgcard";

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
  const { title, imgs, text, size } = props;
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.titleForText} variant="h6" color="inherit">
        {title}
      </Typography>
      <Typography variant="body1" color="inherit">
        {text}
      </Typography>
      <Grid container>
        {imgs.map(img => (
          <Grid item xs={size}>
            <Imgcard imgSrc={img.src} imgTitle={img.title}></Imgcard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
