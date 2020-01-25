import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "./Footer";
import Homeworkone from "./Homeworkone";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const sections = [{ title: "Homework one", url: "#" }, {}];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…"
};

export default function Blog() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Linux-course homeworks" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Homeworkone />
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </React.Fragment>
  );
}
