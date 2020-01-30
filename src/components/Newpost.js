import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Container, Typography } from "@material-ui/core";
import blogService from "../services/Blogservice";

const useStyles = makeStyles(theme => ({
  mainPaper: {
    padding: theme.spacing(4, 0)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Newpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const classes = useStyles();

  const handleBlogPost = async event => {
    event.preventDefault();
    try {
      const blogpost = await blogService.create({
        title,
        content
      });
      setContent("");
      setTitle("");
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <Paper align="center" className={classes.mainPaper}>
      <Container maxWidth="md">
        <form className={classes.form} onSubmit={handleBlogPost}>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Blog title"
              id="blog-text"
              variant="outlined"
              onChange={({ target }) => setTitle(target.value)}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Blog text"
              multiline
              rows="12"
              id="blog-text"
              variant="outlined"
              onChange={({ target }) => setContent(target.value)}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Save blog
          </Button>
        </form>
      </Container>
    </Paper>
  );
}
