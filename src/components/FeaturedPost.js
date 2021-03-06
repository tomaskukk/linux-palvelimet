import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  card: {
    display: "flex",
    minHeight: "220px"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 200
  }
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post, imageSrc } = props;
  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h6">
              {post.title}
            </Typography>

            <Typography variant="subtitle1" paragraph>
              {"Tomas Kukk"}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              <Link className={classes.link} to={post.uri}>
                Read more..
              </Link>
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={`${imageSrc}?sig=${Math.random()}`}
          />
        </Hidden>
      </Card>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object
};
