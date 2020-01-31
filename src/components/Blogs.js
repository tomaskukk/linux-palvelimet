import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import blogService from "../services/Blogservice";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
  },
  link: { padding: theme.spacing(1), textDecoration: "none", color: "black" }
}));

const sourcesList = [];

export default function Blogs({ user, handleChange, blogsFromParent }) {
  useEffect(() => {
    blogService.getAllByUser().then(blogs => handleChange(blogs));
  }, [user]);
  const classes = useStyles();

  const blogsToShow = () =>
    blogsFromParent.map(blog => (
      <li key={blog.title}>
        <Link className={classes.link} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
        <Button variant="outlined">
          <Link className={classes.link} to={`/blogs/edit/${blog.id}`}>
            edit this post
          </Link>
        </Button>
      </li>
    ));

  return (
    <Paper className={classes.homeworkone}>
      <Typography variant="h4">{user}'s blogs</Typography>
      <ul component="nav" className={classes.root}>
        {blogsToShow()}
      </ul>
    </Paper>
  );
}
