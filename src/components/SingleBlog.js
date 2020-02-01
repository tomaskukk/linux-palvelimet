import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sources from "./Sources";
import Grid from "@material-ui/core/Grid";
import Text from "./Text";
import Typography from "@material-ui/core/Typography";

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

export default function SingleBlog({ blog }) {
  console.log(blog);
  const classes = useStyles();
  const blogsToShow = () =>
    blog?.content?.map(b => (
      <Grid key={b.title} item xs={6}>
        <Text key={b.title} title={b.title} text={b.content}></Text>
      </Grid>
    ));
  const sourcesList = [];
  return (
    <Paper className={classes.homeworkone}>
      <div className={classes.root}>
        <Typography variant="h3" align="center">
          {blog?.title}
        </Typography>

        <Grid container spacing={3}>
          {blogsToShow()}
        </Grid>
      </div>
      <Sources sourcesList={sourcesList}></Sources>
      <Typography variant="h5">{blog?.user?.name}</Typography>
      <Typography variant="body1">{blog?.date}</Typography>
    </Paper>
  );
}
