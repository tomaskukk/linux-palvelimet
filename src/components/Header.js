import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
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
  const { sections, title, user } = props;
  console.log(user);
  let loginOrLogoff = (
    <>
      <Link to="/signup">
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Link>
      <Link to="login">
        <Button size="small">Log in</Button>
      </Link>
    </>
  );

  const handleSignOut = () => window.localStorage.removeItem("loggedUser");

  if (user) {
    loginOrLogoff = <Button onClick={handleSignOut}>Log out</Button>;
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link to="/" className={classes.toolbarLink}>
            {title}
          </Link>
        </Typography>
        {loginOrLogoff}
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Dropdown Menuitems={sections} title="Linux-course" />
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string
};
