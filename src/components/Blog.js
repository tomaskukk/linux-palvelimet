import React, { useEffect, useState, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Newpost from "./Newpost";
import Blogs from "./Blogs";
import blogService from "../services/Blogservice";
import SingleBlog from "./SingleBlog";
import Home from "./Home";
import EditSingleBlog from "./EditSingleBlog";
import Homeworkone from "./Homeworkone";
import Homeworktwo from "./Homeworktwo";
import Markdownblog from "./Markdownblog";
import hmThreeMd from "./home-work-three.md";
import hmFourMd from "./Homeworkfour.md.js";
import hmFiveMd from "./homeworkfive.md.js";
import hmSixMd from "./homeworksix.md.js";

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
    blogService.getAll().then(response => setBlogs(response));
  }, [user]);

  const blogById = id => {
    console.log(blogs.find(blog => blog.id === id));
    return blogs.find(blog => blog.id === id);
  };

  const handleUserChange = user => {
    console.log("setting user");
    setUser(user?.name);
  };

  const handleBlogChange = paramBlogs => {
    setBlogs(blogs.concat(paramBlogs));
  };
  const handleBlogUpdate = response => {
    const editedBlog = blogs.find(blog => blog.id === response.id);
    editedBlog.content = response.content;
    const allBlogsExcludingEdited = blogs.filter(
      blog => blog.id !== response.id
    );
    setBlogs(allBlogsExcludingEdited.concat(editedBlog));
  };

  const handleDelete = id => {
    blogService.del(id).then(resp => console.log(resp));
    const updatedBlogs = blogs?.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
  };

  return (
    <React.Fragment>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            sections={sections}
            user={user}
            handleChange={handleUserChange}
          />

          <main>
            <Route path={"/homeworkone"} render={() => <Homeworkone />} />
            <Route path={"/homeworktwo"} render={() => <Homeworktwo />} />
            <Route
              path={"/homeworkthree"}
              render={() => <Markdownblog>{hmThreeMd}</Markdownblog>}
            />
            <Route
              path={"/homeworkfour"}
              render={() => <Markdownblog>{hmFourMd}</Markdownblog>}
            />

            <Route
              path={"/homeworkfive"}
              render={() => <Markdownblog>{hmFiveMd}</Markdownblog>}
            />

            <Route
              path={"/homeworksix"}
              render={() => <Markdownblog>{hmSixMd}</Markdownblog>}
            />

            <Route
              exact
              path={"/login"}
              render={() => <Login handleChange={handleUserChange} />}
            />
            <Route exact path={"/signup"} render={() => <Signup />} />
            <Route
              path={"/newpost"}
              render={() => (
                <Newpost blogs={blogs} handleChange={handleBlogChange} />
              )}
            />
            <Route exact path={"/"} render={() => <Home blogs={blogs} />} />
            <Route
              exact
              path={"/blogs"}
              render={() => (
                <Blogs
                  user={user}
                  blogs={blogs?.filter(blog => blog?.user?.name === user)}
                  handleChange={handleDelete}
                />
              )}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => (
                <SingleBlog
                  handleChange={handleBlogChange}
                  blog={blogById(match.params.id)}
                />
              )}
            />
            <Route
              exact
              path="/blogs/edit/:id"
              render={({ match }) => (
                <EditSingleBlog
                  blog={blogById(match.params.id)}
                  handleChange={handleBlogUpdate}
                />
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
