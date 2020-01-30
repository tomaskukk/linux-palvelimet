import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import image01b from "../img/01b.png";
import image01a from "../img/01a.png";
import Typography from "@material-ui/core/Typography";
import Textandpicturegrid from "./Textandpicturegrid";
import Sources from "./Sources";
import Text from "./Text";
import Grid from "@material-ui/core/Grid";
import blogService from "../services/Blogservice";

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

export default function Blogs({ username }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const classes = useStyles();

  const blogsToShow = () =>
    blogs.map(blog => (
      <Grid key={blog.title} item xs={6}>
        <Text key={blog.title} title={blog.title} text={blog.content}></Text>
      </Grid>
    ));
  return (
    <Paper className={classes.homeworkone}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {blogsToShow()}
        </Grid>
      </div>
      <Sources sourcesList={sourcesList}></Sources>
    </Paper>
  );
}
