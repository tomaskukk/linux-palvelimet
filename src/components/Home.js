import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FeaturedPost from "./FeaturedPost";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

export default function Home({ blogs }) {
  console.log(blogs);
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={4}>
            {blogs.map(post => (
              <FeaturedPost
                key={post.title}
                post={post}
                imageSrc={"https://source.unsplash.com/collection/4510513"}
              />
            ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
