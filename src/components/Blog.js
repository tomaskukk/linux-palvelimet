import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import Header from "./Header";
import Footer from "./Footer";
import Homeworkone from "./Homeworkone";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const sections = [{ title: "Homework one", url: "#" }];

export default function Blog() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Linux-course homeworks" sections={sections} />
        <main>
          <Homeworkone />
        </main>
      </Container>
      <Footer
        title="Linux-servers  "
        description="This website was made to return exercises for linux-servers course"
      />
    </React.Fragment>
  );
}
