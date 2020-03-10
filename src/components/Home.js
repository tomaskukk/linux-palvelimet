import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FeaturedPost from "./FeaturedPost";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

export default function Home() {
  const blogs = [
    {
      title: "Ubuntun asentaminen livetikulle",
      uri: "/homeworkone"
    },
    {
      title: "Ssh:n asennus ubuntulle ja sen käyttäminen",
      uri: "/homeworktwo"
    },
    {
      title: "Sovelluksen julkaisu käyttäen Flaskia, Postgresia ja mod_wsgi:tä",
      uri: "/homeworkthree"
    },
    {
      title:
        "Sovelluksen julkaisu internetiin käyttäen Reactia, Nodea ja MongoDB:tä",
      uri: "/homeworkfour"
    },
    {
      title:
        "Uuden sovelluksen julkaisu subdomainilla käyttäen Mongoa, Flaskia ja mod_wsgitä",
      uri: "/homeworkfive"
    },
    {
      title: "Sovelluksen päivittäminen käyttäen mod_wsgi:tä",
      uri: "/homeworksix"
    }
  ];

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={4}>
            {blogs.map(post => (
              <FeaturedPost
                key={post.title}
                post={post}
                imageSrc={"https://source.unsplash.com/collection/4510513"}
              />
            ))}
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}
