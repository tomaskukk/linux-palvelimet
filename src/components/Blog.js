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
import SingleBlog from "./SingleBlog";
import Home from "./Home";
import EditSingleBlog from "./EditSingleBlog";

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
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user.name);
    }
  }, [user]);
  useEffect(() => {
    blogService.getAll().then(response => setBlogs(response));
  }, []);

  const blogById = id => {
    console.log("In blogby id");
    console.log(blogs.find(blog => blog.id === id));
    return blogs.find(blog => blog.id === id);
  };

  const handleUserChange = user => {
    console.log("setting user");
    setUser(user?.name);
  };

  const handleBlogChange = paramBlogs => {
    setBlogs(paramBlogs);
  };

  return (
    <React.Fragment>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            title="<TomasKukk />"
            sections={sections}
            user={user}
            handleChange={handleUserChange}
          />

          <main>
            {homeWorkComponents.map((item, i) => (
              <Route
                key={sections[i].title}
                path={sections[i].url}
                render={() => item}
              />
            ))}
            <Route
              path={"/login"}
              render={() => <Login handleChange={handleUserChange} />}
            />
            <Route path={"/signup"} render={() => <Signup />} />
            <Route path={"/newpost"} render={() => <Newpost />} />
            <Route exact path={"/"} render={() => <Home blogs={blogs} />} />
            <Route
              exact
              path={"/blogs"}
              render={() => (
                <Blogs
                  user={user}
                  blogsFromParent={blogs}
                  handleChange={handleBlogChange}
                />
              )}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => (
                <SingleBlog blog={blogById(match.params.id)} />
              )}
            />
            <Route
              exact
              path="/blogs/edit/:id"
              render={({ match }) => (
                <EditSingleBlog blog={blogById(match.params.id)} />
              )}
            />
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
