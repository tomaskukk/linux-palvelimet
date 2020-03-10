import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration: "none",
    color: "black"
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, user, handleChange } = props;
  let loginOrLogoff = (
    <>
      <Link className={classes.toolbarLink} to="/signup">
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Link>
      <Link className={classes.toolbarLink} to="login">
        <Button size="small">Log in</Button>
      </Link>
    </>
  );

  let createPost = <></>;

  const handleSignOut = () => {
    handleChange(null);
    window.localStorage.removeItem("loggedUser");
  };

  if (user) {
    loginOrLogoff = <Button onClick={handleSignOut}>Log out</Button>;
    createPost = (
      <>
        <Link className={classes.toolbarLink} to="/blogs">
          <Button variant="outlined" size="small">
            My blogs
          </Button>
        </Link>
        <Link className={classes.toolbarLink} to="/newpost">
          <Button size="small">Create post</Button>
        </Link>
      </>
    );
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {createPost}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link to="/" className={classes.toolbarLink}>
            {"<Home />"}
          </Link>
        </Typography>
        {/*         {loginOrLogoff}
         */}{" "}
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map(section => (
          <Link
            key={section.title}
            to={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
};
