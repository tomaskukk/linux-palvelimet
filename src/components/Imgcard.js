import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 550
  }
});

export default function Imgcard(props) {
  const classes = useStyles();
  const { imgSrc, imgTitle } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia component="img" className={classes.media} image={imgSrc} />
        <CardContent>
          <Typography variant="body2" component="p">
            {imgTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
