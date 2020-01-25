import Paper from "@material-ui/core/Paper";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import image01b from "../img/01b.png";

export default function Homeworkone() {
  const useStyles = makeStyles(theme => ({
    homeworkone: {},
    mainContainer: {
      padding: theme.spacing(3)
    }
  }));

  return (
    <Paper className="homeworkone">
      <Container className="mainContainer">
        <Typography component="h1" variant="h4" color="inherit">
          a)
        </Typography>
        <Typography component="h2" variant="h4" color="inherit">
          b)
        </Typography>
        <Typography component="h2" variant="h5" color="inherit">
          At first terminal responded with PCI (sysfs) and got stuck on that.
          Solution was to press 'e' in the boot menu and add "nomodeset" before
          quiet splash. I also added the same configuration to
          /etc/default/grup. After this I had no problems. The same problem also
          made my screen freeze quickly after boot and was fixed at the same
          time.
          <img src={image01b}></img>
        </Typography>
        <Typography component="h2" variant="h4" color="inherit">
          c)
        </Typography>
        <Typography component="h2" variant="h5" color="inherit">
          I wanted to download some helpful programs to this OS: git, htop
        </Typography>
      </Container>
    </Paper>
  );
}
