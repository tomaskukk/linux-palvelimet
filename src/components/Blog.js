import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import Header from "./Header";
import Footer from "./Footer";
import Homeworkone from "./Homeworkone";
import Homeworktwo from "./Homeworktwo";
import Homeworkthree from "./Homeworkthree";
import Homeworkfour from "./Homeworkfour";
import Homeworkfive from "./Homeworkfive";
import Homeworksix from "./Homeworksix";
import Homeworkseven from "./Homeworkseven";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const sections = [
  { title: "Homework one", url: "/homeworkone" },
  { title: "Homework two", url: "/homeworktwo" },
  { title: "Homework three", url: "/homeworkthree" },
  { title: "Homework four", url: "/homeworkfour" },
  { title: "Homework five", url: "/homeworkfive" },
  { title: "Homework six", url: "/homeworksix" },
  { title: "Homework seven", url: "/homeworkseven" }
];

const homeWorkComponents = [
  <Homeworkone />,
  <Homeworktwo />,
  <Homeworkthree />,
  <Homeworkfour />,
  <Homeworkfive />,
  <Homeworksix />,
  <Homeworkseven />
];

export default function Blog() {
  return (
    <React.Fragment>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Linux-course homeworks" sections={sections} />
          <main>
            <Route path="/homeworkone" render={() => <Homeworkone />} />
            {homeWorkComponents.map((item, i) => (
              <Route path={sections[i].url} render={() => item} />
            ))}
          </main>
        </Container>
        <Footer
          title="Linux-servers  "
          description="This website was made to return exercises for linux-servers course"
        />
      </Router>
    </React.Fragment>
  );
}
