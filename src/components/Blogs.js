import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blogService from '../services/Blogservice';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  homeworkone: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
  },
  mainContainer: {
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  link: { padding: theme.spacing(1), textDecoration: 'none', color: 'black' },
}));

const sourcesList = [];

export default function Blogs({ user }) {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    blogService.getAllByUser().then(blogs => setBlogs(blogs));
  }, [user]);
  const classes = useStyles();

  const handleDelete = id => {
    blogService.del(id).then(resp => console.log(resp));
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  const blogsToShow = () =>
    blogs.map(blog => (
      <li key={blog.title}>
        <Link className={classes.link} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
        <Button size="small" variant="outlined">
          <Link className={classes.link} to={`/blogs/edit/${blog.id}`}>
            edit this post
          </Link>
        </Button>
        <Button onClick={() => handleDelete(blog.id)}>Delete</Button>
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

Blogs.propTypes = {
  user: PropTypes.string,
};
