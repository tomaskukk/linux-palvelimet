import React, { useEffect, useState, lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Newpost from './Newpost';
import Blogs from './Blogs';
import blogService from '../services/Blogservice';
import SingleBlog from './SingleBlog';
import Home from './Home';
import EditSingleBlog from './EditSingleBlog';

const Homeworkone = lazy(() => import('./Homeworkone'));

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [{ title: 'Homework one', url: '/homeworkone' }];

const homeWorkComponents = [<Homeworkone />];

export default function Blog() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
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
    console.log('setting user');
    setUser(user?.name);
  };

  const handleBlogChange = paramBlogs => {
    setBlogs(blogs.concat(paramBlogs));
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
            title="<TomasKukk />"
            sections={sections}
            user={user}
            handleChange={handleUserChange}
          />

          <main>
            <Suspense fallback={<h1>Loading..</h1>}>
              <Route path={'/homeworkone'} render={() => <Homeworkone />} />
              <Route exact path={'/'} render={() => <Home blogs={blogs} />} />
              <Route
                path={'/login'}
                render={() => <Login handleChange={handleUserChange} />}
              />
              <Route path={'/signup'} render={() => <Signup />} />
              <Route
                path={'/newpost'}
                render={() => (
                  <Newpost blogs={blogs} handleChange={handleBlogChange} />
                )}
              />
              <Route
                exact
                path={'/blogs'}
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
                    handleChange={handleBlogChange}
                  />
                )}
              />
            </Suspense>
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
