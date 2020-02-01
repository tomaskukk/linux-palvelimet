import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sources from './Sources';
import Grid from '@material-ui/core/Grid';
import Text from './Text';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Typography } from '@material-ui/core';
import blogService from '../services/Blogservice';

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
}));

export default function SingleBlog({ blog }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleBlogPost = async event => {
    event.preventDefault();
    try {
      const blogpost = await blogService.update(blog.id, {
        content: [
          {
            title: title,
            content: content,
          },
        ],
      });
      setContent('');
      setTitle('');
    } catch (exception) {
      console.log(exception);
    }
  };
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
        <Typography variant="h5">Add new section to {blog?.title}</Typography>
        <form className={classes.form} onSubmit={handleBlogPost}>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Title"
              id="blog-text"
              variant="outlined"
              onChange={({ target }) => setTitle(target.value)}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Text"
              multiline
              rows="12"
              id="blog-text"
              variant="outlined"
              onChange={({ target }) => setContent(target.value)}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
        <Grid container spacing={3}>
          {blogsToShow()}
        </Grid>
      </div>
      <Sources sourcesList={sourcesList}></Sources>
    </Paper>
  );
}
