import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import Homeworkone from "./Homeworkone";
import Homeworktwo from "./Homeworktwo";
import Homeworkthree from "./Homeworkthree";
import Homeworkfour from "./Homeworkfour";
import Homeworkfive from "./Homeworkfive";
import Homeworksix from "./Homeworksix";
import Homeworkseven from "./Homeworkseven";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Newpost from "./Newpost";
import Blogs from "./Blogs";
import blogService from "../services/Blogservice";

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
  const [user, setUser] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user.token);
    }
  }, [user]);
  return (
    <React.Fragment>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="<TomasKukk />" sections={sections} user={user} />

          <main>
            {homeWorkComponents.map((item, i) => (
              <Route
                key={sections[i].title}
                path={sections[i].url}
                render={() => item}
              />
            ))}
            <Route path={"/login"} render={() => <Login />} />
            <Route path={"/signup"} render={() => <Signup />} />
            <Route path={"/newpost"} render={() => <Newpost />} />
            <Route path={"/blogs"} render={() => <Blogs />} />
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
