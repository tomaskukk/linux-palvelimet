import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  titleForText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default function Textandpicturegrid(props) {
  const { title, text } = props;
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.titleForText} variant="h6" color="inherit">
        {title}
      </Typography>
      <Typography variant="body1" color="inherit">
        {text}
      </Typography>
    </div>
  );
}
