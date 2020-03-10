import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "left",
    "& > * + *": {
      display: "flex"
    }
  }
}));

export default function Sources(props) {
  const classes = useStyles();
  const { sourcesList } = props;

  if (sourcesList) {
    return (
      <>
        <Typography className={classes.root}>
          <Typography variant="h6">Tomas Kukk </Typography>
          <Typography variant="h6">Sources used: </Typography>
          {sourcesList.map(item => (
            <Link
              key={item}
              href={item}
              target="_blank"
              rel="noopener nofollow"
            >
              {item}
            </Link>
          ))}
        </Typography>
      </>
    );
  }

  return <></>;
}
