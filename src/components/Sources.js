import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      display: "flex"
    }
  }
}));

export default function Sources(props) {
  const classes = useStyles();
  const { sourcesList } = props;
  const preventDefault = event => event.preventDefault();

  if (sourcesList) {
    return (
      <>
        <Typography variant="h5">Sources used: </Typography>
        <Typography className={classes.root}>
          {sourcesList.map(item => (
            <Link key={item} href={item} onClick={preventDefault}>
              {item}
            </Link>
          ))}
        </Typography>
      </>
    );
  }

  return <></>;
}
